<template>
  <div>
    <form @submit.prevent="handleSubmit" class="mb-2">
      <input
        class="input form-control input-block mb-2"
        v-model="amount"
        type="number"
        min="0"
      >
      <button
        :disabled="isLoading"
        type="submit"
        class="button button-blue btn-block"
      >
        <Icon name="arrow-up"/>
        <span v-if="!isLoading">Invest</span>
        <Loading v-else/>
      </button>
    </form>
    <div>Total: {{ prizeProps.heist_pool | amount }} DRUGS</div>
    <div>Vest: {{ totalVest | amount }} DRUGS</div>
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
    totalReward() {
      return (
        (parseFloat(this.prizeProps.balance) / 100) *
        this.prizeProps.heist_percent
      );
    },
    ownReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest;
      const amount = this.totalReward / 100 * percent;
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
