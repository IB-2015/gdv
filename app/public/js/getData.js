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
          
          if(country.Region === region){
              results.push(country)
          }
      })    
    return results});
}   