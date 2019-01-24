var data = null;

const setData = (d) => {
  data = d;
}

const logData = () => {
  console.log(data);
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

  ////////////////////////
  all_data = []
  // 0 hom, 1 edu, 2 gdp, 3 gini
  for (i in data) {
    d = {"x": data[i][3][0], "y": data[i][0][0]};
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
	   .attr("r", 4)
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
