var geojson_countries;
var geojson_continents = {};
var geojson_schemes = {};
var geoscheme = [];
var geoscheme_regions = [];
var geoscheme_sub_regions = [];
var active = d3.select(null);
var initX;
var x_rotation = -15;
var y_rotation = 0;
var z_rotation = 0;
var factor = (640/(window.screen.availWidth * (2/3)));
var height = 460/factor;
var width = 640/factor;
var level = 0; // 0 world, 1 continent...
//track scale only rotate when s === 1
var s = 1;
var mouseClicked = false;

var resources = [
  "countries.geojson",
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
      geojson_continents[resources[i].split(".")[0]] = data[i];
      // geojson_continents[resources[i].split(".")[0]].geometry = data[i].features;
    } else {
      geojson_schemes[resources[i].split(".")[0]] = data[i];
    }
  }

  console.log(geojson_continents);
  console.log(geojson_schemes);
  console.log(geoscheme_regions);
  console.log(geoscheme_sub_regions);

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
        if (d["ISO-alpha3 Code"] === geojson_country.properties.ISO_A3) {
          geojson_country.scheme = d;
          return;
        }
      })
    }
  });

  console.log(missingScheme);
  console.log(missing);

  // drawMap(geojson_countries);
  // console.log(geojson_continents.Africa);
  // for (var key in geojson_continents) {
  //   console.log(key + ": " + geojson_continents[key].features.length);
  // }
  // for (var key in geojson_schemes) {
  //   console.log(key + ": " + geojson_schemes[key].features.length);
  // }
  // console.log(geojson_countries);
  // drawMap(geojson_countries);
  drawMap(geojson_countries);

}).catch(function(error) {
  console.log(error);
})

function drawMap(geojson) {
  console.log(geojson);
  var zoom = d3.zoom()
         .scaleExtent([1, 20])
         .on("zoom", zoomed);

  // append svg to parent div container
  var map_svg = d3.select('#content').append('svg')
        .attr('id', 'map')
        .attr("width", width)
        .attr("height", height);

        map_svg.call(zoom)
        .on("dblclick.zoom", null)
        .on("wheel.zoom", null);
    //     // .on("mousedown.zoom", null)
    // .on("touchstart.zoom", null)
    // .on("touchmove.zoom", null)
    // .on("touchend.zoom", null);;

  // append g to svg
  var gS = []
  var rS = [];

  // var g = map_svg.append('g').attr('class', 'map');
  // high row
  gS.push(map_svg.append('g')
  .attr("width", width)
  .attr("height", height)
  .attr('class', 'map')
  .attr('transform', `translate(0,0) scale(1)`));
  gS.push(map_svg.append('g')
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
  // var g = map_svg.append('g').attr('class', 'map');

  // gS[0].append("rect")
  //   .attr("width", "100%")
  //   .attr("height", "100%")
  //   // .attr("fill", "yellow")
  //   .on("mouseover", function() {
  //   console.log(d3.select(this).node().parentNode.getAttribute("val"));
  // });
  // gS[1].append("rect")
  //   .attr("width", "100%")
  //   .attr("height", "100%")
  //   // .attr("fill", "pink")
  //   .on("mouseover", function() {
  //     console.log(d3.select(this).node().parentNode.getAttribute("val"));
  //   });
  // gS[2].append("rect")
  //   .attr("width", "100%")
  //   .attr("height", "100%")
  //   // .attr("fill", "black")
  //   .on("mouseover", function() {
  //     console.log(d3.select(this).node().parentNode.getAttribute("val"));
  //   });
  //
  //   gS[5].append("rect")
  //     .attr("width", "100%")
  //     .attr("height", "100%")
  //     // .attr("fill", "yellow")
  //     .on("mouseover", function() {
  //     console.log(d3.select(this).node().parentNode.getAttribute("val"));
  //   });
  //   gS[4].append("rect")
  //     .attr("width", "100%")
  //     .attr("height", "100%")
  //     // .attr("fill", "pink")
  //     .on("mouseover", function() {
  //       console.log(d3.select(this).node().parentNode.getAttribute("val"));
  //     });
  //   gS[3].append("rect")
  //     .attr("width", "100%")
  //     .attr("height", "100%")
  //     // .attr("fill", "black")
  //     .on("mouseover", function() {
  //       console.log(d3.select(this).node().parentNode.getAttribute("val"));
  //     });
  //
  //   gS[8].append("rect")
  //     .attr("width", "100%")
  //     .attr("height", "100%")
  //     // .attr("fill", "yellow")
  //     .on("mouseover", function() {
  //     console.log(d3.select(this).node().parentNode.getAttribute("val"));
  //   });
  //   gS[6].append("rect")
  //     .attr("width", "100%")
  //     .attr("height", "100%")
  //     // .attr("fill", "pink")
  //     .on("mouseover", function() {
  //       console.log(d3.select(this).node().parentNode.getAttribute("val"));
  //     });
  //   gS[7].append("rect")
  //     .attr("width", "100%")
  //     .attr("height", "100%")
  //     // .attr("fill", "black")
  //     .on("mouseover", function() {
  //       console.log(d3.select(this).node().parentNode.getAttribute("val"));
  //     });

  for (i = 0; i < gS.length; i++) {
    gS[i].attr("val", i);
  }

  var projection = d3.geoMercator();

    projection.fitExtent([[0, 0], [width, height]], geojson);
    projection.rotate([x_rotation,y_rotation,z_rotation]);
  var geoGenerator = d3.geoPath()
    .projection(projection);

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
        // h0.x = h0.x * d3.event.transform.k;
        // h1.x = h1.x + width * d3.event.transform.k;
        // h2.x = h2.x + 2 * width * d3.event.transform.k;
        // m0.x = m0.x * d3.event.transform.k;
        // m1.x = m1.x + width * d3.event.transform.k;
        // m2.x = m2.x + 2 * width * d3.event.transform.k;
        // l0.x = l0.x * d3.event.transform.k;
        // l1.x = l1.x + width * d3.event.transform.k;
        // l2.x = l2.x + 2 * width * d3.event.transform.k;

        // h0.y = h0.y * d3.event.transform.k;
        // h1.y = h1.y + height * d3.event.transform.k;
        // h2.y = h2.y + 2 * height * d3.event.transform.k;
        // m0.y = m0.y * d3.event.transform.k;
        // m1.y = m1.y + height * d3.event.transform.k;
        // m2.y = m2.y + 2 * height * d3.event.transform.k;
        // l0.y = l0.y * d3.event.transform.k;
        // l1.y = l1.y + height * d3.event.transform.k;
        // l2.y = l2.y + 2 * height * d3.event.transform.k;
      } else if (d3.event.sourceEvent instanceof MouseEvent) {
        h0.x = t.x > (2 * width) ? (t.x - 3 * width) : (t.x);
        h1.x = t.x + width > (2 * width) ? (t.x - 2 * width) : (t.x + width);
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
        l1.y = l2.y = l0.y;
      }

      if (d3.event.sourceEvent instanceof WheelEvent || d3.event.sourceEvent instanceof MouseEvent && t.k === 1.0) {
        gS[0].attr("transform", `translate(${h0.x},${h0.y}) scale(${h0.k})`); // updated for d3 v4
        gS[1].attr("transform",  `translate(${h1.x},${h1.y}) scale(${h1.k})`); // updated for d3 v4
        gS[2].attr("transform",  `translate(${h2.x},${h2.y}) scale(${h2.k})`); // updated for d3 v4

        gS[3].attr("transform", `translate(${m0.x},${m0.y}) scale(${m0.k})`); // updated for d3 v4
        gS[4].attr("transform",  `translate(${m1.x},${m1.y}) scale(${m1.k})`); // updated for d3 v4
        gS[5].attr("transform",  `translate(${m2.x},${m2.y}) scale(${m2.k})`); // updated for d3 v4

        gS[6].attr("transform", `translate(${l0.x},${l0.y}) scale(${l0.k})`); // updated for d3 v4
        gS[7].attr("transform",  `translate(${l1.x},${l1.y}) scale(${l1.k})`); // updated for d3 v4
        gS[8].attr("transform",  `translate(${l2.x},${l2.y}) scale(${l2.k})`); // updated for d3 v4
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

  function update(geojson) {
    for (i = 0; i < gS.length; i++) {
      g = gS[i];
      var u = g
        .selectAll('path')
        .data(geojson.features);

      u.enter()
        .append('path')
        // .attr("id", function(d) { return d.properties.ADMIN;})
        .attr("region", function(d) { return (d.scheme == undefined ? "none" : d.scheme["Region Name"].replace(new RegExp(" ", "g"), "_"));})
        .attr("sub_region", function(d) {return (d.scheme == undefined ? "none" : d.scheme["Sub-region Name"].replace(new RegExp(" ", "g"), "_"));})
        .attr("class", function(d) { return "sub_region " + (d.scheme == undefined ? "none" : d.scheme["Region Name"].replace(new RegExp(" ", "g"), "_"));})
        .attr('d', geoGenerator)
        .on('mouseenter', highlightRegion)
        .on('mouseout', resetRegion)
        .on('click', zoomIn);

      function highlightRegion() {
        var sub_region = d3.select(this).attr("class").split(" ")[1];

        d3.selectAll("." + sub_region).classed('mouseover', true);
      }

      function resetRegion() {
        var sub_region = d3.select(this).attr("class").split(" ")[1];

        d3.selectAll("." + sub_region).classed('mouseover', false);
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
}
  }

  update(geojson);
}
