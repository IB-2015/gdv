const clickRegion = (datum, index, nodes) => {
    console.log(d3.event.target.attributes[2].value)

    const clickedRegion = d3.event.target.attributes[0].value;
    const clickedSubregion = d3.event.target.attributes[1].value;
    const clickedCountry = d3.event.target.attributes[2].value;

    //Get data for whole region
    let regionData = getCrimeDataForRegion(clickedRegion).then(regionData =>{ 
        //Use data here
        console.log(regionData)
        createLineChart(regionData, 1)
        createLineChart(regionData, 2)
    
    });

    //Get data for country
    let countryData = getCrimeDataForCountry(clickedCountry).then(countryData => {
        console.log(countryData)
    } )
  }

  const createLineChart = (data, position) => {
      const height = 350;
      const width = 350;
      var margin = { top: 20, right: 20, bottom: 30, left: 50 };

      const years = ["2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014"];
      
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
    var y = d3.scaleLinear().rangeRound([0, 50000]);

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
   .text("Mordrate");

  }
