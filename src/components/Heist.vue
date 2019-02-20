<template>
  <div class="heist">
    <img src="/img/lottery/heist.png">
    <div>
      <input
        class="heist input"
        type="number"
        v-model="amount"
      />
    </div>
    <form @submit.prevent="handleSubmit">
      <button
        :disabled="isLoading"
        type="submit"
        class="btn btn-block btn-green mt-2"
      >
        Deposit
      </button>
      <Loading v-if="isLoading"/>
    </form>
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

.heist.input {
  text-align: center;
  color: #fbbd08;
  width: 100%;
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
