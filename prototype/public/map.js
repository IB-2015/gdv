d3.json("countries.geojson")
.then(function(data) {
  var geojson = data;
  var geoscheme;


  d3.csv("geoscheme.csv")
  .then(function(data) {
    geoscheme = [];
    data.forEach(function(d) {
      geoscheme.push(d);
    });

    // print length of both arrays
    console.log("geojson: " + geojson.features.length);
    console.log("geoscheme: " + geoscheme.length);

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
        console.log(d.properties.ADMIN + " has no matching scheme");
        missing.push(d.properties.ADMIN);
        missingScheme++;
      } else {
        console.log(d.properties.ADMIN + " [" + d.scheme["Country or Area"] + " | " + d.scheme["Region Name"] + " | "  + d.scheme["Sub-region Name"] + "]");
      }
      console.log("----");
    });

    console.log(missingScheme);
    console.log(missing);

    function setScheme(x, scheme) {
      scheme.forEach(function(d) {
        var xReg = new RegExp(x.properties.ADMIN, 'g');
        var yReg = new RegExp(d["Country or Area"], 'g');
        if (xReg.test(d["Country or Area"]) || yReg.test(x.properties.ADMIN)) {
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
})

function drawMap(geojson) {
  var projection = d3.geoEquirectangular()
    .scale(100)
    .translate([200, 150]);

  var geoGenerator = d3.geoPath()
    .projection(projection);

  function update(geojson) {
    // console.log(geoGenerator(geojson));
    var u = d3.select('#content g.map')
      .selectAll('path')
      .data(geojson.features);

    u.enter()
      .append('path')
      .attr("id", function(d) { return d.properties.ADMIN;})
      .attr("class", function(d) { return d.scheme == undefined ? "none" : d.scheme["Sub-region Name"].replace(new RegExp(" ", "g"), "_");})
      .attr('d', geoGenerator);

    d3.selectAll(".none").style("fill", "black");
    d3.selectAll(".Northern_Africa").style("fill", "#1759c4");
    d3.selectAll(".Sub-Saharan_Africa").style("fill", "black");
    d3.selectAll(".Latin_America_and_the_Caribbean").style("fill", "#bac60f");
    d3.selectAll(".Northern_America").style("fill", "#1ba2ba");
    d3.selectAll(".Central_Asia").style("fill", "black");
    d3.selectAll(".Eastern_Asia").style("fill", "black");
    d3.selectAll(".South-eastern_Asia").style("fill", "black");
    d3.selectAll(".Southern_Asia").style("fill", "#d12017");
    d3.selectAll(".Western_Asia").style("fill", "black");
    d3.selectAll(".Eastern_Europe").style("fill", "#adfff8");
    d3.selectAll(".Northern_Europe").style("fill", "black");
    d3.selectAll(".Southern_Europe").style("fill", "black");
    d3.selectAll(".Western_Europe").style("fill", "#1759c4");
    d3.selectAll(".Australia_and_New_Zealand").style("fill", "black");
    d3.selectAll(".Melanesia").style("fill", "black");
    d3.selectAll(".Micronesia").style("fill", "black");
    d3.selectAll(".Polynesia").style("fill", "black");
  }

  update(geojson);
}
