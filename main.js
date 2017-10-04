// this is test file
// it will eventually become the main/start of the app

const AnalysisExporter = require("./analysis_exporter.js");
const StreetAnalyzer = require("./street_analyzer.js");
const Loader = require("./loader.js");

// processing file should be received from the command line
var filePath = "test/data/osm_line_load_test.geojson"; // using test file just for dev, for now
var loader = new Loader(filePath);
var streets = loader.loadStreets();

var streetAnalyzer = new StreetAnalyzer();

for (var i in streets) {
  var street = streets[i];
  street = streetAnalyzer.analyze(street);
}

var analysisExporter = new AnalysisExporter({
  "level1": "output/stress_level_1.geojson",
  "level2": "output/stress_level_2.geojson",
  "level3": "output/stress_level_3.geojson"
});

analysisExporter.export(streets);