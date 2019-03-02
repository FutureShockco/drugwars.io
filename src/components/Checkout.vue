<template>
  <div class="checkout mb-4">
    <div class="mb-2">
      <i class="iconfont icon-clock mr-2"/>
      {{ inProgress ? timeToWait : updateTime | ms }}
    </div>

    <button
      :class="{ progress: inProgress }"
      :disabled="isLoading || waitingConfirmation || inProgress || notEnough || requireUpdate"
      @click="handleSubmit()"
      class="button btn-block button-green mb-2"
    >
      <template v-if="isLoading || waitingConfirmation">
        <Loading/>
      </template>
      <template v-else>
        <i class="iconfont icon-tools"/>
        {{ upgradeLabel }}
      </template>
    </button>

    <div class="mb-2">Instant upgrade</div>
    <button
      :disabled="isLoading || waitingConfirmation || requireUpdate"
      @click="handleRequestPayment()"
      class="button btn-block button-blue mb-2"
    >
      <i class="iconfont icon-zap"/>
      ${{ price | amount }}
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { calculateTimeToBuild } from '@/helpers/utils';

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
    updateTime() {
      return calculateTimeToBuild(this.id, this.coeff, this.level, this.hqLevel);
    },
    priceInSteem() {
      return (this.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
    timeToWait() {
      const building = this.$store.state.game.user.buildings.find(b => b.building === this.id);
      if (building) {
        const nextUpdate = new Date(building.next_update).getTime();
        const now = this.$store.state.ui.timestamp;
        const timeToWait = nextUpdate - now;
        return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
    requireUpdate() {
      return this.level >= this.hqLevel && this.id !== 'headquarters';
    },
    upgradeLabel() {
      let label = 'Upgrade';
      if (this.requireUpdate) label = 'Require HQ upgrade';
      if (this.notEnough) label = 'Miss resources';
      if (this.inProgress) label = 'Upgrading';
      return label;
    },
  },
  methods: {
    ...mapActions(['upgradeBuilding', 'requestPayment']),
    handleSubmit() {
      this.isLoading = true;
      this.upgradeBuilding({ id: this.id, level: this.level })
        .then(() => {
          this.waitingConfirmation = true;
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
</style>
