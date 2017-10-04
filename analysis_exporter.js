var fs = require("fs")

class AnalysisExporter {
  constructor(paths) {
    this.paths = paths;
  }

  export (streets) {
    this.makeOutputDir("./output");

    // TODO use some json to geojson converter here
    // similar to https://www.npmjs.com/package/geojson
    var level1Streets = this.filterStress(streets, 1);
    this.writeToDisk(this.paths.level1, JSON.stringify(level1Streets));
  }

  filterStress(streets, level) {
    return streets.filter(function (s) { return s.stressLevel == level })
  }

  writeToDisk(path, content) {
    fs.writeFile(path, content, function (err) {
      if (err) { throw err; }
    })
  }

  makeOutputDir(folderName) {
    fs.mkdir(folderName, function (err) {
      if (err) { throw err; }
    })
  }
}

module.exports = AnalysisExporter;