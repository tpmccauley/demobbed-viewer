//gmED == demobbed.mgrGeomED() !!!
//---------------------------------

gmED.genBrickVisPars = function() {

  let nbOfBrickWalls = [DetCfg.nbOfBrickWallsInSM1(), DetCfg.nbOfBrickWallsInSM2()];

  let nbOfBricks = [DetCfg.nbOfBrickColumns(), DetCfg.nbOfBrickRows()];

  let brDimX = DetCfg.brickDims(0);
  let brDimY = DetCfg.brickDims(1);
  let brDimZ = DetCfg.brickDims(2);

  let brVis = [

    [[], []],
    [[], []]

  ];

  for (let sm = 0; sm < 2; sm++) {

    let brID = 0;

    for (let ip = 0; ip < 2; ip++) {
  
      brID = 0;
  
      for (let iw = 0; iw < nbOfBrickWalls[sm]; iw++) {

        let wn = sm*nbOfBrickWalls[0] + iw;
    
        let brXmax = gmED.wallsBrick()[wn].xyMax(0);
        let brYmax = gmED.wallsBrick()[wn].xyMax(1);
        let brZmin = gmED.wallsBrick()[wn].zMin(0);
    
        for (let ic = 0; ic < nbOfBricks[ip]; ic++) {
    
          brVis[sm][ip][brID] = new BrickVis(brID, brXmax, brYmax, brZmin, brDimX, brDimY, brDimZ),
    
          brID++;
    
          if (ip) brYmax -= brDimY;
          else    brXmax -= brDimX;
    
        }
    
      }
  
    }

  }

  gmED.bricksSM1VisXY()[0] = brVis[0][0];
  gmED.bricksSM1VisXY()[1] = brVis[0][1];

  gmED.bricksSM2VisXY()[0] = brVis[1][0];
  gmED.bricksSM2VisXY()[1] = brVis[1][1];

};
//------------------------------------------------------------------------------

gmED.findBrickVertexPars = function() {

  let vertPosGlob = demobbed.event().vertex()[0].posGlob();

  let brVis = [[], []];

  if (vertPosGlob[2] < 0)
    brVis = gmED.bricksSM1VisXY();
  else
    brVis = gmED.bricksSM2VisXY();

  let brZmin = 10000;

  let brXYmax = [-10000, -10000];

  let nbOfBricks = 0;

  for (let ip = 1; ip >= 0; ip--) { //!!!

    nbOfBricks = brVis[ip].length;

    for (let ib = 0; ib < nbOfBricks; ib++) {

      if (brVis[ip][ib].xyMax(ip) < vertPosGlob[ip]) {

        brXYmax[ip] = brVis[ip][ib].xyMax(ip) + DetCfg.brickDims(ip);

        break; //!!!

      }

    }

  }

  for (let ib = 0; ib < nbOfBricks; ib += DetCfg.nbOfBrickColumns()) { //!!!

    if (brVis[0][ib].zMin() > vertPosGlob[2]) {

      brZmin = brVis[0][ib].zMin() - DetCfg.brickWallToWallDistZ();

      break; //!!!

    }

  }

  if (brZmin > 1000) brZmin = brVis[0][nbOfBricks - 1].zMin();

  //console.log("brXYmax[0] = " + brXYmax[0]);
  //console.log("brXYmax[1] = " + brXYmax[1]);
  //console.log("brZmin = " + brZmin);

  gmED.brickVertex([new BrickVertex(0, brXYmax[0], brXYmax[1], brZmin, DetCfg.brickDims(0), DetCfg.brickDims(1), DetCfg.brickDims(2))]);

};
//------------------------------------------------------------------------------
