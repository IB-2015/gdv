var geojson_countries;
var geojson_continents = {};
var geojson_schemes = {};
var geoscheme = [];
var geoscheme_regions = [];
var geoscheme_sub_regions = [];
var active = [];
var initX;
var x_rotation = -15;
var y_rotation = 0;
var z_rotation = 0;
/* var factor = (640/(window.screen.availWidth * (2/3)));
var height = 460/factor;
var width = 640/factor; */
var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var level = 0; // 0 world, 1 continent...
//track scale only rotate when s === 1
var s = 1;
var mouseClicked = false;

var resources = [
  "countries.geo.json",
  "geoscheme.csv",
  "Africa.geojson",
  "Americas.geojson",
  "Asia.geojson",
  "Europe.geojson",
  "Oceania.geojson",
  "Australia_and_New_Zealand.geojson",
  "Central_Asia.geojson",
  "Eastern_Asia.geojson",
  "Eastern_Europe.geojson",
  "Latin_America_and_the_Caribbean.geojson",
  "Melanesia.geojson",
  "Northern_Africa.geojson",
  "Northern_America.geojson",
  "Northern_Europe.geojson",
  "South-eastern_Asia.geojson",
  "Southern_Asia.geojson",
  "Southern_Europe.geojson",
  "Sub-Saharan_Africa.geojson",
  "Western_Asia.geojson",
  "Western_Europe.geojson"
]
promises = [];

resources.forEach(function(d) {
  promises.push(d.endsWith(".csv") ? d3.csv(d) : d3.json(d));
})

Promise.all(promises).then(function(data) {
  // init data
  geojson_countries = data[0];
  data[1].forEach(function(d) {
    geoscheme.push(d);
    if (!geoscheme_regions.includes(d["Region Name"].replace(new RegExp(" ", "g"), "_"))) {
      geoscheme_regions.push(d["Region Name"].replace(new RegExp(" ", "g"), "_"));
    }

    if (!geoscheme_sub_regions.includes(d["Sub-region Name"].replace(new RegExp(" ", "g"), "_"))) {
      geoscheme_sub_regions.push(d["Sub-region Name"].replace(new RegExp(" ", "g"), "_"));
    }
  });

  var continent_index = 2;
  var n_continents = 5;
  var geoscheme_index = continent_index + n_continents;
  for (i = continent_index; i < data.length; i++) {
    if (i < geoscheme_index) {
      data[i].geometry[0].properties = {"name": resources[i].split(".")[0]};
      geojson_continents[resources[i].split(".")[0]] = data[i];
      // geojson_continents[resources[i].split(".")[0]].geometry = data[i].features;
    } else {
      data[i].geometry[0].properties = {"name": resources[i].split(".")[0]};
      geojson_schemes[resources[i].split(".")[0]] = data[i];
    }
  }

  for(key in geojson_schemes) {
    s = geojson_schemes[key].geometry[0];
    setScheme(s, geoscheme)
    function setScheme(sub_region, scheme) {
      scheme.forEach(function(d) {
        if(s.properties.name == d["Sub-region Name"].replace(new RegExp(" ", "g"), "_")) {
          sub_region.properties.region = d["Region Name"].replace(new RegExp(" ", "g"), "_");
          return;
        }
      })
    }
  }

  // sort both geojson_countries and geoscheme alphabetically
  geojson_countries.features.sort(function(a, b) {
    return a.properties.ADMIN < b.properties.ADMIN ? -1 : 1;
  });
  geoscheme.sort(function(a, b) {
    return a["Country or Area"] < b["Country or Area"] ? -1 : 1;
  });

  // set geoscheme for every country and count missing afterwards
  var missingScheme = 0;
  var missing = [];
  geojson_countries.features.forEach(function(d) {
    d.properties.name = d.properties.name.replace(new RegExp(" ", "g"), "_")
    setScheme(d, geoscheme)
    if (d.scheme == undefined) {
      // console.log(d.properties.ADMIN + " has no matching scheme");
      missing.push(d.properties.ADMIN);
      missingScheme++;
    } else {
      // console.log(d.properties.ADMIN + " [" + d.scheme["Country or Area"] + " | " + d.scheme["Region Name"] + " | "  + d.scheme["Sub-region Name"] + "]");
    }
    // console.log("----");
    function setScheme(geojson_country, scheme) {
      scheme.forEach(function(d) {
        if (d["ISO-alpha3 Code"] === geojson_country.id /*properties.ISO_A3*/) {
          geojson_country.scheme = d;
          geojson_country.properties.sub_region = d["Sub-region Name"]
          geojson_country.properties.region = d["Region Name"]
          return;
        }
      })
    }
  });

  drawMap(geojson_countries, geojson_schemes, geojson_continents);

}).catch(function(error) {
  console.log(error);
})

function drawMap(geojson, sub_regions, continents) {
  // append svg to parent div container
  var map_svg = d3.select('#content').append('svg')
        .attr('id', 'map')
        .attr("viewBox", "0 0 " + width + " " + height )
        .attr("preserveAspectRatio", "xMinYMin")

  layer = ["region", "sub_region", "country"]
  layer_index = 0;
  function changeLayer() {
    console.log("dbclick sort");
    layer_index++
    show(layer[layer_index % layer.length]);
  }

  function getSecondLayer() {
    return layer[(layer_index+1) % 3];
  }

  function show(category) {
    console.log(category);
    gg = gg.sort(function(a, b) {
      return a.getAttribute("category") == category ? 1 : -1;
    })
    console.log("second_layer: " + layer[(layer_index+1) % 3]);
  }

  var projection = d3.geoMercator();

    projection.fitExtent([[0, 0], [width, height]], geojson);
    projection.rotate([x_rotation,y_rotation,z_rotation]);
  var geoGenerator = d3.geoPath()
    .projection(projection)


  function update(geojson, sub_regions, continents) {

    /* dblclick callbacks for map and map elements */
    var map_element_dblclick = function() {
      changeLayer();
    }
    var map_dblclick = function() {
      console.log("map double clicked");
      changeLayer();
    };

    /* dblclick callbacks for map and map elements (region, country etc.) */
    var map_cc = clickcancel();
    map_cc.on('click', null);
    map_cc.on('dblclick', map_dblclick);

    /*
      prohibit dblclick event on map when mouse over map element to prevent map from changing layer twice
     */
    var enable_map_dblclick = function() {
      map_cc.on('dblclick', map_dblclick);
    };
    var disable_map_dblclick = function() {
      map_cc.on('dblclick', null);
    }
    map_svg.call(map_cc);

    var map_element_cc = clickcancel();
    map_element_cc.on('click', function(d, index) {
      name = ""
      if (d.properties != undefined)
        name = d.properties.name
      else
        name = d.getAttribute('name')
      // console.log(name + "  click");
      path = d3.select(`[name=${name}]`).select('path');
      selected = path.classed('selected')
      selected = path.classed('selected', !selected)
    });
    map_element_cc.on('dblclick', function(d, index) {
      name = ""
      if (d.properties != undefined)
        name = d.properties.name
      else
        name = d.getAttribute('name')
      // console.log(name + "  dblclick");
      changeLayer();
    });

    for (i = 0; i < geojson.features.length; i++) {
      var country = map_svg.append('g')
      .attr("category", "country")
      .attr("level", 2)
      .attr("selected", false)
      .selectAll('path')
      .data([geojson.features[i]]);
      // console.log(geojson.features[i]);
      var path = country.enter()
        .append('path')
        .attr("region", function(d) { return (d.scheme == undefined ? "none" : d.scheme["Region Name"].replace(new RegExp(" ", "g"), "_"));})
        .attr("sub_region", function(d) {return (d.scheme == undefined ? "none" : d.scheme["Sub-region Name"].replace(new RegExp(" ", "g"), "_"));})
        .attr("id", function(d) { return d.properties.name.replace(new RegExp(" ", "g"), "_");})
        .attr("class", function(d) { return "country"; })
        .attr('d', geoGenerator)
        .attr('detail_level', 0)
        .on('mouseenter', disable_map_dblclick)
        .on('mouseout', enable_map_dblclick)
        .call(map_element_cc);

        path.node().parentNode.setAttribute("region", path.attr("region"));
        path.node().parentNode.setAttribute("sub_region", path.attr("sub_region"));
        path.node().parentNode.setAttribute("name", path.attr("id"));
    }

    for (key in sub_regions) {
      var sub_region = map_svg.append('g')
      .attr("category", "sub_region")
      .attr("selected", false)
      .attr("level", 2)
      .selectAll('path')
      .data(sub_regions[key].geometry);

      var path = sub_region.enter()
        .append('path')
        .attr("id", function(d) {return d.properties.name})
        .attr("region", function(d) {return d.properties.region})
        .attr("class", function(d) {return d.properties.name})
        .attr('d', geoGenerator)
        .on('mouseenter', disable_map_dblclick)
        .on('mouseout', enable_map_dblclick)
        .call(map_element_cc);;

        path.node().parentNode.setAttribute("region", path.attr("region"));
        path.node().parentNode.setAttribute("name", path.attr("id"));
    }

    for (key in continents) {
      var continent = map_svg.append('g')
      .attr("category", "region")
      .attr("level", 2)
      .attr("selected", false)
      .selectAll('path')
      .data(continents[key].geometry);

      var path = continent.enter()
        .append('path')
        .attr("id", function(d) {return d.properties.name})
        .attr("class",  function(d) {return d.properties.name})
        .attr('d', geoGenerator)
        .on('mouseenter', disable_map_dblclick)
        .on('mouseout', enable_map_dblclick)
        .call(map_element_cc);

        path.node().parentNode.setAttribute("name", path.attr("id"));
      }

      gg = map_svg.selectAll('g').data(map_svg.selectAll('g')._groups[0]);

      function sortGAfterIndex() {
        console.log("sort after index");
        gg.sort(function(a, b) {
          return a.getAttribute('index') - b.getAttribute('index');
        });
      }

      function indexGG() {
        i = 0
        gg.each(function(d) {
          d.setAttribute('index', i++);
        })
      }

      // indexGG()
      // .attr("d", geoGenerator)
      // .style('fill', '#B10000')
      // .style('fill-opacity', 0)
      // .style('stroke-width', 1)
      // .style('stroke', '#B10000')
      // .style('stroke-linejoin', 'round');
      // .style('fill': '#B10000', 'fill-opacity': 0.3)
  }

  update(geojson, sub_regions, continents);
}

function printStuff() {
  console.log("print stuff");
  allCountryPaths = d3.selectAll("path")
  .filter(function(d, i) {
    return this.parentNode.getAttribute('category') == 'country' && this.parentNode.getAttribute('region') == 'Africa';
  })

  ii = 0;
  collection = {
    "type": "FeatureCollection",
    "features": []
  }
  allCountryPaths.each(function(d, i) {
    console.log(this.parentNode.getAttribute('name'));
    e = d3.select(this)['_groups'][0][0]['__data__']
    delete e['scheme']
    collection.features.push(e);
    ii++;
  })
  console.log(ii);
  console.log(JSON.stringify(collection));
}

function clickcancel() {
  // we want to a distinguish single/double click
  // details http://bl.ocks.org/couchand/6394506
  var dispatcher = d3.dispatch('click', 'dblclick');
  function cc(selection) {
      var down, tolerance = 5, last, wait = null, args;
      // euclidean distance
      function dist(a, b) {
          return Math.sqrt(Math.pow(a[0] - b[0], 2), Math.pow(a[1] - b[1], 2));
      }
      selection.on('mousedown', function() {
          down = d3.mouse(document.body);
          last = +new Date();
          args = arguments;
      });
      selection.on('mouseup', function() {
          if (dist(down, d3.mouse(document.body)) > tolerance) {
              return;
          } else {
              if (wait) {
                  window.clearTimeout(wait);
                  wait = null;
                  dispatcher.apply("dblclick", this, args);
              } else {
                  wait = window.setTimeout((function() {
                      return function() {
                          dispatcher.apply("click", this, args);
                          wait = null;
                      };
                  })(), 300);
              }
          }
      });
  };
  // Copies a variable number of methods from source to target.
  var d3rebind = function(target, source) {
    var i = 1, n = arguments.length, method;
    while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
    return target;
  };

  // Method is assumed to be a standard D3 getter-setter:
  // If passed with no arguments, gets the value.
  // If passed with arguments, sets the value and returns the target.
  function d3_rebind(target, source, method) {
    return function() {
      var value = method.apply(source, arguments);
      return value === source ? target : value;
    };
  }
  return d3rebind(cc, dispatcher, 'on');
}

// var cc = clickcancel();
// d3.select('#map').call(cc);
// cc.on('click', function(d, index) {
//     d3.select('#map').text(d3.select('#map').text() + 'click, ');
// });
// cc.on('dblclick', function(d, index) {
//     d3.select('#map').text(d3.select('#map').text() + 'dblclick, ');
// });
