<template>
  <div>
    <ShopTabs/>
    <div class="p-4">
      <div class="mb-4">
        <Loading v-if="isLoading" />
        <div class="mb-2 border-bottom py-3" :key="item.tx_id" v-for="item in items" v-else>
          {{ item.amount }} FUTURE
          <a target="_blank" :href="`https://explorer.obyte.org/#${item.tx_id}`">
            {{ item.tx_id }}
          </a>
          {{ item.is_stable ? 'confirmed' : 'pending' }}
        </div>
      </div>
      <p v-if="!isLoading && !items.length">
        You haven't done any deposits.
      </p>
      <div class="mb-4">
        <h4>To deposit FUTURE token in game, you need to carefully follow these steps:</h4>
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
    </div>
  </div>
</template>

<script>
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      items: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
  },
  created() {
    this.isLoading = true;
    client.requestAsync('get_deposits', null).then(result => {
      this.items = result;
      this.isLoading = false;
    });
  },
};
</script>
