var assert = require('assert');
const Loader = require("../loader.js") 

describe("OSM Loader", function() {
  it("#loadStreets returns all the streets with attributes", function () {
    var loader = new Loader("test/data/osm_line_load_test.geojson"); 
    var streets = loader.loadStreets();

    assert.equal(1, streets.length)
    for (var i in streets) {
      var street = streets[i];
      assert.equal("Scotch Line", street.name);
      assert.equal(true, street.bicycle);
      assert.equal("secondary", street.highway);
      assert.equal(true, street.segregated);
      assert.equal("lane", street.cycleway);
      assert.equal(2, street.lanes);
      assert.equal("50", street.maxspeed);
      assert.equal(false, street.oneway);

      var geometry = {"type": "LineString", "coordinates": [
        [ -76.2535182, 44.883976 ], [-76.2551164, 44.8829824], [-76.2562556, 44.8822714]
      ]}
      assert.deepEqual(geometry, street.geometry);
    }
  });

  it("#loadStreets doesn't fail when tags are null", function() {
    var loader = new Loader("test/data/osm_line_load_test_null_tag.geojson"); 
    var streets = loader.loadStreets();

    assert.equal(1, streets.length)
    var street = streets[0];

    assert.equal("Scotch Line", street.name);
    assert.equal(true, street.bicycle);
    assert.equal("secondary", street.highway);
    assert.equal(false, street.segregated);
    assert.equal(null, street.cycleway);
    assert.equal(null, street.lanes);
    assert.equal(null, street.maxspeed);
    assert.equal(false, street.oneway);

    var geometry = {"type": "LineString", "coordinates": [
      [ -76.2535182, 44.883976 ], [-76.2551164, 44.8829824], [-76.2562556, 44.8822714]
    ]}
    assert.deepEqual(geometry, street.geometry);
  });
});