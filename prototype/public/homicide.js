d3.csv("homicide.csv")
.then(function(data) {

  // Convert strings to numbers.
  // parseFloat because it converts empty data to NaN
  data.forEach(function(d) {
    var homicide = [];
    for (i = 2000; i <= 2016; i++) {
      d["" + i] = parseFloat(d["" + i]);
      homicide.push({
        country : d['UNODC Name'],
        year : new Date(i, 0, 1),
        rate : d["" + i]
      });
      d.homicide = homicide;
    }
  });

  var margin = { top: 20, right: 20, bottom: 30, left: 50 };
  var svg_width = 1000;
  var svg_height = 500;
  var width = svg_width - margin.left - margin.right;
   var height = svg_height - margin.top - margin.bottom;

  // var data = [10, 15, 20, 25, 30];

  // Append SVG
  var svg = d3.select("body")
              .append("svg")
              .attr("width", width)
              .attr("height", height);

  // Create x scale
  var x_scale = d3.scaleTime()
                .domain([new Date(2000, 0, 1), new Date(2016, 0, 1)])
                .range([0, width - 100]);
  // Add scale to x axis
  var x_axis = d3.axisBottom()
                 .scale(x_scale);

  // Create y scale
  var y_scale = d3.scaleLinear()
               .domain([0, 10])
               .range([height/2, 0]);
  // Add scale to y axis
  var y_axis = d3.axisLeft().scale(y_scale);

  // Append group and insert axis
  var offset = 100;
    svg.append("g")
         .attr("transform", `translate(50, ${offset})`)
         .call(y_axis);

  var xAxisTranslate = height/2;

      svg.append("g")
              .attr("transform", `translate(50, ${height/2 + offset})`)
              .call(x_axis);


  var line = d3.line()
   .x(function(d) { return x_scale(d.year)})
   .y(function(d) { return y_scale(isNaN(d.rate) ? null : d.rate)}); // handle NaN from parseFloat

   var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);
   for (i = 0; i < 1; i++) {
      svg.append("g").append("path")
              .datum(data[i].homicide)
              .attr("transform", `translate(50, ${offset})`)
              .attr("fill", "none")
              .attr("stroke", "steelblue")
              .attr("stroke-linejoin", "round")
              .attr("stroke-linecap", "round")
              .attr("stroke-width", 1.5)
              .attr("d", line)
              .on("mouseover", function(d) {
                  div.transition()
                      .duration(200)
                      .style("opacity", .9);
                  div.html(d.country + "<br/>" + d.year + "<br/>"  + d.rate)
                      .style("left", (d3.event.pageX) + "px")
                      .style("top", (d3.event.pageY - 28) + "px");
                  })
              .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              });
    }

})
.catch(function(error) {
  console.log("fail");
  console.log(error);
});
