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
  "Micronesia.geojson",
  "Northern_Africa.geojson",
  "Northern_America.geojson",
  "Northern_Europe.geojson",
  "Polynesia.geojson",
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

   console.log(geojson_continents);
  for(key in geojson_schemes) {
    s = geojson_schemes[key].geometry[0];
    setScheme(s, geoscheme)
    function setScheme(sub_region, scheme) {
      scheme.forEach(function(d) {
        if(s.properties.name == d["Sub-region Name"].replace(new RegExp(" ", "g"), "_")) {
          console.log("match");
          sub_region.properties.region = d["Region Name"].replace(new RegExp(" ", "g"), "_");
          return;
        }
      })
    }
  }
  console.log(geojson_schemes);

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
 // console.log(geojson);
  var zoom = d3.zoom()
         .scaleExtent([1, 20])
         .on("zoom", zoomed);

  // append svg to parent div container
  var map_svg = d3.select('#content').append('svg')
        .attr('id', 'map')
        .attr("viewBox", "0 0 " + width + " " + height )
        .attr("preserveAspectRatio", "xMinYMin")
        .on("click", function() {
          console.log("hello");
        })
        .on('dblclick', function() {
          console.log("world");
          changeLayer();
        })

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
    // second_layer = "";
    // i = 0;
    // gg.each(function(d) {
    //   // console.log(d);
    //   if (d.getAttribute('category') != layer[layer_index]) {
    //     if (i++ > 0)
    //       second_layer = d.getAttribute('category')
    //   };
    // })
    console.log("second_layer: " + layer[(layer_index+1) % 3]);
  }

        /*map_svg.call(zoom)
        .on("dblclick.zoom", null)
        .on("wheel.zoom", null);
        .on("mousedown.zoom", null)
        .on("touchstart.zoom", null)
        .on("touchmove.zoom", null)
        .on("touchend.zoom", null);*/

  // append g to svg
  var gS = []
  var rS = [];

  // var g = map_svg.append('g').attr('class', 'map');
  // high row
  // gS.push(map_svg.append('g')
  // .attr("width", width)
  // .attr("height", height)
  // .attr('class', 'map')
  // .attr('transform', `translate(0,0) scale(1)`));
  // var g_africa = map_svg.append('g')
  // .attr("width", width)
  // .attr("height", height)
  // .attr('class', 'map')
  // .attr('transform', `translate(0,0) scale(1)`);
  //
  // var g_europe = map_svg.append('g')
  // .attr("width", width)
  // .attr("height", height)
  // .attr('class', 'map')
  // .attr('transform', `translate(0,0) scale(1)`);
/*   gS.push(map_svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'map')
  .attr('transform', `translate(${width},0) scale(1)`));
  gS.push(map_svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'map')
  .attr('transform', `translate(${2*width},0) scale(1)`));

  // middle row
  gS.push(map_svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'map')
  .attr('transform', `translate(0,${height}) scale(1)`));
  gS.push(map_svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'map')
  .attr('transform', `translate(${width},${height}) scale(1)`));
  gS.push(map_svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'map')
  .attr('transform', `translate(${2*width},${height}) scale(1)`));

  // low row
  gS.push(map_svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'map')
  .attr('transform', `translate(0,${2*height}) scale(1)`));
  gS.push(map_svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'map')
  .attr('transform', `translate(${width},${2*height}) scale(1)`));
  gS.push(map_svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'map')
  .attr('transform', `translate(${2*width},${2*height}) scale(1)`));
    var g = map_svg.append('g').attr('class', 'map');

  gS[0].append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    // .attr("fill", "yellow")
    .on("mouseover", function() {
    console.log(d3.select(this).node().parentNode.getAttribute("val"));
  });
  gS[1].append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    // .attr("fill", "pink")
    .on("mouseover", function() {
      console.log(d3.select(this).node().parentNode.getAttribute("val"));
    });
  gS[2].append("rect")
    .attr("width", "100%")
    .attr("height", "100%")
    // .attr("fill", "black")
    .on("mouseover", function() {
      console.log(d3.select(this).node().parentNode.getAttribute("val"));
    });

    gS[5].append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      // .attr("fill", "yellow")
      .on("mouseover", function() {
      console.log(d3.select(this).node().parentNode.getAttribute("val"));
    });
    gS[4].append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      // .attr("fill", "pink")
      .on("mouseover", function() {
        console.log(d3.select(this).node().parentNode.getAttribute("val"));
      });
    gS[3].append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      // .attr("fill", "black")
      .on("mouseover", function() {
        console.log(d3.select(this).node().parentNode.getAttribute("val"));
      });

    gS[8].append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      // .attr("fill", "yellow")
      .on("mouseover", function() {
      console.log(d3.select(this).node().parentNode.getAttribute("val"));
    });
    gS[6].append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      // .attr("fill", "pink")
      .on("mouseover", function() {
        console.log(d3.select(this).node().parentNode.getAttribute("val"));
      });
    gS[7].append("rect")
      .attr("width", "100%")
      .attr("height", "100%")
      // .attr("fill", "black")
      .on("mouseover", function() {
        console.log(d3.select(this).node().parentNode.getAttribute("val"));
      });*/

  for (i = 0; i < gS.length; i++) {
    gS[i].attr("val", i);
  }

  var projection = d3.geoMercator();

    projection.fitExtent([[0, 0], [width, height]], geojson);
    projection.rotate([x_rotation,y_rotation,z_rotation]);
  var geoGenerator = d3.geoPath()
    .projection(projection)

  function rotateMap(endX) {
        console.log("rotate:" + x_rotation + " | endX: " + endX + " | initX: " + initX);
         projection.rotate([x_rotation + (endX - initX) * 360 / (s * width),y_rotation,z_rotation])
         for (i = 0; i < gS.length; i++) {
           g = gS[i];
             g.selectAll('path')       // re-project path data
            .attr('d', geoGenerator);
          }
  }

  function zoomed() {
    // for (i = 0; i < gS.length; i++) {
      // g = gS[i];
    // g.style("stroke-width", 1.5 / d3.event.transform.k + "px");

    // g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // not in d3 v4
    console.log(d3.event);
      t = d3.event.transform;
      t.x = t.x % (2 *width * d3.event.transform.k);
      t.y = t.y % (2 *height * d3.event.transform.k);
      h2 = {"k": t.k, "x": t.x, "y": t.y};
      h1 = {"k": t.k, "x": t.x, "y": t.y};
      h0 = {"k": t.k, "x": t.x, "y": t.y};

      m2 = {"k": t.k, "x": t.x, "y": t.y};
      m1 = {"k": t.k, "x": t.x, "y": t.y};
      m0 = {"k": t.k, "x": t.x, "y": t.y};

      l2 = {"k": t.k, "x": t.x, "y": t.y};
      l1 = {"k": t.k, "x": t.x, "y": t.y};
      l0 = {"k": t.k, "x": t.x, "y": t.y};
      // drag
      if (d3.event.sourceEvent instanceof WheelEvent) {
        /* h0.x = h0.x * d3.event.transform.k;
        h1.x = h1.x + width * d3.event.transform.k;
        h2.x = h2.x + 2 * width * d3.event.transform.k;
        m0.x = m0.x * d3.event.transform.k;
        m1.x = m1.x + width * d3.event.transform.k;
        m2.x = m2.x + 2 * width * d3.event.transform.k;
        l0.x = l0.x * d3.event.transform.k;
        l1.x = l1.x + width * d3.event.transform.k;
        l2.x = l2.x + 2 * width * d3.event.transform.k;

        h0.y = h0.y * d3.event.transform.k;
        h1.y = h1.y + height * d3.event.transform.k;
        h2.y = h2.y + 2 * height * d3.event.transform.k;
        m0.y = m0.y * d3.event.transform.k;
        m1.y = m1.y + height * d3.event.transform.k;
        m2.y = m2.y + 2 * height * d3.event.transform.k;
        l0.y = l0.y * d3.event.transform.k;
        l1.y = l1.y + height * d3.event.transform.k;
        l2.y = l2.y + 2 * height * d3.event.transform.k;*/
      } else if (d3.event.sourceEvent instanceof MouseEvent) {
        h0.x = t.x > (2 * width) ? (t.x - 3 * width) : (t.x);
        /* h1.x = t.x + width > (2 * width) ? (t.x - 2 * width) : (t.x + width);
        h2.x = (t.x + 2 * width) > (2 * width) ? (t.x - width) : (t.x + 2 * width);

        m0.x = t.x > (2 * width) ? (t.x - 3 * width) : (t.x);
        m1.x = t.x + width > (2 * width) ? (t.x - 2 * width) : (t.x + width);
        m2.x = (t.x + 2 * width) > (2 * width) ? (t.x - width) : (t.x + 2 * width);
        m0.y = t.y + height > (2 * height) ? (t.y - 2 * height) : (t.y + height);
        m1.y = m2.y = m0.y;

        l0.x = t.x > (2 * width) ? (t.x - 3 * width) : (t.x);
        l1.x = t.x + width > (2 * width) ? (t.x - 2 * width) : (t.x + width);
        l2.x = (t.x + 2 * width) > (2 * width) ? (t.x - width) : (t.x + 2 * width);
        l0.y = (t.y + 2 * height) > (2 * height) ? (t.y - height) : (t.y + 2 * height);
        l1.y = l2.y = l0.y; */
      }

      if (d3.event.sourceEvent instanceof WheelEvent || d3.event.sourceEvent instanceof MouseEvent && t.k === 1.0) {
        gS[0].attr("transform", `translate(${h0.x},${h0.y}) scale(${h0.k})`); // updated for d3 v4
        /* gS[1].attr("transform",  `translate(${h1.x},${h1.y}) scale(${h1.k})`); // updated for d3 v4
        gS[2].attr("transform",  `translate(${h2.x},${h2.y}) scale(${h2.k})`); // updated for d3 v4

        gS[3].attr("transform", `translate(${m0.x},${m0.y}) scale(${m0.k})`); // updated for d3 v4
        gS[4].attr("transform",  `translate(${m1.x},${m1.y}) scale(${m1.k})`); // updated for d3 v4
        gS[5].attr("transform",  `translate(${m2.x},${m2.y}) scale(${m2.k})`); // updated for d3 v4

        gS[6].attr("transform", `translate(${l0.x},${l0.y}) scale(${l0.k})`); // updated for d3 v4
        gS[7].attr("transform",  `translate(${l1.x},${l1.y}) scale(${l1.k})`); // updated for d3 v4
        gS[8].attr("transform",  `translate(${l2.x},${l2.y}) scale(${l2.k})`); // updated for d3 v4 */
      }

  }

  function reset() {
    active.classed("active", false);
    active = d3.select(null);

    map_svg.transition()
        .duration(750)
        // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
        .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
  }

  function update(geojson, sub_regions, continents) {
    // for (i = 0; i < gS.length; i++) {
    //   g = gS[i];
    var lastClick = +new Date();
      console.log(continents);
      t = textures.lines().heavier();
      console.log(t);
      mouseover_allowed = true
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
          // .attr("class", function(d) { return "sub_region " + (d.scheme == undefined ? "none" : d.scheme["Region Name"].replace(new RegExp(" ", "g"), "_"));})
          .attr("class", function(d) { return "country"; })
          .attr('d', geoGenerator)
          .attr('detail_level', 0)
          .on('click', function(d) {
              selected = d3.select(this).classed('selected')
              d3.select(this).classed('selected', !selected)
          })
          // .on("dblclick",function(d){
          //   console.log("node was double clicked");
          //   changeLayer();
          // });

          // .on('mouseenter', function(d) {
          //   console.log(d.properties.name + " mouseenter");
          //   d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name, true)
          // })
          // .on('mouseout', function(d) {
          //   console.log(d.properties.name + " mouseout");
          //   d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name, false)
          //   // mouseover_allowed = !mouseover_allowed;
          //   // sortGAfterIndex();
          // })
          // .on('mouseover', function(d) {
          //   d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name, true)
          //   if (mouseover_allowed && (d3.select(this).classed('selected') == true)) {
          //     console.log(d.properties.name + " mouseover");
          //     name = this.parentNode.getAttribute("name")
          //     indexGG();
          //     sortGAfterSelection(name);
          //     // mouseover_allowed = !mouseover_allowed;
          //   } else {
          //     console.log(d.properties.name + " mouseover false");
          //   }
          // })
          // .on('click', function(d) {
          //   console.log(d.properties.name + " click");
          //   d3.select(this.parentNode).attr("level", 0) // set g attr
          //   d3.select("[name="+this.parentNode.getAttribute("sub_region")+"]").attr("level", 0);
          //   d3.select("[name="+this.parentNode.getAttribute("region")+"]").attr("level", 0);
          //   d3.select(this.parentNode).attr("selected", true)
          //   d3.select('#' + d.properties.sub_region).node().parentNode.setAttribute("level", 0)
          //   d3.select('#' + d.properties.sub_region).node().parentNode.setAttribute("selected", false)
          //
          //   setLevelIdentifier([d3.select(this),
          //     d3.select("[name="+this.parentNode.getAttribute("sub_region")+"]"),
          //     d3.select("[name="+this.parentNode.getAttribute("region")+"]")], this.parentNode.getAttribute("region"))
          //
          //   // d3.select('#' + d.properties.sub_region).classed("selected", false)
          //   d3.select(this).classed('mouseover_' + d.properties.name, false)
          //   selected = d3.select(this).classed('selected')
          //   d3.select(this).classed('selected', !selected)
          //
          //   // if (d3.select(this).classed('selected') == false)
          //     // sortTest("region", this.parentNode.getAttribute("region"));
          //   sortTest("sub_region", this.parentNode.getAttribute("sub_region"));
          //   // sortGAfterLevel(this.parentNode.getAttribute("category"), this.parentNode.getAttribute("name"))
          //   // d3.select(this).on('mouseout', sortGAfterSelection)
          // }) //->statistics.js

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

        sub_region.call(t)
        var path = sub_region.enter()
          .append('path')
          .attr("id", function(d) {return d.properties.name})
          .attr("region", function(d) {return d.properties.region})
          .attr("class", function(d) {return d.properties.name})
          .attr('d', geoGenerator)
          .on('click', function(d) {
              selected = d3.select(this).classed('selected')
              d3.select(this).classed('selected', !selected)
          })
          // .on("dblclick",function(d){
          //   console.log("node was double clicked");
          //   changeLayer();
          // });

          // .on('mouseenter', function(d) {
          //   console.log(d.properties.name + " mouseenter");
          //   d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name, true)
          // })
          // .on('mouseout', function(d) {
          //   console.log(d.properties.name + " mouseout");
          //   d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name, false)
          //   // mouseover_allowed = !mouseover_allowed;
          //   sortGAfterIndex();
          // })
          // .on('mouseover', function(d) {
          //   d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name, true)
          //   if (mouseover_allowed && (d3.select(this).classed('selected') == true)) {
          //     console.log(d.properties.name + " mouseover");
          //     name = this.parentNode.getAttribute("name")
          //     indexGG();
          //     sortGAfterSelection(name);
          //     // mouseover_allowed = !mouseover_allowed;
          //   } else {
          //     console.log(d.properties.name + " mouseover false");
          //   }
          // })
          // .on('click', function(d) {
          //
          //   console.log(d.properties.name + " click");
          //   d3.select(this.parentNode).attr("level", 1)
          //   d3.select("[name="+this.parentNode.getAttribute("region")+"]").attr("level", 1);
          //   d3.select(this.parentNode).attr("selected", true)
          //   d3.select('#' + d.properties.region).node().parentNode.setAttribute("level", 1)
          //   d3.select('#' + d.properties.region).node().parentNode.setAttribute("selected", false)
          //
          //   setLevelIdentifier([d3.select(this), d3.select("[name="+this.parentNode.getAttribute("region")+"]")], this.parentNode.getAttribute("region"))
          //
          //   // d3.select('#' + d.properties.region).classed("selected", false)
          //   d3.select(this).classed('mouseover_' + d.properties.name, false)
          //   selected = d3.select(this).classed('selected')
          //   d3.select(this).classed('selected', !selected) // first click => true, second click => false
          //   // con = d3.select("g[region="+this.getAttribute('region')+"]");
          //   // con.attr("selected", !con.attr('selected'));
          //   // d3.select("path[region="+this.getAttribute('region')+"]").classed('selected', !d3.select("path[region="+this.getAttribute('region')+"]"))
          //   // if (d3.select(this).classed('selected') == false)
          //     sortTest("region", this.parentNode.getAttribute("region"));
          //   // sortGAfterLevel("region"/*this.parentNode.getAttribute("category")*/, this.parentNode.getAttribute("region"))
          //   // d3.select(this).on('mouseout', sortGAfterSelection)
          // })
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

        continent.call(t)
        var path = continent.enter()
          .append('path')
          .attr("id", function(d) {return d.properties.name})
          .attr("class",  function(d) {return d.properties.name})
          .attr('d', geoGenerator)
          .on('click', function(d) {
              selected = d3.select(this).classed('selected')
              d3.select(this).classed('selected', !selected)
          })
          // .on("dblclick",function(d){
          //   console.log("node was double clicked");
          //   changeLayer();
          // });

          // .on('mouseenter', function(d) {
          //   console.log(d.properties.name + " mouseenter");
          //   d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name, true)
          // })
          // .on('mouseout', function(d) {
          //   console.log(d.properties.name + " mouseout");
          //   d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name, false)
          //   console.log(d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name));
          //   d3.select("g[region="+name+"]").attr("level", 2);
          //   // console.log(d3.select("g[region="+name+"]").attr("level"));
          //   d3.select("g[sub_region="+name+"]").attr("level", 2);
          //   sortGAfterIndex()
          //   mouseover_allowed = !mouseover_allowed;
          // })
          // .on('mouseover', function(d) {
          //   d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name, true)
          //   if (mouseover_allowed && (d3.select(this).classed('selected') == true)) {
          //     console.log(d.properties.name + " mouseover");
          //     name = this.parentNode.getAttribute("name")
          //     indexGG();
          //     sortGAfterSelection(name);
          //     // mouseover_allowed = !mouseover_allowed;
          //   } else {
          //     console.log(d.properties.name + " mouseover false");
          //   }
          //
          //   console.log(d3.select("#" + d.properties.name).classed('mouseover_' + d.properties.name));
          // })
          // .on('click', function(d) {
          //   console.log(d.properties.name + " click");
          //   d3.select(this.parentNode).attr("selected", true)
          //   d3.select(this).classed('mouseover_' + d.properties.name, false)
          //   selected = d3.select(this).classed('selected')
          //   d3.select(this).classed('selected', !selected)
          //   // if (d3.select(this).classed('selected') == false)
          //   //   sortTest("region", this.parentNode.getAttribute("region"));
          //     // .on('mouseout', function() {
          //     //   sortGAfterIndex();
          //     // })
          //   // d3.select(this).on('click', sortGAfterSelection)
          // })

          path.node().parentNode.setAttribute("name", path.attr("id"));
          // console.log(path.node().parentNode.getAttribute("sub_region", path.attr("id")) != null);
        }
          // .style('fill', "url(#circles-1)")
          // .style('fill-opacity', 0)
          // .append(t.url())
          // .style('stroke-width', 1)
          // .style('stroke', '#B10000')
          // .style('stroke-linejoin', 'round');

          // var pattern = continent.enter().append("defs")
        	// .append("pattern")
        	// 	.attr("id", "hash4_4")
        	// 	.attr("width",8)
        	// 	.attr("height",8)
        	// 	.attr("patternUnits","userSpaceOnUse")
        	// 	.attr("patternTransform","rotate(60)")
        	// .append("rect")
        	// 	.attr({ width:"4", height:"8", transform:"translate(0,0)", fill:"#88AAEE" });
      // console.log(geojson.features );


      // var u = g
      //   .attr("category", "country")
      //   .attr("selected", "false")
      //   .selectAll('path')
      //   .data(geojson.features);
      //
      // u.enter()
      //   .append('path')
      //   .attr("region", function(d) { return (d.scheme == undefined ? "none" : d.scheme["Region Name"].replace(new RegExp(" ", "g"), "_"));})
      //   .attr("sub_region", function(d) {return (d.scheme == undefined ? "none" : d.scheme["Sub-region Name"].replace(new RegExp(" ", "g"), "_"));})
      //   .attr("id", function(d) { return d.properties.name.replace(new RegExp(" ", "g"), "_");})
      //   .attr("class", function(d) { return "sub_region " + (d.scheme == undefined ? "none" : d.scheme["Region Name"].replace(new RegExp(" ", "g"), "_"));})
      //   .attr('d', geoGenerator)
      //   .attr('detail_level', 0)
      //   .on('mouseenter', function(d) {highlightRegion(this);})
      //   .on('mouseout', function(d) {resetRegion(this);})
      //   .on('click',function(d) {
      //     console.log(d.properties.name);
      //     // changeDetailLevel(this);
      //     clickRegion();
      //   }); //->statistics.js
        //.on('click', zoomIn);


        gg = map_svg.selectAll('g').data(map_svg.selectAll('g')._groups[0]);
        // var previous_gg = map_svg.selectAll('g').data(map_svg.selectAll('g')._groups[0]);


        function setLevelIdentifier(ls, level_identifier) {
          ls.forEach(function(d) {
            d.attr("level_identifier", level_identifier)
          })
        }

        function sortTest(category, name) {
          indexGG()
          gg = gg.sort(function(a, b) {
            a_criteria = a.getAttribute(category);
            if (a_criteria == null)
              a_criteria = a.getAttribute("name");
            return a_criteria == name ? -1 : 1;
          }).sort(function(a, b) {
            a_criteria = a.getAttribute(category);
            if (a_criteria == null)
              a_criteria = a.getAttribute("name");
            b_criteria = b.getAttribute(category);
            if (b_criteria == null)
              b_criteria = b.getAttribute("name");

            if (a_criteria == name && b_criteria == name)
              return a.getAttribute('index') - b.getAttribute('index');
            else
              return 0;
          }).sort(function(a, b) {
            level_config = [{
              "region": 1,
              "sub_region": 0,
              "country": 2
            },
            {
              "region": 0,
              "sub_region": 2,
              "country": 1
            },
            {
              "region": 2,
              "sub_region": 1,
              "country": 0
            }]
            config2 = level_config[+a.getAttribute('level')]
            return (config2[a.getAttribute('category')] - config2[b.getAttribute('category')])
          })
        }


        function sortGAfterLevel(category, name) {
          config = {
            "true": 0,
            "false": 1
          }

          level_config = [{
            "region": 1,
            "sub_region": 0,
            "country": 2
          },
          {
            "region": 0,
            "sub_region": 2,
            "country": 1
          },
          {
            "region": 2,
            "sub_region": 1,
            "country": 0
          }]
          console.log("sort after level");
          // indexGG()
          console.log("before name");
          gg.each(function(d) {
            console.log(d);
          })
          gg.sort(function(a, b) {
            a == null;
            return -1;
          });

          console.log("name");
          gg.each(function(d) {
            console.log(d);
          })

          // sortGAfterIndexRelativeToName(category, name);

          // console.log("relative to name");
          // gg.each(function(d) {
          //   console.log(d);
          // })

          // gg.sort(function(a, b) {
          //   config2 = level_config[+a.getAttribute('level')]
          //   return (config2[a.getAttribute('category')] - config2[b.getAttribute('category')])
          // })
          // console.log("end");
          // gg.each(function(d) {
          //   console.log(d);
          // })
          // indexGG()
        }

        function sortGAfterSelection(name) {
          console.log("sort after selection name");
          gg.sort(function(a, b) {
            return a.getAttribute("name") == name ? -1 : 1;
          });
        }

        function sortGAfterIndex() {
          console.log("sort after index");
          gg.sort(function(a, b) {
            return a.getAttribute('category') == "country" ? 1 : -1;
            // return a.getAttribute('index') - b.getAttribute('index');
          });
        }

        function sortGAfterIndexRelativeToName(category, name) {
          console.log("sort after index relative to name");
          gg.sort(function(a, b) {
            a_criteria = a.getAttribute('name');
            b_criteria = b.getAttribute('name');;
            if (a_criteria != category) {
              a_criteria = a.getAttribute(category)
            }

            if (b_category != category) {
              b_criteria = b.getAttribute(category);
            }

            if (a_criteria == name && b_criteria == name)
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

        // console.log(map_svg.selectAll('g'));
        // console.log(map_svg.selectAll('g')._groups[0]);
        // var gg = map_svg.selectAll('g').data(map_svg.selectAll('g')._groups[0]);
        // gg.sort(function(a, b) {
        //   config = {
        //     "continent": 0,
        //     "sub_region": 1,
        //     "country": 2
        //   }
        //   console.log(a.getAttribute('category'));
        //   console.log(a.getAttribute('category') +  '-' + b.getAttribute('category') + '=' + (config[a.getAttribute('category')] - config[b.getAttribute('category')]));
        //   return (config[a.getAttribute('category')] - config[b.getAttribute('category')]);
        // });

        // map_svg.append("path")
        // .datum(
        //   geojson_continents["Europe"].geometry
        //   // {type: "LineString", coordinates:
        //   //       line.geometry.coordinates
        //   //       // line.geometry.coordinates.concat(line2.geometry.coordinates)
        //   //       // [[-5, 40], [-5, 50], [10, 50], [10, 40], [-5, 40]] // points in decimal degrees
        //   //      }
        //      )
        // .attr("d", geoGenerator)
        // .style('fill', '#B10000')
        // .style('fill-opacity', 0)
        // .style('stroke-width', 1)
        // .style('stroke', '#B10000')
        // .style('stroke-linejoin', 'round');
        // .style('fill': '#B10000', 'fill-opacity': 0.3)

      function changeDetailLevel(c) {
        var country = d3.select(c);
        var detail_level = country.attr('detail_level');
        var new_detail_level = (detail_level + 1) % 3;
        detail_level_config = ["[region=" + country.attr("region") + "]", "[sub_region=" + country.attr("sub_region") + "]", "#" + country.attr("id")];
        console.log(detail_level_config[detail_level]);
        resetRegion(c);
        var prev = (detail_level - 1) < 0 ? 2 : detail_level - 1;
        var selection;
        if (prev === 0) {
          selection = d3.selectAll("[region=" + country.attr("region") + "]");
        } else if (prev === 1) {
          selection = d3.selectAll("[sub_region=" + country.attr("sub_region") + "]");
        } else if (prev === 2) {
          selection = d3.select("#" + country.attr("id"));
        }
        selection.each(function(d, i) {
          if (active.includes(this)) {
            console.log(d3.select(active[active.indexOf(this)]).attr('id') + ' in ' + detail_level_config[prev]);
            active.splice(active.indexOf(this), 1) // remove elem
            console.log(active.includes(this));
            d3.select(this).classed('selected', false);
          }
        })
        d3.selectAll(detail_level_config[detail_level]).each(function(d, i) {
          if (!active.includes(active[i])) {
              active.push(this);
              d3.select(this).classed('selected', true);
          }
          d3.select(this).attr('detail_level', new_detail_level);
        })
        // country.attr('detail_level', detail_level);
        setTimeout(function() { highlightRegion(c); }, 100);
        // console.log(d3.selectAll(detail_level_config[detail_level]).attr('detail_level'));
      }
      function highlightRegion(thiss) {
        // var sub_region = d3.select(thiss).attr("class").split(" ")[1];
        detail_level_config = ["[region=" + d3.select(thiss).attr("region") + "]", "[sub_region=" + d3.select(thiss).attr("sub_region") + "]", "#" + d3.select(thiss).attr("id")];
        // d3.selectAll(detail_level_config[+d3.select(thiss).attr("detail_level")]).classed('mouseover', true);
        d3.selectAll(detail_level_config[+d3.select(thiss).attr("detail_level")])
          .each(function(d) {
            var level_config = ['region', 'sub_region', 'id']
            var node = d3.select(this);
            var lvl = (+node.attr("detail_level")) % 3;
            node.classed('mouseover_' + node.attr(level_config[lvl]), true);
          })
      }

      function resetRegion(thiss) {
        // var sub_region = d3.select(thiss).attr("class").split(" ")[1];
        detail_level_config = ["[region=" + d3.select(thiss).attr("region") + "]", "[sub_region=" + d3.select(thiss).attr("sub_region") + "]", "#" + d3.select(thiss).attr("id")];
        // d3.selectAll(detail_level_config[+d3.select(thiss).attr("detail_level")]).classed('mouseover', false);
        d3.selectAll(detail_level_config[+d3.select(thiss).attr("detail_level")])
          .each(function(d) {
            var level_config = ['region', 'sub_region', 'id']
            var node = d3.select(this);
            var lvl = (+node.attr("detail_level")) % 3;
            node.classed('mouseover_' + node.attr(level_config[lvl]), false);
          })
      }

      function zoomIn(d) {
        if (active.node() === this) return reset();
        active.classed("active", false);
        active = d3.select(this).classed("active", true);
        if (level === 0) {
          var obj = {
            "type": "Feature",
            "geometry": geojson_continents[active.attr("region")].geometry[0]
          }
        } else if (level === 1) {
          var obj = {
            "type": "Feature",
            "geometry": geojson_schemes[active.attr("sub_region")].geometry[0]
          }
        } else if (level === 2) {
          obj = d;
        }

        level = ((level++) % 3);

        var bounds = geoGenerator.bounds(obj),
            dx = bounds[1][0] - bounds[0][0],
            dy = bounds[1][1] - bounds[0][1],
            x = (bounds[0][0] + bounds[1][0]) / 2,
            y = (bounds[0][1] + bounds[1][1]) / 2,
            scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
            translate = [width / 2 - scale * x, height / 2 - scale * y];

            console.log(translate);
            console.log(scale);
        map_svg.transition()
            .duration(750)
            // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
            .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4
            // .call( zoom.transform, d3.zoomIdentity.translate([-69.45264606363037, -3.6934969517030254]).scale(0) ); // updated for d3 v4

        function rotate(x) {
               projection.rotate([x,0,0])
                   g.selectAll('path')       // re-project path data
                  .attr('d', geoGenerator);
        }
      }
// }
  }

  update(geojson, sub_regions, continents);

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

function httpGet(theUrl, name, parameter)
{
    parameterString = JSON.stringify({"name": name, "array": parameter});
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "POST", theUrl, false ); // false for synchronous request
    xmlHttp.setRequestHeader("Content-Type", "application/json")
    xmlHttp.send(parameterString);
    return xmlHttp.responseText;
}

function arraysEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length != b.length) return false;

      // If you don't care about the order of the elements inside
      // the array, you should sort both arrays here.
      // Please note that calling sort on an array will modify that array.
      // you might want to clone your array first.
      a = [a[0], a[1]].sort();
      b = [b[0], b[1]].sort();
      for (var i = 0; i < a.length; ++i) {
        aMin = a[i] - 10;
        aMax = a[i] + 10;
        bMin = b[i] - 2;
        bMax = b[i] + 2;
        // if (a[i] !== b[i]) return false;
        if (b[i] <= aMax || b[i] >= aMin) return false;
      }
      return true;
}
function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}
