<template>
    <div id="mapbg" class="mapbg">
        <h3 class="title" id="title" style="opacity:0;">
          <div v-if="selected">{{selected.name}} {{selected.count}}</div>
          <h5 class="mt-0">UNDER THE CONTROL OF : THE GOVERNMENT</h5>
          <div>INFORMATIONS</div>
          <h5 class="mt-0">TOTAL LOCATIONS : 800</h5>
          <h5 class="mt-0">TOTAL PLAYERS : 0</h5>
          <h5 class="mt-0">TOTAL SCORE : 0</h5>
          <h5 class="mt-0">DANGEROSITY : 0</h5>
        </h3>
        <div class="crosshair" id="crosshairx" style="opacity:0;"></div>
        <div class="crosshairy" id="crosshairy" style="opacity:0;"></div>
        <div class="map-title" id="visit" style="opacity:0;" >
              <button class="button button-blue"  :disabled="!selected">VISIT (COMINGSOON)</button>
              <button class="button button-red" :disabled="!selected" >DISCOVER (COMINGSOON)</button>
        </div>

        <div class="first-line"></div>
        <img id="projection" src="/img/map/equirectangle_projection.png" />
    </div>
</template>

<script>
import * as THREE from 'three';
import Hexasphere from 'hexasphere.js';
import OrbitControls from 'three-orbitcontrols';
import TWEEN from 'tween.js';
export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      showLoading: true,
      selected:null,
      currentTerritory:null,
      oldcolor:null,
    };
  },
  methods: {
    init() {
      if(scene)
      clearScene()
      const self = this;
      this.showLoading = true;
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      const mapbg = document.getElementById('mapbg');
      mapbg.width = mapbg.offsetWidth;
      mapbg.height = mapbg.offsetHeight;
      const scene = new THREE.Scene();
      const aspect = mapbg.width / mapbg.height;
      scene.updateMatrixWorld(true);
      const camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 300);
      const orbitControls = new THREE.OrbitControls(camera, mapbg);
      let rotating = true;
              // Helpers
      // const  axes = new THREE.AxesHelper(50);
      // const  helper = new THREE.GridHelper(1000, 10,0x0000ff, 0x808080);
      //   scene.add(axes);
      //   scene.add(helper);
      orbitControls.keys = {
        LEFT: null, // left arrow
        UP: null, // up arrow
        RIGHT: null, // right arrow
        BOTTOM: null, // down arrow
      };
      orbitControls.enabled = true;
      orbitControls.minZoom = 1;
      orbitControls.maxZoom = 1;
      orbitControls.minDistance = 1;
      orbitControls.maxDistance = 2.8;
      orbitControls.screenSpacePanning = false;
      orbitControls.mouseButtons = {
	    LEFT: THREE.MOUSE.LEFT,
	    MIDDLE: THREE.MOUSE.MIDDLE,
	    RIGHT: null
      }
            camera.rotation.x = -0.86;
      camera.rotation.y = 0.75;
      renderer.setSize(mapbg.width, mapbg.height);
      mapbg.appendChild(renderer.domElement);
      // Lights
      const spotLight = new THREE.AmbientLight(0xffffff);
      // Texture Loader
      const textureLoader = new THREE.TextureLoader();

      // Planet Proto
      const planetProto = {
        sphere(size) {
          const sphere = new THREE.SphereGeometry(size, 32, 32);

          return sphere;
        },
        material(options) {
          const material = new THREE.MeshPhongMaterial();
          if (options) {
            for (const property in options) {
              material[property] = options[property];
            }
          }

          return material;
        },
        glowMaterial(intensity, fade, color) {
          const glowMaterial = new THREE.ShaderMaterial({
            uniforms: {
              c: {
                type: 'f',
                value: intensity,
              },
              p: {
                type: 'f',
                value: fade,
              },
              glowColor: {
                type: 'c',
                value: new THREE.Color(color),
              },
              viewVector: {
                type: 'v3',
                value: camera.position,
              },
            },
            vertexShader: `
        uniform vec3 viewVector;
        uniform float c;
        uniform float p;
        varying float intensity;
        void main() {
          vec3 vNormal = normalize( normalMatrix * normal );
          vec3 vNormel = normalize( normalMatrix * viewVector );
          intensity = pow( c - dot(vNormal, vNormel), p );
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }`,
            fragmentShader: `
        uniform vec3 glowColor;
        varying float intensity;
        void main() 
        {
          vec3 glow = glowColor * intensity;
          gl_FragColor = vec4( glow, 1.0 );
        }`,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true,
          });

          return glowMaterial;
        },
        texture(material, property, uri) {
          const textureLoader = new THREE.TextureLoader();
          textureLoader.crossOrigin = true;
          textureLoader.load(uri, texture => {
            material[property] = texture;
            material.needsUpdate = true;
          });
        },
      };

      const territories = new THREE.Object3D();
      const createTerritories = function(cb) {
        const img = document.getElementById('projection');
        var loaderImg = new Image();
        loaderImg.src = img.src;
        loaderImg.onload = function()
        {
        const projectionCanvas = document.createElement('canvas');
        const projectionContext = projectionCanvas.getContext('2d');
    
        projectionCanvas.width = img.width;
        projectionCanvas.height = img.height;
        projectionContext.drawImage(img, 0, 0, img.width, img.height);

        let pixelData = projectionContext.getImageData(0, 0, img.width, img.height);

        const isLand = function(lat, lon) {
          const x = parseInt((img.width * (lon + 180)) / 360);
          const y = parseInt((img.height * (lat + 90)) / 180);

          if (pixelData == null) {
            pixelData = projectionContext.getImageData(0, 0, img.width, img.height);
          }
          return pixelData.data[(y * pixelData.width + x) * 4] === 0;
        };

        const meshMaterials = [];
        const oceanMaterial = [];
        let seenTiles = {};
        let currentTiles = [];
        meshMaterials.push(new THREE.MeshBasicMaterial({ color:"rgb(12, 12, 12)", transparent: false }));
        meshMaterials.push(new THREE.MeshBasicMaterial({ color: "#ffc508", transparent: true }));
        oceanMaterial.push(new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true }));

        // let radius = 0.519;
        const radius = 0.61;
        const divisions = 15;
        const tileSize = 0.90;
        let count =1;
        const hexasphere = new Hexasphere(radius, divisions, tileSize);
        for (let i = 0; i < hexasphere.tiles.length;i++ ) {
          const t = hexasphere.tiles[i];
          const latLon = t.getLatLon(hexasphere.radius);
          const geometry = new THREE.Geometry();
          for (let j = 0; j < t.boundary.length; j++) {
            const bp = t.boundary[j];
            geometry.vertices.push(new THREE.Vector3(bp.x, bp.y, bp.z));
          }
          geometry.faces.push(new THREE.Face3(0, 1, 2));
          geometry.faces.push(new THREE.Face3(0, 2, 3));
          geometry.faces.push(new THREE.Face3(0, 3, 4));

          if (geometry.vertices.length > 5) {
            geometry.faces.push(new THREE.Face3(0, 4, 5));
          }
          let material;
          if (isLand(latLon.lat, latLon.lon)) {
            if(count<7)
            {
            material = meshMaterials[1];
            material.name = 'mission ' + count;
            }
            else
            {
            material = meshMaterials[0];
            material.name = 'territory ' + count;
            material.opacity = 0.8;
            }
            material.count = count;
            const mesh = new THREE.Mesh(geometry, material.clone());
            mesh.name = 'grid ' ;
            mesh.geometry.computeBoundingBox();
            territories.add(mesh);
            hexasphere.tiles[i].mesh = mesh;
            count++;
          } else {
            material = oceanMaterial[0];
            material.name = 'void';
            material.opacity = 0;


            const mesh = new THREE.Mesh(geometry, material.clone());
            mesh.name = 'void ' ;
            territories.add(mesh);
            hexasphere.tiles[i].mesh = mesh;
          }
        }

        seenTiles = {};

        currentTiles = hexasphere.tiles.slice().splice(0, 12);
        currentTiles.forEach(item => {
          seenTiles[item.toString()] = 1;
        });
        territories.name = "territories";
        cb(territories);
        }
      };
      createTerritories(
        function(result){
      scene.add(result);
        }
      );
      const locations = new THREE.Object3D();
      const createPlanet = function(options) {
        // Create the planet's Surface
        const surfaceGeometry = planetProto.sphere(options.surface.size);
        const surfaceMaterial = planetProto.material(options.surface.material);
        const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);

        // Create the planet's Atmosphere
        const atmosphereGeometry = planetProto.sphere(
          options.surface.size + options.atmosphere.size,
        );
        const atmosphereMaterialDefaults = {
          side: THREE.DoubleSide,
          transparent: true,
        };
        const atmosphereMaterialOptions = Object.assign(
          atmosphereMaterialDefaults,
          options.atmosphere.material,
        );
        const atmosphereMaterial = planetProto.material(atmosphereMaterialOptions);
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

        // Create the planet's Atmospheric glow
        const atmosphericGlowGeometry = planetProto.sphere(
          options.surface.size + options.atmosphere.size + options.atmosphere.glow.size,
        );
        const atmosphericGlowMaterial = planetProto.glowMaterial(
          options.atmosphere.glow.intensity,
          options.atmosphere.glow.fade,
          options.atmosphere.glow.color,
        );
        const atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);

        // Nest the planet's Surface and Atmosphere into a planet object
        const planet = new THREE.Object3D();
        surface.name = 'surface';
        atmosphere.name = 'atmosphere';
        atmosphericGlow.name = 'atmosphericGlow';
        planet.add(surface);
        planet.add(atmosphere);
        planet.add(atmosphericGlow);
        // Load the Surface's textures
        for (const textureProperty in options.surface.textures) {
          planetProto.texture(
            surfaceMaterial,
            textureProperty,
            options.surface.textures[textureProperty],
          );
        }

        // Load the Atmosphere's texture
        for (const textureProperty in options.atmosphere.textures) {
          planetProto.texture(
            atmosphereMaterial,
            textureProperty,
            options.atmosphere.textures[textureProperty],
          );
        }

        return planet;
      };

      const earth = createPlanet({
        surface: {
          size: 0.5,
          material: {
            bumpScale: 0.05,
            specular: new THREE.Color('grey'),
            shininess: 10,
          },
          textures: {
            map: 'img/map/8081_earthmap2k.jpg',
            bumpMap: 'img/map/8081_earthbump2k.jpg',
            specularMap: 'img/map/8081_earthspec2k.jpg',
          },
        },
        territories: {
          size: 0.4,
          material: {
            transparent: true,
          },
          textures: {
            map: '',
            alphaMap: '',
          },
        },
        atmosphere: {
          size: 0.06,
          material: {
            opacity: 0.8,
          },
          textures: {
            map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg',
            alphaMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg',
          },
          glow: {
            size: 0.02,
            intensity: 0.2,
            fade: 7,
            color: 0x93cfef,
          },
        },
      });

      // Galaxy
      const galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
      const galaxyMaterial = new THREE.MeshBasicMaterial({
        side: THREE.DoubleSide,
      });
      const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);

      // Load Galaxy Textures
      textureLoader.crossOrigin = true;
      textureLoader.load(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png',
        texture => {
          galaxyMaterial.map = texture;
          scene.add(galaxy);
        },
      );
      // Scene, Camera, Renderer Configuration
            camera.rotation.x = -0.86;
      camera.rotation.y = 0.75;
      scene.add(camera);
      scene.add(spotLight);
      scene.add(earth);
      let raycaster = new THREE.Raycaster(),
        INTERSECTED;
      const mouse = new THREE.Vector2();
      mapbg.addEventListener('click', onclick, false);
	    //renderer.domElement.addEventListener('mousemove', onMouseMove, false);

    function createVector(obj, camera) {
        var p = new THREE.Vector3(obj.x, obj.y,obj.z);
        var vector = p.project(camera);

        vector.x = (vector.x + 1) / 2 * mapbg.width;
        vector.y = -(vector.y - 1) / 2 * mapbg.height;

        return vector;
    }
          const visitTitle = document.getElementById("title");  
          const visitButton = document.getElementById("visit");  
     const crosshairx = document.getElementById("crosshairx");  
     const crosshairy = document.getElementById("crosshairy");  
      // camera.position.set(earth.position.x+0.8,earth.position.y+0.5,1)
      // camera.lookAt(earth.position)
      let selectedTerritory;
      function onclick(event) {

        console.log(mouse.x,mouse.y)
        if(selectedTerritory)
        selectedTerritory.object.material.color.set(self.oldcolor);
        var rect = event.target.getBoundingClientRect();
        mouse.x = event.clientX - rect.left; //x position within the element.
        mouse.y = event.clientY - rect.top;  //y position within the elem
        raycaster.setFromCamera(mouse, camera);
                camera.updateProjectionMatrix();
        const intersects = raycaster.intersectObjects(territories.children); // array
        if (intersects.length > 0 && intersects[0].object.name !="void" && intersects[0].object.material.name!='void') {
          selectedTerritory = intersects[0];
          self.oldcolor = selectedTerritory.object.material.color.getHex();
          selectedTerritory.object.material.color.set(0xff0000);
          self.selected = {}
          self.selected.name = selectedTerritory.object.material.name
          self.selected.count = selectedTerritory.object.material.count

          visitButton.style.top = event.clientY + 'px'  ;
          visitButton.style.left = event.clientX+20 + 'px'  ;
          visitButton.style.opacity = 1 ;
          visitTitle.style.top = event.clientY +40 + 'px'  ;
          visitTitle.style.left = event.clientX+20 + 'px'  ;
                    crosshairx.style.opacity = 1 ;
          crosshairy.style.opacity = 1 ;
          visitTitle.style.opacity = 1 ;
          visitButton.addEventListener('click', moveToLocations, true);
        }
        else{
          self.selected=null;
          visitButton.style.opacity = 0 ;
          visitTitle.style.opacity = 0 ;
                    crosshairx.style.opacity = 0 ;
          crosshairy.style.opacity = 0 ;
          //camera.position.set(1,1,1)
          // camera.lookAt(earth.position)
          rotating = true;
          //resetPosition()
        }
      }
      
      mapbg.camera = camera
      camera.position.set(1, 1, 1);
        
      camera.rotation.x = -0.86;
      camera.rotation.y = 0.75;
      camera.updateProjectionMatrix();

    var posX = camera.position.x +1;
    var posY = camera.position.y - 2;
    var posZ = camera.position.z +1;

      function moveToLocations() {
             var from = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };

        var to = {
            x: posX,
            y: posY,
            z: posZ
        };
        var tween = new TWEEN.Tween(from)
            .to(to, 1000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
            camera.position.set(this.x, 1, 1);
               camera.lookAt(selectedTerritory.object.position);
                     camera.updateProjectionMatrix();

        })
            .onComplete(function () {
                camera.rotation.x = -0.86;
              camera.rotation.y = 0.75;
               camera.lookAt(selectedTerritory.object.position);
        })
            .start();

          var boundingBox = selectedTerritory.object.geometry.boundingBox;
          var position = new THREE.Vector3();
          position.subVectors( boundingBox.max, boundingBox.min );
          position.multiplyScalar( 0.5 );
          position.add( boundingBox.min );
          self.selected=null;
          visitButton.style.opacity = 0 ;
          visitTitle.style.opacity = 0 ;
                    crosshairx.style.opacity = 0 ;
          crosshairy.style.opacity = 0 ;
          position.applyMatrix4( selectedTerritory.object.matrixWorld );
          rotating = false;
          camera.rotation.x = -0.55;
          camera.rotation.y = 0.4;
               camera.rotation.z = 0.5;
          camera.updateProjectionMatrix(); 
          //  camera.position.set(position.x,position.y,1.5)
          // camera.lookAt(position.x+1,position.y,position.z)

      }
      // Light Configurations
      spotLight.position.set(1, 1, 1);


      // Mesh Configurations
      earth.receiveShadow = false;
      earth.castShadow = false;
      earth.rotateY(179.05);
      earth.rotateX(0);
      earth.rotateZ(0);
      // On mapbg resize, adjust camera aspect ratio and renderer size
      mapbg.addEventListener('resize', () => {
        camera.aspect = mapbg.width / mapbg.height;
        
      camera.rotation.x = -0.86;
      camera.rotation.y = 0.75;

        camera.updateProjectionMatrix();
        renderer.setSize(mapbg.width,  mapbg.height);
      });
      
      const  clearScene = function(scene) {
        for (let i = scene.children.length - 1; i >= 0; i--) {
          const object = scene.children[i];
          if (object.type === 'Mesh') {
            object.geometry.dispose();
            object.material.dispose();
            scene.remove(object);
          }
        }
      }

    //   	mapbg.addEventListener('mousemove', function(evt){
  
		// 	let movementX = evt.movementX || evt.mozMovementX || evt.webkitMovementX || 0;
		// 	let movementY = evt.movementY || evt.mozMovementY || evt.webkitMovementY || 0;
      
		// 	camera.rotation.x -= movementY / 5000;
		// 	camera.rotation.y -= movementX / 20000;
		// }, false);
      const resetPosition = function(){
        var from = {
            x: camera.position.x,
            y: camera.position.y,
            z: camera.position.z
        };

        var to = {
            x: posX,
            y: posY,
            z: posZ
        };
        var tween = new TWEEN.Tween(from)
            .to(to, 2000)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
          camera.position.set(1, 1, 1);
          camera.rotation.x = -0.86;
          camera.rotation.y = 0.75;
        })
            .onComplete(function () {
          camera.rotation.x = -0.86;
          camera.rotation.y = 0.75;
        })
            .start();
      }
      // Main render function
      const render = function() {
  
        if(selectedTerritory && visitButton)
        {
          var boundingBox = selectedTerritory.object.geometry.boundingBox;

          var position = new THREE.Vector3();
          position.subVectors( boundingBox.max, boundingBox.min );
          position.multiplyScalar( 0.5 );
          position.add( boundingBox.min );

          position.applyMatrix4( selectedTerritory.object.matrixWorld );
          let to = createVector(position,camera)
          visitButton.style.top = (to.y +20) +'px'  ;
          visitButton.style.left = (to.x +20)+ 'px'  ;
          visitTitle.style.top = (to.y +60) + 'px'  ;
          visitTitle.style.left = (to.x+20) + 'px'  ;

          crosshairx.style.left = (to.x) + 'px'  ;
          crosshairy.style.top = (to.y) + 'px'  ;

          visitTitle.style.webkitTransform = `translate3d('${(to.x)}px,${(to.y)}px,${(to.z*60)}px)`; 
          visitTitle.style.mozTransform    = `translate3d('${(to.x)}px,${(to.y)}px,${(to.z*60)}px)`; 
          visitTitle.style.msTransform     = `translate3d('${(to.x)}px,${(to.y)}px,${(to.z*60)}px)`; 
          visitTitle.style.oTransform      = `translate3d('${(to.x)}px,${(to.y)}px,${(to.z*60)}px)`; 
          visitTitle.style.transform       = `translate3d('${(to.x)}px,${(to.y)}px,${(to.z*60)}px)`; 
         }
          // if(rotating)
          // {
          //       camera.rotation.x = -0.86;
          //     camera.rotation.y = 0.75;

          // }

        if(scene.getObjectByName('territories'))
        {
                  scene.getObjectByName('surface').rotation.y += (1 / 16) * 0.01;
                  scene.getObjectByName('territories').rotation.y += (1 / 16) * 0.01;
                  earth.getObjectByName('atmosphere').rotation.y -= (1 / 8) * 0.01;

        }
        // TWEEN.update();

        // camera.lookAt(earth.position)
        requestAnimationFrame(render);
        renderer.render(scene, camera);
              orbitControls.update();

      };

      render();
      this.showLoading = false;
      // camera.lookAt(20,30,40);
    },
  },
  mounted() {
      this.init();
  },
};
</script>

<style scoped lang="less">
.mapbg {

  height: 100vh;
}

#map {
  height: 100%;
}

img {
  display: none;
}

.title{
  position: absolute;
  z-index: 10;
  left: 50%;
  top:20%;
  text-shadow: 5px 5px 5px black;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.60);
  padding:20px;
  border-radius: 5px;
}

.map-title{
  position: absolute;
}

.first-line{
  position: absolute;
  left: 50%;
  top:20%;
  z-index: 20;
}

.crosshair{
    position: absolute;
      z-index: 10;
        left: 50%;
  border:1px solid red;
  width: 2px;
  height: 100vh;
  pointer-events: none;
}

.crosshairy{
    position: absolute;
      z-index: 10;
        left: 0px;
  border:1px solid red;
  width: 100%;
  height: 2px;
    pointer-events: none;

}


.grid{
  position: absolute;
  z-index: 250;
  left: 0%;
  top:0%;
  pointer-events: none;
     padding-left: 28%;
    padding-top: 7%;
    width: 100%;
    height: 99%;
}
</style>