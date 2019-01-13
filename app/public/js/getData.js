const years = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016']

const getAssaultData = (countryList) => {
    return fetch('/api/data/statistics/assault')
  .then(res => {return res.json()})
  .then(assaultData => { 
      let rawData = d3.csvParse(assaultData);
      return selectData(rawData, countryList);
    });
}

const getHomicideData = (countryList) => {
    return fetch('/api/data/statistics/homicide')
  .then(res => {return res.json()})
  .then(homicideData => { 
      let rawData = d3.csvParse(homicideData);
      return selectData(rawData, countryList);
    });
}

const getEducationData = (countryList) => {
    return fetch('/api/data/statistics/education')
  .then(res => {return res.json()})
  .then(educationData => { 
      let rawData = d3.csvParse(educationData);
      return selectData(rawData, countryList);
    });
}

const getGDPData = (countryList) => {
    return fetch('/api/data/statistics/gdp')
  .then(res => {return res.json()})
  .then(gdpData => { 
      let rawData = d3.csvParse(gdpData);
      return selectData(rawData, countryList);
    });
}


getGDPData(['ERI']).then(data => console.log(data))





//Selects data for a given list ofcountries from given dataset
//If more than 1 country is in the list, an average for all countries in the list is processed
const selectData = (data, countryList) => {
    let countryData = [];
    //Select only countries from list
    data.forEach(country => {
        if(countryList.indexOf(country.ISO_A3) > -1) {
            //Convert string format of numbers 
            let keys = Object.keys(country);
            keys.forEach(key => {
                let yearFound = years.indexOf(key);
                if(yearFound > -1) {
                    country[key] = parseFloat(country[key])
                }
            })
            countryData.push(country)
        }
    })

    //No country selected
    if(countryList === null || countryList.length <= 0){
        return new Error("No country selected")
    }
    //More than 1 country selected -> return average data for given list of countries
    if(countryList.length > 1){
      let averageCountries = {
          'name': 'averageOfCountries'
      };
      let keys = Object.keys(countryData[0]);
      
      //Initialize object for average data, set datatype for year attributes
      keys.forEach(key => {
        let yearFound = years.indexOf(key);
        if(yearFound > -1){
            averageCountries[years[yearFound]] = 0.0;
        }
      })

      countryData.forEach(country => {
          //Iterate over each objects key to find the year columns
          keys.forEach(key => {
              let yearFound = years.indexOf(key);
              if(yearFound > -1){
                  //Add value of year attribute to total average
                averageCountries[key] += parseFloat(country[key])
              }
          })    
      })
      
      //Divide by total number of found countries to get the average
      Object.keys(averageCountries).forEach(key => {
          if (key != 'name') {
              averageCountries[key] = averageCountries[key]/countryList.length;
          }
      })
      delete averageCountries.key;
      return [averageCountries];
    } else {
        //Only 1 country selected
        return countryData;
    }
}



/* const getCrimeDataForRegion = (region) => {
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
              country[keys[index]] = parseInt(country[keys[index]].replace(/,/g, "")); 
          }

          if(country.Region === region){
              results.push(country)
          }
      })    
    return results});
}   

const getCrimeDataForCountry = (clickedCountry) => {
    return fetch('/api/data/statistics/assault')
    .then(res => {return res.json()})
    .then(crimeData => { 
        let data = d3.csvParse(crimeData);
        let result;
        data.forEach( country => {
            let countryName = country.Country;
            if(countryName.includes('*')){
                countryName = countryName.substring(0, countryName.length-1)
                country.Country = countryName
            }

            if(country.Country === clickedCountry) {
                let keys = Object.keys(country);
                //Years 2003-2014
                for (let index = 0; index < 12; index++) {
                    country[keys[index]] = parseInt(country[keys[index]].replace(/,/g, "")); 
                }

                result = country;
            }
        })    
      return result});
  }  */  
  
  

