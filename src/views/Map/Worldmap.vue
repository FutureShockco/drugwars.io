<template>
      <div class="map" id="map"></div>
</template>

<script>
import L from 'leaflet';

export default {
  data() {
    return {
      map: null,
      tileLayer: null,
      layers: [
        {
          id: 0,
          name: 'Base',
          active: false,
          features: [
            {
              id: 1,
              name: 'MyLocation',
              type: 'marker',
              coords: [38.6350008, -90.2261532],
            },
          ],
        },
        {
          id: 1,
          name: 'Location Boundaries',
          active: true,
          features: [
            {
              id: 1,
              name: 'MyZone',
              type: 'polygon',
              coords: [[38.771216, -90.169601]],
            },
          ],
        },
      ],
    };
  },
  mounted() {
    this.initMap();
    this.initLayers();
  },
  methods: {
    // layerChanged(layerId, active) {
    // eslint-disable-next-line
      //const newlayer = this.layers.find(layer => layer.id === layerId);

    // layer.features.forEach(feature => {
    //   if (active) {
    //     feature.leafletObject.addTo(this.map);
    //   } else {
    //     feature.leafletObject.removeFrom(this.map);
    //   }
    // });
    // },
    initLayers() {
      // this.layers.forEach(layer => {
      //   const markerFeatures = layer.features.filter(feature => feature.type === 'marker');
      //   const polygonFeatures = layer.features.filter(feature => feature.type === 'polygon');
      //   markerFeatures.forEach(feature => {
      //     feature.leafletObject = L.marker(feature.coords).bindPopup(feature.name);
      //   });
      //   polygonFeatures.forEach(feature => {
      //     feature.leafletObject = L.polygon(feature.coords).bindPopup(feature.name);
      //   });
      // });
    },
    initMap() {
      this.map = L.map('map').setView([38, -90], 12);
      this.tileLayer = L.tileLayer(
        'https://cartodb-basemaps-{s}.global.ssl.fastly.net/rastertiles/voyager/{z}/{x}/{y}.png',
        {
          maxZoom: 18,
          attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; <a href="https://carto.com/attribution">CARTO</a>',
        },
      );

      this.tileLayer.addTo(this.map);
    },
  },
};
</script>

<style lang="less">
.map {
  overflow: hidden;
  width: 720px;
  max-height: 50vh;
}
</style>
