<template>
  <div>
    <div class="prize">
      Today prize <span class="hide-sm hide-md hide-lg">pool</span>: ${{ parseInt(total) }}
    </div>
    <span class="text-gray hide-sm hide-md hide-lg mb-1">
    Daily: <b>${{ parseInt(totalDaily) }}</b>
    + Heist: <b>${{ parseInt(totalHeist) }}</b>,
    you will receive: <span class="text-green">+{{ myRewards }} STEEM</span> in {{ timeToWait | ms }}
  </span>
  </div>
</template>

<script>
export default {
  computed: {
    timeToWait() {
      const midnight = new Date().setUTCHours(24, 0, 0, 0);
      return midnight - this.$store.state.ui.timestamp;
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    total() {
      const { prizeProps } = this.$store.state.game;
      return (
        ((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) *
        (prizeProps.daily_percent + prizeProps.heist_percent)
      );
    },
    totalDaily() {
      const { prizeProps } = this.$store.state.game;
      return (
        ((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) * prizeProps.daily_percent
      );
    },
    totalHeist() {
      const { prizeProps } = this.$store.state.game;
      return (
        ((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) * prizeProps.heist_percent
      );
    },
    user() {
      return this.$store.state.game.user.user;
    },
    myRewards() {
      const totalDailySteem =
        (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.daily_percent;
      const myRewards =
        (this.user.drug_production_rate / this.prizeProps.drug_production_rate) * totalDailySteem;
      return myRewards.toFixed(3);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../vars';

.prize {
  font-size: 22px;
  font-family: @heading-font;
}
</style>
