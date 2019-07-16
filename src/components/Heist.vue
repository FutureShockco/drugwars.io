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
      amount: Math.round(this.$store.state.game.user.user.drugs_balance),
    };
  },
  computed: {
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    totalVest() {
      return 14000000;
    },
    totalReward() {
      return (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.heist_percent;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    HQ() {
      if (
        this.base &&
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      ) {
        return this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        );
      }
      return this.$store.state.game.user.buildings.find(b => b.building === 'headquarters');
    },
    totalHeistFuture() {
      const { prizeProps } = this.$store.state.game;
      return (((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) * 2) / 0.005;
    },
    balances() {
      let ocLvl = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        ocLvl = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab'))
        labLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
          .lvl;
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center'))
        weaponLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
          .lvl;
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school'))
        distilleryLvl = this.$store.state.game.gang_buildings.find(
          b => b.building === 'distillery_school',
        ).lvl;
      return getBalances(
        this.HQ,
        ocLvl,
        labLvl,
        weaponLvl,
        distilleryLvl,
        this.$store.state.ui.timestamp,
      );
    },
    ownHeistReward() {
      const percent = (100 / 380000000) * this.totalVest;
      const amount = Math.round((this.totalHeistFuture / 100) * percent);
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
        const payload = {
          amount: Math.round(Number(this.amount)),
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
        this.investHeist(payload)
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
      this.amount = Math.round(this.balances.drugs - parseInt((this.balances.drugs / 100) * 1));
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
