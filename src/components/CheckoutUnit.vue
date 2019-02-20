<template>
  <div
    :class="{ pending: isLoading, progress: inProgress }"
    class="checkout float-right ml-4 mr-3 pt-3"
  >
    <div class="label-yellow mb-2">
      {{ inProgress ? timeToWait : recruitTime | ms }}
    </div>
    <button
      :disabled="isLoading || inProgress"
      class="btn btn-block btn-green btn-success mb-2"
    >
      Recruit
    </button>
    <Loading v-if="isLoading || inProgress"/>
    <span class="ml-3 instant">Instant upgrade</span>
    <button
      :disabled="isLoading"
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
  props: ['id'],
  data() {
    return {
      amount: 1,
      isLoading: false,
      timeToWait: 0,
      recruitTime: 100,
    };
  },
  methods: {
    ...mapActions(['requestPayment']),
    handleRequestPayment() {
      this.requestPayment({
        memo: `unit:${this.id},amount:${this.amount}`,
        amount: '0.123 STEEM',
      });
    },
  },
};
</script>

<style scoped lang="less">
.checkout {
  width: 240px;

  &.pending {
    opacity: 0.8;
  }

  &.progress {
  }
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
  border-radius: 0px 5px 5px 0px;
}

.btn-blue:active {
  top: 3px;
  background-image: linear-gradient(to bottom, #04609e 0%, #1c174c 100%);
  box-shadow: inset 0px 1px 0px #2a67ec, 0px 2px 0px 0px #154685, 0px 5px 3px rgb(32, 32, 32);
}

.btn-blue:hover {
  background-image: linear-gradient(to bottom, #04609e 0%, #1c174c 100%);
  box-shadow: inset 0px 1px 0px #2a67ec, 0px 5px 0px 0px #154685, 0px 10px 5px rgb(32, 32, 32);
}

.btn-blue::before {
  background: url('/img/icons/steem.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;
  background-color: #1d1d1d;
  content: '';
  width: 30px;
  line-height: 10px;
  max-height: 12px;
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
  border: solid 1px #2a67ec;
  box-shadow: inset 0px 0px 0px #2a67ec, 0px 5px 0px 0px #154685, 0px 10px 5px rgb(32, 32, 32);
  border-radius: 5px 0px 0px 5px;
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
  border-radius: 0px 5px 5px 0px;
}

.btn-green:active {
  top: 3px;
  background-image: linear-gradient(to bottom, #1e9e04 0%, #1b4c17 100%);
  box-shadow: inset 0px 1px 0px #2aec2a, 0px 2px 0px 0px #228515, 0px 5px 3px rgb(32, 32, 32);
}

.btn-green:hover {
  background-image: linear-gradient(to bottom, #1e9e04 0%, #1b4c17 100%);
  box-shadow: inset 0px 0px 0px #2aec2a, 0px 5px 0px 0px #228515, 0px 10px 5px rgb(32, 32, 32);
}

.btn-green::before {
  background: url('/img/icons/resources.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;
  background-color: #1d1d1d;
  content: '';
  width: 30px;
  line-height: 10px;
  max-height: 12px;
  height: 100%;
  position: absolute;
  display: block;
  padding-top: 8px;
  top: 0px;
  left: -30px;
  font-size: 16px;
  font-weight: bold;
  color: #9eea8f;
  border: solid 1px #2aec2a;
  text-shadow: 1px 1px 0px #076e15;
  border-right: solid 1px #076e10;
  box-shadow: inset 0px 0px 0px #2aec2a, 0px 5px 0px 0px #228515, 0px 10px 5px rgb(32, 32, 32);
  border-radius: 5px 0px 0px 5px;
}

.btn-green:active::before {
  top: -3px;
  box-shadow: inset 0px 0px 0px #2aec2a, 0px 5px 0px 0px #228515, 1px 1px 0px 0px #04641c,
    2px 2px 0px 0px #04641c, 2px 5px 0px 0px #04641c, 6px 4px 2px #0b8b20,
    0px 10px 5px rgb(32, 32, 32);
}

.label-yellow {
  color: black !important;
  pointer-events: none;
  font-weight: 700;
  text-align: center;
  line-height: 22px;
  font-family: 'Open Sans', sans-serif;
  font-size: 12px;
  text-decoration: none;
  color: #fff;
  position: relative;
  border: solid 0px #fbb034;
  top: 3px;
  background-image: linear-gradient(to bottom, #fd0 0%, #fbb034 100%);
  box-shadow: inset 0px 1px 0px #fbb034, 0px 2px 0px 0px #857e15, 0px 5px 3px rgb(32, 32, 32);
  border-radius: 0px 5px 5px 0px;
}

.label-yellow::before {
  background: url(/img/icons/timer.svg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: 40%;
  background-color: #1d1d1d;
  content: '';
  width: 30px;
  line-height: 10px;
  max-height: 12px;
  height: 100%;
  position: absolute;
  display: block;
  padding-top: 8px;
  top: -3px;
  left: -30px;
  font-size: 16px;
  font-weight: bold;
  color: #000000;
  text-shadow: 1px 1px 0px #6e6c07;
  border: solid 1px #fecd1d;
  -webkit-box-shadow: inset 0px 0px 0px #fbb034, 0px 5px 0px 0px #857e15, 0px 10px 5px #202020;
  box-shadow: inset 0px 0px 0px #fbb034, 0px 5px 0px 0px #857e15, 0px 10px 5px #202020;
  border-radius: 5px 0px 0px 5px;
}

.instant {
  font-size: 12px;
  color: #0c4782;
  font-weight: bold;
}
</style>
