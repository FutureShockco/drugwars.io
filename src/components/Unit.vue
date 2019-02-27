<template>
  <div
    class="d-flex flex-row border-bottom item mb-4"
    :class="{ progress: inProgress }"
  >
    <div class="mr-3">
      <img class="preview" :src="`/img/units/${unit.id}.png`">
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
        :price="unit.weapons_cost / 10000"
        :notEnough="hasNotEnough"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['unit'],
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
        this.unit.drugs_cost / 10000 > this.weaponsBalance ||
        this.unit.weapons_cost / 10000 > this.weaponsBalance ||
        this.unit.alcohols_cost / 10000 > this.alcoholsBalance
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
