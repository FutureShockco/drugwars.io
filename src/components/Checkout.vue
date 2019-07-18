<template>
    <div class="checkout mb-4">
    <div class="mb-2">
    <i class="iconfont icon-clock mr-2" /> {{ inProgress ? timeToWait : updateTime | ms }}
    </div>
    <button :class="{ progress: inProgress }" :disabled="isLoading || waitingConfirmation || inProgress || notEnough || requireUpdate || !base" 
            @click="handleSubmit()" class="button btn-block button-green mb-2">
    <template v-if="isLoading || waitingConfirmation">
    <SmallLoading/>
</template>

<template v-else>
    <i class="iconfont icon-tools" />
    {{ upgradeLabel }}
</template>
    </button>
    <div class="mb-2">Instant upgrade</div>
    <button
      :disabled="isLoading || waitingConfirmation || requireUpdate || inProgress || !base"
      @click="handleRequestPayment()" v-if="steemAccount"
      class="button btn-block button-blue mb-2">
      <i class="iconfont icon-zap"/>
      ${{ price | amount }} =
      {{ priceInSteem | amount }} STEEM
    </button>
    <button
      :disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughFuture || inProgress || !base"
      @click="handleSubmit('future')"
      class="button btn-block button-yellow mb-2">
    <img class="futureicon" src="/img/icons/future.png"/>
      ${{ price - price /100*20 | amount }} =
      {{ priceInFuture | amount }} FUTURE
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { utils } from 'drugwars';

export default {
  props: ['id', 'level', 'coeff', 'hqLevel', 'inProgress', 'price', 'notEnough'],
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
    base() {
      return this.$store.state.game.mainbase;
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
      const building = this.$store.state.game.user.buildings.find(
        b =>
          b.building === this.id &&
          b.territory === this.base.territory &&
          b.base === this.base.base,
      );
      if (building) {
        if (building.pending_update) {
          const nextUpdate = new Date(building.pending_update).getTime();
          const now = this.$store.state.ui.timestamp;
          const timeToWait = nextUpdate - now;
          return timeToWait > 0 ? timeToWait : 0;
        }

        const nextUpdate = new Date(building.next_update).getTime();
        const now = this.$store.state.ui.timestamp;
        const timeToWait = nextUpdate - now;
        return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
    requireUpdate() {
      return this.level > this.hqLevel && this.id !== 'headquarters';
    },
    upgradeLabel() {
      let label = 'Upgrade';
      if (this.notEnough) label = 'Miss resources';
      if (this.requireUpdate) label = 'Require HQ upgrade';
      if (this.inProgress) label = 'Upgrading';
      if (!this.base) label = 'Choose a location';
      return label;
    },
  },
  methods: {
    ...mapActions(['upgradeBuilding', 'requestPayment']),
    handleSubmit(use) {
      this.isLoading = true;
      let payload = {};
      if (use === 'future')
        payload = {
          building: this.id,
          level: this.level,
          use: 'future',
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
      else {
        payload = {
          building: this.id,
          level: this.level,
          use: 'resources',
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
      }
      this.upgradeBuilding(payload)
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
        memo: `upgrade:${this.id},territory:${Number(this.base.territory)},base:${Number(this.base.base)}`,
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
