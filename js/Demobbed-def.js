class Demobbed { // Demo version of a browser-based event display

  constructor() {

    this._evList     = [];    // Array of OPERA event IDs available for open data access
    this._evIndex    = -1;    // Index of the loaded event in the array (from 0 to evList.length - 1)
    this._evIndexMax = -1;    // Max index of the loaded event in the array (=== evList.length - 1)
    this._event      = {};    // Loaded (displayed) event

    this._mgrGeomED  = {};    // Contains parameters of the OPERA ED geometry

    this._mgrDrawED  = {};    // Manager hired for drawing of Electronic detector (2D) events

    this._mgrDrawECC = {};    // Manager hired for drawing of (3D) tracks found in emulsion

    this._showECC = 0;

  };

  evList(evlist) {

    if (evlist === undefined) return this._evList;

    if (!Array.isArray(evlist)) {
      alert("Demobbed::evList()::Error: evlist is not an Array!!!");
      return;
    }

    if (evlist.length > 1000) {
      alert("Demobbed::evList()::Error: evlist.length > 1000: " + evlist.length + "!!!");
      return;
    }

    this._evList = evlist;
    this._evIndex = 0;
    this._evIndexMax = evlist.length - 1;

  };

  evIndex(evindex) {

    if (evindex === undefined) return this._evIndex;

    if (!this.checkEvIndex(evindex)) return;

    this._evIndex = evindex;

  };

  event(ev) {

    if (ev === undefined) return this._event;

    if (typeof(ev) !== "object") {
      alert("Demobbed::event()::Error: ev is not an object!!!: typeof(ev) = " + typeof(ev) + "!!!");
      return;
    }

    this._event = ev;

  };

  resetEvent() { this._event = new Event(); };

  loadPrevOrNextEvent(dIndex) {

    if (dIndex === undefined) dIndex = 1; // by default load next event in the event list
    else if (!Utils.checkNumber(dIndex)) {
      alert("Demobbed::loadPrevOrNextEvent()::Error: dIndex is not a number!!!: dIndex = " + dIndex + "!!!");
      return;
    }

    let newIndex = this._evIndex + dIndex;

    if (!this.checkEvIndex(newIndex, false)) return;

    this._evIndex = newIndex;

    let evID = this._evList[newIndex];

    changeScrLoadEvent(evID); // External function defined in the loadEvent.js file

  };

  checkEvIndex(evindex, showAlerts) {

    if (showAlerts === undefined) showAlerts = true;

    if (!Utils.checkNumber(evindex)) {
      if (showAlerts) alert("Demobbed::checkEvIndex()::Error: evindex is not a number!!!: evindex = " + evindex + "!!!");
      return false;
    }

    if ( (evindex < 0) || (evindex > this._evIndexMax) ) {
      if (showAlerts)  alert("Demobbed::checkIndex()::Error: index is out of range: evindex = " + evindex + "!!!");
      return false;
    }

    return true;

  };

  mgrGeomED(mgrgeom) {

    if (mgrgeom === undefined) return this._mgrGeomED;

    if (typeof(mgrgeom) !== "object") {
      alert("Demobbed::mgrGeomED()::Error: mgrgeom is not an object: mgrgeom = " + mgrgeom + "!!!");
      return;
    }

    this._mgrGeomED = mgrgeom;

  };

  mgrDrawED(mgrdraw) {

    if (mgrdraw === undefined) return this._mgrDrawED;

    if (typeof(mgrdraw) !== "object") {
      alert("Demobbed::mgrDrawED()::Error: mgrdraw is not an object: mgrdraw = " + mgrdraw + "!!!");
      return;
    }

    this._mgrDrawED = mgrdraw;

  };

  mgrDrawECC(mgrdraw) {

    if (mgrdraw === undefined) return this._mgrDrawECC;

    if (typeof(mgrdraw) !== "object") {
      alert("Demobbed::mgrDrawECC()::Error: mgrdraw is not an object: mgrdraw = " + mgrdraw + "!!!");
      return;
    }

    this._mgrDrawECC = mgrdraw;

  };

  showECC(show) {

    if (show === undefined) return this._showECC;

    if (!Utils.checkNumber(show)) {
      alert("Demobbed::showECC()::Error: show is not a number!!!: show = " + show + "!!!");
      return;
    }

    this._showECC = show;

  };

};
