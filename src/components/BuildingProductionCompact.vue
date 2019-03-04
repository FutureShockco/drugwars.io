<template>
  <div class="d-flex flex-row border-bottom item">
    <img class="mini preview" :src="`/img/buildings/${building.id}.jpg`">
    <div class="width-full mr-4">
      <h5 class="ml-2">{{ building.name }} ({{ ownBuilding.lvl }})</h5>
    </div>
     <div v-if="building.production_type" class="right floated">
        <BuildingProduction
          :compactview="1"
          :type="building.production_type"
          :level="ownBuilding.lvl"
          :coeff="building.coeff"
          :production_rate="building.production_rate"
        />
      </div>
  </div>
</template>

<script>
export default {
  props: ['building'],
  computed: {
    ownBuilding() {
      return (
        this.$store.state.game.user.buildings.find(b => b.building === this.$props.building.id) || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
