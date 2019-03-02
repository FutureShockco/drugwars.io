<template>
  <div class="cost mb-2">
    <span class="mr-2">
      Cost:
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': drugsCost > balances.drugs }"
      v-if="drugsCost"
    >
      <Icon :size="18" name="drugs"/>
      {{ drugsCost | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': weaponsCost > balances.weapons }"
      v-if="weaponsCost"
    >
      <Icon :size="18" name="weapons"/>
      {{ weaponsCost | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': alcoholsCost > balances.alcohols }"
      v-if="alcoholsCost"
    >
      <Icon :size="18" name="alcohols"/>
      {{ alcoholsCost | amount}}
    </span>
  </div>
</template>

<script>
export default {
  props: ['type', 'level', 'amount', 'drugsCost', 'weaponsCost', 'alcoholsCost'],
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
  font-weight: 600;
  font-size: 15px;
  color: #c7c7c7;
  display: inline-flex;

  .iconfont {
    margin-right: 5px;
  }

  .not-enough {
    color: @error-color;
  }
}
</style>
