// Definitions of classes Hit, HitTT, HitRPC, and HitDT for hits of electronic detectors (ED)

class Hit { // base class for ED hits

  static checkId(jd) {

    if (!Utils.checkNumber(jd)) {
      alert("Hit::checkId()::Error: jd = " + jd + "!!!");
      return false;
    }

    return true;

  };

  static checkX(xx) {

    if (!Utils.checkNumber(xx)) {
      alert("Hit::checkX()::Error: xx = " + xx + "!!!");
      return false;
    }

    if ( (xx < -500) || (xx > 500) ) {
      alert("Hit::checkX()::Error: xx = " + xx + "!!!");
      return false;
    }

    return true;

  };

  static checkZ(zz) {

    if (!Utils.checkNumber(zz)) {
      alert("Hit::checkZ()::Error: zz = " + zz + "!!!");
      return false;
    }

    if ( (zz < -1000) || (zz > 1500) ) {
      alert("Hit::checkZ()::Error: zz = " + zz + "!!!");
      return false;
    }

    return true;

  };

  constructor(id, x, z) {

    if (!Hit.checkId(id)) return;
    if (!Hit.checkX(x)) return;
    if (!Hit.checkZ(z)) return;

    this._id = id;

    this._x = x;   // X or Y coordinate (depending on XZ or YZ view) in the reference system of the OPERA detector 
    this._z = z;   // Z coordinate in the reference system of the OPERA detector 

    this._initColor = "black";

    this._color = this._initColor;

  };

  x() { return this._x; };

  z() { return this._z; };

  id() { return this._id; };

  color(col) {

    if (col === undefined) return this._color;

    //if (col is not valid color) ???

    this._color = col;

  };

  resetColor() { this._color = this._initColor; };

};
//--------------------------------------------------------------------------

class HitTT extends Hit { // Hit of the Target Tracker (TT) detector

  static checkAmpl(ampl) {

    if (!Utils.checkNumber(ampl)) {
      alert("HitTT::checkAmpl()::Error: ampl = " + ampl + "!!!");
      return false;
    }

    if ( (ampl < 0) || (ampl > 500) ) {
      alert("HitTT::checkAmpl()::Error: ampl = " + ampl + "!!!");
      return false;
    }

    return true;

  };

  constructor(id, x, z, pe) {

    super(id, x, z);

    if (!HitTT.checkAmpl(pe)) return;

    this._pe = pe; // amplitude of the TT signal (in photo-electrons, p.e.) 

  };

  pe() { return this._pe; };

};
//--------------------------------------------------------------------------

class HitRPC extends Hit { // Hit of the RPC detector

  static checkClusterSize(clsize) {

    if (!Utils.checkNumber(clsize)) {
      alert("HitRPC::checkClusterSize()::Error: clsize = " + clsize + "!!!");
      return false;
    }

    if ( (clsize < 0) || (clsize > 500) ) {
      alert("HitRPC::checkClusterSize()::Error: clsize = " + clsize + "!!!");
      return false;
    }

    return true;

  }

  constructor(id, x, z, s) {

    super(id, x, z);

    if (!HitRPC.checkClusterSize(s)) return;

    this._s = s; // cluster size

  }

  s() { return this._s; }

};
//--------------------------------------------------------------------------

class HitDT extends Hit { // Hit of the HPT (drift tubes) detector

  static checkDriftDist(dist) {

    if (!Utils.checkNumber(dist)) {
      alert("HitDT::checkDriftDist()::Error: dist = " + dist + "!!!");
      return false;
    }

    if ( (dist < 0) || (dist > 10) ) {
      alert("HitDT::checkDriftDist()::Error: dist = " + dist + "!!!");
      return false;
    }

    return true;

  }

  constructor(id, x, z, d) {

    super(id, x, z);

    if (!HitDT.checkDriftDist(d)) return;

    this._d = d; // drift distance of the DT signal

  }

  d() { return this._d; }

};
//--------------------------------------------------------------------------

