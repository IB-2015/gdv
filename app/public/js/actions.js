var isMapInForeground = true
var countrySelected = 0;

const clickRegion = (datum, index, nodes) => {
    const clickedRegion = d3.event.target.attributes[0].value;
    const clickedSubregion = d3.event.target.attributes[1].value;
    const clickedCountry = d3.event.target.attributes[2].value;
    countrySelected++;

    if(countrySelected%6 == 3){
        //First country selected, load data from backend and call methods to draw charts and insert them into the background container
        drawHomicideChart('country1container');
    } 
    if(countrySelected%6 == 0){
        //2nd country got selected
        //@TODO: Load data, draw charts and move background to top z-layer by adding css class
        drawHomicideChart('country2container');
        switchLayer();

            //Get data for country
        let countryData = getCrimeDataForCountry(clickedCountry).then(countryData => {
            console.log(countryData)
        } )

        //Reset counter
        countrySelected = 0;
    }


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

  
  const switchLayer = () => {
      if(isMapInForeground) {
        document.getElementById('mapLayer').style.visibility = 'hidden'
        document.getElementById('detailsLayer').classList.add('moveToTop')
        document.getElementById('mapLayer').classList.remove('moveToTop')
      } else {
        document.getElementById('mapLayer').classList.add('moveToTop')
        document.getElementById('detailsLayer').classList.remove('moveToTop')
      }
  }

  document.getElementById("switchLayer").addEventListener("click", switchLayer)
