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

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
      showLoading: true,
      selected: null,
      currentTerritory: null,
      oldcolor: null,
      animation: null,
      territories: null,
      controls: null,
    };
  },
  beforeDestroy() {
    this.clearScene(this.scene);
  },
  methods: {
    init() {
      /* eslint-disable */
      const self = this;
      this.showLoading = true;
      this.renderer = new THREE.WebGLRenderer({ antialias: true });
      const mapbg = document.getElementById('mapbg');
      mapbg.width = mapbg.offsetWidth;
      mapbg.height = mapbg.offsetHeight;
      this.scene = new THREE.Scene();
      const aspect = mapbg.width / mapbg.height;
      this.scene.updateMatrixWorld(true);
      this.camera = new THREE.PerspectiveCamera(40, aspect, 0.1, 300);
      self.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
       var onClickPosition = new THREE.Vector2();
      let rotating = true;
      self.controls.keys = {
        LEFT: null, // left arrow
        UP: null, // up arrow
        RIGHT: null, // right arrow
        BOTTOM: null, // down arrow
      };
      self.controls.enabled = true;
      self.controls.minZoom = 1;
      self.controls.maxZoom = 1;
      self.controls.minDistance = 1.5;
      self.controls.maxDistance = 2.5;
      self.controls.screenSpacePanning = false;
      self.controls.mouseButtons = {
        LEFT: THREE.MOUSE.LEFT,
        MIDDLE: null,
        RIGHT: null,
      };
      this.camera.rotation.x = -0.86;
      this.camera.rotation.y = 0.75;
      self.renderer.setSize(mapbg.width, mapbg.height);
      mapbg.appendChild(self.renderer.domElement);
     
      const territories = new THREE.Object3D();
      const createTerritories = function(cb) {
        const img = document.getElementById('projection');
        const loaderImg = new Image();
        loaderImg.src = img.src;
        loaderImg.onload = function() {
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
          meshMaterials.push(
            new THREE.MeshBasicMaterial({ color: 'rgb(12, 12, 12)' }),
          );
          meshMaterials.push(new THREE.MeshBasicMaterial({ color: '#ffc508' }));
          oceanMaterial.push(new THREE.MeshBasicMaterial({ color: '#000' }));

          // let radius = 0.519;
          const radius = 0.61;
          const divisions = 12;
          const tileSize = 0.9;
          let count = 1;
          const hexasphere = new Hexasphere(radius, divisions, tileSize);
          for (let i = 0; i < hexasphere.tiles.length; i++) {
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
              if (count < 7) {
                material = meshMaterials[1];
                material.name = `mission ${count}`;
              } else {
                material = meshMaterials[0];
                material.name = `territory ${count}`;
                material.opacity = 0.8;
              }
              material.count = count;
              const mesh = new THREE.Mesh(geometry, material.clone());
              mesh.name = 'grid ';
              mesh.geometry.computeBoundingBox();
              territories.add(mesh);
              hexasphere.tiles[i].mesh = mesh;
              count++;
            } else {
              material = oceanMaterial[0];
              material.name = 'void';
              material.opacity = 0;
              var bufferGeometry = new THREE.BufferGeometry().fromGeometry( geometry );

              const mesh = new THREE.Mesh(bufferGeometry, material.clone());
              mesh.name = 'void ';
              territories.add(mesh);
              hexasphere.tiles[i].mesh = mesh;
            }
          }

          seenTiles = {};

          currentTiles = hexasphere.tiles.slice().splice(0, 12);
          currentTiles.forEach(item => {
            seenTiles[item.toString()] = 1;
          });
          territories.name = 'territories';
          cb(territories);
        };
      };
      createTerritories(result => {
        self.scene.add(result);
      });
     
      this.camera.rotation.x = -0.86;
      this.camera.rotation.y = 0.75;
      self.scene.add(this.camera);
      let raycaster = new THREE.Raycaster(),
        INTERSECTED;
      const mouse = new THREE.Vector2();
      mapbg.addEventListener('click', onclick, false);

      function createVector(obj, camera) {
        const p = new THREE.Vector3(obj.x, obj.y, obj.z);
        const vector = p.project(camera);

        vector.x = ((vector.x + 1) / 2) * mapbg.width;
        vector.y = (-(vector.y - 1) / 2) * mapbg.height;

        return vector;
      }
      const visitTitle = document.getElementById('title');
      const visitButton = document.getElementById('visit');
      const crosshairx = document.getElementById('crosshairx');
      const crosshairy = document.getElementById('crosshairy');
      
			function getMousePosition( dom, x, y ) {
				var rect = dom.getBoundingClientRect();
				return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
      }
      
      var getIntersects = function ( point, objects ) {
				raycaster = new THREE.Raycaster();
				mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );
				raycaster.setFromCamera( mouse, self.camera );
				return raycaster.intersectObjects( objects );
			};

      let selectedTerritory;
      function onclick(event) {
        if (selectedTerritory) 
        selectedTerritory.object.material.color.set(self.oldcolor);
        const array = getMousePosition( mapbg, event.clientX, event.clientY );
				onClickPosition.fromArray( array );
				var intersects = getIntersects( onClickPosition, territories.children );
        if (
          intersects.length > 0 &&
          intersects[0].object.name != 'void' &&
          intersects[0].object.material.name != 'void'
        ) {
          selectedTerritory = intersects[0];
          self.oldcolor = selectedTerritory.object.material.color.getHex();
          selectedTerritory.object.material.color.set(0xff0000);
          self.selected = {};
          self.selected.name = selectedTerritory.object.material.name;
          self.selected.count = selectedTerritory.object.material.count;

          visitButton.style.top = `${event.clientY}px`;
          visitButton.style.left = `${event.clientX + 20}px`;
          visitButton.style.opacity = 1;
          visitTitle.style.top = `${event.clientY + 40}px`;
          visitTitle.style.left = `${event.clientX + 20}px`;
          crosshairx.style.opacity = 1;
          crosshairy.style.opacity = 1;
          visitTitle.style.opacity = 1;
        } else {
          self.selected = null;
          visitButton.style.opacity = 0;
          visitTitle.style.opacity = 0;
          crosshairx.style.opacity = 0;
          crosshairy.style.opacity = 0;
          rotating = true;
        }
      }

      mapbg.camera = this.camera;
      this.camera.position.set(1, 1, 1);

      this.camera.rotation.x = -0.86;
      this.camera.rotation.y = 0.75;
      this.camera.updateProjectionMatrix();

      const posX = this.camera.position.x + 1;
      const posY = this.camera.position.y - 2;
      const posZ = this.camera.position.z + 1;

      mapbg.addEventListener('resize', () => {
        this.camera.aspect = mapbg.width / mapbg.height;

        this.camera.rotation.x = -0.86;
        this.camera.rotation.y = 0.75;

        this.camera.updateProjectionMatrix();
        self.renderer.setSize(mapbg.width, mapbg.height);
      });
    
      // Main render function
      const render = function() {
        
        if (selectedTerritory && visitButton) {
          const boundingBox = selectedTerritory.object.geometry.boundingBox;
          const position = new THREE.Vector3();
          position.subVectors(boundingBox.max, boundingBox.min);
          position.multiplyScalar(0.5);
          position.add(boundingBox.min);
          position.applyMatrix4(selectedTerritory.object.matrixWorld);
          if(self.camera)
          {
          const to = createVector(position, self.camera);
          visitButton.style.top = `${to.y + 20}px`;
          visitButton.style.left = `${to.x + 20}px`;
          visitTitle.style.top = `${to.y + 60}px`;
          visitTitle.style.left = `${to.x + 20}px`;

          crosshairx.style.left = `${to.x}px`;
          crosshairy.style.top = `${to.y}px`;

          visitTitle.style.webkitTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
          visitTitle.style.mozTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
          visitTitle.style.msTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
          visitTitle.style.oTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
          visitTitle.style.transform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
          }
        }
        if (self.scene &&  self.camera) {
          if(self.scene.getObjectByName('territories'))
          self.scene.getObjectByName('territories').rotation.y += (1 / 16) * 0.01;
          self.animation = requestAnimationFrame(render);
          self.renderer.render(self.scene, self.camera);
        }
      };
      self.controls.update();

      render();
      this.showLoading = false;
    },
    clearThree(obj){
      while(obj.children.length > 0){ 
        this.clearThree(obj.children[0])
        obj.remove(obj.children[0]);
      }
     if (obj.geometry) {
                obj.geometry.dispose();
            }
            if (obj.material) {
                var materialArray;
                if (obj.material instanceof THREE.MeshFaceMaterial || obj.material instanceof THREE.MultiMaterial) {
                    materialArray = obj.material.materials;
                }
                else if(obj.material instanceof Array) {
                    materialArray = obj.material;
                }
                if(materialArray) {
                    materialArray.forEach(function (mtrl, idx) {
                        if (mtrl.map) mtrl.map.dispose();
                        if (mtrl.lightMap) mtrl.lightMap.dispose();
                        if (mtrl.bumpMap) mtrl.bumpMap.dispose();
                        if (mtrl.normalMap) mtrl.normalMap.dispose();
                        if (mtrl.specularMap) mtrl.specularMap.dispose();
                        if (mtrl.envMap) mtrl.envMap.dispose();
                        mtrl.dispose();
                    });
                }
                else {
                    if (obj.material.map) obj.material.map.dispose();
                    if (obj.material.lightMap) obj.material.lightMap.dispose();
                    if (obj.material.bumpMap) obj.material.bumpMap.dispose();
                    if (obj.material.normalMap) obj.material.normalMap.dispose();
                    if (obj.material.specularMap) obj.material.specularMap.dispose();
                    if (obj.material.envMap) obj.material.envMap.dispose();
                    obj.material.dispose();
                }
            }
      }   
    ,
    clearScene(scene){
         cancelAnimationFrame(self.animation)
         var territories = scene.getObjectByName('territories')
          for (let i = territories.children.length - 1; i >= 0; i--) {
                            this.clearThree(territories.children[i])
          }

         for (let i = scene.children.length - 1; i >= 0; i--) {
          const object = scene.children[i];
          object.children.forEach(element => {
                this.clearThree(element)
          });
        }
         for (let i = scene.children.length - 1; i >= 0; i--) {
          const object = scene.children[i];
          if(this.clearThree)
          this.clearThree(object)
        }
        scene.dispose()
        this.scene.dispose()
        this.renderer.context = null;
        this.renderer.domElement = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.controls = null;
        this.animation = null;
    }
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

.title {
  position: absolute;
  z-index: 10;
  left: 50%;
  top: 20%;
  text-shadow: 5px 5px 5px black;
  pointer-events: none;
  background: rgba(0, 0, 0, 0.6);
  padding: 20px;
  border-radius: 5px;
}

.map-title {
  position: absolute;
}

.first-line {
  position: absolute;
  left: 50%;
  top: 20%;
  z-index: 20;
}

.crosshair {
  position: absolute;
  z-index: 10;
  left: 50%;
  border: 1px solid red;
  width: 2px;
  height: 100vh;
  pointer-events: none;
}

.crosshairy {
  position: absolute;
  z-index: 10;
  left: 0px;
  border: 1px solid red;
  width: 100%;
  height: 2px;
  pointer-events: none;
}

.grid {
  position: absolute;
  z-index: 250;
  left: 0%;
  top: 0%;
  pointer-events: none;
  padding-left: 28%;
  padding-top: 7%;
  width: 100%;
  height: 99%;
}
</style>
