const fs = require('fs').promises;
const d3 = require("d3");

const DATA_PATH = './api/data/statistics/';

const loadAllData = () => {
    var files = [];
    return fs.readdir("./api/data/statistics").then(filenames => {
        filenames.forEach((name) => {
            let filename = './api/data/statistics/'+name;
            files.push(fs.readFile(filename, "utf8"));
        })

        return Promise.all(files).then(function(values) {
            return values
          });
    })
}

const loadHomicide = () => {

}

exports.getAllStatisticsData = (req, res, next) => {
    const data = loadAllData()
        Promise.all([data]).then(function(values) {
            res.status(200).json(values)
          });   
}

exports.getHomicideData = (req, res, next) => {
    fs.readFile(DATA_PATH+'homicide.csv', "utf8").then(data => res.status(200).json(data))
}

exports.getAssaultData = (req, res, next) => {
    fs.readFile(DATA_PATH+'gcs_assault.csv', "utf8").then(data => res.status(200).json(data))
}
