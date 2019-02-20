<template>
  <ul class="balances m-0 float-right">
    <li class="mr-4">
      <img class="mr-2" width="24" align="absmiddle" src="/img/icons/drugs.png"/>
      <span class="mr-2">{{ user.drugs_balance | amount }}</span>
      <span class="text-gray hide-small">{{ user.drug_production_rate * 3600 * 24 | amount }} / day</span>
    </li>
    <li class="mr-4">
      <img class="mr-2" width="24" align="absmiddle" src="/img/icons/weapons.png"/>
      <span class="mr-2">{{ user.weapons_balance | amount }}</span>
      <span class="text-gray hide-small">{{ user.weapon_production_rate * 3600 * 24 | amount }} / day</span>
    </li>
    <li class="mr-4">
      <img  class="mr-2" width="24" align="absmiddle" src="/img/icons/alcohols.png"/>
      <span class="mr-2">{{ user.alcohols_balance | amount }}</span>
      <span class="text-gray hide-small">{{ user.alcohol_production_rate * 3600 * 24 | amount }} / day</span>
    </li>
  </ul>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../vars';

.balances {
  line-height: @header-height;

  li {
    display: inline-block;
  }
}
</style>
