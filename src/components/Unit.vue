<template>
  <div
    class="d-flex flex-row border-bottom item mb-4"
    :class="{ progress: inProgress }"
  >
    <div class="mr-3">
      <img class="preview" :src="`/img/units/${unit.id}.jpg`">
    </div>
    <div class="item-content width-full mr-3 mb-4">
      <h5>{{ unit.name }}</h5>
      <Cost
        :drugsCost="unit.drugs_cost"
        :weaponsCost="unit.weapons_cost"
        :alcoholsCost="unit.alcohols_cost"
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
          {{ unit.type }}
        </span>
      </div>
      <div class="mb-2">
        Point per unit: {{ unit.score }}
      </div>
      <div class="mb-2" v-if="unit.feature">
        Special:
        <span class="text-green">
          {{ unit.feature }}
        </span>
      </div>
    </div>
    <div>
      <CheckoutRecruit
        :id="unit.id"
        :level="1"
        :coeff="unit.coeff"
        :inProgress="inProgress"
        :price="unit.weapons_cost / 17000 + unit.alcohols_cost / 17000"
        :notEnough="hasNotEnough"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['unit'],
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
        this.unit.drugs_cost / 10000 > this.balances.drugs ||
        this.unit.weapons_cost / 10000 > this.balances.weapons ||
        this.unit.alcohols_cost / 10000 > this.balances.alcohols
      );
    },
    ownItem() {
      return (
        this.$store.state.game.user.units.find(b => b.unit === this.unit.id) || {
          lvl: 0,
        }
      );
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
