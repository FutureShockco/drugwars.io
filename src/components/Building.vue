<template>
    <div class="d-flex flex-lg-row flex-column text-center text-lg-left item" :class="{ progress: inProgress, 'not-enough': hasNotEnough }">
        <div class="mr-3">
            <img class="preview" :src="`/img/buildings/${building.id}.jpg`">
        </div>
        <div class="level">{{ ownItem.lvl }}</div>
        <div class="item-content width-full mr-3 mb-4">
            <h5>{{ building.name }}</h5>
            <Cost :drugsCost="drugsCost" :weaponsCost="weaponsCost" :alcoholsCost="alcoholsCost" :quantity="1" />
            <div class="mb-2" v-html="building.desc"></div>
            <div v-if="building.feature" class="mb-2">
                UNIQUE:
                <span class="text-orange">{{ building.feature }}</span>
            </div>
            <div v-if="building.production_type" class="mb-2">
                <BuildingProduction :compactview="0" :type="building.production_type" :level="ownItem.lvl" :coeff="building.coeff" :production_rate="building.production_rate" />
            </div>
            <div v-if="['drug_storage', 'weapon_storage', 'alcohol_storage'].includes(building.id)" class="mb-2">
                <div v-if="ownItem.lvl"><b>Current capacity:</b> {{ currentCapacity | amount }}</div>
                <div v-else><b>Current capacity:</b> {{ 10000 | amount }}</div>
                <div v-if="ownItem.lvl"><b>Next capacity:</b> {{ existNextCapacity | amount }}</div>
                <div v-else><b>Next capacity:</b> {{ nextCapacity | amount }}</div>
                <div v-if="ownItem.lvl"><b>Safe:</b> {{ currentCapacity /100*25 | amount }}</div>
                <div v-else><b>Safe:</b> {{ 10000 /100*25 | amount }}</div>
                <div v-if="ownItem.lvl"><b>Next Safe:</b> {{ existNextCapacity /100*25 | amount }}</div>
                <div v-else><b>Next Safe:</b> {{ existNextCapacity /100*25 | amount }}</div>
            </div>
        </div>
        <div class="mx-auto">
            <Checkout :id="building.id" :level="ownItem.lvl + 1" :coeff="building.coeff" :hqLevel="ownHq.lvl" :inProgress="inProgress" :price="drugsCost / 10000" :notEnough="hasNotEnough" />
        </div>
    </div>
</template>

<script>
import { utils } from 'drugwars';
import { getBalances } from '@/helpers/utils';

export default {
  props: ['building'],
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    currentCapacity() {
      return 10000 + 25000 * this.ownItem.lvl + (10000 + ((25000 * this.ownItem.lvl) / 100) * 10);
    },
    existNextCapacity() {
      return (
        10000 +
        25000 * (this.ownItem.lvl + 1) +
        (10000 + ((25000 * (this.ownItem.lvl + 1)) / 100) * 10)
      );
    },
    nextCapacity() {
      return (10000 + 25000) * 1 + (10000 + ((25000 * 1) / 100) * 10);
    },
    balances() {
      let ocLvl = 0;
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center'))
        ocLvl = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
          .lvl;
      return getBalances(this.user, ocLvl, this.$store.state.ui.timestamp);
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
      if (this.ownItem.pending_update) {
        const pendingUpdate = new Date(this.ownItem.pending_update).getTime();
        const now = new Date().getTime();
        return pendingUpdate >= now;
      }
      const nextUpdate = new Date(this.ownItem.next_update).getTime();
      const now = new Date().getTime();
      return nextUpdate >= now;
    },
  },
};
</script>
