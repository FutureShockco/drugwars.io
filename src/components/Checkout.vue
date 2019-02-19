<template>
  <div :class="{ pending: isLoading }" class="payment-widget float-right ml-4 mr-3 pt-3">
    <div class="label-yellow mb-2">1h 31mn</div>
    <button
      @click="handleUpgradeBuilding()"
      class="btn btn-block btn-green btn-success mb-2"
    >
      Upgrade
    </button>
    <span>Instant Upgrade</span>
    <button
      @click="handleRequestPayment()"
      class="btn btn-block btn-blue mb-2"
    >
      Steem
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
    }
  },
  methods: {
    ...mapActions(['upgradeBuilding', 'requestPayment']),
    handleUpgradeBuilding() {
      this.isLoading = true;
      this.upgradeBuilding().then((result) => {
        console.log('Result', result);
        this.isLoading = false;
      }).catch(e => {
        console.error('Failed', e);
        this.isLoading = false;
      });
    },
    handleRequestPayment() {
      this.requestPayment();
    },
  },
};
</script>

<style scoped lang="less">
.label-yellow {
  color: black;
  background-color: #fbb034;
  background-image: linear-gradient(315deg, #fbb034, #fd0 74%);
  box-shadow: inset 1px 1px 5px #000;
  border: 1px #fbc634 solid;
  font-weight: 700;
  text-align: center;
}

.btn-blue {
  line-height: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  text-decoration: none;
  color: #fff;
  position: relative;
  border: solid 0px #2ab7ec;
  background-image: linear-gradient(315deg, #04609e, #1c174c 74%);
  box-shadow: inset 0px 0px 0px #2a67ec, 0px 5px 0px 0px #154685, 0px 10px 5px rgb(32, 32, 32);
}

.btn-blue:active {
  top: 3px;
  background-image: linear-gradient(to bottom, #04609e 0%, #1c174c 100%);
  box-shadow: inset 0px 1px 0px #2a67ec, 0px 2px 0px 0px #154685, 0px 5px 3px rgb(32, 32, 32);
}

.btn-blue::before {
  background: url('/img/icons/steem.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  background-color: #1c174c;
  content: '';
  width: 30px;
  line-height: 10px;
  max-height: 14px;
  height: 100%;
  position: absolute;
  display: block;
  padding-top: 8px;
  top: 0px;
  left: -30px;
  font-size: 16px;
  font-weight: bold;
  color: #8fd1ea;
  text-shadow: 1px 1px 0px #07526e;
  border-right: solid 1px #07526e;
  box-shadow: inset 0px 0px 0px #2a67ec, 0px 5px 0px 0px #154685, 0px 10px 5px rgb(32, 32, 32);
}

.btn-blue:active::before {
  top: -3px;
  box-shadow: inset 0px 0px 0px #2a67ec, 0px 5px 0px 0px #154685, 1px 1px 0px 0px #044a64,
    2px 2px 0px 0px #044a64, 2px 5px 0px 0px #044a64, 6px 4px 2px #0b698b,
    0px 10px 5px rgb(32, 32, 32);
}

.btn-green {
  line-height: 10px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  text-decoration: none;
  color: #fff;
  position: relative;
  border: solid 0px #2aec2a;
  background-image: linear-gradient(315deg, #1e9e04, #1b4c17 74%);
  box-shadow: inset 0px 0px 0px #2aec2a, 0px 5px 0px 0px #228515, 0px 10px 5px rgb(32, 32, 32);
}

.btn-green:active {
  top: 3px;
  background-image: linear-gradient(to bottom, #1e9e04 0%, #1b4c17 100%);
  box-shadow: inset 0px 1px 0px #2aec2a, 0px 2px 0px 0px #228515, 0px 5px 3px rgb(32, 32, 32);
}

.btn-green::before {
  background: url('/img/icons/resources.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 50%;
  background-color: #1b4c17;
  content: '';
  width: 30px;
  line-height: 10px;
  max-height: 14px;
  height: 100%;
  position: absolute;
  display: block;
  padding-top: 8px;
  top: 0px;
  left: -30px;
  font-size: 16px;
  font-weight: bold;
  color: #9eea8f;
  text-shadow: 1px 1px 0px #076e15;
  border-right: solid 1px #076e10;
  box-shadow: inset 0px 0px 0px #2aec2a, 0px 5px 0px 0px #228515, 0px 10px 5px rgb(32, 32, 32);
}

.btn-green:active::before {
  top: -3px;
  box-shadow: inset 0px 0px 0px #2aec2a, 0px 5px 0px 0px #228515, 1px 1px 0px 0px #04641c,
    2px 2px 0px 0px #04641c, 2px 5px 0px 0px #04641c, 6px 4px 2px #0b8b20,
    0px 10px 5px rgb(32, 32, 32);
}
</style>
