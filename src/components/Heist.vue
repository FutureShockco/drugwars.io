<template>
  <div>
    <div class="mb-2">Invest in the bank heist to convert your DRUGS to STEEM.</div>
    <form @submit.prevent="handleSubmit" class="mb-2">
      <input
        class="input form-control input-block"
        v-model="amount"
        type="number"
        min="0"
      >
      <button
        :disabled="isLoading"
        type="submit"
        class="button button-instant-upgrade btn-block mt-2"
      >
        <Icon name="arrow-up"/> Invest
      </button>
      <Loading v-if="isLoading"/>
    </form>
    <div>{{ totalRewardSteem | amount }} STEEM</div>
    <div>{{ totalVest | amount }} / {{ prizeProps.heist_pool | amount }} DRUGS</div>
    <div class="text-green">+{{ ownReward.amount | amount }} STEEM ({{ ownReward.percent | amount }}%)</div>
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
