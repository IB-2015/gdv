var geojson;
var geojson_africa;
var geoscheme = [];
var geoscheme_regions = [];
var geoscheme_sub_regions = [];
var active = d3.select(null);
var initX;
var rotated = 90;
var height = 360;
var width = 640;
//track scale only rotate when s === 1
var s = 1;
var mouseClicked = false;
d3.json("countries.geojson")
.then(function(data) {
  geojson = data;
  // var geoscheme;

  d3.json('africa.geojson')
  .then(function(data) {
    geojson_africa = data;

    d3.csv("geoscheme.csv")
    .then(function(data) {
      data.forEach(function(d) {
        geoscheme.push(d);
        if (!geoscheme_regions.includes(d["Region Name"].replace(new RegExp(" ", "g"), "_"))) {
          geoscheme_regions.push(d["Region Name"].replace(new RegExp(" ", "g"), "_"));
        }

        if (!geoscheme_sub_regions.includes(d["Sub-region Name"].replace(new RegExp(" ", "g"), "_"))) {
          geoscheme_sub_regions.push(d["Sub-region Name"].replace(new RegExp(" ", "g"), "_"));
        }
      });


      // console.log(geoscheme_regions);
      // console.log(geoscheme_sub_regions);

      // print length of both arrays
      // console.log("geojson: " + geojson.features.length);
      // console.log("geoscheme: " + geoscheme.length);

      // sort both arrays alphabetically
      geojson.features.sort(function(a, b) {
        return a.properties.ADMIN < b.properties.ADMIN ? -1 : 1;
      });
      geoscheme.sort(function(a, b) {
        return a["Country or Area"] < b["Country or Area"]? -1 : 1;
      });

      // set geoscheme for every country and count missing afterwards
      var missingScheme = 0;
      var missing = [];
      geojson.features.forEach(function(d) {
        setScheme(d, geoscheme)
        if (d.scheme == undefined) {
          // console.log(d.properties.ADMIN + " has no matching scheme");
          missing.push(d.properties.ADMIN);
          missingScheme++;
        } else {
          // console.log(d.properties.ADMIN + " [" + d.scheme["Country or Area"] + " | " + d.scheme["Region Name"] + " | "  + d.scheme["Sub-region Name"] + "]");
        }
        // console.log("----");
      });

      console.log(missingScheme);
      console.log(missing);

      function setScheme(x, scheme) {
        scheme.forEach(function(d) {
          if (d["ISO-alpha3 Code"] === x.properties.ISO_A3) {
            x.scheme = d;
            return;
          }
        })
      }


      drawMap(geojson);

    })
    .catch(function(error) {
      console.log(error);
    });
  })
  .catch(function(error) {
    console.log(error);
  });
})
.catch(function(error) {
  console.log(error);
})

function drawMap(geojson) {

  var zoom = d3.zoom()
         .scaleExtent([1, 20])
         .on("zoom", zoomed);

  // append svg to parent div container
  var map_svg = d3.select('#content').append('svg')
        .attr('id', 'map')
        .attr("width", width)
        .attr("height", height)
          //track where user clicked down
        //   .on("mousedown", function() {
        //     console.log("mouse clicked");
        //      d3.event.preventDefault();
        //      //only if scale === 1
        //      if(s !== 1) return;
        //        initX = d3.mouse(this)[0];
        //        mouseClicked = true;
        //   })
        //   .on("mouseup", function() {
        //     console.log("mouse left");
        //      // d3.event.preventDefault();
        //       if(s !== 1) return;
        //       rotated = rotated + ((d3.mouse(this)[0] - initX) * 360 / (s * width));
        //       mouseClicked = false;
        //   })
        .call(zoom);

  // append g to svg
  var g = map_svg.append('g').attr('class', 'map');


  var projection = d3.geoMercator()
        // .scale(153)
        // .translate([width/2,height/1.5])
        // .rotate([rotated,0,0]); //center on USA because 'murica
    // .scale(100)
    // .translate([200, 250]);

    projection.fitExtent([[0, 0], [640, 360]], geojson);
    projection.rotate([-15,0,0]);
  var geoGenerator = d3.geoPath()
    .projection(projection);

  function rotateMap(endX) {
        console.log("rotate:" + rotated + " | endX: " + endX + " | initX: " + initX);
         projection.rotate([rotated + (endX - initX) * 360 / (s * width),0,0])
             g.selectAll('path')       // re-project path data
            .attr('d', geoGenerator);
  }

  function zoomed() {
    // g.style("stroke-width", 1.5 / d3.event.transform.k + "px");

    // g.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")"); // not in d3 v4
    g.attr("transform", d3.event.transform); // updated for d3 v4
  }

  function reset() {
    // console.log(d3.zoomIdentity);
    active.classed("active", false);
    active = d3.select(null);

    map_svg.transition()
        .duration(750)
        // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
        .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
  }

  // function zoomed() {
  //   // console.log("zoom called");
  //   // var t = d3.event.transform;
  //   // s = d3.event.scale;
  //   // s = 1;
  //   // var h = 0;
  //   // // console.log(s);
  //   //
  //   // t[0] = Math.min(
  //   //   (width/height)  * (s - 1),
  //   //   Math.max( width * (1 - s), t[0] )
  //   // );
  //   //
  //   // t[1] = Math.min(
  //   //   h * (s - 1) + h * s,
  //   //   Math.max(height  * (1 - s) - h * s, t[1])
  //   // );
  //
  //   // console.log(Object.getOwnPropertyNames(zoom));
  //   // zoom.translateTo(t);
  //   if(s === 1 && mouseClicked) {
  //     rotateMap(d3.mouse(this)[0])
  //     return;
  //   }
  //
  //   g.attr("transform", "translate(" + t + ")scale(" + s + ")");
  //
  //   //adjust the stroke width based on zoom level
  //   // d3.selectAll(".boundary")
  //   //   .style("stroke-width", 1 / s);
  //
  // }

  function update(geojson) {
    // console.log(geoGenerator(geojson));
    var u = g
      .selectAll('path')
      .data(geojson.features);

    u.enter()
      .append('path')
      .attr("id", function(d) { return d.properties.ADMIN;})
      .attr("region", function(d) { return (d.scheme == undefined ? "none" : d.scheme["Region Name"].replace(new RegExp(" ", "g"), "_"));})
      .attr("sub_region", function(d) {return (d.scheme == undefined ? "none" : d.scheme["Sub-region Name"].replace(new RegExp(" ", "g"), "_"));})
      .attr("class", function(d) { return "sub_region " + (d.scheme == undefined ? "none" : d.scheme["Region Name"].replace(new RegExp(" ", "g"), "_"));})
      // .attr("class", "selected")
      .attr('d', geoGenerator)
      .on('mouseenter', highlightRegion)
      .on('mouseout', resetRegion)
      .on('click', zoomIn);

    function selected() {
      var sub_region = d3.select(this).attr("class").split(" ")[1];

      d3.selectAll(".sub_region").classed('selected', false);
      d3.selectAll("." + sub_region).classed('selected', true);
    }

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
      var obj = {
        "type": "Feature",
        "geometry": geojson_africa.features[0]
      }
      var bounds = geoGenerator.bounds(obj),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
          translate = [width / 2 - scale * x, height / 2 - scale * y];

      map_svg.transition()
          .duration(1750)
          // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
          .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4
    }

    // d3.selectAll(".none").style("fill", "black");
    // d3.selectAll(".Northern_Africa").style("fill", "#1759c4");
    // d3.selectAll(".Sub-Saharan_Africa").style("fill", "black");
    // d3.selectAll(".Latin_America_and_the_Caribbean").style("fill", "#bac60f");
    // d3.selectAll(".Northern_America").style("fill", "#1ba2ba");
    // d3.selectAll(".Central_Asia").style("fill", "black");
    // d3.selectAll(".Eastern_Asia").style("fill", "black");
    // d3.selectAll(".South-eastern_Asia").style("fill", "black");
    // d3.selectAll(".Southern_Asia").style("fill", "#d12017");
    // d3.selectAll(".Western_Asia").style("fill", "black");
    // d3.selectAll(".Eastern_Europe").style("fill", "#adfff8");
    // d3.selectAll(".Northern_Europe").style("fill", "black");
    // d3.selectAll(".Southern_Europe").style("fill", "black");
    // d3.selectAll(".Western_Europe").style("fill", "#1759c4");
    // d3.selectAll(".Australia_and_New_Zealand").style("fill", "black");
    // d3.selectAll(".Melanesia").style("fill", "black");
    // d3.selectAll(".Micronesia").style("fill", "black");
    // d3.selectAll(".Polynesia").style("fill", "black");

  }

  update(geojson);

//print stuff
  var elems = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute('sub_region') === 'Southern_Asia')
    {
      // Element exists with attribute. Add to array.
      elems.push(allElements[i]);
    }
  }
  var africa = {
    "type": "FeatureCollection",
    "features": []
  }
  for (i = 0; i < elems.length; i++) {
    var e = d3.select(elems[i])['_groups'][0][0]['__data__'];
    delete e['scheme'];
    africa.features.push(e);
  }
  console.log(JSON.stringify(africa));
}
