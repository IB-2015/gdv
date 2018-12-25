d3.json("countries.geojson")
.then(function(data) {
  geojson = data;
  geoscheme;
  d3.csv("geoscheme.csv")
  .then(function(data) {
    geoscheme = data;
  })
  .catch(function(error) {
    console.log(error);
  })

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
      .attr("id", function(d) { console.log(d.properties.ADMIN); return d.properties.ADMIN;})
      .attr('d', geoGenerator);
    console.log("fin");
  }

  update(geojson);
}
