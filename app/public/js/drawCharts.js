const draw = (id, countries) => {

  dataObject = null;
  getData(countries).then(function(data) {
    dataObject.assault = data[0];
    dataObject.homicide = data[1];
    dataObject.education = data[2];
    dataObject.gdp = data[3];
    dataObject.gini = data[4];
    render_data = build_render_date(dataObject);
    drawRadarChart(id, default_data);
  })


  console.log("LINE 207 um text position zu ändern !!!!");
  console.log("LINE 83 bzw 216 um skalierung zu ändern !!!!");

}

const getData = (countries) => {
  dataObject = {}
  promises = []
  promises.push(getAssaultData(countries));
  promises.push(getHomicideData(countries));
  promises.push(getEducationData(countries));
  promises.push(getGDPData(countries));
  promises.push(getGINIData(countries));
  return Promise.all(promises);
}

const build_render_date = (dataObject) => {
  console.log(dataObject);
  year = 2005;
  assault = dataObject.assault[0];
  homicide = dataObject.homicide[0];
  education = dataObject.education[0];
  gdp = dataObject.gdp[0];
  gini = dataObject.gini[0];

  console.log(assault[year]);

  return [
    {
      className: 'Germany', // optional can be used for styling
      axes: [
        {axis: "assault", value: homicide[year]},
        {axis: "homicide", value: homicide[year]},
        {axis: "education", value: education[year]},
        {axis: "gdp", value: gdp[year]},
        {axis: "gini", value: gini[year]}
      ]
    }
  ]
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
