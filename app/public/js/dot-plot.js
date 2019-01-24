var data = null;

const setData = (d) => {
  data = d;
}

const logData = () => {
  // console.log(data);
}

const drawDotPlot = () => {
  console.log(data);
  var chart = RadarChart.chart();
  var cfg = chart.config();

  var svg = d3v3.select('#selection2').append('svg')
  .attr('width', cfg.w)
  .attr('height', cfg.h + cfg.h / 4);
    svg.append("text")
          .style("font-size", "1.5em")
          .style("font-weight", "bold")
          .attr("x", cfg.w / 6 )
          .attr("y", cfg.h/12)
          .attr("text-anchor", "middle")
          .style("text-decoration", "underline")
          .text("hey");

  chart.config({w: cfg.w / 2, h: cfg.h / 2})
  cfg = chart.config();

  var width = cfg.w/1.5;
  var height = cfg.h/1.5;

  var chart = svg
    .append("g")
      .attr("transform", "translate(" + width + "," + height + ")");

  ///////////////////////
  // Scales
  var x = d3v3.scale.linear()
      .domain([0, 100])
      .range([0,width]);

  max = 100;
  var y = d3v3.scale.linear()
      .domain([0, max])
      .range([height, 0]);

  chart.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", -40)
    .attr("dy", "1em")
    .attr("transform", "rotate(-90)")
    .text("intentional homicide per 100.000 persons");

  ///////////////////////
  // Axis
  var xAxis = d3v3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3v3.svg.axis()
      .scale(y)
      .orient("left");

  chart.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  ///////////////////////

  ///////////////////////
  // Bars
  // var bar0 = chart.selectAll(".bar")
  //     .data([data[0]])
  //   .enter().append("rect")
  //     .attr("class", className)
  //     .attr("x", function(d) { return x(d['name']); })
  //     .attr("y", height)
  //     .attr("width", x.rangeBand())
  //     .attr("height", 0);
  //
  // bar0.transition()
  //     .duration(1500)
  //     .ease("elastic")
  //     .attr("y", function(d) { return y(d['homicide']); })
  //     .attr("height", function(d) { return height - y(d['homicide']); })
  // var bar = chart.selectAll(".bar")
  //     .data([data[1]])
  //   .enter().append("rect")
  //     .attr("class", "bar")
  //     .attr("x", function(d) { return x(d['name']); })
  //     .attr("y", height)
  //     .attr("width", x.rangeBand())
  //     .attr("height", 0);
  //
  // bar.transition()
  //     .duration(1500)
  //     .ease("elastic")
  //     .attr("y", function(d) { return y(d['homicide']); })
  //     .attr("height", function(d) { return height - y(d['homicide']); })

}
