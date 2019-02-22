<template>
  <div class="checkout">
    <div class="mb-2">
      <i class="iconfont icon-watch"/> {{ inProgress ? timeToWait : buildingTime | ms }}
    </div>
    <button
      :class="{ progress: inProgress }"
      :disabled="isLoading || inProgress"
      @click="handleUpgradeBuilding()"
      class="button btn-block button-upgrade mb-2 meter"
    >
      <template v-if="!isLoading">
        <i class="iconfont icon-tools"/> {{ inProgress ? 'Upgrading' : 'Upgrade' }}
      </template>
      <template v-else>
        <Loading v-if="isLoading"/>
      </template>
    </button>
    <div class="instant">Instant upgrade</div>
    <button
      :disabled="isLoading"
      @click="handleRequestPayment()"
      class="button btn-block button-instant-upgrade mb-2"
    >
      <i class="iconfont icon-steem"/> ${{ price | amount }}, {{ priceInSteem | amount }} STEEM
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { calculateTimeToBuild } from '@/helpers/utils';

export default {
  props: ['id', 'level', 'coeff', 'hqLevel', 'inProgress', 'price'],
  data() {
    return {
      isLoading: false,
      timeToWait: 0,
    };
  },
  computed: {
    buildingTime() {
      return calculateTimeToBuild(this.id, this.coeff, this.level, this.hqLevel);
    },
    priceInSteem() {
      return (this.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
  },
  methods: {
    ...mapActions(['upgradeBuilding', 'requestPayment']),
    calculateTime() {
      const building = this.$store.state.game.user.buildings.find(b => b.building === this.id);
      if (building) {
        const nextUpdate = new Date(building.next_update).getTime();
        const now = new Date().getTime();
        const self = this;
        this.timeToWait = nextUpdate - now;
        setTimeout(self.calculateTime, 1000);
      }
    },
    handleUpgradeBuilding() {
      this.isLoading = true;
      this.upgradeBuilding({ id: this.id, level: this.level })
        .then(result => {
          console.log('Result', result);
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
  mounted() {
    this.calculateTime();
  },
};
</script>

<style scoped lang="less">
.checkout {
  text-align: center;
  width: 180px;
}
</style>
