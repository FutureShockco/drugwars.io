<template>
  <div class="p-3 text-center">
    <img src="/img/lottery/heist.png" width="80">
    <p>{{ totalRewardSteem | amount }} STEEM</p>
    <div>Total: {{ prizeProps.heist_pool | amount }} DRUGS</div>
    <div>Total vest: {{ totalVest | amount }} DRUGS</div>
    <div>Reward: {{ ownReward.amount | amount }} STEEM ({{ ownReward.percent | amount }}%)</div>
    <form @submit.prevent="handleSubmit">
      <input
        class="input form-control input-block"
        v-model="amount"
        type="number"
        min="0"
      >
      <button
        :disabled="isLoading"
        type="submit"
        class="btn btn-green mt-2"
      >
        Invest DRUGS
      </button>
      <Loading v-if="isLoading"/>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
      amount: this.$store.state.game.user.user.drugs_balance,
    };
  },
  computed: {
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    totalVest() {
      return this.$store.state.game.user.heist[0] ? this.$store.state.game.user.heist[0].drugs : 0;
    },
    totalRewardSteem() {
      return (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.heist_percent;
    },
    totalReward() {
      return (
        (parseFloat(this.prizeProps.balance) / 100) *
        this.prizeProps.steemprice *
        this.prizeProps.heist_percent
      );
    },
    ownReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest;
      const amount = (this.totalReward / 100) * percent;
      return {
        amount,
        percent,
      };
    },
  },
  methods: {
    ...mapActions(['investHeist']),
    handleSubmit() {
      this.isLoading = true;
      this.investHeist(this.amount)
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed to invest on heist', e);
          this.isLoading = false;
        });
    },
  },
};
</script>
