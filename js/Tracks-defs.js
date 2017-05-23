class Track {

  static checkSlope(slope, ip) {

    if (ip === undefined) ip = 2;
    else if (!Utils.checkIP(ip, 3)) return false;

    if (!Utils.checkNumber(slope)) {
      alert("Track::checkSlope()::Error: slope[" + ip + "] is not a number: " + slope + "!!!");
      return false;
    }

    if ( (slope < -0.7) || (slope > 0.7) ) {
      alert("Track::checkSlope()::Error: slope[" + ip + "] is strange: " + slope + "!!!");
      return false;
    }

    return true;

  };

  constructor(pos, posGlob, slope) {

    for (let ip = 0; ip < 3; ip++) {

      if (!Utils.checkPos(pos[ip], ip)) {
        alert("Track::constructor()::Error: pos[" + ip + "] is not correct!");
        return;
      }

      if (!Utils.checkPosGlob(posGlob[ip], ip)) {
        alert("Track::constructor()::Error: posGlob[" + ip + "] is not correct!");
        return;
      }

      if (ip == 2) continue; //!!!

      if (!Track.checkSlope(slope[ip], ip)) return;
    }

    this._pos = pos;         // [posX, posY, posZ] Position in the OPERA brick system of reference (in micrometers)

    this._posGlob = posGlob; // [posGlobX, posGlobY, posGlobZ] Position in the OPERA detector system of reference (in cm)

    // Equations of a track:
    // X = Z*Axy[0] + Bxy[0], Y = Z*Axy[1] + Bxy[1]

    this._Axy = slope; // [slopeXZ, slopeYZ] --- tangents of the track angles

    this._Bxy = [

      pos[0] - this._Axy[0]*pos[2],
      pos[1] - this._Axy[1]*pos[2]

    ];

  };

  pos(ps) {

    if (ps === undefined) return this._pos;

    if (!Array.isArray(ps)) {
      alert("Track::pos()::Error: ps is not an Array!!!");
      return;
    }

    if (ps.length != 3) {
      alert("Track::pos()::Error: Length of array of ps is != 3:" + ps.length + "!!!");
      return false;
    }

    this._pos = ps;

  };

  posGlob(ps) {

    if (ps === undefined) return this._posGlob;

    if (!Array.isArray(ps)) {
      alert("Track::posGlob()::Error: ps is not an Array!!!");
      return;
    }

    if (ps.length != 3) {
      alert("Track::posGlob()::Error: Length of array of ps is != 3:" + ps.length + "!!!");
      return false;
    }

    this._posGlob = ps;

  };

  Axy(ip) {

    if (ip === undefined) return this._Axy;

    if (!Utils.checkIP(ip)) {
      alert("Track::Axy()::Error: ip is wrong: ip = " + ip + "!!!");
      return;
    }

    return this._Axy[ip];

  };

  Bxy(ip) {

    if (ip === undefined) return this._Bxy;

    if (!Utils.checkIP(ip)) {
      alert("Track::Bxy()::Error: ip is wrong: ip = " + ip + "!!!");
      return;
    }

    return this._Bxy[ip];

  };

  static colors(partId) {

    switch (partId) {

      case 1: return "blue";    // for a track of muon
      case 2: return "red";     // for a track of hadron
      case 3: return "green";   // for a track of electron
      case 4: return "black";   // for a black track
      case 5: return "black";   // for a back black track
      case 6: return "dimgray"; // for a gray track
      case 7: return "dimgray"; // for a back gray track
      case 8: return "orange";  // for a track of tau lepton

      default: return "white";  // for other tracks

    }

  };

};
//------------------------------------------------------------------------------

class TrackMu extends Track {

  static checkMomentum(mom) {

    if (!Utils.checkNumber(mom)) {
      alert("TrackMu::checkMomentum()::Error: mom is not a number: " + pos + "!!!");
      return false;
    }

    if ( (mom <= 0) || (mom > 1000) ) {
      alert("TrackMu::checkMomentum()::Error: mom is strange: " + mom + "!!!");
      return false;
    }

    return true;

  };

  constructor(posX, posY, posZ, slopeXZ, slopeYZ, mom) {

    // Position [X, Y, Z] of a nu interaction vertex in the OPERA detector system of reference!
    super(posX, posY, posZ, slopeXZ, slopeYZ);

    if (!TrackMu.checkMomentum(mom)) return;

    this._momentum = mom;  // Muon momentum (in GeV/c)

  };

  momentum() { return this._momentum; };

};
//------------------------------------------------------------------------------

class TrackECC extends Track {

  static checkID(jd) {

    if (!Utils.checkNumber(jd)) {
      alert("TrackECC::checkID()::Error: jd is not a number: jd = " + jd + "!!!");
      return false;
    }

    if ( (jd < 0) || (jd > 20) ) {
      alert("TrackECC::checkID()::Error: jd is strange: jd = " + jd + "!!!");
      return false;
    }

    return true;

  };

  static checkPartID(jd) {

    if (!Utils.checkNumber(jd)) {
      alert("TrackECC::checkPartID()::Error: jd is not a number: jd = " + jd + "!!!");
      return false;
    }

    if ( (jd < 1) || (jd > 8) ) {
      alert("TrackECC::checkPartID()::Error: jd is strange: jd = " + jd + "!!!");
      return false;
    }

    return true;

  };

  constructor(id, partId, posX, posY, posZ, slopeXZ, slopeYZ) {

    // Position [X, Y, Z] of a track in the OPERA brick system of reference!
    super(posX, posY, posZ, slopeXZ, slopeYZ);

    if (!TrackECC.checkID(id)) return;
    if (!TrackECC.checkPartID(partId)) return;

    this._id = id;

    this._partId = partId; // particle Id

  };

  id() { return this._id; };

  partId() { return this._partId; };

};
//------------------------------------------------------------------------------
