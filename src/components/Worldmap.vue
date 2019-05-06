<template>
    <div id="mapbg" class="mapbg">
        <h3 v-if="selected" class="title">
          <div>{{selected}}</div>
          <button class="button button-blue">visit (coming soon)</button>
          <div>INFORMATIONS</div>
          <h5 class="mt-0">TOTAL SCORE : 0</h5>
          <h5 class="mt-0">UNDER THE CONTROL OF THE GOVERNMENT</h5>
        </h3>
        <div class="first-line"></div>
        <div id="map">
        </div>
            <Splash v-if="showLoading"/>
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
      selected:null,
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
      const scene = new THREE.Scene();
      const aspect = window.innerWidth / window.innerHeight;
      const camera = new THREE.PerspectiveCamera(30, aspect, 0.1, 300);
      let cameraRotation = 0;
      const cameraDistance = 20;
      const cameraRotationSpeed = 0.001;
      const cameraAutoRotation = false;
      const orbitControls = new THREE.OrbitControls(camera, mapbg);
      orbitControls.keys = {
        LEFT: null, // left arrow
        UP: null, // up arrow
        RIGHT: null, // right arrow
        BOTTOM: null, // down arrow
      };
      orbitControls.enabled = !cameraAutoRotation;
      orbitControls.minZoom = 1;
      orbitControls.maxZoom = 1;
      orbitControls.minDistance = 1;
      orbitControls.maxDistance = 2.8;
      orbitControls.mouseButtons = {
	    LEFT: THREE.MOUSE.LEFT,
	    MIDDLE: THREE.MOUSE.MIDDLE,
	    RIGHT: null
      }
      renderer.setSize(window.innerWidth, window.innerHeight);
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

        const cloud = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);

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
        cloud.name = 'clouds';
        atmosphericGlow.name = 'atmosphericGlow';
        planet.add(surface);
        planet.add(atmosphere);
        planet.add(cloud);
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

      const createTerritories = function() {
        const img = document.getElementById('projection');
        const projectionCanvas = document.createElement('canvas');
        const projectionContext = projectionCanvas.getContext('2d');
        img.width = document.getElementById('app').offsetWidth - 400;
        img.height = document.getElementById('app').offsetHeight - 100;

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
        meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: false }));
        meshMaterials.push(new THREE.MeshBasicMaterial({ color: 0x000000, transparent: false }));
        oceanMaterial.push(new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true }));

        // let radius = 0.519;
        const radius = 0.61;
        const divisions = 28;
        const tileSize = 0.85;
        let count =1;
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
            if(count<6)
            {
            material = meshMaterials[1];
            material.name = 'Special ' + count;
            }
            else
            {
            material = meshMaterials[0];
            material.name = 'territory ' + count;
            material.opacity = 0.5;
            }
            count++;
          } else {
            material = oceanMaterial[0];
            material.name = 'void';
            material.opacity = 0;
          }
          const mesh = new THREE.Mesh(geometry, material.clone());
          mesh.name = 'grid ' ;
          mesh.callback = function() {
            console.log(this.name);
          };
          territories.add(mesh);
          hexasphere.tiles[i].mesh = mesh;
          i += 1;
        }

        seenTiles = {};

        currentTiles = hexasphere.tiles.slice().splice(0, 12);
        currentTiles.forEach(item => {
          seenTiles[item.toString()] = 1;
        });
        territories.name = "territories";
        scene.add(territories);
      };
            createTerritories();

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
          size: 0.09,
          material: {
            opacity: 0.2,
          },
          textures: {
            map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg',
            alphaMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg',
          },
          glow: {
            size: 0.02,
            intensity: 0.7,
            fade: 7,
            color: 0x93cfef,
          },
        },
        clouds: {
          size: 0.6,
          material: {
            opacity: 0.8,
          },
          textures: {
            map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg',
            alphaMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg',
          },
          glow: {
            size: 1,
            intensity: 0.7,
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
      scene.add(camera);
      scene.add(spotLight);
      scene.add(earth);


      let raycaster = new THREE.Raycaster(),
        INTERSECTED;
      const mouse = new THREE.Vector2();

      renderer.domElement.addEventListener('click', onclick, true);

          camera.position.set(1,
1,
1)
      camera.position.set(earth.position.x+0.8,earth.position.y+0.5,1)
      camera.lookAt(earth.position)
      let selectedTerritory;
      function onclick(event) {
        if(selectedTerritory)
        selectedTerritory.object.material.color.set(self.oldcolor);
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects(territories.children); // array
        if (intersects.length > 0 && intersects[0].object.material.name!='void') {
          selectedTerritory = intersects[0];
          self.oldcolor = selectedTerritory.object.material.color.getHex();
          selectedTerritory.object.material.color.set(0xffffff);
          self.selected = selectedTerritory.object.material.name
          console.log(selectedTerritory)
//           earth.position.set(0.5,
// 0.1890929793640145,
// -0.2150007289136958)
//           territories.position.set(0.5,
// 0.1890929793640145,
// -0.2150007289136958)
          OrbitControls.update()
         
        }
        else(self.selected=null)
      }

      // Light Configurations
      spotLight.position.set(1, 1, 1);

      // Mesh Configurations
      earth.receiveShadow = false;
      earth.castShadow = false;
      earth.rotateY(179.05);
      earth.rotateX(0);
      earth.rotateZ(0);
      // On window resize, adjust camera aspect ratio and renderer size
      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        //camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth,  window.innerHeight);
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
      // Main render function
      const render = function() {
        //raycaster.setFromCamera(mouse, camera);
        //const intersects = raycaster.intersectObjects(territories.children);
        // if (intersects.length > 0) {
        //   if (intersects[0] && intersects[0].object && selectedTerritory != intersects[0].object) {
        //     selectedTerritory.object.material.color.set(0xff0000);
        //     if (intersects[0]) 
        //     {
        //     INTERSECTED.object.material.color.set(0xffFFFF);
        //     }
        //   }
        // }
        scene.getObjectByName('surface').rotation.y += (1 / 16) * 0.01;
        scene.getObjectByName('territories').rotation.y += (1 / 16) * 0.01;
        //earth.getObjectByName('clouds').rotation.y += (1 / 16) * 0.01;
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      };

      render();
      this.showLoading = false;
      // camera.lookAt(20,30,40);
      orbitControls.update();
    },
  },
  mounted() {
    setTimeout(() => {

      this.init();
    }, 700);
  },
};
</script>

<style scoped lang="less">
.mapbg {
  position: fixed;
  left: 0px;
}

#map {
  height: 100ù;
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
}

.first-line{
  position: absolute;
  left: 50%;
  top:20%;
  z-index: 20;
}
</style>
