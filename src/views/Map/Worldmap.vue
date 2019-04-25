<template>
	<div class="text-center">
		<h2 class="pt-4 mt-0">WORLD MAP</h2>
		<div id="map"></div>
	</div>
</template>

<script>
import * as THREE from 'three';

export default {
  name: 'ThreeTest',
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
      const renderer = new THREE.WebGLRenderer();
      const scene = new THREE.Scene();
      const map = document.getElementById('map');
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 1500);
      let cameraRotation = 0;
      const cameraRotationSpeed = 0.0;
      const cameraAutoRotation = true;
      const spotLight = new THREE.SpotLight(0xffffff, 1, 0, 10, 2);
      const planetProto = {
        sphere(size) {
          const sphere = new THREE.SphereGeometry(size, 32, 32);

          return sphere;
        },
        material(options) {
          const material = new THREE.MeshPhongMaterial();
          if (options) {
            const property = options;
            material[property] = options[property];
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
            material[property] = texture; // eslint-disable-line no-param-reassign
            material.needsUpdate = true; // eslint-disable-line no-param-reassign
          });
        },
      };

      const createPlanet = function(options) {
        const surfaceGeometry = planetProto.sphere(options.surface.size);
        const surfaceMaterial = planetProto.material(options.surface.material);
        const surface = new THREE.Mesh(surfaceGeometry, surfaceMaterial);
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
        const atmosphericGlowGeometry = planetProto.sphere(
          options.surface.size + options.atmosphere.size + options.atmosphere.glow.size,
        );
        const atmosphericGlowMaterial = planetProto.glowMaterial(
          options.atmosphere.glow.intensity,
          options.atmosphere.glow.fade,
          options.atmosphere.glow.color,
        );
        const atmosphericGlow = new THREE.Mesh(atmosphericGlowGeometry, atmosphericGlowMaterial);
        const planet = new THREE.Object3D();
        surface.name = 'surface';
        atmosphere.name = 'atmosphere';
        atmosphericGlow.name = 'atmosphericGlow';
        planet.add(surface);
        planet.add(atmosphere);
        planet.add(atmosphericGlow);
        if (options.surface.textures) {
          const textureProperty = options.surface.textures;
          planetProto.texture(
            surfaceMaterial,
            textureProperty,
            options.surface.textures[textureProperty],
          );
        }

        if (options.atmosphere.textures) {
          const textureProperty = options.atmosphere.textures;
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
          size: 0.6,
          material: {
            bumpScale: 0.08,
            specular: new THREE.Color('grey'),
            shininess: 10,
          },
          textures: {
            map: '/img/map/8081_earthmap2k.jpg',
            bumpMap: '/img/map/8081_earthbump2k.jpg',
            specularMap: '/img/map/8081_earthspec2k.jpg',
          },
        },
        atmosphere: {
          size: 0.01,
          material: {
            opacity: 0.8,
          },
          textures: {
            map: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmap.jpg',
            alphaMap: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/141228/earthcloudmaptrans.jpg',
          },
          glow: {
            size: 0.0,
            intensity: 0.7,
            fade: 7,
            color: 0x93cfef,
          },
        },
      });
      renderer.setSize(700, 700);
      map.appendChild(renderer.domElement);
      camera.position.set(1, 1, 1);
      scene.add(camera);
      scene.add(spotLight);
      scene.add(earth);
      spotLight.position.set(0.5, 0.5, 1);
      earth.receiveShadow = true;
      earth.castShadow = true;
      earth.getObjectByName('surface').geometry.center();
      window.addEventListener('resize', () => {
        camera.aspect = 700 / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(700, window.innerHeight);
      });
      const render = function() {
        earth.getObjectByName('surface').rotation.y += (1 / 32) * 0.01;
        earth.getObjectByName('atmosphere').rotation.y += (1 / 16) * 0.01;
        if (cameraAutoRotation) {
          cameraRotation += cameraRotationSpeed;
          camera.position.y = 0;
          camera.position.x = 2 * Math.sin(cameraRotation);
          camera.position.z = 2 * Math.cos(cameraRotation);
          camera.lookAt(earth.position);
        }
        requestAnimationFrame(render);
        renderer.render(scene, camera);
      };

      render();
    },
  },
  mounted() {
    this.init();
  },
};
</script>
