var fs = require("fs");

class Loader {
  constructor(path) {
    var content = fs.readFileSync(path, "utf8");   
    this.raw_data = JSON.parse(content); 
  }

  loadStreets() {
    var streets = [];

    for(var i in this.raw_data.features) {
      var feature = this.raw_data.features[i];
      var street = this.transformFromOSM(feature);

      streets.push(street);
    }

    return streets;
  }

  transformFromOSM(osm_feature) {
    var properties = osm_feature.properties;
    var parsedTags = this.convertTagToJSON(osm_feature.properties.tags);

    return {
      "name": properties.name,
      "bicycle": properties.bicycle == "yes",
      "highway": properties.highway,
      "oneway": properties.oneway == "yes",
      "maxspeed": parsedTags.maxspeed || null,
      "segregated": parsedTags.segregated == "yes",
      "cycleway": parsedTags.cycleway || null,
      "lanes": parsedTags.lanes || null,
      "geometry": osm_feature.geometry
    }
  }

  convertTagToJSON(tag) {
    if (tag == null) { return {}; }

    var match = tag.match(/([\w:]+)/g);

    var json = {};
    for(var i = 0; i < match.length; i += 2) {
      var key = match[i]; // removing " from start and end 
      var value = match[i+1]; // removing " from start and end

      json[key] = value; 
    }
    
    return json;
  }
};

module.exports = Loader