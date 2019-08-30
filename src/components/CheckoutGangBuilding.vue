<template>
    <div class="checkout mb-4">
        <button :disabled="isLoading || waitingConfirmation || requireUpdate || inProgress || notEnough" @click="handleSubmit()" class="button btn-block button-green mb-2">
    			<i class="iconfont icon-zap"/>
    			SEND RESOURCES
    		</button>
        <div class="mb-2">Upgrade (Only the Boss)</div>
        <button :class="{ progress: inProgress }" :disabled="isLoading || waitingConfirmation || inProgress || notEnoughForUpgrade || requireUpdate || !isBoss" @click="handleUpgrade()" class="button btn-block button-green mb-2">
    			<template v-if="isLoading || waitingConfirmation">
    				<SmallLoading/>
</template>

<template v-else>
    <i class="iconfont icon-tools" />
    {{ upgradeLabel }}
</template>
		</button>
		<button
			v-if="isTheExchange"
			:disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || inProgress || exchangeClaimed"
			@click="handleSubmit('dwd')"
			class="button btn-block button-green mb-2"
		>
			<img class="dwdicon" src="/img/icons/dwd.png">
			CLAIM 6 DWD
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
    'dwd',
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
    priceInDWD() {
      return (this.priceInSteem * 2).toFixed(3);
    },
    dwdPrice() {
      const price = this.$store.state.game.prizeProps.seProps.lastPrice  || 0;
      return price * this.priceInDWD;
    },
    notEnoughDWD() {
      return (
        (this.priceInSteem * 2 * this.quantity).toFixed(3) > this.$store.state.game.user.user.dwd
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
      return this.$store.state.game.mainbase;
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
      const dwd = this.dwd || 0;
      if (drugs > 0 || weapons > 0 || alcohol > 0 || dwd > 0) {
        payload = {
          building: this.id,
          level: this.level,
          use: 'resources',
          resources: { drugs, weapons, alcohol, dwd },
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
        this.depositGangBuilding(payload)
          .then(() => {
            this.isLoading = false;
            self.drugs = 0;
            self.weapons = 0;
            self.alcohol = 0;
            self.dwd = 0;
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
      if (use === 'dwd') payload = { building: this.id, level: this.level, use: 'dwd' };
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

.dwdicon {
  width: 22px;
  left: 0px;
  position: relative;
  float: left;
  top: 5px;
}
</style>
