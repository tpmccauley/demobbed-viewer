class Utils { // A class with some simple function used by other class methods

  static checkNumber(n) {
  
    if ( (typeof(n) !== "number") || isNaN(n) ) {
      alert("Utils::checkNumber()::Error: n is not a number: n = " + n + "!!!");
      return false;
    }
  
    return true;
  };
  
  static checkIP(ip, n) {
  
    if (!Utils.checkNumber(ip)) {
      alert("Utils::checkIP()::Error: ip is not a number: ip = " + ip + "!!!");
      return false;
    }
  
    if (n === undefined) n = 2; //!!!
    else {
  
      if (!Utils.checkNumber(n)) {
        alert("Utils::checkIP()::Error: n is not a number: n = " + n + "!!!");
        return false;
      }
  
      if ( (n != 2) && (n != 3) ) {
        alert("Utils::checkIP()::Error: n is strange: n = " + n + "!!!");
        return false;
      }
    }
  
    if ( (ip != 0) && (ip != 1) ) {
  
      if (n != 3) {
        alert("Utils::checkIP()::Error: ip is strange: ip = " + ip + "!!!");
        return false;
      }
  
      if (ip != 2) {
        alert("Utils::checkIP()::Error: ip is strange: ip = " + ip + "!!!");
        return false;
      }
  
    }
  
    return true;
   
  };

  static checkPos(pos, ip) {

    if (!Utils.checkNumber(pos)) {
      alert("Utils::checkPos()::Error: pos is not a number: " + pos + "!!!");
      return false;
    }

    if (ip === undefined) ip = 2;
    else if (!Utils.checkIP(ip, 3)) return false;

    let posMin = [0, 0, 0];
    let posMax = [125000, 100000, 80000];

    if ( (pos < posMin[ip]) || (pos > posMax[ip]) ) {
      alert("Utils::checkPos()::Error: pos is outside the OPERA brick: " + pos + "!!!");
      return false;
    }

    return true;

  };

  static checkPosGlob(pos, ip) {

    if (!Utils.checkNumber(pos)) {
      alert("Utils::checkPosGlob()::Error: pos is not a number: " + pos + "!!!");
      return false;
    }

    if (ip === undefined) ip = 2;
    else if (!Utils.checkIP(ip, 3)) return false;

    if ( (pos < DetCfg.globDetBounds().xyzMin[ip]) || (pos > DetCfg.globDetBounds().xyzMax[ip]) ) {
      alert("Utils::checkPosGlob()::Error: pos is outside the OPERA detector: " + pos + "!!!");
      return false;
    }

    return true;

  };



};
//-----------------------------------------------------------------------------
