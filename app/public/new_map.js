var geojson_countries;
var geojson_continents = {};
var geojson_schemes = {};
var geoscheme = [];
var geoscheme_regions = [];
var geoscheme_sub_regions = [];
var selected_objects = [null, null]
var next_replace_index = 0; // helper for selected_objects
var x_rotation = -15;
var y_rotation = 0;
var z_rotation = 0;
var gg;
var projection = d3.geoMercator();
var geoGenerator
var width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

var max_homicide_country = null;
var max_homicide_sub_region;
var max_homicide_region;

var map_svg = d3.select('#content').append('svg')
      .attr('id', 'map')
      .attr("viewBox", "0 0 " + width + " " + height )
      .attr("preserveAspectRatio", "xMidYMid meet")
// var first_selection = d3.select('#selection1').append('svg')
//       .attr("viewBox", "0 0 " + width + " " + height )
//       .attr("preserveAspectRatio", "xMidYMid meet")
// var second_selection = d3.select('#selection2').append('svg')
//       .attr("viewBox", "0 0 " + width + " " + height )
//       .attr("preserveAspectRatio", "xMidYMid meet")

var color_config = {
  "region": {
    "fill": "white",
    "stroke": "gray"
  },
  "sub_region": {
    "fill": "gray",
    "stroke": "gray"
  },
  "country": {
    "fill": "white",
    "stroke": "gray"
  }
}

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

  // d3.csv("homicide0.csv").then(function(data0) {
  // set geoscheme for every country and count missing afterwards
  geojson_countries.features.forEach(function(d) {
    d.properties.name = d.properties.name.replace(new RegExp(" ", "g"), "_")
    setScheme(d, geoscheme)
    // setHomicide(d, data0)

    function setScheme(geojson_country, scheme) {
      scheme.forEach(function(d) {
        if (d["ISO-alpha3 Code"] === geojson_country.id) {
          geojson_country.scheme = d;
          geojson_country.properties.name = geojson_country.id;
          geojson_country.properties.sub_region = d["Sub-region Name"]
          geojson_country.properties.region = d["Region Name"]
          return;
        }
      })
    }

    // function setHomicide(geojson_country, homicide) {
    //   homicide.forEach(function(d) {
    //     if (d.ISO_A3 === geojson_country.id) {
    //       console.log(d);
    //       geojson_country.homicide = d;
    //       return;
    //     }
    //   })
    // }
  });


  drawMap(geojson_countries, geojson_schemes, geojson_continents);

// }) // csv

}).catch(function(error) {
  console.log(error);
})

function drawMap(geojson, sub_regions, continents) {
  layer = ["region", "sub_region", "country"]
  layer_index = 0;
  function changeLayer() {
    layer_index++
    show(layer[layer_index % layer.length]);
  }

  function getPreviousLayer() {
    return layer_index % 3 - 1 < 0 ? "world" : layer[layer_index % 3 - 1]
  }


  function getSecondLayer() {
    return layer[(layer_index+1) % 3];
  }

  function getCurrentLayer() {
    return layer[(layer_index) % 3];
  }

  function show(category) {
    gg = gg.sort(function(a, b) {
      return a.getAttribute("category") == category ? 1 : -1;
    })
  }

  projection.fitExtent([[0, 0], [width, height]], geojson);
  projection.rotate([x_rotation,y_rotation,z_rotation]);
  projection = projection.scale(305 * (width / 1920)) // hocus pocus

  geoGenerator = d3.geoPath()
    .projection(projection)


  function update(geojson, sub_regions, continents) {

    /* dblclick callbacks for map and map elements */
    function dblclick(d) {
      d3.selectAll("path")
        .filter(function(d, i) {
          return this.parentNode.getAttribute('category') == getCurrentLayer();
        })
        .each(function(d) {
          d3.select(this)
          .transition()
          .style("opacity", 0.5)
          .duration(1000)
        })

      d3.selectAll("path")
        .filter(function(d, i) {
          return this.parentNode.getAttribute('category') == getSecondLayer();
        })
        .each(function(d) {
          d3.select(this)
          .transition()
          .style("opacity", 1)
          .duration(1000)
        })

      setTimeout(function(){
         changeLayer();
      }, 500);
    }

    /* dblclick callbacks for map and map elements (region, country etc.) */
    var map_cc = clickcancel();
    map_cc.on('click', null);
    map_cc.on('dblclick', function(d, index) {
      dblclick(d)
    });

    /*
      prohibit dblclick event on map when mouse over map element to prevent map from changing layer twice
     */
    var enable_map_dblclick = function() {
      map_cc.on('dblclick', function(d, index) {
        dblclick(d)
      });
    };
    var disable_map_dblclick = function() {
      map_cc.on('dblclick', null);
    }
    map_svg.call(map_cc);

    var map_element_cc = clickcancel();
    map_element_cc.on('click', function(d, index) {
      name = ""
      sub_region = ""
      region = ""
      category = ""
      if (d.properties != undefined) {
        name = d.properties.name
        sub_region = d.properties.sub_region
        region = d.properties.region
      } else {
        name = d.getAttribute('name')
        sub_region = d.getAttribute('sub_region')
        region = d.getAttribute('region')
        category = d.getAttribute('category')
      }

      upper_name = d.getAttribute(getPreviousLayer());

      upper_layer_countries = null;

      upper_layer_countries = getCountriesForName(upper_name);

      selected_countries = getCountriesForName(name)
      value = {
        "category": d3.select(`[name=${name}]`).attr('category'),
        "name": name,
        "countries": selected_countries
      }

      upper_layer_value = {
        "category": d3.select(`[name=${upper_name}]`).attr('category'),
        "name": upper_name,
        "countries": upper_layer_countries
      }

      selection1 = selected_objects[0]
      selection2 = selected_objects[1]
      deselected_name = null
      drawLeft = false;
      drawRight = false;

      if (selection1 == null && selection2 == null) {
        // console.log("empty");
        selected_objects[selected_objects.indexOf(null)] = value
        drawLeft = true;
      } else if (selection1 != null && selection1.name != name && selection2 == null) {
        // console.log("two empty");
        selected_objects[selected_objects.indexOf(null)] = value
        drawRight = true;
      } else if (selection2 != null && selection2.name != name && selection1 == null) {
        // console.log("one empty");
        selected_objects[selected_objects.indexOf(null)] = value
        drawLeft = true
      } else if (selection1.name == name || selection2.name == name) {
        // console.log(name + " there");
        if (selection1.name == name) {
          // console.log("0");
          deselected_name = selected_objects[0].name
          selected_objects[0] = null;
        } else if (selection2.name == name) {
          // console.log("1");
          deselected_name = selected_objects[1].name
          selected_objects[1] = null;
        }
      } else {
        // console.log(name + " new");
        index = next_replace_index++ % 2
        if (index == 0) {
          drawLeft = true
        } else {
          drawRight = true;
        }
        deselected_name = selected_objects[index].name
        selected_objects[index] = value
      }
      // console.log(selected_objects);

      category = d3.select(`[name=${name}]`).attr('category');
      path = d3.select(`[name=${name}]`).select('path');
      selected = path.classed('selected')
      selected = path.classed('selected', !selected)
      selected = path.classed('selected')

      pathTransition = path.transition()
      if (selected) {
        if (drawLeft)
          pathTransition.style("stroke", "#083D77").duration(1000);
        if (drawRight)
          pathTransition.style("stroke", "#26532B").duration(1000);
        pathTransition.style("stroke-width", 5).duration(1000);
      } else {
        pathTransition.style("stroke", color_config[category].stroke).duration(1000);
        pathTransition.style("stroke-width", 1).duration(1000);
      }

      if (deselected_name != null) {
        deselected_category = d3.select(`[name=${deselected_name}]`).attr('category');
        deselected_path = d3.select(`[name=${deselected_name}]`).select('path');
        deselected_selected = deselected_path.classed('selected')
        deselected_selected = deselected_path.classed('selected', false)
        deselected_selected = deselected_path.classed('selected')
        deselected_pathTransition = deselected_path.transition()
        deselected_pathTransition.style("stroke", color_config[category].stroke).duration(1000);
        deselected_pathTransition.style("stroke-width", 1).duration(1000);
      }

      if (drawLeft) {
        d3.select("#country1").selectAll("*").remove();
        draw("#country1", selected_objects[0].name, value.countries, upper_name, upper_layer_value.countries)
      }
      if (drawRight) {
        d3.select("#country2").selectAll("*").remove();
        draw("#country2", selected_objects[1].name, value.countries, upper_name, upper_layer_value.countries)
      }

    });
    map_element_cc.on('dblclick', function(d, index) {
      dblclick(d)
    });

    // colorByHomicide();
    for (i = 0; i < geojson.features.length; i++) {
      var country = map_svg.append('g')
      .attr("category", "country")
      .attr("selected", false)
      .selectAll('path')
      .data([geojson.features[i]]);
      var path = country.enter()
        .append('path')
        .attr("region", function(d) { return (d.scheme == undefined ? "none" : d.scheme["Region Name"].replace(new RegExp(" ", "g"), "_"));})
        .attr("sub_region", function(d) {return (d.scheme == undefined ? "none" : d.scheme["Sub-region Name"].replace(new RegExp(" ", "g"), "_"));})
        .attr("id", function(d) {return d.properties.name;})
        .attr("class", function(d) { return "country"; })
        .attr('d', geoGenerator)
        .on('mouseenter', disable_map_dblclick)
        .on('mouseout', enable_map_dblclick)
        .style("fill", color_config.country.fill)//function(d) {return d.homicide != undefined ? "rgb(" + (isNaN(d.homicide[year]) ? 0 : d.homicide[year] /50*255)+",0,0)" : })
        .style("stroke", color_config.country.stroke)
        .style("opacity", 0.5)
        // .call(map_element_cc);

        path.node().parentNode.setAttribute("region", path.attr("region"));
        path.node().parentNode.setAttribute("sub_region", path.attr("sub_region"));
        path.node().parentNode.setAttribute("name", path.attr("id"));
    }

    for (key in sub_regions) {
      var sub_region = map_svg.append('g')
      .attr("category", "sub_region")
      .attr("selected", false)
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
        .style("fill", color_config.sub_region.fill)
        .style("stroke", color_config.sub_region.stroke)
        .style("opacity", 0.5)
        // .call(map_element_cc);;

        path.node().parentNode.setAttribute("region", path.attr("region"));
        path.node().parentNode.setAttribute("name", path.attr("id"));
    }

    for (key in continents) {
      var continent = map_svg.append('g')
      .attr("category", "region")
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
        .style("fill", color_config.region.fill)
        .style("stroke", color_config.region.stroke)
        .style("opacity", 1)
        .style("stroke-width", 1)
        // .call(map_element_cc);

        path.node().parentNode.setAttribute("name", path.attr("id"));
      }

      colorByHomicide(map_element_cc)

      gg = map_svg.selectAll('g').data(map_svg.selectAll('g')._groups[0]);

      function sortGAfterIndex() {
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

function getCountriesForName(name) {
  selection = d3.selectAll(`g[name=${name}]`);
  category = selection.attr('category');
  selection = d3.selectAll(`g[category=country]`);
  countries = [];

  if (category == 'country') {
    return [name];
  }

  selection.filter(function(d) {
    if (this.getAttribute(category) == name) {
      countries.push(this.getAttribute('name'))
    }
  });

  return countries;
}

// function homicideCountry() {
//   all_countries = []
//   geojson_countries.features
//   .forEach(function(d) {
//     if (d.properties.sub_region != undefined) {
//         for (key in geojson_schemes)
//           if (key == d.properties.sub_region.replace(new RegExp(" ", "g"), "_")) {
//             all_sub_regions[key].push(d.id)
//           }
//         for (key in geojson_continents)
//           if (key == d.properties.region) {
//             all_regions[key].push(d.id)
//           }
//         }
//     all_countries.push(d.id)
//   });
//
//   pr_c = []
//   all_countries.forEach(function(d) {
//     pr_c.push(getHomicideData([d]))
//   })
//
//   return Promise.all(pr_c)
//
// }

function colorByHomicide(map_element_cc) {

  all_countries = []
  all_sub_regions = {}
  all_regions = {}

  for (key in geojson_schemes)
    all_sub_regions[key] = []
  for (key in geojson_continents)
    all_regions[key] = []

  geojson_countries.features
  .forEach(function(d) {
    if (d.properties.sub_region != undefined) {
        for (key in geojson_schemes)
          if (key == d.properties.sub_region.replace(new RegExp(" ", "g"), "_")) {
            all_sub_regions[key].push(d.id)
          }
        for (key in geojson_continents)
          if (key == d.properties.region) {
            all_regions[key].push(d.id)
          }
        }
    all_countries.push(d.id)
  });
  pr_c = []
  all_countries.forEach(function(d) {
    pr_c.push(getHomicideData([d]))
  })

  Promise.all(pr_c).then(data => {
    countries = {}
    values = []
    i = 0
    data.forEach(function(d) {
      val = d[0] != undefined ? d[0].value : null
      values.push(val)
      countries[all_countries[i++]] = val
    })
    max_homicide_country=Math.max(...values);
    //console.log("Country Max: " + max_homicide_country);
    map_svg.selectAll('g[category=country]').select('path').each(function(d) {
      d3.select(this).transition().style("fill", function(d) {
        red = countries[d.getAttribute('name')] /max_homicide_country
        red_value = 255 - red * 255
       // console.log(d.getAttribute('name'));
       // console.log(countries[d.getAttribute('name')]);
        //console.log(red);
        return `rgb(255, ${red_value}, ${red_value})`;
      }).duration(2000)
    })
  })

  pr_sr = []
  for (key in all_sub_regions)
    pr_sr.push(getHomicideData(all_sub_regions[key]));
  Promise.all(pr_sr).then(data => {
    values = []
    i = 0
    keys = Object.keys(all_sub_regions);
    data.forEach(function(d) {
      val = d[0] != undefined ? d[0].value : null
      values.push(val)
      all_sub_regions[keys[i++]] = val
    })
    max_homicide_sub_region=Math.max(...values);
    //console.log("Sub Region Max: " + max_homicide_sub_region);
    map_svg.selectAll('g[category=sub_region]').select('path').each(function(d) {
      d3.select(this).transition().style("fill", function(d) {
        red = all_sub_regions[d.getAttribute('name')] /max_homicide_sub_region
        red_value = 255 - red * 255
        //console.log(d.getAttribute('name'));
        //console.log(all_sub_regions[d.getAttribute('name')]);
        //console.log(red);
        return `rgb(255, ${red_value}, ${red_value})`;
      }).duration(2000)
    })
  })

  pr_r = []
  for (key in all_regions)
    pr_r.push(getHomicideData(all_regions[key]));
  Promise.all(pr_r).then(data => {
    values = []
    i = 0
    keys = Object.keys(all_regions);
    data.forEach(function(d) {
      val = d[0] != undefined ? d[0].value : null
      values.push(val)
      all_regions[keys[i++]] = val
    })
    max_homicide_region=Math.max(...values);
    //console.log("Region Max: " + max_homicide_region);
    map_svg.selectAll('g[category=region]').select('path').each(function(d) {
      d3.select(this).transition().style("fill", function(d) {
        red = all_regions[d.getAttribute('name')] /max_homicide_region
        red_value = 255 - red * 255
        //console.log(d.getAttribute('name'));
        //console.log(all_regions[d.getAttribute('name')]);
        //console.log(red);
        return `rgb(255, ${red_value}, ${red_value})`;
      }).duration(2000)
    })

    // console.log(Object.keys(all_regions));
    // for (key in all_regions) {
    //   console.log(key);
    //   console.log(all_regions[key]);
    //   getHomicideData(all_regions[key]).then(function(d) {
    //     console.log(key + ": " + d[0].value);
    //   });
    // }

    map_svg.selectAll('path').call(map_element_cc)
  })

}

function printStuff() {
  //console.log("print stuff");
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
    //console.log(this.parentNode.getAttribute('name'));
    e = d3.select(this)['_groups'][0][0]['__data__']
    delete e['scheme']
    collection.features.push(e);
    ii++;
  })
  //console.log(JSON.stringify(collection));
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

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

// getHomicideData(['UGA', 'EST']).then(data => {
//   //Use data here
//   console.log(data)
// })
