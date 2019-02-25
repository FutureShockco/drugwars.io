<template>
  <div class="sidebar sidebar-right border-left border-sm-right pt-4 text-center">
    <div class="px-5">
      <p>{{ timeToWait | ms }}</p>
      <p class="mb-0">Total prize</p>
      <h1 class="m-0">${{ parseInt(total) }}</h1>
      <p class="mb-4">
        Daily: <b>${{ parseInt(totalDaily) }}</b>
        Heist: <b>${{ parseInt(totalHeist) }}</b>
      </p>
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
