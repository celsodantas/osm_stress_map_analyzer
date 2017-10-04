var assert = require('assert');
const Loader = require("../loader.js") 
const StreetAnalyzer = require("../street_analyzer.js")

describe("Stress Map Analyzer", function () {
  it("weights < 10 if street has segregated bike lane", function () {
    var loader = new Loader("test/data/osm_line_low_stress.geojson");
    var streets = loader.loadStreets();

    var street = streets[0];
    assert.notEqual(null, street);

    var streetAnalyzer = new StreetAnalyzer();
    street = streetAnalyzer.analyze(street);

    assert.equal(1, street.stressLevel);
  }) 
})