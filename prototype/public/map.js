var width = 1960;
    var height = 1500;

    var svg = d3.select("body").append("svg")

    var projection = d3.geoMercator()
      .scale(width / 2 / Math.PI)
      // .scale(100)
      .translate([width / 2, height / 2])

    var path = d3.geoPath()
      .projection(projection);

    // var url = "http://enjalot.github.io/wwsd/data/world/world-110m.geojson";
    d3.json("countries.geojson")
    .then(function(geojson) {
      svg.append("path")
        .attr("d", path(geojson))
    }).catch(function(error) {
      console.log(error);
    })
