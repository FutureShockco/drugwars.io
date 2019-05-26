<template>
  <div class="column col-6 text-center p-2">
    <div class="columns m-2 shopcard">
              <Icon
      class="mr-2"
      size="44"
      :name="item.img"
    />
    <div class="username">
      {{ item.name }}
    </div>
    
    <div class="username type">
      {{ item.type }}
    </div>
        {{item.detail}}
        <button v-if="steemAccount"
      @click="handleRequestPayment()"
      class="button btn-block button-blue mb-2 mt-2">
      <i class="iconfont icon-zap"/>
      ${{ item.price | amount }} -
      {{ priceInSteem | amount }} STEEM
    </button>
    <h3 class="mt-0 mb-0" v-else> ${{ item.price | amount }}</h3>
         <PayPal
          :amount="item.price"
          currency="USD"
          :client="credentials"
          :items="myItems"
          env="production"
          :invoice-number="uniqueId+username"
          v-on:payment-authorized="paymentAuthorized"
          v-on:payment-completed="paymentCompleted"
          v-on:payment-cancelled="paymentCancelled"
   >
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
        sandbox: 'AXUvDP_wEMVrtader-5IcAqlYIMJO4b2ivulbLCLCUfJp7pPFBnfgx_SgY2yrhmQRmzlkNMxxa99XVYJ',
        production:
          'AX1SwcnKodlU3KBupeYfzptXa4_Nm09AiWjbAzau8r_Vi_awPrlEFzcYKtYOpTGImg8-_pqc9FoCMQoh',
      },
      experienceOptions: {
        input_fields: {
          no_shipping: 1,
        },
      },
      myItems: [
        {
          name: 'DW Shop',
          description: 'FutureTokens.',
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
        memo: `shop:${this.item.ref},amount:${this.item.quantity}`,
        amount: `${this.priceInSteem} STEEM`,
      });
    },
    paymentAuthorized(data) {
      console.log(data.orderID);
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
          this.notify({ type: 'error', message: `Failed to withdraw ${payload.amount} FUTURE` });
          console.error(`Failed to withdraw ${payload.amount} FUTURE`, e);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars.less';

.shopcard {
  background: -webkit-gradient(linear, left top, left bottom, from(#0e111496), to(#000000cc)),
    url(/img/fake-brick.png);
  background: linear-gradient(#0e111496, #000000cc), url(/img/fake-brick.png);
}
.icon {
  top: -10px;
  position: relative;
}
.production {
  display: inline-grid;
  color: #fbbd08;
}

.username {
  color: #fbbd08;
  top: 0px;
}
.type {
  color: #fbbd08;
  top: 5px !important;
  font-size: 16px;
}
</style>
