<template>
    <div class="column col-6 text-center p-2">
        <div class="columns m-2 shopcard">
            <Icon class="mr-2" size="44" :name="item.img" />
            <div class="title">
                {{ this.amountOfDWD }}
            </div>
    
            <div class="title type">
                {{ item.type }}
            </div>
            {{item.detail}}
            <button v-if="steemAccount" @click="handleRequestPayment()" class="button btn-block button-blue mb-2 mt-2">
          <i class="iconfont icon-zap"/>
          ${{ item.price | amount }} -
          {{ priceInSteem | amount }} STEEM
        </button>
            <h3 class="mt-0 mb-0" v-else> ${{ item.price | amount }}</h3>
            <PayPal :amount="item.price.toString()" currency="USD" :client="credentials" :items="myItems" env="production" :invoice-number="uniqueId+username" v-on:payment-authorized="paymentAuthorized" v-on:payment-completed="paymentCompleted" v-on:payment-cancelled="paymentCancelled">
            </PayPal>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import PayPal from 'vue-paypal-checkout';

export default {
  props: ['item'],
  data() {
    return {
      credentials: {
        sandbox: process.env.VUE_APP_PAYPAL_SANDBOX,
        production: process.env.VUE_APP_PAYPAL_PROD,
      },
      experienceOptions: {
        input_fields: {
          no_shipping: 1,
        },
      },
      myItems: [
        {
          name: 'DW Shop',
          description: 'DWDTokens.',
          quantity: 1,
          price: this.item.price,
          currency: 'USD',
        },
      ],
    };
  },
  computed: {
    priceInSteem() {
      return (this.item.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
    amountOfDWD() {
      return ((this.item.price / this.$store.state.game.prizeProps.steemprice) * 3).toFixed(3);
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
            return 'xxxxxxxxxxx'.replace(/[xy]/g, c => {
                const r = (Math.random() * 16) | 0,
                    v = c == 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            });
            /* eslint-enable */
    },
  },
  components: {
    PayPal,
  },
  methods: {
    ...mapActions(['send', 'requestPayment']),
    handleRequestPayment() {
      this.requestPayment({
        memo: `shop:${this.item.ref},amount:${this.amountOfDWD}`,
        amount: `${this.priceInSteem} STEEM`,
      });
    },
    paymentAuthorized(data) {
      this.handleSubmit(data.orderID);
    },
    paymentCompleted(data) {
      console.log(data);
    },
    paymentCancelled(data) {
      console.log(data);
    },
    handleSubmit(orderID) {
      const payload = {
        id: orderID,
        type: 'paypal-shop',
      };
      this.isLoading = true;
      this.send(payload)
        .then(result => {
          if (result) {
            this.notify({
              type: 'success',
              message: result,
            });
            this.isLoading = false;
          }
        })
        .catch(e => {
          this.notify({ type: 'error', message: `Failed to withdraw ${payload.amount} DWD` });
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
