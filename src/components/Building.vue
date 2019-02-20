<template>
  <div class="mb-4 d-flex flex-row border-bottom item">
    <img class="preview" :src="`/img/buildings/${building.image}.png`">
    <div class="item-level">{{ ownBuilding.lvl }}</div>
    <div class="width-full mr-4">
      <h5>{{ building.name }}</h5>
      <div class="item-description my-1">
        <div class="ml-2" v-html="building.desc"></div>
      </div>
      <div v-if="building.feature" class="ml-2 item-special">
        SPECIAL :
        <span class="text-green">{{ building.feature }}</span>
      </div>
      <BuildingCost
        class="ml-2"
        :level="ownBuilding.lvl"
        :amount="0"
        :drugs_cost="building.drugs_cost"
        :weapons_cost="building.weapons_cost"
        :alcohols_cost="building.alcohols_cost"
      />
      <div v-if="building.production_type" class="ml-2">
        <BuildingProduction
          :compactview="0"
          :type="building.production_type"
          :level="ownBuilding.lvl"
          :coeff="building.coeff"
          :production_rate="building.production_rate"
        />
      </div>
    </div>
    <Checkout
      :id="building.id"
      :level="ownBuilding.lvl + 1"
      :coeff="building.coeff"
      :hqLevel="ownHq.lvl"
    />
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
    ownHq() {
      return (
        this.$store.state.game.user.buildings.find(b => b.building === 'headquarters') || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
