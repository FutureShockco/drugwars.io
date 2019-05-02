<template>
    <div id="mapbg" class="mapbg">
        <div id="map">
        </div>
        <img id="projection" src="/img/map/equirectangle_projection.png" />
    </div>
</template>

<script>
import * as THREE from 'three';
import Hexasphere from 'hexasphere.js';

export default {
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      mesh: null,
    };
  },
  methods: {
    init() {
      const width = window.innerWidth;
      const height = window.innerHeight - 10;
      const renderer = new THREE.WebGLRenderer({ antialias: true }); // to activate later
      const cameraDistance = 65;
      const camera = new THREE.PerspectiveCamera(cameraDistance, width / height, 1, 200);
      const scene = new THREE.Scene();
      const img = document.getElementById('projection');
      const projectionCanvas = document.createElement('canvas');
      const projectionContext = projectionCanvas.getContext('2d');

      camera.position.z = -cameraDistance;
      scene.fog = new THREE.Fog(0x000000, cameraDistance * 0.4, cameraDistance * 1.2);
      img.width = window.innerWidth;
      img.height = window.innerHeight;
      projectionCanvas.width = img.width;
      projectionCanvas.height = img.height;
      projectionContext.drawImage(img, 0, 0, img.width, img.height);

      renderer.setSize(window.innerWidth, window.innerHeight);

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
      meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0001, transparent: true }));
      meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0002, transparent: true }));
      meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0003, transparent: true }));
      meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0004, transparent: true }));
      meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0005, transparent: true }));
      meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0006, transparent: true }));
      meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0007, transparent: true }));
      meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0008, transparent: true }));
      meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0009, transparent: true }));

      oceanMaterial.push(new THREE.MeshBasicMaterial({ color: 0x0f2342, transparent: true }));
      oceanMaterial.push(new THREE.MeshBasicMaterial({ color: 0x0f1e38, transparent: true }));

      const createScene = function(radius, divisions, tileSize) {
        while (scene.children.length > 0) {
          scene.remove(scene.children[0]);
        }
        const hexasphere = new Hexasphere(radius, divisions, tileSize);
        for (let i = 0; i < hexasphere.tiles.length; ) {
          const t = hexasphere.tiles[i];
          const latLon = t.getLatLon(hexasphere.radius);
          const geometry = new THREE.Geometry();
          for (let j = 0; j < t.boundary.length; ) {
            const bp = t.boundary[j];
            geometry.vertices.push(new THREE.Vector3(bp.x, bp.y, bp.z));
            j += 1;
          }
          geometry.faces.push(new THREE.Face3(0, 1, 2));
          geometry.faces.push(new THREE.Face3(0, 2, 3));
          geometry.faces.push(new THREE.Face3(0, 3, 4));
          if (geometry.vertices.length > 5) {
            geometry.faces.push(new THREE.Face3(0, 4, 5));
          }
          let material;
          if (isLand(latLon.lat, latLon.lon)) {
            material = meshMaterials[Math.floor(Math.random() * meshMaterials.length)];
          } else {
            material = oceanMaterial[Math.floor(Math.random() * oceanMaterial.length)];
          }

          material.opacity = 0.3;
          const mesh = new THREE.Mesh(geometry, material.clone());
          scene.add(mesh);
          hexasphere.tiles[i].mesh = mesh;
          i += 1;
        }

        seenTiles = {};

        currentTiles = hexasphere.tiles.slice().splice(0, 12);
        currentTiles.forEach(item => {
          seenTiles[item.toString()] = 1;
          item.mesh.material.opacity = 1; // eslint-disable-line no-param-reassign
        });

        window.hexasphere = hexasphere;
      };

      function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }

      createScene(45, 25, 0.9);

      let lastTime = Date.now();
      let cameraAngle = -Math.PI / 1.5;

      const tick = function() {
        const dt = Date.now() - lastTime;

        const rotateCameraBy = (2 * Math.PI) / (200000 / dt);
        cameraAngle += rotateCameraBy;

        lastTime = Date.now();

        camera.position.x = cameraDistance * Math.cos(cameraAngle);
        camera.position.y = Math.sin(cameraAngle) * 10;
        camera.position.z = cameraDistance * Math.sin(cameraAngle);
        camera.lookAt(0, 35, 0);

        renderer.render(scene, camera);

        const nextTiles = [];

        currentTiles.forEach(item => {
          item.neighbors.forEach(neighbor => {
            if (!seenTiles[neighbor.toString()]) {
              neighbor.mesh.material.opacity = 1; // eslint-disable-line no-param-reassign
              nextTiles.push(neighbor);
              seenTiles[neighbor] = 1;
            }
          });
        });

        currentTiles = nextTiles;

        requestAnimationFrame(tick);
      };
      window.addEventListener('resize', onWindowResize, false);
      const mapbg = document.getElementById('mapbg');
      mapbg.append(renderer.domElement);
      requestAnimationFrame(tick);
      //   window.scene = scene;
      //   window.createScene = createScene;
    },
  },
  mounted() {
    setTimeout(() => {
      this.init();
    }, 100);
  },
};
</script>

<style scoped lang="less">
.mapbg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

img {
  display: none;
}
</style>
