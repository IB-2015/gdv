var express = require('express');
var fs = require("fs");
var d3 = require("d3");
var countries = [];
var homicide = [];
var d3_countries;
var d3_homicide;
var app = express();


app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

fs.readFile("resources/geoscheme.csv", "utf8", function(error, data) {
  d3_countries = d3.csvParse(data);
  d3_countries.forEach(function(d) {
    countries.push(d);
    console.log(countries.length + '.) ' + d['Country or Area']);
  })
  console.log("geoscheme.csv parsed");
});

fs.readFile("resources/homicide.csv", "utf8", function(error, data) {
  d3_homicide = d3.csvParse(data);
  d3_homicide.forEach(function(d) {
    homicide.push(d);
    h = "";
    for (i = 2000; i <= 2016; i++) {
      h += parseFloat(d["" + i]) + " (" + i + ") ";
    }
    console.log(homicide.length + '.) ' + d["UNODC Name"] + ' | ' + h);
  })
  console.log("homicide.csv parsed");
});
