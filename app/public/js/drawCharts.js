const draw = (id, name, countries, upper_name, upper_layer_countries) => {
  dataObject = {};
  dataObjectUpper = {};
  promises = [getData(countries), getData(upper_layer_countries)]
  Promise.all(promises).then(function(data) {
    // console.log(data);
    // dataObject.assault = data[0];
    dataObject.homicide = data[0][0];
    dataObject.education = data[0][1];
    dataObject.gdp = data[0][2];
    dataObject.gini = data[0][3];
    dataObjectUpper.homicide = data[1][0];
    dataObjectUpper.education = data[1][1];
    dataObjectUpper.gdp = data[1][2];
    dataObjectUpper.gini = data[1][3];
    render_data = build_render_date(id, name, dataObject, upper_name, dataObjectUpper);
    drawRadarChart(id, render_data);
  })


  // console.log("LINE 207 um text position zu ändern !!!!");
  // console.log("LINE 83 bzw 216 um skalierung zu ändern !!!!");

}

const getData = (countries) => {
  dataObject = {}
  promises = []
  // promises.push(getAssaultData(countries));
  promises.push(getHomicideData(countries));
  promises.push(getEducationData(countries));
  promises.push(getGDPData(countries));
  promises.push(getGINIData(countries));
  return Promise.all(promises);
}

const build_render_date = (id, name, dataObject, upper_name, dataObjectUpper) => {
  // console.log(dataObject);
  name = dataObject.gini[0].country == undefined ? name : dataObject.gini[0].country;
  name = name.replace(new RegExp("_", "g"), " ")
  homicide = dataObject.homicide[0];
  education = dataObject.education[0];
  gdp = dataObject.gdp[0];
  gini = dataObject.gini[0];

  upper_name = upper_name.replace(new RegExp("_", "g"), " ")
  upper_homicide = dataObjectUpper.homicide[0];
  upper_education = dataObjectUpper.education[0];
  upper_gdp = dataObjectUpper.gdp[0];
  upper_gini = dataObjectUpper.gini[0];

  return {
    "radar" : [
    {
      className: id.split('#')[1], // optional can be used for styling
      name: name.replace(new RegExp("_", "g"), " "),
      axes: [
        {axis: "education", value: education.value *100},
        {axis: "gdp", value: (gdp.value / 126655.598081739) * 100},
        {axis: "gini", value: 100 - gini.value}
      ]
    },
    {
      className: "Test", // optional can be used for styling
      axes: [
        {axis: "education", value: 0.25 *100},
        {axis: "gdp", value: (12568 / 126655.598081739) * 100},
        {axis: "gini", value: 100 - 50.0}
      ]
    }],
    "bar": [{"name": name, "homicide": homicide.value}, {"name": upper_name, "homicide": upper_homicide.value}]
  }

  // return [
  //   {
  //     className: dataObject.country, // optional can be used for styling
  //     axes: [
  //       {axis: "assault", value: homicide[year]},
  //       {axis: "homicide", value: homicide[year]},
  //       {axis: "education", value: education[year]},
  //       {axis: "gdp", value: gdp[year]},
  //       {axis: "gini", value: gini[year]}
  //     ]
  //   }
  // ]
}
const default_data = [
  {
    className: 'Germany', // optional can be used for styling
    axes: [
      {axis: "assault", value: 13},
      {axis: "homicide", value: 6},
      {axis: "education", value: 5},
      {axis: "gdp", value: 9},
      {axis: "gini", value: 2}
    ]
  }
];
