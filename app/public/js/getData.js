const getCrimeDataForRegion = (region) => {
  return fetch('/api/data/statistics/assault')
  .then(res => {return res.json()})
  .then(crimeData => { 
      let data = d3.csvParse(crimeData);
      let tmpRegion;
      let tmpSubregion;
      let results = [];
      data.forEach( country => {
          if(country.Region != ""){
              tmpRegion = country.Region;
          } else {
              country.Region = tmpRegion;
          }
          if(country.Subregion != ""){
              tmpSubregion = country.Subregion;
          } else {
              country.Subregion = tmpSubregion;
          }

          let keys = Object.keys(country);
          //Years 2003-2014
          for (let index = 0; index < 12; index++) {
              country[keys[index]] = parseFloat(country[keys[index]].replace(/,/g, "")); 
          }

          if(country.Region === region){
              results.push(country)
          }
      })    
    return results});
}   