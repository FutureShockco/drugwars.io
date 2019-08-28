<template>
    <div class="d-flex flex-row border-bottom itemcompact">
        <img class="mini preview mt-2" :src="`/img/buildings/${building.id}.jpg`">
        <div class="width-full">
            <h5 class="ml-2">{{ building.name }} ({{ ownBuilding.lvl }})</h5>
        </div>
        <div v-if="building.production_type" class="right-floated">
            <BuildingProduction :compactview="1" :type="building.production_type" :level="ownBuilding.lvl" :coeff="building.coeff" :production_rate="building.production_rate" />
        </div>
    </div>
</template>

<script>
export default {
  props: ['building'],
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    ownBuilding() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === this.$props.building.id &&
            b.base === this.base.base &&
            b.territory === this.base.territory,
        ) || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
