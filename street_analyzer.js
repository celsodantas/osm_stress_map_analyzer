class StreetAnalyzer {
  analyze(street) {
    street.stressLevel = 3; // setting max stress level for now

    if (street.bicycle && street.segregated) {
      street.stressLevel = 1;
    }

    // TODO add more stress level anaylisis for other levels of stress

    return street; 
  }
};

module.exports = StreetAnalyzer;