class DetCfg { // Parameters of the OPERA detector configuration

  static globDetBounds() {

    return { // global OPERA ED bounds for the whole SVG viewport

      xyzMin: [-600, -600, -1000], // cm    yMin=xMin!!!
      xyzMax: [ 560,  560,  1100]  // cm    yMax=xMax!!!

    };

  };

  static brickDims(ip) { // parameters of an OPERA ECC brick
    switch(ip) {
      case 0:
        return 12.827; // cm
        break;
      case 1:
        return 10.179; // cm
        break;
      case 2:
        return  8.000; // cm
        break;
      default:
        alert("DetCfg::brickDims()::Error: ip is wrong!!!: ip = " + ip + "!!!");
    }
  };

  static nbOfBrickWallsInSM1() { return 27; };
  static nbOfBrickWallsInSM2() { return 26; };

  static nbOfBrickRows()     { return 56; };
  static nbOfBrickColumns()  { return 52; };

  static brickWallToWallDistZ() { return 13.4; }; // cm
  //static distBrickToBrick() { return 0.1; }; // cm

  static TTstripWidth()  { return 2.6; }; // cm
  static TTstripDepth()  { return 1.4; }; // cm
  static RPCstripDepth() { return 0.7; }; // cm


  //static emulsionFilmWidth() { return 295; }; // 205 +2*45 micrometers

  static plateToPlateDistECC() { return 1300; }; // micrometers

};
