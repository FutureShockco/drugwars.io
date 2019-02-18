<template>
  <div class="columns px-2 border-bottom">
    <div class="column col-3 p-4">
      <h4 class="mb-0">
        <img width="24" src="/img/drugs.png"/>
        {{ user.drugs_balance | amount }}
      </h4>
      {{ user.drug_production_rate * 3600 * 24 | amount }} / day
    </div>
    <div class="column col-3 p-4">
      <h4 class="mb-0">
        <img width="24" src="/img/weapons.png"/>
        {{ user.weapons_balance | amount }}
      </h4>
      {{ user.weapon_production_rate * 3600 * 24 | amount }} / day
    </div>
    <div class="column col-3 p-4">
      <h4 class="mb-0">
        <img width="24" src="/img/alcohols.png"/>
        {{ user.alcohols_balance | amount }}
      </h4>
      {{ user.alcohol_production_rate * 3600 * 24 | amount }} / day
    </div>
    <div class="column col-3 p-4">
      <h4 class="mb-0">
        <img width="24" src="/img/steem.png"/>
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
