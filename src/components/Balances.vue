<template>
  <div class="columns">
    <div class="column col-3">
      <img class="mr-2" width="24" align="absmiddle" src="/img/icons/drugs.png"/>
      <span class="mr-2">{{ user.drugs_balance | amount }} DRUGS</span>
      <span class="text-gray hide-small">{{ user.drug_production_rate * 3600 * 24 | amount }} / day</span>
    </div>
    <div class="column col-3">
      <img class="mr-2" width="24" align="absmiddle" src="/img/icons/weapons.png"/>
      <span class="mr-2">{{ user.weapons_balance | amount }} WEAPONS</span>
      <span class="text-gray hide-small">{{ user.weapon_production_rate * 3600 * 24 | amount }} / day</span>
    </div>
    <div class="column col-3">
      <img  class="mr-2" width="24" align="absmiddle" src="/img/icons/alcohols.png"/>
      <span class="mr-2">{{ user.alcohols_balance | amount }} ALCOHOLS</span>
      <span class="text-gray hide-small">{{ user.alcohol_production_rate * 3600 * 24 | amount }} / day</span>
    </div>
    <div class="column col-3">
      <img  class="mr-2" width="24" align="absmiddle" src="/img/icons/steem.png"/>
      <span class="mr-2">{{ '1234' | amount }} STEEM</span>
      <span class="text-gray hide-small">{{ '0.123' | amount }} / day</span>
    </div>
  </div>
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
