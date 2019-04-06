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
        <button
      @click="handleRequestPayment()"
      class="button btn-block button-blue mb-2 mt-2">
      <i class="iconfont icon-zap"/>
      ${{ item.price | amount }} -
      {{ priceInSteem | amount }} STEEM
    </button>
        </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['item'],
  computed: {
    priceInSteem() {
      return (this.item.price / this.$store.state.game.prizeProps.steemprice).toFixed(3);
    },
  },
  methods: {
    ...mapActions(['requestPayment']),
    handleRequestPayment() {
      this.requestPayment({
        memo: `shop:${this.item.ref},amount:${this.item.quantity}`,
        amount: `${this.priceInSteem} STEEM`,
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
