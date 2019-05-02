let TextureAnimator = require('./TextureAnimator'),
  THREE = require('three'),
  utils = require('./utils');

const createCanvas = function(
  numFrames,
  pixels,
  rows,
  waveStart,
  numWaves,
  waveColor,
  coreColor,
  shieldColor,
) {
  const cols = numFrames / rows;
  const waveInterval = Math.floor((numFrames - waveStart) / numWaves);
  const waveDist = pixels - 25; // width - center of satellite
  const distPerFrame = waveDist / (numFrames - waveStart);
  let offsetx = 0;
  let offsety = 0;
  let curRow = 0;

  const waveColorRGB = utils.hexToRgb(waveColor);

  return utils.renderToCanvas((numFrames * pixels) / rows, pixels * rows, ctx => {
    for (let i = 0; i < numFrames; i++) {
      if (i - curRow * cols >= cols) {
        offsetx = 0;
        offsety += pixels;
        curRow++;
      }

      const centerx = offsetx + 25;
      const centery = offsety + Math.floor(pixels / 2);

      /* circle around core */
      // i have between 0 and wavestart to fade in
      // i have between wavestart and  waveend - (time between waves*2)
      // to do a full spin close and then back open
      // i have between waveend-2*(timebetween waves)/2 and waveend to rotate Math.PI/4 degrees
      // this is probably the ugliest code in all of here -- basically I just messed arund with stuff until it looked ok

      ctx.lineWidth = 2;
      ctx.strokeStyle = shieldColor;
      const buffer = Math.PI / 16;
      const start = -Math.PI + Math.PI / 4;
      let radius = 8;
      const repeatAt = Math.floor(numFrames - (2 * (numFrames - waveStart)) / numWaves) + 1;

      /* fade in and out */
      if (i < waveStart) {
        radius = (radius * i) / waveStart;
      }

      const swirlDone = Math.floor((repeatAt - waveStart) / 2) + waveStart;

      for (let n = 0; n < 4; n++) {
        ctx.beginPath();

        if (i < waveStart || i >= numFrames) {
          ctx.arc(
            centerx,
            centery,
            radius,
            (n * Math.PI) / 2 + start + buffer,
            (n * Math.PI) / 2 + start + Math.PI / 2 - 2 * buffer,
          );
        } else if (i > waveStart && i < swirlDone) {
          var totalTimeToComplete = swirlDone - waveStart;
          var distToGo = (3 * Math.PI) / 2;
          var currentStep = i - waveStart;
          var movementPerStep = distToGo / totalTimeToComplete;

          var startAngle = -Math.PI + Math.PI / 4 + buffer + movementPerStep * currentStep;

          ctx.arc(
            centerx,
            centery,
            radius,
            Math.max((n * Math.PI) / 2 + start, startAngle),
            Math.max(
              (n * Math.PI) / 2 + start + Math.PI / 2 - 2 * buffer,
              startAngle + Math.PI / 2 - 2 * buffer,
            ),
          );
        } else if (i >= swirlDone && i < repeatAt) {
          var totalTimeToComplete = repeatAt - swirlDone;
          var distToGo = (n * 2 * Math.PI) / 4;
          var currentStep = i - swirlDone;
          var movementPerStep = distToGo / totalTimeToComplete;

          var startAngle = Math.PI / 2 + Math.PI / 4 + buffer + movementPerStep * currentStep;
          ctx.arc(centerx, centery, radius, startAngle, startAngle + Math.PI / 2 - 2 * buffer);
        } else if (i >= repeatAt && i < (numFrames - repeatAt) / 2 + repeatAt) {
          var totalTimeToComplete = (numFrames - repeatAt) / 2;
          var distToGo = Math.PI / 2;
          var currentStep = i - repeatAt;
          var movementPerStep = distToGo / totalTimeToComplete;
          var startAngle = n * (Math.PI / 2) + Math.PI / 4 + buffer + movementPerStep * currentStep;

          ctx.arc(centerx, centery, radius, startAngle, startAngle + Math.PI / 2 - 2 * buffer);
        } else {
          ctx.arc(
            centerx,
            centery,
            radius,
            (n * Math.PI) / 2 + start + buffer,
            (n * Math.PI) / 2 + start + Math.PI / 2 - 2 * buffer,
          );
        }
        ctx.stroke();
      }

      // frame i'm on * distance per frame

      /* waves going out */
      var frameOn;

      for (let wi = 0; wi < numWaves; wi++) {
        frameOn = i - waveInterval * wi - waveStart;
        if (frameOn > 0 && frameOn * distPerFrame < pixels - 25) {
          ctx.strokeStyle = `rgba(${waveColorRGB.r},${waveColorRGB.g},${waveColorRGB.b},${0.9 -
            (frameOn * distPerFrame) / (pixels - 25)})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(centerx, centery, frameOn * distPerFrame, -Math.PI / 12, Math.PI / 12);
          ctx.stroke();
        }
      }
      /* red circle in middle */

      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(centerx, centery, 3, 0, 2 * Math.PI);
      ctx.fill();

      ctx.strokeStyle = coreColor;
      ctx.lineWidth = 2;
      ctx.beginPath();
      if (i < waveStart) {
        ctx.arc(centerx, centery, (3 * i) / waveStart, 0, 2 * Math.PI);
      } else {
        ctx.arc(centerx, centery, 3, 0, 2 * Math.PI);
      }
      ctx.stroke();

      offsetx += pixels;
    }
  });
};

const Satellite = function(lat, lon, altitude, scene, _opts, canvas, texture) {
  var geometry,
    point = utils.mapPoint(lat, lon),
    opts,
    numFrames,
    pixels,
    rows,
    waveStart,
    repeatAt;

  point.x *= altitude;
  point.y *= altitude;
  point.z *= altitude;

  /* options that can be passed in */
  var opts = {
    numWaves: 8,
    waveColor: '#FFF',
    coreColor: '#FF0000',
    shieldColor: '#FFF',
    size: 1,
  };

  /* required field */
  this.lat = lat;
  this.lon = lon;
  this.altitude = altitude;
  this.scene = scene;

  this.onRemoveList = [];

  /* private vars */
  numFrames = 50;
  pixels = 100;
  rows = 10;
  waveStart = Math.floor(numFrames / 8);

  if (_opts) {
    for (const i in opts) {
      if (_opts[i] != undefined) {
        opts[i] = _opts[i];
      }
    }
  }

  this.opts = opts;

  if (!canvas) {
    this.canvas = createCanvas(
      numFrames,
      pixels,
      rows,
      waveStart,
      opts.numWaves,
      opts.waveColor,
      opts.coreColor,
      opts.shieldColor,
    );
    this.texture = new THREE.Texture(this.canvas);
    this.texture.needsUpdate = true;
    repeatAt = Math.floor(numFrames - (2 * (numFrames - waveStart)) / opts.numWaves) + 1;
    this.animator = new TextureAnimator(
      this.texture,
      rows,
      numFrames / rows,
      numFrames,
      80,
      repeatAt,
    );
  } else {
    this.canvas = canvas;
    if (!texture) {
      this.texture = new THREE.Texture(this.canvas);
      this.texture.needsUpdate = true;
      repeatAt = Math.floor(numFrames - (2 * (numFrames - waveStart)) / opts.numWaves) + 1;
      this.animator = new TextureAnimator(
        this.texture,
        rows,
        numFrames / rows,
        numFrames,
        80,
        repeatAt,
      );
    } else {
      this.texture = texture;
    }
  }

  geometry = new THREE.PlaneGeometry(opts.size * 150, opts.size * 150, 1, 1);
  this.material = new THREE.MeshBasicMaterial({
    map: this.texture,
    depthTest: false,
    transparent: true,
  });

  this.mesh = new THREE.Mesh(geometry, this.material);
  this.mesh.tiltMultiplier = (Math.PI / 2) * (1 - Math.abs(lat / 90));
  this.mesh.tiltDirection = lat > 0 ? -1 : 1;
  this.mesh.lon = lon;

  this.mesh.position.set(point.x, point.y, point.z);

  this.mesh.rotation.z = (-1 * (lat / 90) * Math.PI) / 2;
  this.mesh.rotation.y = (lon / 180) * Math.PI;

  scene.add(this.mesh);
};

Satellite.prototype.changeAltitude = function(_altitude) {
  const newPoint = utils.mapPoint(this.lat, this.lon);
  newPoint.x *= _altitude;
  newPoint.y *= _altitude;
  newPoint.z *= _altitude;

  this.altitude = _altitude;

  this.mesh.position.set(newPoint.x, newPoint.y, newPoint.z);
};

Satellite.prototype.changeCanvas = function(numWaves, waveColor, coreColor, shieldColor) {
  /* private vars */
  numFrames = 50;
  pixels = 100;
  rows = 10;
  waveStart = Math.floor(numFrames / 8);

  if (!numWaves) {
    numWaves = this.opts.numWaves;
  } else {
    this.opts.numWaves = numWaves;
  }
  if (!waveColor) {
    waveColor = this.opts.waveColor;
  } else {
    this.opts.waveColor = waveColor;
  }
  if (!coreColor) {
    coreColor = this.opts.coreColor;
  } else {
    this.opts.coreColor = coreColor;
  }
  if (!shieldColor) {
    shieldColor = this.opts.shieldColor;
  } else {
    this.opts.shieldColor = shieldColor;
  }

  this.canvas = createCanvas(
    numFrames,
    pixels,
    rows,
    waveStart,
    numWaves,
    waveColor,
    coreColor,
    shieldColor,
  );
  this.texture = new THREE.Texture(this.canvas);
  this.texture.needsUpdate = true;
  repeatAt = Math.floor(numFrames - (2 * (numFrames - waveStart)) / numWaves) + 1;
  this.animator = new TextureAnimator(
    this.texture,
    rows,
    numFrames / rows,
    numFrames,
    80,
    repeatAt,
  );
  this.material.map = this.texture;
};

Satellite.prototype.tick = function(cameraPosition, cameraAngle, renderTime) {
  // underscore should be good enough

  this.mesh.lookAt(cameraPosition);

  this.mesh.rotateZ((this.mesh.tiltDirection * Math.PI) / 2);
  this.mesh.rotateZ(
    Math.sin(cameraAngle + (this.mesh.lon / 180) * Math.PI) *
      this.mesh.tiltMultiplier *
      this.mesh.tiltDirection *
      -1,
  );

  if (this.animator) {
    this.animator.update(renderTime);
  }
};

Satellite.prototype.remove = function() {
  this.scene.remove(this.mesh);

  for (let i = 0; i < this.onRemoveList.length; i++) {
    this.onRemoveList[i]();
  }
};

Satellite.prototype.onRemove = function(fn) {
  this.onRemoveList.push(fn);
};

Satellite.prototype.toString = function() {
  return `${this.lat}_${this.lon}_${this.altitude}`;
};

module.exports = Satellite;
