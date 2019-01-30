const years = ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016']

const getPopulationData = () => {
    return fetch('/api/data/statistics/population')
    .then(res => {return res.json()})
    .then(populationData => {
        let rawData = d3.csvParse(populationData);
        return rawData;
      });
}
const getAssaultData = (countryList, name) => {
    return fetch('/api/data/statistics/assault')
  .then(res => {return res.json()})
  .then(assaultData => {
      let rawData = d3.csvParse(assaultData);
      return selectData(rawData, countryList, name);
    });
}

const getHomicideData = (countryList, name) => {
    return fetch('/api/data/statistics/homicide')
  .then(res => {return res.json()})
  .then(homicideData => {
      let rawData = d3.csvParse(homicideData);
      return selectData(rawData, countryList, name);
    });
}

const getEducationData = (countryList, name) => {
    return fetch('/api/data/statistics/education')
  .then(res => {return res.json()})
  .then(educationData => {
      let rawData = d3.csvParse(educationData);
      return selectData(rawData, countryList, name);
    });
}

const getGDPData = (countryList, name) => {
    return fetch('/api/data/statistics/gdp')
  .then(res => {return res.json()})
  .then(gdpData => {
      let rawData = d3.csvParse(gdpData);
      return selectData(rawData, countryList, name);
    });
}

const getGINIData = (countryList, name) => {
    return fetch('/api/data/statistics/gini')
  .then(res => {return res.json()})
  .then(giniData => {
      let rawData = d3.csvParse(giniData);
      return selectData(rawData, countryList, name);
    });
}


let populationData;
getPopulationData().then(data => populationData = data);

//Selects data for a given list ofcountries from given dataset
//If more than 1 country is in the list, an average for all countries in the list is processed
const selectData = (data, countryList, name) => {
    name = name == undefined ? "averageOfCountries" : name;
    let countryData = [];
    //Select only countries from list
    data.forEach(country => {
        if(countryList.indexOf(country.ISO_A3) > -1) {
            //Convert string format of numbers
            country['value'] = parseFloat(country['value'])
            countryData.push(country)
        }
    })

    //No country selected
    if(countryList === null || countryList.length <= 0){
        return new Error("No country selected")
    }
    //More than 1 country selected -> return average data for given list of countries
    else if(countryList.length > 1){
      let averageCountries = {
          'country': name.replace(new RegExp("_", "g"), " "),
          'value': 0.0
      };

      let populationTotal = 0;
      countryData.forEach(country => {
          populationData.forEach(popData => {
              if(country.ISO_A3 === popData.ISO_A3){
                  averageCountries['value'] += (country.value * parseFloat(popData.value));
                  populationTotal += parseFloat(popData.value);
              }
          })

      })

      //Divide by total number of found countries to get the average
      averageCountries['value'] = averageCountries['value']/populationTotal;
      return [averageCountries];
    } else {
        //Only 1 country selected
        return countryData;
    }
}

const getPopulation = (countryList, name) => {
    name = name == undefined ? "averageOfCountries" : name;
    return getPopulationData().then(populationData => {
        let totalPopulation = {
            'country': name.replace(new RegExp("_", "g"), " "),
            'value': 0.0
        };
            countryList.forEach(country => {
            populationData.forEach(popData => {
                if(country === popData.ISO_A3){
                    totalPopulation.value += parseFloat(popData.value);
                }
            })
        })
        return [totalPopulation];
    });
}
