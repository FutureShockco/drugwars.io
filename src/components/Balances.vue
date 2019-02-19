<template>
  <div class="columns px-2 border-bottom balance-topbar mr-0">
    <div class="column col-3 p-4">
      <h4 class="mb-0">
        <img width="24" src="/img/icons/drugs.png"/>
        {{ user.drugs_balance | amount }}
      </h4>
      {{ user.drug_production_rate * 3600 * 24 | amount }} / day
    </div>
    <div class="column col-3 p-4">
      <h4 class="mb-0">
        <img width="24" src="/img/icons/weapons.png"/>
        {{ user.weapons_balance | amount }}
      </h4>
      {{ user.weapon_production_rate * 3600 * 24 | amount }} / day
    </div>
    <div class="column col-3 p-4">
      <h4 class="mb-0">
        <img width="24" src="/img/icons/alcohols.png"/>
        {{ user.alcohols_balance | amount }}
      </h4>
      {{ user.alcohol_production_rate * 3600 * 24 | amount }} / day
    </div>
    <div class="column col-3 p-4">
      <h4 class="mb-0">
        <img width="24" src="/img/icons/steem.png"/>
        123.45
      </h4>
      6.78 / day
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
