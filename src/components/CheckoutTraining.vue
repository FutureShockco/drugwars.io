<template>
    <div class="checkout mb-4">
        <div class="mb-2">
            <span v-if="inProgress"><i class="iconfont icon-clock mr-2"  > </i>End: {{ timeToWaitString }}</span>
            <span v-else><i class="iconfont icon-clock mr-2"> </i>Require: {{ updateTime | ms }}</span>
        </div>
    
        <button :class="{ progress: inProgress }" :disabled="isLoading || waitingConfirmation || inProgress || notEnough || requireUpdate" @click="handleSubmit()" class="button btn-block button-green mb-2">
                  <template v-if="isLoading || waitingConfirmation">
                        <SmallLoading/>
</template>

<template v-else>
    <div class="progression" v-if="inProgress"  :style="'margin-right:'+(100-percentage)+'%'"></div>
    <i class="iconfont icon-arrow-up" />
     <span>{{ upgradeLabel }}</span>
</template>
    </button>

    <div class="mb-2">Instant upgrade</div>
    <button v-if="steemAccount"
      :disabled="isLoading || waitingConfirmation || requireUpdate || inProgress || !base"
      @click="handleRequestPayment()"
      class="button btn-block button-blue mb-2"
    >
      <i class="iconfont icon-zap"/>
      <span>${{ price | amount }} =
      {{ priceInSteem }} STEEM</span>
    </button>
    <button v-if="dwdPrice"
      :disabled="isLoading || waitingConfirmation || requireUpdate || notEnoughDWD  || !base"
      @click="handleSubmit('dwd')"
      class="button btn-block button-yellow mb-2"
    >
    <img class="dwdicon" src="//img.drugwars.io/icons/dwd.png"/>
     <span v-if="dwdPrice"> ${{ dwdPrice | amount }} =
      {{ priceInDWD }} DWD</span>
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { utils } from 'drugwars';

export default {
  props: ['id', 'level', 'coeff', 'researchCenterLvl', 'inProgress', 'price', 'notEnough'],
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
    updateTime() {
      return utils.calculateTimeToBuild(this.id, this.coeff, this.level, this.researchCenterLvl);
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    priceInSteem() {
      return (this.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return false;
    },
    dwdPrice() {
      if(!this.$store.state.game.prizeProps.seProps || !this.$store.state.game.prizeProps.seProps.lastPrice)
      return false
      const price = this.$store.state.game.prizeProps.seProps.lastPrice || 0;
      return price * this.priceInDWD * this.$store.state.game.prizeProps.steemprice;
    },
    priceInDWD() {
      return (this.priceInSteem * 50).toFixed(3);
    },
    notEnoughDWD() {
      return (this.priceInSteem * 50).toFixed(3) > this.$store.state.game.user.user.dwd;
    },
    timeToWait() {
      const training = this.$store.state.game.user.trainings.find(b => b.training === this.id);
      if (training) {
        if (training.pending_update) {
          const nextUpdate = new Date(training.pending_update).getTime();
          const now = this.$store.state.ui.timestamp;
          const timeToWait = nextUpdate - now;
          return timeToWait > 0 ? timeToWait : 0;
        }

        const nextUpdate = new Date(training.next_update).getTime();
        const now = this.$store.state.ui.timestamp;
        const timeToWait = nextUpdate - now;
        return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
    timeToWaitString() {
      const training = this.$store.state.game.user.trainings.find(b => b.training === this.id);
      if (training) {
        const nextUpdate = new Date(training.next_update).toLocaleString();
        return nextUpdate.replace('/2019', '');
      }
      return 0;
    },
    percentage() {
      return parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(2);
    },
    requireUpdate() {
      return this.level > this.researchCenterLvl && this.id !== 'research_center';
    },
    upgradeLabel() {
      let label = 'Upgrade';
      if (this.notEnough) label = 'Miss resources';
      if (this.requireUpdate) label = 'Require RC upgrade';
      if (this.inProgress)
        label = `Upgrading [${parseFloat(100 - (this.timeToWait / this.updateTime) * 100).toFixed(
          2,
        )}%]`;
      return label;
    },
  },
  methods: {
    ...mapActions(['upgradeTraining', 'requestPayment']),
    handleSubmit(use) {
      this.isLoading = true;
      const self = this;
      let payload = {};
      if (use === 'dwd') {
        payload = {
          training: this.id,
          level: this.level,
          use: 'dwd',
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };

        const training = this.$store.state.game.user.trainings.find(b => b.training === this.id);
        if (training) {
          training.pending_update = new Date().getTime() + 3000;
        }
      } else {
        payload = {
          training: this.id,
          level: this.level,
          use: 'resources',
          territory: Number(this.base.territory),
          base: Number(this.base.base),
        };
      }
      this.upgradeTraining(payload)
        .then(() => {
          this.waitingConfirmation = false;
          self.isLoading = false;
        })
        .catch(e => {
          console.error('Failed', e);
          self.isLoading = false;
        });
    },
    handleRequestPayment() {
      this.requestPayment({
        memo: `training:${this.id},server:${this.$store.state.game.server.number}`,
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
