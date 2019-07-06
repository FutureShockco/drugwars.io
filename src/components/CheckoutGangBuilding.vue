<template>
	<div class="checkout mb-4">
		<button
			:disabled="isLoading || waitingConfirmation || requireUpdate || inProgress || notEnough"
			@click="handleSubmit()"
			class="button btn-block button-green mb-2"
		>
			<i class="iconfont icon-zap"/>
			SEND RESOURCES
		</button>
		<div class="mb-2">Upgrade (Only the Boss)</div>
		<button
			:class="{ progress: inProgress }"
			:disabled="isLoading || waitingConfirmation || inProgress || notEnoughForUpgrade || requireUpdate || !isBoss"
			@click="handleUpgrade()"
			class="button btn-block button-green mb-2"
		>
			<template v-if="isLoading || waitingConfirmation">
				<SmallLoading/>
			</template>
			<template v-else>
				<i class="iconfont icon-tools"/>
				{{ upgradeLabel }}
			</template>
		</button>
		<button
			v-if="isTheExchange"
			:disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughFuture || inProgress || exchangeClaimed"
			@click="handleSubmit('future')"
			class="button btn-block button-green mb-2"
		>
			<img class="futureicon" src="/img/icons/future.png">
			CLAIM 6 FUTURE
		</button>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import { utils } from 'drugwars';

export default {
  props: [
    'id',
    'level',
    'coeff',
    'hqLevel',
    'inProgress',
    'role',
    'gang',
    'price',
    'notEnough',
    'notEnoughForUpgrade',
    'drugs',
    'weapons',
    'alcohol',
    'future',
  ],
  data() {
    return {
      isLoading: false,
      waitingConfirmation: false,
    };
  },
  watch: {
    inProgress(val) {
      if (val) {
        this.waitingConfirmation = false;
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    updateTime() {
      return utils.calculateTimeToBuild(this.id, this.coeff, this.level, this.hqLevel);
    },
    priceInSteem() {
      return (this.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
    priceInFuture() {
      return (this.price / 0.005 - ((this.price / 100) * 20) / 0.005).toFixed(0);
    },
    notEnoughFuture() {
      return (
        ((this.price / 0.005 - ((this.price / 100) * 20) / 0.005) * this.quantity).toFixed(3) >
        this.$store.state.game.user.user.future
      );
    },
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return false;
    },
    timeToWait() {
      const building = this.$store.state.game.gang_buildings.find(b => b.building === this.id);
      if (building) {
        if (building.next_update) {
          const nextUpdate = new Date(building.next_update).getTime();
          const now = this.$store.state.ui.timestamp;
          const timeToWait = nextUpdate - now;
          return timeToWait > 0 ? timeToWait : 0;
        }
      }
      return 0;
    },
    isBoss() {
      return this.user.role === 'boss' || this.user.role === 'capo';
    },
    requireUpdate() {
      return this.level > this.hqLevel && this.id !== 'gang_hq';
    },
    isTheExchange() {
      return this.id === 'exchange';
    },
    exchangeClaimed() {
      return true;
    },
    upgradeLabel() {
      let label = 'Upgrade';
      if (this.notEnoughForUpgrade) label = 'Miss resources';
      if (this.requireUpdate) label = 'Require HQ LVL';
      if (this.inProgress) label = 'Upgrading';
      return label;
    },
    base() {
      return this.$store.state.game.base;
    },
  },
  methods: {
    ...mapActions(['upgradeGangBuilding', 'depositGangBuilding', 'requestPayment']),
    handleSubmit() {
      this.isLoading = true;
      let payload = {};
      const drugs = this.drugs || 0;
      const weapons = this.weapons || 0;
      const alcohol = this.alcohol || 0;
      const future = this.future || 0;
      if (drugs > 0 || weapons > 0 || alcohol > 0 || future > 0) {
        payload = {
          building: this.id,
          level: this.level,
          use: 'resources',
          resources: { drugs, weapons, alcohol, future },
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
        this.depositGangBuilding(payload)
          .then(() => {
            this.isLoading = false;
            self.drugs = 0;
            self.weapons = 0;
            self.alcohol = 0;
            self.future = 0;
          })
          .catch(e => {
            console.error('Failed', e);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    },
    handleUpgrade(use) {
      this.isLoading = true;
      let payload = {};
      if (use === 'future') payload = { building: this.id, level: this.level, use: 'future' };
      else {
        const drugs = this.drugs;
        const weapons = this.weapons;
        const alcohol = this.alcohol;
        payload = {
          building: this.id,
          level: this.level,
          use: 'resources',
          resources: { drugs, weapons, alcohol },
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
      }
      this.upgradeGangBuilding(payload)
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed', e);
          this.isLoading = false;
        });
    },
    handleRequestPayment() {
      this.requestPayment({
        memo: `upgrade:${this.id}`,
        amount: `${this.priceInSteem} STEEM`,
      });
    },
  },
};
</script>

<style scoped lang="less">
.checkout {
  text-align: center;
  width: 180px;
}

.futureicon {
  width: 22px;
  left: 0px;
  position: relative;
  float: left;
  top: 5px;
}
</style>
