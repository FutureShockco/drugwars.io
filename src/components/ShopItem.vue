<template>
  <div class="column col-4 text-center p-2">
    <div class="columns m-2 shopcard">
      <Icon class="mr-2" size="44" :name="item.icon" />
      <div class="title">{{ item.name }}</div>
      <div class="title type">{{ item.type }}<span v-if="!item.enabled"> Temporary disabled</span></div>
          <div >{{ item.desc }}</div>
        <button
          :disabled="isLoading || notEnoughDWD ||!item.enabled"
          @click="handleSubmit(item.name)"
          class="button btn-block button-yellow mb-2 mt-2">
        <img class="dwdicon" src="//img.drugwars.io/icons/dwd.png"/>
        <span v-if="shieldUsed && item.name ==='shield'"> {{ priceInDWD*3  }} DWD</span>
                <span v-else> {{ priceInDWD  }} DWD</span>
        </button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['item', 'price'],
  data() {
    return {
      isLoading: false,
    };
  },
  computed: {
    priceInDWD() {
      return this.price;
    },
    dwdPrice() {
      const price = this.$store.state.game.prizeProps.seProps.lastPrice || 0;
      return price * this.priceInDWD;
    },
    notEnoughDWD() {
      return this.priceInDWD > this.$store.state.game.user.user.dwd;
    },
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return false;
    },
    username() {
      return this.$store.state.auth.username;
    },
    shieldEnd() {
      const diff =
        this.$store.state.game.user.user.shield_end * 1000 - this.$store.state.ui.timestamp;
      return diff > 0 ? diff : 0;
    },
    shieldUsed() {
      return  new Date(this.$store.state.game.user.user.last_shield_use) > new Date();
    },
  },
  methods: {
    ...mapActions(['send', 'init']),
    handleSubmit(type) {
      this.isLoading = true;
      const payload = {
        amount: 1,
        type: `dw-${type}`,
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

.dwdicon {
  width: 22px;
  left: 0px;
  position: relative;
  float: left;
  top: 5px;
}
</style>
