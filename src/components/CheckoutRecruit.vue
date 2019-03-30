<template>
  <div class="checkout mb-4">
    <div class="mb-2">
      <i class="iconfont icon-clock mr-2"/>
      {{ inProgress ? timeToWait : (updateTime) | ms }}
    </div>

    <button
      :class="{ progress: inProgress }"
      :disabled="isLoading || waitingConfirmation || inProgress || notEnough"
      @click="handleSubmit()"
      class="button btn-block button-green mb-2"
    >
      <template v-if="isLoading || waitingConfirmation">
        <Loading/>
      </template>
      <template v-else>
        <i class="iconfont icon-person"/>
        {{ inProgress ? 'Recruiting' : notEnough ? 'Miss resources' : 'Recruit' }}
      </template>
    </button>

    <div class="mb-2">Instant recruit</div>
    <button
      :disabled="isLoading || waitingConfirmation"
      @click="handleRequestPayment()"
      class="button btn-block button-blue mb-2"
    >
      <i class="iconfont icon-zap"/>
      ${{ price * quantity | amount }} -
      {{ priceInSteem | amount }} STEEM
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { utils } from 'drugwars';

export default {
  props: ['id', 'level', 'coeff', 'inProgress', 'price', 'quantity', 'notEnough'],
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
      return utils.calculateTimeToTrain(this.coeff, this.level, this.quantity);
    },
    priceInSteem() {
      return ((this.price * this.quantity) / this.$store.state.game.prizeProps.steemprice).toFixed(
        3,
      );
    },
    timeToWait() {
      const unit = this.$store.state.game.user.units.find(b => b.unit === this.id);
      if (unit) {
        if (unit.pending_update) {
          const nextUpdate = new Date(unit.pending_update).getTime();
          const now = this.$store.state.ui.timestamp;
          const timeToWait = nextUpdate - now;
          return timeToWait > 0 ? timeToWait : 0;
        }

        const nextUpdate = new Date(unit.next_update).getTime();
        const now = this.$store.state.ui.timestamp;
        const timeToWait = nextUpdate - now;
        return timeToWait > 0 ? timeToWait : 0;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions(['recruitUnit', 'requestPayment']),
    handleSubmit() {
      this.isLoading = true;
      this.recruitUnit({ unit: this.id, amount: this.quantity })
        .then(result => {
          console.log('Result', result);
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
        memo: `unit:${this.id},amount:${this.quantity}`,
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
