<template>
  <div class="sidebar sidebar-right border-left border-sm-right pt-4 text-center">
    <h5>{{ timeToWait | ms }}</h5>
    <div class="mb-4">
      <h4 class="mb-0">Total prize</h4>
      <h1 class="m-0">${{ parseInt(total) }}</h1>
    </div>
    <div class="mb-4">
      <p>Daily ${{ parseInt(totalDaily) }}</p>
      <p>Heist ${{ parseInt(totalHeist) }}</p>
    </div>
    <Heist/>
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
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) *
        (prizePops.daily_percent + prizePops.heist_percent)
      );
    },
    totalDaily() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) * prizePops.daily_percent
      );
    },
    totalHeist() {
      const prizePops = this.$store.state.game.prizeProps;
      return (
        ((parseFloat(prizePops.balance) * prizePops.steemprice) / 100) * prizePops.heist_percent
      );
    },
  },
};
</script>
