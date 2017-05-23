//dmECC == demobbed.mgrDrawECC() !!!
//gmED  == demobbed.mgrGeomED()  !!!
//---------------------------------------

dmECC.initGraphics = function() {

  let canvWidth  = dmED.canvMainWidth(); //MMM
  //let canvWidth  = 400;
  let canvHeight = 0.618*canvWidth; //!!!

  //dmECC.camera(new THREE.PerspectiveCamera(70, canvWidth/canvHeight, 0.1, 20000));

  dmECC.camera(new THREE.OrthographicCamera(-1800, 4200, 1854, -1854, 0, 15000));
  //dmECC.cameraInset(new THREE.OrthographicCamera(-900, 2100, 927, -927, 0, 10000));
  dmECC.cameraInset(new THREE.OrthographicCamera(-1500, 1500, 1427, -427, 0, 10000));

  dmECC.scene(new THREE.Scene());
  dmECC.sceneInset(new THREE.Scene());

  dmECC.initRenderers(canvWidth, canvHeight);

  dmECC.initVertexPoint();

  dmECC.initTrackLineProperties();

  dmECC.groupOfTrackLines(new THREE.Group());

  dmECC.initGroupOfAxes();

};
//------------------------------------------------------------------------------

dmECC.initRenderers = function(canvWidth, canvHeight) {

  let canvasECC = document.getElementById("canvas-ECC");
  let canvasAxesECC = document.getElementById("canvas-axes-ECC");

  dmECC.renderer(new THREE.WebGLRenderer( { canvas: canvasECC, antialias: true, alpha: true } ));
  dmECC.rendererInset(new THREE.WebGLRenderer( { canvas: canvasAxesECC, antialias: true, alpha: true } ));

  dmECC.renderer().setPixelRatio(window.devicePixelRatio);
  dmECC.rendererInset().setPixelRatio(window.devicePixelRatio);

  dmECC.renderer().setSize(canvWidth, canvHeight);
  dmECC.rendererInset().setSize(canvWidth/2, canvHeight/2);

  dmECC.renderer().setClearColor(0xFAFAFA);
  dmECC.rendererInset().setClearColor(0xFAFAFA);

  dmECC.renderer().gammaInput  = true;
  dmECC.renderer().gammaOutput = true;

  dmECC.rendererInset().gammaInput  = true;
  dmECC.rendererInset().gammaOutput = true;

};
//------------------------------------------------------------------------------

dmECC.initVertexPoint = function() {

  let vertexGeometry = new THREE.SphereGeometry(20, 32, 32);

  let vertexMaterial = new THREE.MeshBasicMaterial( {color: 0xFF3300} );

  dmECC.vertexPoint(new THREE.Mesh(vertexGeometry, vertexMaterial));

};
//------------------------------------------------------------------------------

dmECC.initGroupOfAxes = function() {

  dmECC.groupOfAxes(new THREE.Group());

  //let rx = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), dmECC.vecOrigin(), 1000, 0xff0000, 0.04, 0.04);

  let rx = new three3DExtras.tubeLine([0, 0, 0], [1000, 0, 0], 8, "red"); 
  let gy = new three3DExtras.tubeLine([0, 0, 0], [0, 1000, 0], 8, "green"); 
  let bz = new three3DExtras.tubeLine([0, 0, 0], [0, 0, 1000], 8, "blue"); 

  dmECC.groupOfAxes().add(rx.getObject3D());
  dmECC.groupOfAxes().add(gy.getObject3D());
  dmECC.groupOfAxes().add(bz.getObject3D());

  let font_loader = new THREE.FontLoader();
  font_loader.load('./fonts/helvetiker_regular.typeface.json', function(font) {

    var tps = {size:110, height:10, font:font};

    var x_geo = new THREE.TextGeometry('X', tps);
    var y_geo = new THREE.TextGeometry('Y', tps);
    var z_geo = new THREE.TextGeometry('Z', tps);

    var x_material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var x_text = new THREE.Mesh(x_geo, x_material);
    x_text.position.x = 980;
    x_text.position.y =  50;
    x_text.position.z =  50;
    x_text.rotation.y = -1.57;

    var y_material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var y_text = new THREE.Mesh(y_geo, y_material);
    y_text.position.y = 900;
    y_text.position.z =  50;
    y_text.rotation.y = -1.57;

    var z_material = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    var z_text = new THREE.Mesh(z_geo, z_material);
    z_text.position.y =  50;
    z_text.position.z = 920;
    z_text.rotation.y = -1.57;

    dmECC.groupOfAxes().add(x_text);
    dmECC.groupOfAxes().add(y_text);
    dmECC.groupOfAxes().add(z_text);

  });

};
//------------------------------------------------------------------------------

dmECC.initTrackLineProperties = function() {

  dmECC.trackLinePars()[1] = { // for a track of muon

    color:  Track.colors(1),
    length: 10*DetCfg.plateToPlateDistECC(),
    //width:  5
    width:  12

  };

  dmECC.trackLinePars()[2] = { // for a track of hadron

    color:  Track.colors(2),
    length: 10*DetCfg.plateToPlateDistECC(),
    //width:  5
    width:  12

  };

  dmECC.trackLinePars()[3] = { // for a track of electron

    color:  Track.colors(3),
    length: 3*DetCfg.plateToPlateDistECC(),
    //width:  5
    width:  12

  };

  dmECC.trackLinePars()[4] = { // for a black track

    color:  Track.colors(4),
    length: 1*DetCfg.plateToPlateDistECC(),
    //width:  7
    width:  17

  };

  dmECC.trackLinePars()[5] = { // for a back black track

    color:  Track.colors(5),
    length: 1*DetCfg.plateToPlateDistECC(),
    //width:  7
    width:  17

  };

  dmECC.trackLinePars()[6] = { // for a gray track

    color:  Track.colors(6),
    length: 1.5*DetCfg.plateToPlateDistECC(),
    //width:  7
    width:  17

  };

  dmECC.trackLinePars()[7] = { // for a back gray track

    color:  Track.colors(7),
    length: 1.5*DetCfg.plateToPlateDistECC(),
    //width:  7
    width:  17

  };

  dmECC.trackLinePars()[8] = { // for a track of tau lepton

    color:  Track.colors(8),
    length: 0.7*DetCfg.plateToPlateDistECC(),
    //width:  7
    width:  17

  };

};
//------------------------------------------------------------------------------

dmECC.drawEvent = function() {

  dmECC.scene().add(dmECC.vertexPoint());

  dmECC.drawTracks();

  dmECC.sceneInset().add(dmECC.groupOfAxes())

  //dmECC.camera().position.set(-3000, 0, 1000);          // for perspective camera
  //dmECC.camera().lookAt(new THREE.Vector3(0, 0, 1000)); // for perspective camera

  dmECC.camera().position.set(-2000, 200, 200);
  dmECC.cameraInset().position.set(-2000, 200, 200);

  dmECC.camera().lookAt(dmECC.vecOrigin());
  dmECC.cameraInset().lookAt(dmECC.vecOrigin());

  dmECC.renderer().render(dmECC.scene(), dmECC.camera());
  dmECC.rendererInset().render(dmECC.sceneInset(), dmECC.cameraInset());

};
//------------------------------------------------------------------------------

dmECC.startAnimation = function() {

  dmECC.animationFrameID(requestAnimationFrame(dmECC.startAnimation));

  dmECC.groupOfTrackLines().rotation.y += 0.004;

  dmECC.groupOfAxes().rotation.y += 0.004;

  dmECC.renderer().render(dmECC.scene(), dmECC.camera());
  dmECC.rendererInset().render(dmECC.sceneInset(), dmECC.cameraInset());

};
//------------------------------------------------------------------------------

dmECC.pauseAnimation = function() {

  cancelAnimationFrame(dmECC.animationFrameID());

};
//------------------------------------------------------------------------------

dmECC.drawTracks = function() {

  let evTracks = demobbed.event().tracksECC();

  let vertPos = demobbed.event().vertex()[0].pos();

  let nbOfTracks = evTracks.length;

  for (let it = 0; it < nbOfTracks; it++) {

    let trPartId = evTracks[it].partId();

    let trPos = evTracks[it].pos();
    let trAxy = evTracks[it].Axy();

    let trPars = dmECC.trackLinePars()[trPartId];

    let zPlate = trPos[2] - vertPos[2];

    let trBeg = [0, 0, 0];
    let trEnd = [0, 0, 0];

    if (zPlate >= 0) {

      trBeg[2] = (trPartId === 3) ? 900 : 30; // an electron comes not from the vertex itself
      trEnd[2] = trBeg[2] + trPars.length;

    }
    else {

      trEnd[2] = (trPartId === 3) ? -900 : -30; // an electron comes not from the vertex itself
      trBeg[2] = trEnd[2] - trPars.length;

    }

    let dzBeg = zPlate  - trBeg[2];
    let dzEnd = trEnd[2] - zPlate;

    for (let ip = 0; ip < 2; ip++) {

      let xyPlate = trPos[ip] - vertPos[ip];

      trBeg[ip] = xyPlate - dzBeg*trAxy[ip];
      trEnd[ip] = xyPlate + dzEnd*trAxy[ip];

    }

    let trackLine = new three3DExtras.tubeLine(trBeg, trEnd, trPars.width, trPars.color); 

    dmECC.groupOfTrackLines().add(trackLine.getObject3D());

  }

  dmECC.scene().add(dmECC.groupOfTrackLines());

};
//------------------------------------------------------------------------------

dmECC.onEventChange = function() {

  let divECC = document.getElementById("div-ECC");

  if (!demobbed.showECC()) {

    if (dmECC.camera() !== null) {

      cancelAnimationFrame(dmECC.animationFrameID());

      dmECC.clearCanvas();

      dmECC.eraseEventInfo();

    }

    divECC.style.display = "none";

    return; //!!!

  }

  divECC.style.display = "block";

  dmECC.updateCanvas();

  dmECC.displayEventInfo();

};
//------------------------------------------------------------------------------

dmECC.displayEventInfo = function() {
};
//------------------------------------------------------------------------------

dmECC.eraseEventInfo = function() {
};
//------------------------------------------------------------------------------

dmECC.updateCanvas = function() {

  if (dmECC.camera() === null) dmECC.initGraphics();
  else dmECC.clearCanvas();

  let rotY = dmECC.groupOfTrackLines().rotation.y;

  if (rotY >= 0) {

    dmECC.groupOfTrackLines().rotation.y = 0;
    dmECC.groupOfAxes().rotation.y = 0;
  }
  //else           dmECC.groupOfTrackLines().rotation.y = 3.1415926;

  dmECC.drawEvent();

};
//------------------------------------------------------------------------------

dmECC.clearCanvas = function() {

  dmECC.clearGroupOfTrackLines();

  dmECC.scene().remove(dmECC.vertexPoint());

  dmECC.sceneInset().remove(dmECC.groupOfAxes());

  dmECC.renderer().render(dmECC.scene(), dmECC.camera());
  dmECC.rendererInset().render(dmECC.sceneInset(), dmECC.cameraInset());

};
//------------------------------------------------------------------------------

dmECC.drawECC = function(showECC) {

  demobbed.showECC(showECC);

  dmECC.onEventChange();  

};
//------------------------------------------------------------------------------
