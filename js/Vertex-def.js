class Vertex {

  constructor(pos, posGlob) {

    for (let ip = 0; ip < 3; ip++) {

      if (!Utils.checkPos(pos[ip], ip)) {
        alert("Vertex::constructor()::Error: pos[" + ip + "] is not correct!");
        return;
      }

      if (!Utils.checkPosGlob(posGlob[ip], ip)) {
        alert("Vertex::constructor()::Error: posGlob[" + ip + "] is not correct!");
        return;
      }

    }

    this._pos = pos;         // [posX, posY, posZ] Position in the OPERA brick system of reference (in micrometers)

    this._posGlob = posGlob; // [posGlobX, posGlobY, posGlobZ] Position in the OPERA detector system of reference (in cm)

  };

  pos(ps) {

    if (ps === undefined) return this._pos;

    if (!Array.isArray(ps)) {
      alert("Vertex::pos()::Error: ps is not an Array!!!");
      return;
    }

    if (ps.length != 3) {
      alert("Vertex::pos()::Error: Length of array of ps is != 3:" + ps.length + "!!!");
      return false;
    }

    this._pos = ps;

  };

  posGlob(ps) {

    if (ps === undefined) return this._posGlob;

    if (!Array.isArray(ps)) {
      alert("Vertex::posGlob()::Error: ps is not an Array!!!");
      return;
    }

    if (ps.length != 3) {
      alert("Vertex::posGlob()::Error: Length of array of ps is != 3:" + ps.length + "!!!");
      return false;
    }

    this._posGlob = ps;

  };

};
