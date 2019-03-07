<template>
  <div class="cost mb-2">
    <span class="mr-2">
      Cost:
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': drugsCost * this.quantity > balances.drugs }"
      v-if="drugsCost"
    >
      <Icon :size="18" name="drug"/>
      {{ drugsCost * this.quantity | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': weaponsCost * this.quantity > balances.weapons }"
      v-if="weaponsCost"
    >
      <Icon :size="18" name="weapon"/>
      {{ weaponsCost * this.quantity | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': alcoholsCost * this.quantity > balances.alcohols }"
      v-if="alcoholsCost"
    >
      <Icon :size="18" name="alcohol"/>
      {{ alcoholsCost * this.quantity | amount}}
    </span>
  </div>
</template>

<script>
export default {
  props: ['type', 'level', 'quantity', 'drugsCost', 'weaponsCost', 'alcoholsCost'],
  computed: {
    balances() {
      const { user } = this.$store.state.game.user;
      const time = (this.$store.state.ui.timestamp - Date.parse(user.last_update)) / 1000;
      return {
        drugs: user.drugs_balance + time * user.drug_production_rate,
        weapons: user.weapons_balance + time * user.weapon_production_rate,
        alcohols: user.alcohols_balance + time * user.alcohol_production_rate,
      };
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars';

.cost {
  font-weight: 500;
  font-size: 15px;
  color: #c7c7c7;
  display: inline-flex;
  line-height: 20px;
  span {
    display: inline-flex;
  }
  .icon {
    margin-right: 5px;
  }

  .not-enough {
    color: @error-color;
  }
}
</style>
