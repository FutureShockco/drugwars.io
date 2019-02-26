<template>
  <div
    class="flex-row border-bottom item mb-3 p-2"
    :class="{ progress: inProgress, 'not-enough': hasNotEnough }"
  >
    <div class="mr-3 ml-2 mt-1">
      <img class="preview" :src="`/img/buildings/${building.id}.png`">
    </div>
    <div class="item-content width-full mr-3">
      <h5>{{ building.name }} ({{ ownItem.lvl }})</h5>
      <div class="mb-2 description">
                                  <Cost
        :drugsCost="drugsCost"
        :weaponsCost="weaponsCost"
        :alcoholsCost="alcoholsCost"
      />
        <div v-html="building.desc"></div>
        <div v-if="building.feature" class="feature">
        UNIQUE:
        <span class="special">{{ building.feature }}</span>
      </div>
            <div v-if="building.production_type">
        <BuildingProduction
          :compactview="0"
          :type="building.production_type"
          :level="ownItem.lvl"
          :coeff="building.coeff"
          :production_rate="building.production_rate"
        />
      </div>
      </div>
    </div>
    <div>
      <Checkout
        :id="building.id"
        :level="ownItem.lvl + 1"
        :coeff="building.coeff"
        :hqLevel="ownHq.lvl"
        :inProgress="inProgress"
        :price="drugsCost / 10000"
        :notEnough="hasNotEnough"
      />
    </div>
  </div>
</template>

<script>
import { calculateBuildingCost } from '@/helpers/utils';

export default {
  props: ['building'],
  computed: {
    drugsBalance() {
      return this.$store.state.game.user.drugs_balance;
    },
    weaponsBalance() {
      return this.$store.state.game.user.user.weapons_balance;
    },
    alcoholsBalance() {
      return this.$store.state.game.user.user.alcohols_balance;
    },
    hasNotEnough() {
      return (
        this.drugsCost > this.drugsBalance ||
        this.weaponsCost > this.weaponsBalance ||
        this.alcoholsCost > this.alcoholsBalance
      );
    },
    ownItem() {
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
      return calculateBuildingCost(this.building.drugs_cost, this.ownItem.lvl);
    },
    weaponsCost() {
      return calculateBuildingCost(this.building.weapons_cost, this.ownItem.lvl);
    },
    alcoholsCost() {
      return calculateBuildingCost(this.building.alcohols_cost, this.ownItem.lvl);
    },
    inProgress() {
      if (!this.ownItem) return false;
      const nextUpdate = new Date(this.ownItem.next_update).getTime();
      const now = new Date().getTime();
      return nextUpdate >= now;
    },
  },
};
</script>
