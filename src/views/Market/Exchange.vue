<template>
    <div>
        <MarketTabs/>
        <div class="p-4 text-center">
        <img src="/img/icons/dwd.png"/>
        <h3 class="mb-4">You have <b>{{ user.dwd }} DWD</b> token(s) in-game </h3>
        <div v-if="steemAccount" class="m2-4 ">
          <h4>Withdraw DWD token(s) to SteemEngine</h4>
        </div>
        <div v-else>
           <h5>At this moment SteemEngine is only available for Steem users.</h5>
        </div>
      </div>
        <div class="text-center">
            <form v-if="user.dwd > 0" class="form mx-auto" @submit.prevent="handleSubmit">
                <input class="input input-primary mb-2" type="number" v-model="amount" :disabled="isLoading" maxlength="10" placeholder="Amount to change" />
                <button :disabled="isLoading || user.dwd < amount" type="submit" class="button input-block button-large button-green">
                                  <span v-if="!isLoading">
                                    Withdraw
                                  </span>
                                  <SmallLoading v-else />
                    </button>
            </form>
            <div v-if="!picked">
                <p class="mb-4">You must choose your currency.</p>
            </div>
            <div v-else-if="picked && user.dwd === 0">
                <p class="mb-4">You don't have any token to claim.</p>
            </div>
            <div>
                <div class="mt-4">
    				What is SteemEngine?
    				<a href="https://steem-engine.com">https://steem-engine.com/</a>.
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
      picked: 'steem',
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
    dwdToSteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(prizeProps.total_dwd / parseFloat(prizeProps.balance)).toFixed(0);
    },
    totalDWD() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(
        this.amount / (prizeProps.total_dwd / parseFloat(prizeProps.balance)),
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
            this.isLoading = false;
          }
        })
        .catch(e => {
          this.notify({ type: 'error', message: `Failed to withdraw ${payload.amount} DWD` });
          console.error(`Failed to withdraw ${payload.amount} DWD`, e);
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
