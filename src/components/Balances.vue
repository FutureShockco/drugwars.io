<template>
  <div class="px-4 border-bottom mb-4">
    <div class="mb-2">
      <p class="mb-0">
        <img width="24" align="absmiddle" src="/img/icons/drugs.png"/>
        {{ user.drugs_balance | amount }}<br/>
        {{ user.drug_production_rate * 3600 * 24 | amount }} / day
      </p>

    </div>
    <div class="mb-2">
      <p class="mb-0">
        <img width="24" align="absmiddle" src="/img/icons/weapons.png"/>
        {{ user.weapons_balance | amount }}<br/>
        {{ user.weapon_production_rate * 3600 * 24 | amount }} / day
      </p>
    </div>
    <div class="mb-2">
      <p class="mb-0">
        <img width="24" align="absmiddle" src="/img/icons/alcohols.png"/>
        {{ user.alcohols_balance | amount }}<br/>
        {{ user.alcohol_production_rate * 3600 * 24 | amount }} / day
      </p>
    </div>
    <div class="mb-2">
      <p class="mb-0">
        <img width="24" align="absmiddle" src="/img/icons/steem.png"/>
        123.45
      </p>
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
