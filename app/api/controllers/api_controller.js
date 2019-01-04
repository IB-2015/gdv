//const mongoose = require('mongoose');
const config = require('../../config');
var fs = require('fs');
var d3 = require("d3");



exports.getCrimeData = (req, res, next) => {
    var homicide = [];
    var d3_homicide;

    fs.readFile("./api/data/gcs_assault.csv", "utf8", (error, data) => {
        d3_homicide = d3.csvParse(data);
        res.status(200).json(d3_homicide)
      });   
}