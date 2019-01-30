d3v3.select('#radios').selectAll('label')
.on('click', function() {
  d3v3.select('#radios').selectAll('label').each(function() {
    this.removeAttribute('checked')
  })
  this.setAttribute('checked', null)
  drawDotPlot()
});

var data = null;
var bip_max = null

const chart_mode = {
  "edu": {x: 1, val: 1},
  "gdp": {x:126655.598081739, val: 2},
  "gini": {x:100, val: 3}
}

const setData = (d) => {
  data = d;
}

const logData = () => {
  console.log(data);
}

const drawDotPlot = () => {
  d3.select("#selection2").selectAll("svg").remove();
  d3v3.select('#radios').selectAll('label').filter(function() {
    return this.getAttribute('checked') != null
  }).each(function() {
    mode = this.getAttribute('value');
    mode_text = this.innerText;
  })
  var chart = RadarChart.chart();
  var cfg = chart.config();

  let width1 = cfg.w;
  let height1 = cfg.h + cfg.h / 4;

  var svg = d3v3.select('#selection2').append('svg')
  .attr('width', width1)
  .attr('height', height1)
  .attr('id', 'dotplot2')
  .attr("viewBox", "0 0 " + cfg.w/2 + " " + cfg.h )
  .attr("preserveAspectRatio", "xMinYMin meet");

  chart.config({w: cfg.w, h: cfg.h})
  cfg = chart.config();

  var width = cfg.w;
  var height = cfg.h/(1+(1/5));

  var chart = svg
    .append("g")
      .attr("transform", "translate(" + width/15 + "," + 10 + ")");

  ///////////////////////
  // Scales
  var x = d3v3.scale.linear()
      .domain([0, chart_mode[mode].x])
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

  chart.append("text")
  .attr("class", "x label")
  .attr("text-anchor", "end")
  .attr("x", width)
  .attr("y", height)
  .attr("dy", "3em")
  // .attr("transform", "rotate(-90)")
  .text(mode_text);

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

  ////////////////////////
  all_data = []
  world_population = data[data.length - 1][4][0].value
  // 0 hom, 1 edu, 2 gdp, 3 gini, 4 population
  x_val = chart_mode[mode].val
  for (i in data) {
    d = {"x": data[i][x_val][0], "y": data[i][0][0], "population": data[i][4][0]};
    if (d.x != undefined && d.y != undefined) {
      all_data.push(d);
    }
  }
  var circleGroups = chart.selectAll(".anscombe-circle-group")
			    .data(all_data)
			  .enter().append("g")
			    // .attr("class","anscombe-circle-group")
			    .attr("transform",function(d) { return "translate(" + x(d.x.value) + "," + y(d.y.value) + ")" })
  var circleTextGroups = chart.selectAll(".anscombe-circle-group")
			    .data(all_data)
			  .enter().append("g")
			    // .attr("class","anscombe-circle-group")
			    .attr("transform",function(d) { return "translate(" + x(d.x.value) + "," + y(d.y.value) + ")" })

	circleGroups.append("circle")
	   // .attr("class", "circles")
     .attr("name", function(d) {return d.x.country})
	   .attr("r", function(d) {return 4 + (d.population.value / world_population) * 20})
	   .style("fill", 'red')
	   .style("stroke", 'black')
	   .on("mouseenter", function(d) {
	    	chart.select("text[name="+this.getAttribute('name').replace(new RegExp(" ", "g"), "_")+"]")
	    	  .style("fill", "#000");
	   })
	   .on("mouseleave", function() {
	    	chart.select("text[name="+this.getAttribute('name').replace(new RegExp(" ", "g"), "_")+"]")
	    	  .style("fill", "none");
	   });

   circleTextGroups.append("text")
            .attr("name", function(d) {return d.x.country.replace(new RegExp(" ", "g"), "_")})
  			    .attr("dx", 8)
  			    .attr("dy", 12)
  			    .text(function(d) { return d.x.country + ", " + d.y.value; })
  			    .style("fill","none")
  			    .style("font","10px sans-serif");
}
