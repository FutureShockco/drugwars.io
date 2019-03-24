<template>
  <div
    class="d-flex flex-lg-row flex-column text-center text-lg-left item"
    :class="{ progress: inProgress, 'not-enough': hasNotEnough }"
  >
    <div class="mr-3">
      <img class="preview" :src="`/img/buildings/${building.id}.jpg`">
    </div>
    <div class="level">{{ ownItem.lvl }}</div>
    <div class="item-content width-full mr-3 mb-4">
      <h5>{{ building.name }}</h5>
      <Cost
        :drugsCost="drugsCost"
        :weaponsCost="weaponsCost"
        :alcoholsCost="alcoholsCost"
        :quantity="1"
      />
      <div class="mb-2" v-html="building.desc"></div>
      <div v-if="building.feature" class="mb-2">
        UNIQUE:
        <span class="text-orange">{{ building.feature }}</span>
      </div>
      <div v-if="building.production_type" class="mb-2">
        <BuildingProduction
          :compactview="0"
          :type="building.production_type"
          :level="ownItem.lvl"
          :coeff="building.coeff"
          :production_rate="building.production_rate"
        />
      </div>
      <div
        v-if="['drug_storage', 'weapon_storage', 'alcohol_storage'].includes(building.id)"
        class="mb-2"
      >
        <div v-if="ownItem.lvl"><b>Current capacity:</b> {{ 10000 + 25000 * ownItem.lvl + (10000 + ((25000 * ownItem.lvl) / 100) * 10) | amount }}</div>
        <div v-if="ownItem.lvl"><b>Next capacity:</b> {{ 10000 + 25000 * (ownItem.lvl+1) + (10000 + ((25000 * (ownItem.lvl+1)) / 100) * 10) | amount }}</div>
        <div v-else><b>Next capacity:</b> {{ 10000 + 25000 * 1 + (10000 + ((25000 * 1) / 100) * 10) | amount }}</div>
        <div v-if="ownItem.lvl"><b>Current Safe:</b> {{ (10000 + 25000 * ownItem.lvl + (10000 + ((25000 * ownItem.lvl) / 100) * 10)) /100*25 | amount }}</div>
        <div v-if="ownItem.lvl"><b>Next Safe:</b> {{ (10000 + 25000 * (ownItem.lvl+1) + (10000 + ((25000 * (ownItem.lvl+1)) / 100) * 10)) /100*25 | amount }}</div>
        <div v-else><b>Safe:</b> {{ 10000 /100*25 | amount }}</div>
      </div>
    </div>
    <div class="mx-auto">
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
import { utils } from 'drugwars';

export default {
  props: ['building'],
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    balances() {
      const time =
        (this.$store.state.ui.timestamp - new Date(this.user.last_update).getTime()) / 1000;
      let drugs =
        this.user.drugs_balance +
        Number(parseFloat(time * this.user.drug_production_rate).toFixed(2));
      let weapons =
        this.user.weapons_balance +
        Number(parseFloat(time * this.user.weapon_production_rate).toFixed(2));
      let alcohols =
        this.user.alcohols_balance +
        Number(parseFloat(time * this.user.alcohol_production_rate).toFixed(2));
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')) {
        const oc = this.$store.state.game.user.buildings.find(
          b => b.building === 'operation_center',
        ).lvl;
        drugs += (oc + time * this.user.drug_production_rate) * 0.005;
        weapons += (oc + time * this.user.weapon_production_rate) * 0.005;
        alcohols += (oc + time * this.user.alcohol_production_rate) * 0.005;
      }
      return {
        drugs: drugs > this.user.drug_storage ? this.user.drug_storage : drugs,
        weapons: weapons > this.user.weapon_storage ? this.user.weapon_storage : weapons,
        alcohols: alcohols > this.user.alcohol_storage ? this.user.alcohol_storage : alcohols,
      };
    },
    hasNotEnough() {
      return (
        this.drugsCost > this.balances.drugs ||
        this.weaponsCost > this.balances.weapons ||
        this.alcoholsCost > this.balances.alcohols
      );
    },
    ownItem() {
      return (
        this.$store.state.game.user.buildings.find(b => b.building === this.building.id) || {
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
      return utils.calculateCostToUpgrade(this.building.drugs_cost, this.ownItem.lvl);
    },
    weaponsCost() {
      return utils.calculateCostToUpgrade(this.building.weapons_cost, this.ownItem.lvl);
    },
    alcoholsCost() {
      return utils.calculateCostToUpgrade(this.building.alcohols_cost, this.ownItem.lvl);
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
