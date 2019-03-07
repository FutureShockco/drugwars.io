<template>
  <div
    class="d-flex flex-lg-row flex-column text-center border-bottom text-lg-left item"
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
      />
      <div class="mb-2" v-html="building.desc"></div>
      <div v-if="building.feature" class="mb-2">
        Special:
        <span class="text-green">{{ building.feature }}</span>
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
        <div><b>Current capacity:</b> {{ ownItem.lvl * 30000 | amount }}</div>
        <div><b>Next capacity:</b> {{ (ownItem.lvl + 1) * 30000 | amount }}</div>
        <div><b>Safe:</b> {{ ownItem.lvl * 30000 / 100 * 25 | amount }}</div>
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
      const time = (this.$store.state.ui.timestamp - Date.parse(this.user.last_update)) / 1000;
      return {
        drugs: this.user.drugs_balance + time * this.user.drug_production_rate,
        weapons: this.user.weapons_balance + time * this.user.weapon_production_rate,
        alcohols: this.user.alcohols_balance + time * this.user.alcohol_production_rate,
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
