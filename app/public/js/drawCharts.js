const draw = (id, countries) => {
  dataObject = null;
  getData(countries).then(function(data) {
    console.log(data);
    // dataObject.assault = data[0];
    dataObject.homicide = data[0];
    dataObject.education = data[1];
    dataObject.gdp = data[2];
    dataObject.gini = data[3];
    render_data = build_render_date(dataObject);
    drawRadarChart(id, render_data);
  })


  console.log("LINE 207 um text position zu ändern !!!!");
  console.log("LINE 83 bzw 216 um skalierung zu ändern !!!!");

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

const build_render_date = (dataObject) => {
  year = 2006;
  name = dataObject.homicide[0].country;
  homicide = dataObject.homicide[0];
  education = dataObject.education[0];
  gdp = dataObject.gdp[0];
  gini = dataObject.gini[0];
  console.log(education.value);
  console.log(gdp.value);
  console.log(gini.value);
  return {
    "radar" : [
    {
      className: name, // optional can be used for styling
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
    "bar": [{"name": name, "homicide": homicide.value}, {"name": "Europe", "homicide": 11.4}]
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
