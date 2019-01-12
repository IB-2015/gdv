const clickRegion = (datum, index, nodes) => {
    const clickedRegion = d3.event.target.attributes[0].value;
    const clickedSubregion = d3.event.target.attributes[1].value;
    const clickedCountry = d3.event.target.attributes[2].value;

    //Get data for whole region
    let regionData = getCrimeDataForRegion(clickedRegion).then(regionData =>{ 
        //Use data here
        console.log(regionData)
        //createLineChart(regionData, 1)
        //createLineChart(regionData, 2)
    
    });

/*     //Get data for country
    let countryData = getCrimeDataForCountry(clickedCountry).then(countryData => {
        console.log(countryData)
    } ) */

  }

  

