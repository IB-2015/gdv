const clickRegion = (datum, index, nodes) => {
    //attributes[0] = region
    //attributes[1] = subregion
    const clickedRegion = d3.event.target.attributes[0].value;
    let regionData = getCrimeDataForRegion(clickedRegion).then(regionData =>{ 
        //Use data here
        console.log(regionData)
        createLineChart(regionData, 1)
        createLineChart(regionData, 2)
    
    });
  }

  const createLineChart = (data, position) => {
      const height = 350;
      const width = 350;
      var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    document.getElementById('country'+position).innerHTML = "";
    var svg = d3.select('#country'+position)
        .append('svg')
        .attr('id', 'country'+position)
        .attr('class', 'countryWindow')
        .attr("viewBox", "0 0 " + width + " " + height )
        .attr("preserveAspectRatio", "xMinYMin");

    var g = svg.append("g")
        .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")"
        );
    
    var x = d3.scaleLinear().rangeRound([2003, 2014]);
    var y = d3.scaleLinear().rangeRound([100000, 0]);

    var line = d3.line()
        .x(function(d) { return x('2014')})
        .y(function(d) { return y(d['2014'])})
   x.domain(d3.extent(data, function(d) { return d.Country }));
   y.domain(d3.extent(data, function(d) { return d['2014'] }));

   g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

   g.append("g")
   .call(d3.axisLeft(y))
   .append("text")
   .attr("fill", "#000")
   .attr("transform", "rotate(-90)")
   .attr("y", 6)
   .attr("dy", "0.71em")
   .attr("text-anchor", "end")
   .text("Price ($)");

  }
