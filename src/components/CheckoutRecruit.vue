<template>
  <div class="checkout">
    <div class="mb-2">
      <i class="iconfont icon-clock mr-2"/>
      {{ inProgress ? timeToWait : buildingTime | ms }}
    </div>
    <button
      :class="{ progress: inProgress }"
      :disabled="isLoading || inProgress"
      @click="handleUpgradeBuilding()"
      class="button btn-block button-upgrade mb-2 meter"
    >
      <template v-if="!isLoading">
        <i class="iconfont icon-person"/>
        {{ inProgress ? 'Recruiting' : 'Recruit' }}
      </template>
      <template v-else>
        <Loading/>
      </template>
    </button>
    <div class="mb-2">Instant recruit</div>
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

export default {
  props: ['id', 'inProgress', 'price'],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    buildingTime() {
      return 12345;
    },
    priceInSteem() {
      return (this.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
    timeToWait() {
      const unit = this.$store.state.game.user.units.find(b => b.building === this.id);
      if (unit) {
        const nextUpdate = new Date(unit.next_update).getTime();
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
