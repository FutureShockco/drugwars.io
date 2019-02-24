<template>
  <div class="checkout">
    <div class="mb-2">
      <i class="iconfont icon-clock mr-2"/>
      {{ inProgress ? timeToWait : buildingTime | ms }}
    </div>

    <button
      :class="{ progress: inProgress }"
      :disabled="isLoading || inProgress || notEnough"
      @click="handleUpgradeBuilding()"
      class="button btn-block button-upgrade mb-2"
    >
      <template v-if="!isLoading">
        <i class="iconfont icon-tools"/>
        {{ notEnough ? 'Miss resources' : inProgress ? 'Upgrading' : 'Upgrade' }}
      </template>
      <template v-else>
        <Loading/>
      </template>
    </button>

    <div class="mb-2">Instant upgrade</div>
    <button
      :disabled="isLoading"
      @click="handleRequestPayment()"
      class="button btn-block button-instant-upgrade mb-2"
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
    };
  },
  computed: {
    buildingTime() {
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
        return nextUpdate - now;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions(['upgradeBuilding', 'requestPayment']),
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
};
</script>

<style scoped lang="less">
.checkout {
  text-align: center;
  width: 180px;
}
</style>
