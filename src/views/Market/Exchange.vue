<template>
    <div>
        <MarketTabs/>
        <div class="p-4 text-center">
            <h2>Change your FUTURE for other cryptocurrencies</h2>
            <div v-if="steemAccount">
              <h5>You can choose here in which cryptocurrencies you want to change your rewards.</h5>
                <input class="mr-2" type="radio" id="two" value="steem" v-model="picked">
                <label for="two"><Icon name="steem" size="18" class="icons mr-2"/>STEEM (Send automatically to your wallet)</label>
            </div>
            <div v-else>
                <h5>At this moment the internal market is only available for Steem users. Please use the withdraw page to trade your FUTURE on Obyte or Cryptox.pl</h5>
            </div>
            <br>
            <div>
                <input class="mr-2" type="radio" disabled id="four" value="btc" v-model="picked">
                <label for="four">SBD (disabled)</label>
            </div>
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
                                  <SmallLoading v-else />
                    </button>
                <h3>{{totalFuture}} {{picked}}</h3>
            </form>
            <div v-if="!picked">
                <p class="mb-4">You must choose your currency.</p>
            </div>
            <div v-if="picked && amount < 50">
                <p class="mb-4 text-red">The minimum withdraw is 50 Future.</p>
            </div>
            <div v-else-if="picked && user.future === 0">
                <p class="mb-4">You don't have any token to claim.</p>
            </div>
            <div>
                <p class="mb-4">How the FUTURE price is calculated in the internal exchange?</p>
                Total Future Owned by players / @drugwars account balance ({{prizeProps.total_future}} / {{parseInt(prizeProps.balance)}} = {{futureToSteem}}).
            </div>
            <div>
                <p class="mb-4 mt-4">Where else can I sell my FUTURE?</p>
                <div>
    				Buy with BTC by using
    				<a href="https://cryptox.pl/">Cryptox.pl</a>.
    			</div>
                <div>
                    Sell for GBYTE by using the official
                    <a href="https://obyte.org/">Obyte Wallet</a>.
                </div>
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
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return 0;
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
        type: 'widthraw',
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
.icons {
  margin-bottom: -3px;
}
</style>
