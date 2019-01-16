const draw = (left, right) => {
  lname = left.name
  lcountries = left.countries
  lupper_name = left.upper_name
  lupper_layer_countries = left.upper_countries
  ldataObject = {};
  ldataObjectUpper = {};
  rname = right != null ? right.name : "";
  rcountries = right != null ? right.countries : []
  rupper_name = right != null ? right.upper_name : ""
  rupper_layer_countries = right != null ? right.upper_countries : []
  rdataObject = {};
  rdataObjectUpper = {};
  promises = [getData(lcountries), getData(lupper_layer_countries), getData(rcountries), getData(rupper_layer_countries)]
  Promise.all(promises).then(function(data) {
    // console.log(data);
    // dataObject.assault = data[0];
    ldataObject.homicide = data[0][0];
    ldataObject.education = data[0][1];
    ldataObject.gdp = data[0][2];
    ldataObject.gini = data[0][3];
    ldataObjectUpper.homicide = data[1][0];
    ldataObjectUpper.education = data[1][1];
    ldataObjectUpper.gdp = data[1][2];
    ldataObjectUpper.gini = data[1][3];
    // console.log(Array.isArray(ldataObjectUpper.gini));

    // dataObject.assault = data[0];
    rdataObject.homicide = data[2][0];
    rdataObject.education = data[2][1];
    rdataObject.gdp = data[2][2];
    rdataObject.gini = data[2][3];
    rdataObjectUpper.homicide = data[3][0];
    rdataObjectUpper.education = data[3][1];
    rdataObjectUpper.gdp = data[3][2];
    rdataObjectUpper.gini = data[3][3];
    // console.log(Array.isArray(rdataObjectUpper.gini));
    lrender_data = build_render_date("#country1", lname, ldataObject, lupper_name, ldataObjectUpper, Array.isArray(ldataObjectUpper.gini));
    rrender_data = build_render_date("#country2", rname, rdataObject, rupper_name, rdataObjectUpper, Array.isArray(rdataObjectUpper.gini));

    lrender_data.barMax = Math.max(lrender_data.bar[0].homicide, lrender_data.bar[1].homicide, rrender_data.bar[0].homicide, rrender_data.bar[1].homicide);
    rrender_data.barMax = Math.max(lrender_data.bar[0].homicide, lrender_data.bar[1].homicide, rrender_data.bar[0].homicide, rrender_data.bar[1].homicide);
    if (lrender_data.bar[0].name != "none")
      drawRadarChart("#country1", lrender_data);
    if (rrender_data.bar[0].name != "none")
      drawRadarChart("#country2", rrender_data);
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

const build_render_date = (id, name, dataObject, upper_name, dataObjectUpper, build) => {
  // console.log(dataObject);
  if (build) {
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
        name: name,
        axes: [
          {axis: "Education", value: education.value *100},
          {axis: "Wealth", value: (gdp.value / 126655.598081739) * 100},
          {axis: "Distribution of Wealth", value: 100 - gini.value}
        ]
      },
      {
        className: "upper", // optional can be used for styling
        name: upper_name,
        axes: [
          {axis: "education", value: upper_education.value *100},
          {axis: "gdp", value: (upper_gdp.value / 126655.598081739) * 100},
          {axis: "gini", value: 100 - upper_gini.value}
        ]
      }],
      "bar": [{"name": name, "homicide": homicide.value}, {"name": upper_name, "homicide": upper_homicide.value}]
    }
  } else {
    return {
      "radar" : [
      {
        className: "none", // optional can be used for styling
        name: "none",
        axes: [
          {axis: "education", value: 0},
          {axis: "gdp", value: 0},
          {axis: "gini", value: 0}
        ]
      },
      {
        className: "none", // optional can be used for styling
        name: "none",
        axes: [
          {axis: "education", value: 0},
          {axis: "gdp", value: 0},
          {axis: "gini", value: 0}
        ]
      }],
      "bar": [{"name": "none", "homicide": 0}, {"name": "none", "homicide": 0}]
    }
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
