<template>
    <div>
        <MarketTabs/>
        <div class="p-4 text-center">
            <h2>Change your FUTURE for other cryptocurrencies</h2>
            <h5>You can choose here in which cryptocurrencies you want to change your rewards.</h5>
            <div>
                <input class="mr-2" type="radio" id="two" value="steem" v-model="picked">
                <label for="two">STEEM (Send automatically to your wallet)</label>
            </div>
            <br>
            <div>
                <input class="mr-2" type="radio" disabled id="four" value="btc" v-model="picked">
                <label for="four">BTC (disabled)</label>
            </div>
            <div>
                <input class="mr-2" type="radio" disabled id="four" value="btc" v-model="picked">
                <label for="four">GBYTE (disabled)</label>
            </div>
            <br>
            <h5 v-if="picked">CURRENT RATE : {{futureToSteem}} FUTURE = 1 {{picked}} </h5>
            <form v-if="user.future > 0 && picked" class="form mx-auto" @submit.prevent="handleSubmit">
                <input class="input input-primary mb-2" type="number" v-model="amount" :disabled="isLoading" maxlength="10" placeholder="Amount to change" />
                <button :disabled="isLoading || user.future < amount" type="submit" class="button input-block button-large button-green">
                              <span v-if="!isLoading">
                                Withdraw
                              </span>
                              <Loading v-else />
                </button>
            <h3>{{totalFuture}} {{picked}}</h3>
            </form>
             <div v-if="!picked">
                <p class="mb-4">You must choose your currency.</p>
            </div>
            <div v-if="picked && amount < 50">
                <p class="mb-4 text-red">The minimum widthraw is 50 Future.</p>
            </div>
            <div v-else-if="picked && user.future === 0">
                <p class="mb-4">You don't have any token to claim.</p>
            </div>
            <div>
              <p class="mb-4">Why the FUTURE price is low in the internal exchange?</p>
               At this moment the internal exchange is a guarantee for everyone to be able to sell their FUTURE tokens for a minimum value instantly. In contrary to other exchanges it avoid any complexity and waiting time. The price of the future is defined by the following formula - Total Future Owned by players / @drugwars account balance ({{prizeProps.total_future}} / {{parseInt(prizeProps.balance)}} = {{futureToSteem}}) and will change to reflect the market price in less than few weeks.
            </div>
              <div>
              <p class="mb-4 mt-4">Where else can I sell my FUTURE?</p>
            			<!-- <div>
				Buy with BTC by using
				<a href="https://cryptox.pl/">Cryptox.pl</a>.
			</div> -->
			<div>
				Sell for GBYTE by using the official
				<a href="https://obyte.org/">Obyte Wallet</a>.
			</div>
            </div>
        </div>
    </div>
</template>

<script>
import Promise from 'bluebird';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
      nickname: null,
      picked: null,
      amount: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    prizeProps() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps;
    },
    lastUpdate() {
      return new Date(
        Date.parse(this.$store.state.game.user.user.last_profile_update),
      ).toLocaleString();
    },
    futureToSteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(prizeProps.total_future / parseFloat(prizeProps.balance)).toFixed(0);
    },
    totalFuture() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(
        this.amount / (prizeProps.total_future / parseFloat(prizeProps.balance)),
      ).toFixed(3);
    },
  },
  methods: {
    ...mapActions(['send', 'notify']),
    handleSubmit() {
      const payload = {
        currency: this.picked,
        amount: parseInt(this.amount),
      };
      console.log(payload);
      this.isLoading = true;
      this.send({ type: 'widthraw', payload })
        .then(() => {
          Promise.delay(6000).then(() => {
            this.notify({
              type: 'success',
              message: `You have widthrawn ${payload.amount} FUTURE`,
            });
            this.isLoading = false;
          });
        })
        .catch(e => {
          this.notify({ type: 'error', message: `Failed to widthraw ${payload.amount} FUTURE` });
          console.error(`Failed to widthraw ${payload.amount} FUTURE`, e);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
</style>
