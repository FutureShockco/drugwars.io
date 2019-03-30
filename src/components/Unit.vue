<template>
  <div
    class="d-flex flex-lg-row flex-column text-center text-lg-left item"
    :class="{ progress: inProgress }"
  >
    <div class="mr-3">
      <img class="preview" :src="`/img/units/${unit.id}.jpg`">
    </div>
    <div class="level">{{ ownItem.amount }}</div>
    <div class="item-content width-full mr-3 mb-4">
      <h5>{{ unit.name }}</h5>
      <Cost
        :drugsCost="unit.drugs_cost"
        :weaponsCost="unit.weapons_cost"
        :alcoholsCost="unit.alcohols_cost"
        :quantity="quantity"
      />
      <div class="mb-2" v-html="unit.desc"></div>
      <div class="mb-2">
        <span class="mr-2">
          <i class="iconfont icon-target text-red"/>
          {{ unit.attack }}
        </span>
        <span class="mr-2">
          <i class="iconfont icon-shield1 text-blue"/>
          {{ unit.defense }}
        </span>
        <span class="mr-2">
          <i class="iconfont icon-run text-green"/>
          {{ unit.speed * 60 * 1000 | ms }}
        </span>
        <span class="mr-2">
          <i class="iconfont icon-box text-orange"></i>
          {{ unit.capacity}}
        </span>
        <span class="mr-2">
          {{ unit.type }}
        </span>
      </div>
      <div class="mb-2" v-if="unit.feature">
        UNIQUE:
        <span class="text-orange">
          {{ unit.feature }}
        </span>
      </div>
    </div>
    <div class="mx-auto">
          <input
      class="input form-control input-block mb-2"
      type="number"
      v-model="quantity"
      min="1"
    >
      <CheckoutRecruit
        :id="unit.id"
        :level="training_facility.lvl"
        :coeff="unit.coeff"
        :inProgress="inProgress"
        :price="unit.weapons_cost / 34000 + unit.alcohols_cost / 34000 "
        :notEnough="hasNotEnough"
        :quantity="quantity"
      />
    </div>
  </div>
</template>

<script>
import { getBalances } from '@/helpers/utils';

export default {
  props: ['unit'],
  watch: {
    inProgress(val) {
      if (val) {
        this.waitingConfirmation = false;
      }
    },
  },
  data() {
    return {
      quantity: 1,
      isLoading: false,
      waitingConfirmation: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
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
        this.unit.drugs_cost > this.balances.drugs ||
        this.unit.weapons_cost > this.balances.weapons ||
        this.unit.alcohols_cost > this.balances.alcohols
      );
    },
    ownItem() {
      return (
        this.$store.state.game.user.units.find(b => b.unit === this.unit.id) || {
          amount: 0,
        }
      );
    },
    inProgress() {
      if (!this.ownItem) return false;
      const nextUpdate = new Date(this.ownItem.next_update).getTime();
      const now = new Date().getTime();
      return nextUpdate >= now;
    },
    training_facility() {
      return (
        this.$store.state.game.user.buildings.find(b => b.building === 'training_facility') || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
