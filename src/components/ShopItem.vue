<template>
  <div class="column col-6 text-center p-2">
    <div class="columns m-2 shopcard">
      <Icon class="mr-2" size="44" :name="'card'" />
      <div class="title">{{ Math.round(this.amountOfDWD) }}</div>
      <div class="title type">{{ item.type }}</div>
      Buy {{ Math.round(this.amountOfDWD/36) }} Pack of 5 Card
      <button @click="handleSubmit()" class="button btn-block button-blue mb-2 mt-2" :disabled="isLoading  || notEnoughDWD">
        <i class="iconfont icon-zap" />${{ item.price | amount }} - {{ priceInSteem | amount }} STEEM
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
 props: ['item'],
 data() {
  return {
   isLoading: false,
  };
 },
 computed: {
  priceInSteem() {
   return (this.item.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
  },
  amountOfDWD() {
   return (((this.item.price / this.$store.state.game.prizeProps.steemprice) * 3) / 100).toFixed(3);
  },
  steemAccount() {
   if (this.$store.state.auth.account) return this.$store.state.auth.account;
   return false;
  },
  username() {
   return this.$store.state.auth.username;
  },
  notEnoughDWD() {
   return this.amountOfDWD > this.$store.state.game.user.user.dwd;
  },
 },
 methods: {
  ...mapActions(['send', 'init']),
  handleSubmit() {
   this.isLoading = true;
   const payload = {
    amount: 1,
    type: 'dw-pack',
   };
   this.send(payload)
    .then(() => {
     Promise.delay(3000).then(() => {
      this.init();
      this.isLoading = false;
      this.amount = 0;
     });
    })
    .catch(e => {
     console.error('Failed to buy pack', e);
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
