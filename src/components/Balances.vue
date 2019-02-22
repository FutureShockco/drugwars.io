<template>
  <div class="balances mt-2 columns">
    <div class="column col-3 d-flex flex-row">
      <img class="mr-3" src="/img/icons/drugs.png"/>
      <div>
        <div>{{ user.drugs_balance | amount }} DRUGS</div>
        <div class="text-gray hide-small">{{ user.drug_production_rate * 3600 * 24 | amount }} / day</div>
      </div>
    </div>
    <div class="column col-3 d-flex flex-row">
      <img class="mr-3" src="/img/icons/weapons.png"/>
      <div>
        <div>{{ user.weapons_balance | amount }} WEAPONS</div>
        <div class="text-gray hide-small">{{ user.weapon_production_rate * 3600 * 24 | amount }} / day</div>
      </div>
    </div>
    <div class="column col-3 d-flex flex-row">
      <img class="mr-3"  src="/img/icons/alcohols.png"/>
      <div>
        <div>{{ user.alcohols_balance | amount }} ALCOHOLS</div>
        <div class="text-gray hide-small">{{ user.alcohol_production_rate * 3600 * 24 | amount }} / day</div>
      </div>
    </div>
    <div class="column col-3 d-flex flex-row">
      <img class="mr-3"  src="/img/icons/steem.png"/>
      <div>
        <div>{{ '1234' | amount }} STEEM</div>
        <div class="text-gray hide-small">{{ '0.123' | amount }} / day</div>
      </div>
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

<style scoped lang="less">
@import '../vars.less';

.balances {
  font-family: @heading-font;
  width: 100%;
  line-height: 1.2em;
  margin-right: @sidebar-width;

  img {
    height: 40px;
    width: 40px;
  }
}
</style>
