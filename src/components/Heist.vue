<template>
	<div class="pt-2">
		<h4>Heist</h4>
		<img width="150px" :src="`/img/heist.jpg`">
		<form @submit.prevent="handleSubmit" class="mb-2">
			<input class="input form-control input-block mb-2" v-model="amount" type="number" min="0">
			<button
				:disabled="isLoading || Number(balances.drugs) < Number(amount)"
				type="submit"
				class="button button-red btn-block"
			>
				<span v-if="!isLoading">Deposit</span>
				<SmallLoading v-else/>
			</button>
		</form>
		<button
			:disabled="isLoading"
			@click="handleFullSubmit()"
			class="button button-blue btn-block"
		>Deposit all</button>
		<div class="pt-2">Total: {{ prizeProps.heist_pool | amount }} DRUGS</div>
		<div>Vest: {{ totalVest | amount }} DRUGS</div>
		<div
			class="text-green"
		>+{{ Math.round(ownHeistReward.amount) | amount }} FUTURE ({{ownHeistReward.percent | amount}}%)</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { getBalances } from '@/helpers/utils';
import Promise from 'bluebird';

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
      return (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.heist_percent;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    totalHeistFuture() {
      const { prizeProps } = this.$store.state.game;
      return (
        (((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) *
          prizeProps.heist_percent) /
        0.005
      );
    },
    balances() {
      let ocLvl = 0;
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center'))
        ocLvl = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
          .lvl;
      return getBalances(this.user, ocLvl, this.$store.state.ui.timestamp);
    },
    ownHeistReward() {
      const percent = (100 / this.prizeProps.heist_pool) * this.totalVest;
      const amount = (this.totalHeistFuture / 100) * percent;
      return {
        amount,
        percent,
      };
    },
  },
  methods: {
    ...mapActions(['investHeist']),
    handleSubmit() {
      if (Number(this.amount) > 0) {
        this.isLoading = true;
        this.investHeist(this.amount)
          .then(() => {
            Promise.delay(3000).then(() => {
              this.isLoading = false;
              this.amount = this.balances.drugs;
            });
          })
          .catch(e => {
            console.error('Failed to invest on heist', e);
            this.isLoading = false;
          });
      }
    },
    handleFullSubmit() {
      this.amount = this.balances.drugs;
    },
  },
};
</script>

<style scoped lang="less">
h4 {
  text-transform: uppercase;
  transform: translate(-50%, -50%) skew(-24deg) rotate(-10deg);
  top: 120px;
  width: fit-content;
  left: 50%;
  font-size: 26px;
  margin: 0;
  line-height: 0px;
  position: relative;
  text-rendering: optimizeLegibility;
  font-weight: 900;
  color: #db2828;
  text-shadow: 1px 4px 6px #000, 0 0 0 #0b0b0b, 1px 4px 6px #101010;
  white-space: nowrap;
}
</style>
