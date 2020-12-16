<template>
    <div class="checkout mb-4">
        <div class="mb-2">
            <span v-if="inProgress"><i class="iconfont icon-clock mr-2"  > </i>End: {{ timeToWaitString }}</span>
            <span v-else-if="pending"><i class="iconfont icon-clock mr-2"> </i>Waiting</span>
            <span v-else><i class="iconfont icon-clock mr-2"> </i>Require: {{ updateTime | ms }}</span>
        </div>
        <button :class="{ 'button-red': pending && !inProgress, 'button-green':  !pending && !inProgress, progress: inProgress }" :disabled="isLoading || waitingConfirmation || inProgress || notEnough || requireUpdate || !base" @click="handleSubmit()" class="button btn-block mb-2">
        <template v-if="isLoading || waitingConfirmation">
        <SmallLoading/>
</template>

<template v-else>
    <div class="progression" v-if="inProgress" :style="'margin-right:'+(100-percentage)+'%'"></div>
    <i class="iconfont icon-arrow-up" />
    <span>{{ upgradeLabel }}</span>

</template>
    </button>
    <div class="mb-2">Instant upgrade</div>
    <button
      :disabled="isLoading || waitingConfirmation || requireUpdate || inProgress || !base"
      @click="handleRequestPayment()" v-if="steemAccount"
      class="button btn-block button-blue mb-2">
      <i class="iconfont icon-zap"/>
     <span> ${{ price | amount }} =
      {{ priceInSteem }} STEEM</span>
    </button>
    <button v-if="dwdPrice"
      :disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD || !base"
      @click="handleSubmit('dwd')"
      class="button btn-block button-yellow mb-2">
    <img class="dwdicon" src="//img.drugwars.io/icons/dwd.png"/>
     <span v-if="dwdPrice"> ${{ dwdPrice | amount }} = 
      {{ priceInDWD  }} DWD</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { utils } from 'drugwars';

export default {
  props: ['id', 'level', 'coeff', 'hqLevel', 'inProgress', 'price', 'notEnough', 'pending'],
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
      return this.$store.state.game.selectedBase;
    },
    updateTime() {
      return utils.calculateTimeToBuild(this.id, this.coeff, this.level, this.hqLevel);
    },
    isClaimable(){
      return 
    },
    priceInSteem() {
      return parseFloat(this.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
    priceInDWD() {
      return parseFloat(this.priceInSteem * 50).toFixed(3);
    },
    dwdPrice() {
      if(!this.$store.state.game.prizeProps.seProps || this.$store.state.game.prizeProps.seProps.lastPrice)
      return false
      const price = this.$store.state.game.prizeProps.seProps.lastPrice || 0;
      return price * this.priceInDWD * this.$store.state.game.prizeProps.steemprice;
    },
    notEnoughDWD() {
      return parseFloat(this.priceInSteem * 50).toFixed(3) > this.$store.state.game.user.user.dwd;
    },
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return false;
    },
    timeToWait() {
      const building = this.base.buildings.find(
        b =>
          b.name === this.id
      );
      if (building) {
        console.log(building.pendingTs,this.$store.state.ui.timestamp)
          const nextUpdate = building.pendingTs;
          const now = this.$store.state.ui.timestamp;
          const timeToWait = nextUpdate - now;
          return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
    timeToWaitString() {
      const building = this.base.buildings.find(
        b =>
          b.name === this.id
      );
      if (building) {
        const nextUpdate = new Date(building.pendingTs).toLocaleString();
        return nextUpdate.replace('/2019', '');
      }
      return 0;
    },
    percentage() {
      return parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(2);
    },
    requireUpdate() {
      return this.level > this.hqLevel && this.id !== 'headquarters';
    },
    upgradeLabel() {
      let label = 'Upgrade';
      if (this.pending) label = 'Claim';
      if (this.notEnough) label = 'Miss resources';
      if (this.requireUpdate) label = 'Require HQ upgrade';
      if (this.inProgress) {
        label = `Upgrading [${parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(
          2,
        )}%]`;
      }
      if (!this.base) label = 'Choose a location';
      return label;
    },
  },
  methods: {
    ...mapActions(['upgradeBuilding', 'claimBuilding', 'requestPayment']),
    handleSubmit(use) {
      this.isLoading = true;
      let payload = {
        building: this.id,
        territory: Number(this.base.territory),
        base: Number(this.base.base),
      };
      if (this.pending) {
        this.claimBuilding(payload)
          .then(() => {
            this.isLoading = false;
          })
          .catch((e) => {
            console.error('Failed', e);
            this.isLoading = false;
          });
      } else {
        payload.resource = use;
        this.upgradeBuilding(payload)
          .then(() => {
            this.isLoading = false;
          })
          .catch((e) => {
            console.error('Failed', e);
            this.isLoading = false;
          });
      }

    },
    handleRequestPayment() {
      this.requestPayment({
        memo: `upgrade:${this.id},territory:${Number(this.base.territory)},base:${Number(
          this.base.base,
        )},server:${this.$store.state.game.server.number}`,
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
