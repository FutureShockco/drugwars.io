<template>
  <div
    class="d-flex flex-row border-bottom item mb-4"
    :class="{ progress: inProgress }"
  >
    <div class="m-2">
      <img class="preview" :src="`/img/buildings/${building.image}.png`">
    </div>
    <div class="item-level">{{ ownBuilding.lvl }}</div>
    <div class="item-content m-2 width-full">
      <h5>{{ building.name }}</h5>
      <Cost
        class="ml-2"
        :drugsCost="drugsCost"
        :weaponsCost="weaponsCost"
        :alcoholsCost="alcoholsCost"
      />
      <div class="item-description my-1" v-html="building.desc"></div>
      <div v-if="building.feature" class="ml-2 mb-2 item-special">
        Special:
        <span class="text-green">{{ building.feature }}</span>
      </div>
      <div v-if="building.production_type" class="ml-2 mb-2">
        <BuildingProduction
          :compactview="0"
          :type="building.production_type"
          :level="ownBuilding.lvl"
          :coeff="building.coeff"
          :production_rate="building.production_rate"
        />
      </div>
    </div>
    <div class="ml-4 mr-3 pt-3 float-right">
      <Checkout
        :id="building.id"
        :level="ownBuilding.lvl + 1"
        :coeff="building.coeff"
        :hqLevel="ownHq.lvl"
        :inProgress="inProgress"
        :price="drugsCost / 10000"
      />
    </div>
  </div>
</template>

<script>
import { calculateBuildingCost } from '@/helpers/utils';

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
    drugsCost() {
      return calculateBuildingCost(this.building.drugs_cost, this.ownBuilding.lvl);
    },
    weaponsCost() {
      return calculateBuildingCost(this.building.weapons_cost, this.ownBuilding.lvl);
    },
    alcoholsCost() {
      return calculateBuildingCost(this.building.alcohols_cost, this.ownBuilding.lvl);
    },
    inProgress() {
      const building = this.$store.state.game.user.buildings.find(
        b => b.building === this.building.id,
      );
      if (!building) return false;
      const nextUpdate = new Date(building.next_update).getTime();
      const now = new Date().getTime();
      return nextUpdate >= now;
    },
  },
};
</script>
