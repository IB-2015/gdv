const clickRegion = (datum, index, nodes) => {
    //attributes[0] = region
    //attributes[1] = subregion
    const clickedRegion = d3.event.target.attributes[0].value;
    let regionData = getCrimeDataForRegion(clickedRegion).then(regionData =>{ 
        //Use data here
        console.log(regionData)
        createLineChart(regionData, 1)
    
    });
  }

  const createLineChart = (data, position) => {
      const height = 350;
      const width = 350;
/*     var svgWidth = 600, svgHeight = 400;
    var margin = { top: 20, right: 20, bottom: 30, left: 50 };
    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom; */
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

    var x = d3.scaleTime().rangeRound([0, width]);
    var y = d3.scaleLinear().rangeRound([height, 0]);

    var line = d3.line()
        .x(function(d) { return x(d.date)})
        .y(function(d) { return y(d.value)})
   x.domain(d3.extent(data, function(d) { return d.Country }));
   y.domain(d3.extent(data, function(d) { return d['2014'] }));

   g.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  }
