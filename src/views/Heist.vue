<template>
  <div>
    <Header title="Heist" />
    <div class="p-4">
      <div class="heist">
        <img src="/img/lottery/heist.png">
        <h1>${{ totalReward | amount }}</h1>
        <h2>{{ totalRewardSteem | amount }} STEEM</h2>
        <p>Total: {{ prizeProps.heist_pool | amount }} DRUGS</p>
        <p>Total vest: {{ totalVest | amount }} DRUGS</p>
        <p>Reward: {{ ownReward.amount | amount }} STEEM ({{ ownReward.percent | amount }}%)</p>
        <form class="col-5 mx-auto" @submit.prevent="handleSubmit">
          <input
            class="input form-control input-block"
            v-model="amount"
            type="number"
            min="0"
            :max="1"
          >
          <button
            :disabled="isLoading"
            type="submit"
            class="btn btn-green mt-2"
          >
            Invest DRUGS
          </button>
          <Loading v-if="isLoading"/>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
      amount: this.$store.state.game.user.user.drugs_balance,
    };
  },
  computed: {
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    totalVest() {
      return this.$store.state.game.user.heist[0].drugs;
    },
    totalRewardSteem() {
      return parseFloat(this.prizeProps.balance) / 100 * this.prizeProps.heist_percent;
    },
    totalReward() {
      return parseFloat(this.prizeProps.balance) / 100 * this.prizeProps.steemprice * this.prizeProps.heist_percent;
    },
    ownReward() {
      const percent = 100 / this.prizeProps.heist_pool * this.totalVest;
      const amount = this.totalReward / 100 * percent;
      return {
        amount,
        percent,
      };
    },
  },
  methods: {
    ...mapActions(['investHeist']),
    handleSubmit() {
      this.isLoading = true;
      this.investHeist(this.amount)
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed to invest on heist', e);
          this.isLoading = false;
        });
    },
  },
};
</script>


<style scoped lang="less">
.heist {
  text-align: center;
  padding: 0px 15px;
}

.btn-green {
  width: calc(100% - 30px);
  margin-left: 30px;
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
</style>
