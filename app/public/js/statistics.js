const clickRegion = (datum, index, nodes) => {
    //attributes[0] = region
    //attributes[1] = subregion
    const clickedRegion = d3.event.target.attributes[0].value;
    let regionData = getCrimeDataForRegion(clickedRegion).then(regionData =>{ 
        
        console.log(regionData)});

  }