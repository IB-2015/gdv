const drawRadarChart = (id, data) => {
  RadarChart.defaultConfig.color = function() {};
  RadarChart.defaultConfig.radius = 3;
  RadarChart.defaultConfig.w = d3v3.select(id).node().offsetWidth / 2;
  RadarChart.defaultConfig.h = d3v3.select(id).node().offsetHeight;

  radar_data = data.radar
  let elemId
  if(id === '#country1'){elemId = 'country1'}
  else{elemId = 'country2'}
  // console.log(radar_data[0].className);
  var chart = RadarChart.chart();
  var cfg = chart.config(); // retrieve default config
  var svg = d3v3.select(id).append('svg')
  .attr('id', elemId+'chart')
  .attr('width', cfg.w + cfg.w + 0)
  .attr('height', cfg.h + cfg.h / 4);
    svg.append("text")
          .style("font-size", "1.5em")
          .style("font-weight", "bold")
          .attr("x", cfg.w )
          .attr("y", cfg.h/12)
          .attr("text-anchor", "middle")
          .style("text-decoration", "underline")
          .text(radar_data[0].name);
  var main_g = svg.append('g').classed('single', 1).datum(radar_data).call(chart);
  main_g
    .attr('transform', 'translate('+0+','+ (cfg.h * 0.15) +')')

  // many radars
  chart.config({w: cfg.w / 2, h: cfg.h / 2, axisText: true, levels: 0, circles: false});
  cfg = chart.config();
  // function render() {
  //   var game = svg.selectAll('g.game').data(
  //     [
  //       data,
  //       data
  //     ]
  //   );
  //   game.enter().append('g').classed('game', 1);
  //   game
  //     .attr('transform', function(d, i) { return 'translate('+((cfg.w * 1.75) + (i * cfg.w))+','+ (cfg.h * 0.75) +')'; })
  //     .call(chart);
  //
  //   // setTimeout(render, 1000);
  // }
  // render();
  className = id.split('#')[1]
  max = data.barMax;
  drawBarChart(svg, cfg, data.bar, className, max)
  addLegend(svg, data.bar, className);
}

const addLegend = (svg, data, className) => {
  c = ""
  if (className == "country1") {
    c = "#533A71"
  } else {
    c = "#26532B"
  }
  svg.append("text")
    .attr("x", 30)
    .attr("y", 60)
    .attr("dy", ".35em")
    .text(data[0].name);
  svg.append("circle")
    .attr("cx", 10)
    .attr("cy", 60)
    .attr("r", 5)
    .style("fill", c)
  svg.append("text")
      .attr("x", 30)
      .attr("y", 80)
      .attr("dy", ".35em")
      .text(data[1].name);
  svg.append("circle")
    .attr("cx", 10)
    .attr("cy", 80)
    .attr("r", 5)
    .style("fill", "#FF7B07")
}

const drawBarChart = (svg, cfg, data, className, max) => {
  var width = cfg.w;
  var height = cfg.h * 1.5;

  var chart = svg
    .append("g")
      .attr("transform", "translate(" + cfg.w * 2.5 + "," + cfg.h * 0.35  + ")");

  ///////////////////////
  // Scales
  var x = d3v3.scale.ordinal()
      .domain(data.map(function(d) { return d['name']; }))
      .rangeRoundBands([0, width], .1);

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
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

  ///////////////////////

  ///////////////////////
  // Bars
  var bar0 = chart.selectAll(".bar")
      .data([data[0]])
    .enter().append("rect")
      .attr("class", className)
      .attr("x", function(d) { return x(d['name']); })
      .attr("y", height)
      .attr("width", x.rangeBand())
      .attr("height", 0);

  bar0.transition()
      .duration(1500)
      .ease("elastic")
      .attr("y", function(d) { return y(d['homicide']); })
      .attr("height", function(d) { return height - y(d['homicide']); })
  var bar = chart.selectAll(".bar")
      .data([data[1]])
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d['name']); })
      .attr("y", height)
      .attr("width", x.rangeBand())
      .attr("height", 0);

  bar.transition()
      .duration(1500)
      .ease("elastic")
      .attr("y", function(d) { return y(d['homicide']); })
      .attr("height", function(d) { return height - y(d['homicide']); })

}
