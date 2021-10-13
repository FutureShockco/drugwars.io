<template>
  <div class="column col-6 text-center p-2">
    <div class="columns m-2 shopcard">
      <Icon class="mr-2" size="44" :name="item.img" />
      <div class="title">{{ amountOfDWD }} Tokens</div>
      <!-- <div class="title type">{{ amountOfDWD(item.quantity) }}</div> -->
      {{item.detail}}
      <!-- <button
        v-if="steemAccount"
        @click="handleRequestPayment()"
        class="button btn-block button-blue mb-2 mt-2"
      >
        <i class="iconfont icon-zap" />
        ${{ item.price | amount }} -
        {{ priceInSteem | amount }} STEEM
      </button> -->
      <h3 class="mt-0 mb-0" >${{ item.price | amount }}</h3>
      <!-- <PayPal
        :amount="item.price.toString()"
        currency="USD"
        :client="credentials"
        :items="item"
        env="production"
        :invoice-number="uniqueId+username"
        v-on:payment-authorized="paymentAuthorized"
        v-on:payment-completed="paymentCompleted"
        v-on:payment-cancelled="paymentCancelled"
      ></PayPal> -->
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['item'],
  data() {
    return {

      experienceOptions: {
        input_fields: {
          no_shipping: 1,
        },
      },
    };
  },
  computed: {
    amountOfDWD() {
      return parseFloat(this.item.price / this.$store.state.game.prizeProps.steemprice / Number(this.$store.state.game.prizeProps.seProps.lastPrice)/2).toFixed(0) ;
    },
    priceInSteem() {
      return (this.item.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return false;
    },
    username() {
      return this.$store.state.auth.username;
    },
    uniqueId() {
      /* eslint-disable */
      return 'xxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
      /* eslint-enable */
    },
  },

  methods: {
    ...mapActions(['send', 'requestPayment']),
    handleRequestPayment() {
      this.requestPayment({
        memo: `shop:${this.item.ref},amount:${
          this.amountOfDWD
        },
        amount: ${this.priceInSteem} STEEM,server:${this.$store.state.game.server.number}`,
      });
    },

    paymentAuthorized(data) {
      this.handleSubmit(data.orderID);
    },
    paymentCompleted(data) {
      // console.log(data);
    },
    paymentCancelled(data) {
      // console.log(data);
    },
    handleSubmit(orderID) {
      // console.log(orderID);
      const payload = {
        id: orderID,
        type: 'paypal-shop',
      };
      this.isLoading = true;
      this.send(payload)
        .then(result => {
          if (result) {
            this.isLoading = false;
          }
        })
        .catch(e => {
          console.error(`Failed to withdraw ${payload.amount} DWD`, e);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';
.icon {
  top: -10px;
  position: relative;
}

.production {
  display: inline-grid;
  color: #fbbd08;
}

.title {
  color: #fbbd08;
  top: 0px;
  font-family: @heading-font;
  font-size: 26px;
  text-transform: uppercase;
  transform: translate(-50%, -50%) skew(-24deg) rotate(-10deg);
  width: 200px;
  left: 50%;
  text-align: center;
  margin: 0;
  line-height: 20px;
  position: relative;
  text-rendering: optimizeLegibility;
  font-weight: 900;
  text-shadow: 1px 4px 6px #000, 0 0 0 #0b0b0b, 1px 4px 6px #101010;
  white-space: nowrap;
}

.type {
  color: #fbbd08;
  top: 5px !important;
  font-size: 16px;
}
</style>
