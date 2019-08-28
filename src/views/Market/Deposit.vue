<template>
    <div>
        <MarketTabs/>
        <div class="p-4">
            <div class="mb-4">
                <h4>Deposit to your dedicated address</h4>
                <template v-if="!isLoading">
              <div v-if="depositAddresses && depositAddresses.length > 0">
                <p>Here is your dedicated deposit Obyte address:</p>
                <a :href="`byteball:${depositAddresses[0].address}?asset=NMuNvOJRO2ZY9L17uKtsa7OYkgsV8LfSBIV9BUoVJPQ%3D`">
                  <p><b>{{ depositAddresses[0].address }}</b></p>
                </a>
              </div>
              <div v-else>
                <button
                  class="button button-blue mb-2 mt-2"
                  @click="issueDepositAddress()"
                  :disabled="isLoading"
                >
                  Generate deposit address
                </button>
              </div>
</template>
      </div>
      <div class="mb-4">
        <h4>Deposit from a Steem attested Obyte wallet</h4>
        <p><b>You need to carefully follow these steps:</b></p>
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
        <p class="text-red">5. Check that those two addresses are the same. If not - DON'T DEPOSIT YOUR TOKENS</p>
        <p>6. Send FUTURE token from your Obyte wallet to
          <a href="byteball:%40drugwars?asset=NMuNvOJRO2ZY9L17uKtsa7OYkgsV8LfSBIV9BUoVJPQ%3D">
            "@drugwars"
          </a> or
          <a href="byteball:4XTGGA3Q4DFG7J34DFSO3K36KUOED7XY?asset=NMuNvOJRO2ZY9L17uKtsa7OYkgsV8LfSBIV9BUoVJPQ%3D">
            "4XTGGA3Q4DFG7J34DFSO3K36KUOED7XY"
          </a> address.
        </p>
      </div>
      <div class="mb-4">
        <Loading v-if="isLoading" />
        <div v-else>
          <h4>Deposits history</h4>
          <div class="mb-2 border-bottom py-3" :key="item.tx_id" v-for="item in items">
            {{ item.amount }} FUTURE
            <a target="_blank" :href="`https://explorer.obyte.org/#${item.tx_id}`">
              {{ item.tx_id }}
            </a>
            {{ item.is_stable ? 'confirmed' : 'pending' }}
          </div>
          <p v-if="!isLoading && !items.length">
            You haven't done any deposits.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Promise from 'bluebird';
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      depositAddresses: [],
      items: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
  },
  created() {
    this.loadDepositsAndAddresses();
  },
  methods: {
    loadDepositsAndAddresses() {
      this.isLoading = true;
      Promise.all([
        client.requestAsync('get_deposits', null),
        client.requestAsync('get_deposit_addresses', null),
      ]).then(result => {
        [this.items, this.depositAddresses] = result;
        this.isLoading = false;
      });
    },
    issueDepositAddress() {
      this.isLoading = true;
      client.requestAsync('issue_deposit_address', null).then(() => {
        this.loadDepositsAndAddresses();
      });
    },
  },
};
</script>
