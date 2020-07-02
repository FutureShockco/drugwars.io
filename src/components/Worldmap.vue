<template>
  <div class="text-center py-1">
    <button
      v-if="!showTargets && !showAction"
      @click="switchTargets"
      class="button button-green btnmapl"
    >Show Targets</button>
    <!-- <button
      v-if="!showTargets && !showAction"
      @click="switchResources"
      class="button button-green btnmapc"
    >Show Resources</button>-->
    <button
      v-else-if="!showAction"
      @click.prevent="switchTargets"
      class="button button-red btnmapl"
    >Hide Targets</button>
    <button
      v-if="!showAction && showTargets"
      @click.prevent="refreshTargets()"
      class="button button-green btnmapr"
    >Refresh Targets</button>
    <router-link v-if="selected" :to="`/map/territory?location=${selected.count}`">
      <button class="button button-blue top text-center mt-5" :disabled="!selected">
        <span v-if="main">VISIT</span>
        <span v-else>CHOOSE AS MAIN TERRITORY</span>
      </button>
    </router-link>
    <MapAction
      :base="actionBase"
      :territory="actionTerritory"
      :targetNickname="nickname"
      :show="showAction"
      id="mapaction"
    />
    <div v-if="showTargets && !isLoading">

        <div v-if="target.territory > 0 && !showAction"
        :key="target.nickname+target.base+target.territory"
        :player="target"
        v-for="target in targets"
          :id="'bubble'+target.nickname"
          :class="target.nickname"
          class="plbubble bubble  m-1 text-center anim-scale-in"
        >
          <PlayerBubble :player="target" />
                    <button class="button button-red abs" @click="chooseTarget(target)">
            <div class="iconfont icon-target"></div>
          </button>
        </div>
      </div>

    <div id="mapbg" class="mapbg">
      <h3 class="title" id="title" style="opacity:0;pointer-events: default!important;">
        <div
          v-if="selected"
          style=" pointer-events: none!important;"
        >{{selected.name}} {{selected.count}}</div>
        <router-link 	v-if="selected&&selected.gang" :to="`/gangs/gang/${selected.gang}`">
        <h5 v-if="selected&&selected.gang"
          class="mt-0"
          style=" pointer-events: none!important;"
        >UNDER THE CONTROL OF : <span class="text-red">{{selected.gang}}</span> </h5></router-link>
                <h5 v-else
          class="mt-0"
          style=" pointer-events: none!important;"
        >UNDER THE CONTROL OF : goverment</h5>
        <div style=" pointer-events: none!important;">INFORMATIONS</div>
        <h5
          class="mt-0"
          style=" pointer-events: none!important;"
          v-if="selected && selected.total_player"
        >FREE LOCATIONS: {{225 - selected.total_player}}</h5>
        <h5
          class="mt-0"
          style=" pointer-events: none!important;"
          v-if="selected && selected.total_player"
        >TOTAL BASES: {{selected.total_player}}</h5>
        <h5
          style=" pointer-events: none!important;"
          class="mt-0"
          v-if="selected && selected.dangerosity"
        >RISK: {{selected.dangerosity}}</h5>
        <!-- <router-link
          style=" pointer-events: default!important;"
          v-if="selected && selected.resources"
          :to="`/drugs/detail?name=${selected.resources}`"
        >
          <h5 class="mt-0">
            RESOURCES:
            <span class="text-orange">{{selected.resources}}</span>
          </h5>
        </router-link> -->
        <h5
          class="mt-0"
          v-if="selected"
          style=" pointer-events: none!important;"
        >CONTINENT: {{selected.continent}}</h5>
      </h3>
      <div class="crosshair" id="crosshairx" style="opacity:0;"></div>
      <div class="crosshairy" id="crosshairy" style="opacity:0;"></div>
      <div class="map-title" id="visit" style="opacity:0;">
        <router-link v-if="selected" :to="`/map/territory?location=${selected.count}`">
          <button class="button button-blue" :disabled="!selected">
            <span v-if="main">VISIT</span>
            <span v-else>CHOOSE AS MAIN TERRITORY</span>
          </button>
        </router-link>
      </div>
      <!-- <div
        class="anim-scale-in"
        v-if="!isLoading && location.id !== 0 && !showTargets && !showAction && location.name === 'airport'"
        :key="location.id"
        v-for="location in locations"
      >
        <div :id="'spot'+location.id" class="spot">{{location.locationname}}</div>
      </div> -->
      <!-- <div
        :id="'drug'+resource.territory"
        class="drug"
        v-if="!isLoading  && !showAction && !showTargets && showResources"
        :key="resource.id"
        v-for="resource in resources"
      >
        <img :src="`//img.drugwars.io/icons/${resource.icon}`" width="36" height="36" />
        {{resource.locationname}}
      </div> -->
      <div class="first-line"></div>
      <img id="projection" src="/img/map/equirectangle_projection.png" />
    </div>
    <div class="glow" ></div>
  </div>
</template>

<script>
/* eslint-disable */
import * as THREE from 'three';
import Hexasphere from 'hexasphere.js';
import OrbitControls from 'three-orbitcontrols';
import client from '@/helpers/client';
import { continents, drugs, locations } from 'drugwars';

export default {
  data() {
    return {
      main: this.$store.state.game.user.buildings.find(b => b.main === 1) || null,
      all_players: this.$store.state.game.prizeProps.users[0].total || null,
      camera: null,
      isLoading: true,
      scene: null,
      renderer: null,
      mesh: null,
      showLoading: true,
      selected: null,
      maxcount: 0,
      currentTerritory: null,
      territories: null,
      oldcolor: null,
      animation: null,
      player_territories: null,
      controls: null,
      textlabels: [],
      targets: [],
      username: this.$store.state.auth.username,
      showTargets: false,
      selectedTerritory: null,
      nickname: null,
      actionBase: null,
      actionTerritory: null,
      resources: [],
      showAction: false,
      showSpots: true,
      showResources: false,
      drugs,
      locations,
    };
  },
  beforeDestroy() {
    this.clearScene(this.scene);
  },
  computed: {
    ownBase() {
      return this.$store.state.game.mainbase;
    },
    ownUnits() {
      let units = [];
      units = this.$store.state.game.user.units.map(
        unit =>
          unit.base === this.ownBase.base &&
          unit.territory === this.ownBase.territory && {
            key: unit.unit,
            amount: unit.amount,
          },
      );
      return units;
    },
  },
  methods: {
    prevent(e) {
      e.preventDefault();
    },
    chooseTarget(player) {
      this.actionBase = player.base;
      this.actionTerritory = player.territory;
      this.nickname = player.nickname;
      this.showAction = true;
      const visitTitle = document.getElementById('title');
      const visitButton = document.getElementById('visit');
      const crosshairx = document.getElementById('crosshairx');
      const crosshairy = document.getElementById('crosshairy');
      crosshairx.style.opacity = 0;
      crosshairy.style.opacity = 0;
      visitTitle.style.opacity = 0;
      visitButton.style.opacity = 0;
    },
    switchTargets() {
      this.showTargets = !this.showTargets;
    },
    switchResources() {
      this.showResources = !this.showResources;
    },
    chooseContinentDrug(territory) {
      let prob = Math.ceil(
        territory
          .toString()
          .substring(territory.toString().length - 1, territory.toString().length),
      );
      const data = {};
      continents.forEach(element => {
        if (element.locations.includes(territory)) {
          data.name = element.name;
          while (!drugs[prob] || !drugs[prob].location.includes(element.id)) {
            prob--;
          }
          if (drugs[prob] && drugs[prob].location.includes(element.id)) {
            data.resources = drugs[prob].id;
            data.icon = drugs[prob].icon;
          }
        }
      });
      if (!data.name) {
        data.name = 'Asia';
        while (!drugs[prob] || !drugs[prob].location.includes('as')) {
          prob--;
        }
        if (drugs[prob] && drugs[prob].location.includes('as')) {
          data.resources = drugs[prob].id;
          data.icon = drugs[prob].icon;
        }
      }
      return data;
    },
    refreshTargets() {
      const self = this;
      self.targets = [];
      client
        .requestAsync('get_users', null)
        .then(users => {
          self.targets = users;
          self.isLoading = false;
        })
        .catch(e => {
          console.error('Failed to get users', e);
          this.isLoading = false;
        });
    },
    loadFarm(farm) {
      this.target = farm.territory;
      this.base = farm.location;
      this.farmOn = !this.farmOn;
    },
    deleteFarm(combination) {
      let favs = [];
      if (localStorage.getItem('farmlist')) {
        favs = JSON.parse(localStorage.getItem('farmlist'));
      }
      for (let i = 0; i < favs.length; i += 1) {
        if (favs[i].name === combination) {
          favs.splice(i, 1);
          i -= 1;
        }
      }
      localStorage.setItem('farmlist', JSON.stringify(favs));
      this.farmlist = favs;
    },
    initPlanet() {
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
      self.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);// eslint-disable-line
      const rotating = true;
      self.controls.keys = {
        LEFT: null, // left arrow
        UP: null, // up arrow
        RIGHT: null, // right arrow
        BOTTOM: null, // down arrow
      };
      self.controls.enabled = true;
      self.controls.minZoom = 1;
      self.controls.maxZoom = 1;
      self.controls.minDistance = 1.2;
      self.controls.maxDistance = 2.0;
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
                value: self.camera.position,
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

      self.earth = createPlanet({
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
        atmosphere: {
          size: 0.12,
          material: {
            opacity: 0.8,
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
      });

      // Galaxy
      const galaxyGeometry = new THREE.SphereGeometry(100, 32, 32);
      const galaxyMaterial = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
      });
      const galaxy = new THREE.Mesh(galaxyGeometry, galaxyMaterial);
      // Load Galaxy Textures
      textureLoader.crossOrigin = true;
      textureLoader.load(
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/starfield.png',
        texture => {
          galaxyMaterial.map = texture;
          self.scene.add(galaxy);
        },
      );

      // Light Configurations
      spotLight.position.set(1, 1, 1);

      // Mesh Configurations
      self.earth.receiveShadow = false;
      self.earth.castShadow = false;
      self.earth.rotateY(179.05);
      self.earth.rotateX(0);
      self.earth.rotateZ(0);

      self.scene.add(self.earth);
      self.scene.add(spotLight);
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
      self.camera.rotation.x = -0.86;
      self.camera.rotation.y = 0.75;
      self.scene.add(this.camera);
      // Main render function
      const visitTitle = document.getElementById('title');
      const visitButton = document.getElementById('visit');
      const crosshairx = document.getElementById('crosshairx');
      const crosshairy = document.getElementById('crosshairy');
      const render = function() {
        self.textlabels.forEach(element => {
           element.updatePosition();
        }); 
        if (
          self.scene &&
          self.scene.getObjectByName('territories') &&
          self.selectedTerritory &&
          visitButton
        ) {
          const boundingBox = self.selectedTerritory.object.geometry.boundingBox;
          const position = new THREE.Vector3();
          position.subVectors(boundingBox.max, boundingBox.min);
          position.multiplyScalar(0.5);
          position.add(boundingBox.min);
          position.applyMatrix4(self.selectedTerritory.object.matrixWorld);
          if (self.camera) {
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
        if (
          self.scene &&
          self.scene.getObjectByName('territories') &&
          self.targets.length > 0 &&
          self.showTargets
        ) {
          self.targets.forEach(element => {
            const searchTerritories = self.scene.getObjectByName('territories');
            if (
              searchTerritories.children[element.territory - 1] &&
              document.getElementById(`bubble${element.nickname}`)
            ) {
              const mapbg = document.getElementById('mapbg');
              const boundingBox =
                searchTerritories.children[element.territory - 1].geometry.boundingBox;
              const position = new THREE.Vector3();
              position.subVectors(boundingBox.max, boundingBox.min);
              position.multiplyScalar(0.5);
              position.add(boundingBox.min);
              position.applyMatrix4(searchTerritories.children[element.territory - 1].matrixWorld);
              if (self.camera && searchTerritories.children[element.territory - 1]) {
                const to = createVector(position, self.camera);
                const b = document.getElementById(`bubble${element.nickname}`);
                b.style.top = `${to.y - 10}px`;
                b.style.left = `${to.x - 50}px`;
                if (
                  to.x > mapbg.offsetWidth ||
                  to.x < 0 ||
                  to.y < 50 ||
                  to.y > mapbg.offsetHeight ||
                  to.z > 0.86
                ) {
                  b.style.opacity = 0;
                  b.style.display = 'none';
                } else {
                  b.style.opacity = 1;
                  b.style.display = 'block';
                  b.style.webkitTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.mozTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.msTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.oTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.transform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                }
              }
            }
          });
        }
        if (
          self.scene &&
          self.scene.getObjectByName('territories') &&
          self.locations.length &&
          self.showSpots &&
          !self.showTargets
        ) {
          self.locations.forEach(element => {
            const searchTerritories = self.scene.getObjectByName('territories');
            if (
              searchTerritories.children[element.id - 1] &&
              document.getElementById(`spot${element.id}`)
            ) {
              const mapbg = document.getElementById('mapbg');
              const boundingBox = searchTerritories.children[element.id - 1].geometry.boundingBox;
              const position = new THREE.Vector3();
              position.subVectors(boundingBox.max, boundingBox.min);
              position.multiplyScalar(0.5);
              position.add(boundingBox.min);
              position.applyMatrix4(searchTerritories.children[element.id - 1].matrixWorld);
              if (self.camera && searchTerritories.children[element.id - 1]) {
                const to = createVector(position, self.camera);
                const b = document.getElementById(`spot${element.id}`);
                b.style.top = `${to.y - 10}px`;
                b.style.left = `${to.x - 50}px`;
                if (
                  to.x > mapbg.offsetWidth ||
                  to.x < 0 ||
                  to.y < 50 ||
                  (to.y > mapbg.offsetHeight && to.z < 0.88) ||
                  to.z > 0.83
                ) {
                  b.style.opacity = 0;
                  b.style.display = 'none';
                } else {
                  b.style.opacity = 1;
                  b.style.display = 'block';
                  b.style.webkitTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.mozTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.msTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.oTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.transform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                }
              }
            }
          });
        }
        if (
          self.scene &&
          self.scene.getObjectByName('territories') &&
          self.showResources &&
          self.resources.length
        ) {
          self.resources.forEach(element => {
            const searchTerritories = self.scene.getObjectByName('territories');
            if (
              searchTerritories.children[element.territory] &&
              document.getElementById(`drug${element.territory}`)
            ) {
              const mapbg = document.getElementById('mapbg');
              const boundingBox =
                searchTerritories.children[element.territory].geometry.boundingBox;
              const position = new THREE.Vector3();
              position.subVectors(boundingBox.max, boundingBox.min);
              position.multiplyScalar(0.5);
              position.add(boundingBox.min);
              position.applyMatrix4(searchTerritories.children[element.territory].matrixWorld);
              if (self.camera && searchTerritories.children[element.territory]) {
                const to = createVector(position, self.camera);
                const b = document.getElementById(`drug${element.territory}`);
                b.style.top = `${to.y - 15}px`;
                b.style.left = `${to.x - 15}px`;
                if (
                  to.x > mapbg.offsetWidth ||
                  to.x < 0 ||
                  to.y < 100 ||
                  to.y > mapbg.offsetHeight ||
                  to.z > 0.78 ||
                  to.z < 0.6
                ) {
                  b.style.opacity = 0;
                  b.style.display = 'none';
                } else {
                  b.style.opacity = 1;
                  b.style.display = 'block';
                  b.style.webkitTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.mozTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.msTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.oTransform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                  b.style.transform = `translate3d('${to.x}px,${to.y}px,${to.z * 60}px)`;
                }
              }
            }
          });
        }
        if (self.scene && self.camera) {
          if (self.scene.getObjectByName('territories'))
           self.scene.getObjectByName('territories').rotation.y += (1 / 16) * 0.001;
          self.earth.getObjectByName('atmosphere').rotation.y += (1 / 16) * 0.002;
          self.earth.getObjectByName('surface').rotation.y += (1 / 16) * 0.001;
          self.animation = requestAnimationFrame(render);
          self.renderer.render(self.scene, self.camera);
        }
      };

      const createVector = (obj, camera) => {
        const p = new THREE.Vector3(obj.x, obj.y, obj.z);
        const vector = p.project(camera);

        vector.x = ((vector.x + 1) / 2) * mapbg.width;
        vector.y = (-(vector.y - 1) / 2) * mapbg.height;

        return vector;
      }
      self.controls.update();

      render();
      this.showLoading = false;
    },
    clearThree(obj) {
      while (obj.children.length > 0) {
        this.clearThree(obj.children[0]);
        obj.remove(obj.children[0]);
      }
      if (obj.geometry) {
        obj.geometry.dispose();
      }
      if (obj.material) {
        let materialArray;
        if (
          obj.material instanceof THREE.MeshFaceMaterial ||
          obj.material instanceof THREE.MultiMaterial
        ) {
          materialArray = obj.material.materials;
        } else if (obj.material instanceof Array) {
          materialArray = obj.material;
        }
        if (materialArray) {
          materialArray.forEach((mtrl, idx) => {
            if (mtrl.map) mtrl.map.dispose();
            if (mtrl.lightMap) mtrl.lightMap.dispose();
            if (mtrl.bumpMap) mtrl.bumpMap.dispose();
            if (mtrl.normalMap) mtrl.normalMap.dispose();
            if (mtrl.specularMap) mtrl.specularMap.dispose();
            if (mtrl.envMap) mtrl.envMap.dispose();
            mtrl.dispose();
          });
        } else {
          if (obj.material.map) obj.material.map.dispose();
          if (obj.material.lightMap) obj.material.lightMap.dispose();
          if (obj.material.bumpMap) obj.material.bumpMap.dispose();
          if (obj.material.normalMap) obj.material.normalMap.dispose();
          if (obj.material.specularMap) obj.material.specularMap.dispose();
          if (obj.material.envMap) obj.material.envMap.dispose();
          obj.material.dispose();
        }
      }
    },
    clearScene(scene) {
      cancelAnimationFrame(self.animation);
      const territories = scene.getObjectByName('territories');
      for (let i = territories.children.length - 1; i >= 0; i--) {
        this.clearThree(territories.children[i]);
      }

      for (let i = scene.children.length - 1; i >= 0; i--) {
        const object = scene.children[i];
        object.children.forEach(element => {
          this.clearThree(element);
        });
      }
      for (let i = scene.children.length - 1; i >= 0; i--) {
        const object = scene.children[i];
        if (this.clearThree) this.clearThree(object);
      }
      scene.dispose();
      this.scene.dispose();
      this.renderer.context = null;
      this.renderer.domElement = null;
      this.renderer = null;
      this.scene = null;
      this.camera = null;
      this.controls = null;
      this.animation = null;
    },
    initTerritories() {
      const self = this;
      self.isLoading = true;
      const onClickPosition = new THREE.Vector2();
      const territories = new THREE.Object3D();
      const createTerritories = (cb) => {
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
          const isLand = (lat, lon) => {

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
          meshMaterials.push(new THREE.MeshBasicMaterial({ color: 'rgb(12, 12, 12)' }));

          meshMaterials.push(new THREE.MeshBasicMaterial({ color: '#0043fd' }));
          oceanMaterial.push(new THREE.MeshBasicMaterial({ color: '#000' }));

          function intToHex(i) {
            const hex = parseInt(i).toString(16);
            return hex.length < 2 ? `0${hex}` : hex;
          }

          function redYellowGreen(value) {
            value = Math.min(Math.max(0, value), 1) * 510;

            let redValue;
            let greenValue;
            if (value > 255) {
              value -= 255;
              redValue = 255;
              greenValue = Math.sqrt(value) * 16;
              greenValue = Math.round(greenValue);
            } else {
              greenValue = 255;
              value -= 255;
              redValue = 255 - (value * value) / 255;
              redValue = Math.round(redValue);
            }

            return `#${intToHex(redValue)}${intToHex(greenValue)}00`;
          }

          let div = 15
          const radius = 0.61;
          const divisions = div;
          const tileSize = 0.9;
          let count = 1;
          const hexasphere = new Hexasphere(radius, divisions, tileSize);
          for (let i = 0; i < hexasphere.tiles.length; i++) {
            if (hexasphere.tiles[i]) {
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

                if (self.player_territories.find(t => t.territory === count)) {
                  const element = self.player_territories.find(t => t.territory === count);
                  const playercount = element.count;
                  const riskcolor = redYellowGreen(playercount / 25) || redYellowGreen(playercount / 5) ;
                  material = new THREE.MeshBasicMaterial({ color: riskcolor });
                  material.name = `territory`;
                  material.count = count;
                  if(element.gang)
                  material.userData.gang = element.gang;
                  else material.userData.gang ='';
                  material.userData.total_player = playercount;
                  material.userData.count = count;
                  material.userData.risk = 'inexistant';
                  const territoryData = self.chooseContinentDrug(count);
                  material.userData.continent = territoryData.name;
                  material.userData.resources = territoryData.resources;
                  self.resources.push({
                    name: material.userData.continent,
                    drug: material.userData.resources,
                    territory: count,
                    icon: territoryData.icon,
                  });


                  if (playercount / 25 > 0.25) {
                    material.userData.risk = 'moderate';
                  }
                  else if (playercount / 25 > 0.5) {
                    material.userData.risk = 'considerable';
                  }
                  else if (playercount / 25 > 0.75) {
                    material.userData.risk = 'high';
                  }
                  else if (playercount / 25 > 1) {
                    material.userData.risk = 'extreme';
                  }
                  else if (playercount / 25 > 1.25) {
                    material.userData.risk = 'pariah';
                  } 
                  else if (playercount / 25 > 1.5) {
                    material.userData.risk = 'incredible';
                  }
                  else {
                    material.userData.risk = 'low';
                  }
                } else {
                  material = meshMaterials[0];
                  material.name = `empty territory`;
                  material.userData.gang = 'goverment';
                  material.opacity = 0.8;
                  material.userData.total_player = 0;
                  material.count = count;
                  material.userData.count = count;
                }

                const mesh = new THREE.Mesh(geometry, material.clone());
                mesh.name = 'grid ';
                mesh.geometry.computeBoundingBox();
                territories.add(mesh);
                hexasphere.tiles[i].mesh = mesh;
                count = count+1;
              }
            }
          }
          self.maxcount = count;
          seenTiles = {};

          currentTiles = hexasphere.tiles.slice().splice(0, 12);
          currentTiles.forEach(item => {
            seenTiles[item.toString()] = 1;
          });
          territories.name = 'territories';
          self.isLoading = false;
          cb(territories);
        };
      };

      createTerritories(allterritories => {
        self.scene.add(allterritories);
      });
      let raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      const createVector = (obj, camera) => {
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

      function getMousePosition(dom, x, y) {
        const rect = dom.getBoundingClientRect();
        return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
      }

      const getIntersects = (point, objects) => {
        raycaster = new THREE.Raycaster();
        mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);
        raycaster.setFromCamera(mouse, self.camera);
        return raycaster.intersectObjects(objects);
      };

      function onclick(event) {
        if (self.selectedTerritory) self.selectedTerritory.object.material.color.set(self.oldcolor);
        let array = [];
        if (event.changedTouches) {
          array = getMousePosition(
            mapbg,
            event.changedTouches[0].clientX,
            event.changedTouches[0].clientY,
          );
        } else {
          array = getMousePosition(mapbg, event.clientX, event.clientY);
        }
        onClickPosition.fromArray(array);
        const intersects = getIntersects(onClickPosition, territories.children);
        if (
          intersects.length > 0 &&
          intersects[0].object.name !== 'void' &&
          intersects[0].object.material.name !== 'void'
        ) {
          self.selectedTerritory = intersects[0];
          self.oldcolor = self.selectedTerritory.object.material.color.getHex();
          self.selectedTerritory.object.material.color.set(0xff0000);
          self.selected = {};
          self.selected.name = self.selectedTerritory.object.material.name;
          self.nickname = self.selectedTerritory.object.material.name;
          self.selected.count = self.selectedTerritory.object.material.userData.count;
          self.selected.total_player = self.selectedTerritory.object.material.userData.total_player;
          self.selected.dangerosity = self.selectedTerritory.object.material.userData.risk;
          self.selected.resources = self.selectedTerritory.object.material.userData.resources;
          self.selected.continent = self.selectedTerritory.object.material.userData.continent;
          self.selected.gang = self.selectedTerritory.object.material.userData.gang;
          visitTitle.style.display = 'initial';
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
          visitTitle.style.display = 'none';
          crosshairx.style.opacity = 0;
          crosshairy.style.opacity = 0;
        }
      }
      const mapbg = document.getElementById('mapbg');
      if (mapbg) {
        mapbg.addEventListener('click', onclick, false);
        mapbg.addEventListener('touchend', onclick, false);
        mapbg.addEventListener('touchstart', onclick, false);
      }
    },
  },
  mounted() {
    const self = this;
    self.initPlanet();
    client.requestAsync('get_territories', null).then(result => {
      self.player_territories = result;
      client
        .requestAsync('get_users', null)
        .then(users => {
          self.targets = null;
          const allusers = [];
          users.forEach(element => {
            if (
              !allusers.find(
                t => t.territory === element.territory || t.nickname === element.nickname,
              )
            ) {
              allusers.push(element);
            }
          });
          self.targets = allusers;
          self.isLoading = false;
          self.initTerritories();
        })
        .catch(e => {
          console.error('Failed to get users', e);
          this.isLoading = false;
        });
    });
  },
};
</script>

<style scoped lang="less">
@import '../vars';

.bubble {
  position: absolute;
}

.rank{
  left:-80px!important;
}

.spot {
  font-family: 'Bebas Neue';
  position: absolute;
  font-weight: 700;
  padding: 0px 5px;
  color: #ffc508;
  max-width: 160px;
  font-size: 16px;
  pointer-events: none;
  background: black;
  border-radius: 5px;
  border: 1px solid #ffc508c4;
}

.drug {
  display: none;
  font-family: 'Bebas Neue';
  position: absolute;
  color: #ffc508;
  font-size: 26px;
  pointer-events: none;
  border-radius: 5px;
  height: 30px;
  width: 30px;
  img {
    display: block;
    pointer-events: none;
  }
}

// #mapaction{
//     display:none;
// }
.abs {
  top: -10px;
  left: 65px;
  border-radius: 20px;
  position: absolute;
}

.plbubble,.plbubble .button  {
  opacity: 0;
  text-align: center;
  z-index: 0;
  display: none;
}
.plbubble:hover {
  opacity: 1;
  display: initial;
  z-index: 99999;
      height: auto;
  overflow: visible;
  .button{
      opacity: 1;
  display: initial;
  z-index: 99999;
  }
}


.mapbg {
  height: calc(100vh - 98px);
}

img {
  display: none;
}

.title {
  position: absolute;
  display: none;
  z-index: 10;
  left: 50%;
  top: 20%;
  text-shadow: 5px 5px 5px black;
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
  height: 100%;
  pointer-events: none;
}

.drugimg {
  display: block;
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

.btnmapl {
  position: absolute;
  left: 20%;
  top: 10px;
}

.btnmapc {
  position: absolute;
  left: 50%;
  top: 10px;
}

.btnmapr {
  position: absolute;
  right: 20%;
  top: 10px;
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

.button.top {
  @media @bp-small {
    display: none;
  }
}

.glow{
    position: absolute;
    pointer-events: none;
    width: 50%;
    top: calc(50% - 34px);
    background-size: 89%;
    background-repeat: no-repeat;
    background-position: center;
}

</style>
