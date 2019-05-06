<template>
    <div id="mapbg" class="mapbg">
        <h3 v-if="selected" class="title">
          <div>{{selected.name}} {{selected.count}}</div>
          <div>INFORMATIONS</div>
          <h5 class="mt-0">TOTAL SCORE : 0</h5>
          <h5 class="mt-0">UNDER THE CONTROL OF THE GOVERNMENT</h5>
        </h3>
        <button class="button button-blue map-title" :disabled="!selected" id="visit">VISIT (COMINGSOON)</button>
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
import { LocationGlobe } from '@/helpers/globe.js';

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
      
    },
  },
  mounted() {
      this.init();
  },
};
</script>

<style scoped lang="less">
.mapbg {
  position: fixed;
  left: 0px;
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
}

.first-line{
  position: absolute;
  left: 50%;
  top:20%;
  z-index: 20;
}
</style>
