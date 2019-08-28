<template>
    <div>
        <MarketTabs/>
        <div class="p-4 text-center">
            <div>
                <img src="/img/icons/dwd.png" />
                <h3 class="mb-4">You have <b>{{ user.dwd }} DWD</b> token(s) in-game </h3>
                <div class="mb-4 text-left">
                    <h4>To withdraw DWD token on a secured wallet, you need to carefully follow these steps:</h4>
                    <p>
                        1. Install
                        <a href="https://obyte.org" target="_blank">
                  Obyte wallet
                </a>
                    </p>
                    <p>2. Attest your Steem account publicly</p>
                    <p>
                        3.
                        <a :href="`https://obyte.io/steem/${user.username}`" target="_blank">
                 Click here
                </a> to see which wallet is currently connected to your Steem username
                    </p>
                    <p>4. Open your Obyte wallet and click the "Receive" button at the bottom.</p>
                    <p class="text-red">5. Check that those two addresses are the same. If not - DON'T WITHDRAW YOUR TOKENS</p>
                    <p>6. Fill the withdraw form below with the amount you would like to receive, try with a small amount first if you aren't sure.</p>
                </div>
                <form v-if="user.dwd > 0" class="form mx-auto" @submit.prevent="handleSubmit">
                    <input class="input input-primary mb-2" v-model="amount" :disabled="isLoading" maxlength="10" type="number" placeholder="Amount to claim ei. 1000" />
                    <button :disabled="isLoading" type="submit" class="button input-block button-large button-green">
                <span v-if="!isLoading">
                  Withdraw
                </span>
                <SmallLoading v-else />
              </button>
                </form>
                <div v-else>
                    <p class="mb-4">You don't have any token to claim.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      amount: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
  },
  methods: {
    ...mapActions(['init', 'notify']),
    resetForm() {
      this.amount = 0;
    },
    handleSubmit() {
      this.isLoading = true;
      const payload = { DWD: parseInt(this.amount, 10) };
      client.request('claim_reward', payload, (err, result) => {
        if (err) {
          this.notify({ type: 'error', message: err });
          console.error('Failed to claim reward', err);
          this.isLoading = false;
        } else {
          this.isLoading = false;
          this.notify({
            type: 'success',
            message: `You successfully claimed ${this.amount} DWD tokens`,
          });
          console.log('Claim success, the unit id is', result);
          this.resetForm();
          this.init();
        }
      });
    },
  },
};
</script>
