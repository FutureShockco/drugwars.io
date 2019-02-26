<template>
  <div class="balances mt-2 columns">
    <div class="d-flex">
      <Icon class="ml-2" name="drugs"/>
      <div>
        <div>{{ user.drugs_balance | amount }} <span class="hide-sm hide-md"></span></div>
        <div class="text-gray hide-sm hide-md">{{ user.drug_production_rate * 3600 * 24 | amount }} / day</div>
      </div>
    </div>
    <div class="d-flex">
      <Icon class="ml-2" name="weapons"/>
      <div>
        <div>{{ user.weapons_balance | amount }} <span class="hide-sm hide-md"></span></div>
        <div class="text-gray hide-sm hide-md">{{ user.weapon_production_rate * 3600 * 24 | amount }} / day</div>
      </div>
    </div>
    <div class="d-flex">
      <Icon class="ml-2" name="alcohols"/>
      <div>
        <div>{{ user.alcohols_balance | amount }} <span class="hide-sm hide-md"></span></div>
        <div class="text-gray hide-sm hide-md">{{ user.alcohol_production_rate * 3600 * 24 | amount }} / day</div>
      </div>
    </div>
    <div class="d-flex hide-sm">
      <Icon class="ml-2" name="steem"/>
      <div>
        <div>{{ '1234' | amount }}</div>
        <div class="text-gray hide-md">{{ '0.123' | amount }} / day</div>
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
  color: white;
  font-size: 15px;
  width: 100%;
  line-height: 1.2em;
  vertical-align: center;

  .iconfont {
    font-size: 36px;
    line-height: 36px;
    margin-right: 10px;
  }
}
</style>
