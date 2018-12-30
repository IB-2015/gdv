var geojson_countries;
var geojson_continents = {};
var geojson_schemes = {};
var geoscheme = [];
var geoscheme_regions = [];
var geoscheme_sub_regions = [];
var active = d3.select(null);
var initX;
var rotated = 90;
var height = 360;
var width = 640;
var zoom_level = 0; // 0 world, 1 continent...
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

  drawMap(geojson_countries);

}).catch(function(error) {
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
        .call(zoom);

  // append g to svg
  var g = map_svg.append('g').attr('class', 'map');


  var projection = d3.geoMercator();

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
    active.classed("active", false);
    active = d3.select(null);

    map_svg.transition()
        .duration(750)
        // .call( zoom.transform, d3.zoomIdentity.translate(0, 0).scale(1) ); // not in d3 v4
        .call( zoom.transform, d3.zoomIdentity ); // updated for d3 v4
  }

  function update(geojson) {
    var u = g
      .selectAll('path')
      .data(geojson.features);

    u.enter()
      .append('path')
      .attr("id", function(d) { return d.properties.ADMIN;})
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
      var obj = {
        "type": "Feature",
        "geometry": geojson_continents[active.attr("region")].features[0]
      }
      var bounds = geoGenerator.bounds(obj),
          dx = bounds[1][0] - bounds[0][0],
          dy = bounds[1][1] - bounds[0][1],
          x = (bounds[0][0] + bounds[1][0]) / 2,
          y = (bounds[0][1] + bounds[1][1]) / 2,
          scale = Math.max(1, Math.min(8, 0.9 / Math.max(dx / width, dy / height))),
          translate = [width / 2 - scale * x, height / 2 - scale * y];

      map_svg.transition()
          .duration(750)
          // .call(zoom.translate(translate).scale(scale).event); // not in d3 v4
          .call( zoom.transform, d3.zoomIdentity.translate(translate[0],translate[1]).scale(scale) ); // updated for d3 v4

      function rotate(x) {
             projection.rotate([x,0,0])
                 g.selectAll('path')       // re-project path data
                .attr('d', geoGenerator);
      }
    }
  }

  update(geojson);
}
