<template>
  <div>
    <SettingsTabs />
    <div class="p-4 text-center anim-fade-in">
      <h2>SETUP AIRDROP WALLET</h2>
      <h5>Be carefull, your wallet address should be on one of those blockchains</h5>
      <h6>BINANCE SMART CHAIN MAINNET - POLYGON (MATIC) MAINNET</h6>
      <h5>
        FutureShock Team can not recover/airdrop your tokens if you enter another blockchain wallet.
      </h5>
      <h2 class="mb-2 rounded-2" @click="isOpen = !isOpen">SELECT BLOCKCHAIN</h2>
      <div :class="{ isOpen }" class="dropdown">
        <button
          class="btn btn-blue rp mr-2 mb-2"
          v-for="server in chains"
          @click="chooseServer(server)"
          :key="server.number"
        >
          {{ server.name }}
        </button>
      </div>
      <h2 v-if="chain">{{ chain.name.toString().toUpperCase() }}</h2>
      <form class="form container-xxs" @submit.prevent="handleAirdrop">
        <p v-if="chain && chain.name">Write your wallet address on {{ chain.name }}</p>
        <input
          class="input input-primary mb-2"
          v-model="address"
          maxlength="48"
          :placeholder="'0xcaa9601....'"
          v-lowercase
        />
        <button
          class="button input-block button-large button-red mb-2"
          type="submit"
          :disabled="isLoading || !isAddress || !chain || !chain.name"
        >
          <SmallLoading v-if="isLoading" />
          <span v-else>Save</span>
        </button>
      </form>
      <div class="p-4">
        <h3>Guides to create wallet</h3>
        <p>
          <a href="https://docs.matic.network/docs/develop/metamask/hello/" target="_blank">
            Polygon(Matic) Network
          </a>
        </p>
        <p>
          <a href="https://docs.binance.org/smart-chain/wallet/metamask.html" target="_blank">
            Binance Smart Chain
          </a>
        </p>
        <h3>How to claim my tokens?</h3>
        <h5>
          When the new version of the game is released your tokens will be automatically sent to your wallet on the chosen blockchain.
        </h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import web3 from 'web3';

export default {
  data() {
    return {
      isLoading: false,
      address: null,
      picture: null,
      isOpen: true,
      chain: null,
      chains: [
        { name: 'Binance Smart Chain', number: 1 },
        { name: 'Polygon (Matic)', number: 2 },
      ],
      alerts: [
        {
          id: 'alert',
          name: 'Attack',
          isActive: localStorage.getItem('attack_alert') || false,
        },
      ],
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    lastUpdate() {
      return new Date(
        Date.parse(this.$store.state.game.user.user.last_profile_update),
      ).toLocaleString();
    },
    isAddress() {
      return web3.utils.isAddress(this.address);
    },
  },
  methods: {
    ...mapActions(['setAirdrop', 'notify']),

    chooseServer(value) {
      this.chain = value;
    },
    handleAirdrop() {
      this.isLoading = true;
      if (this.address && this.chain && this.chain.number) {
        const payload = {
          address: this.address,
          chain: this.chain.number,
        };
        this.setAirdrop(payload)
          .then(() => {
            this.isLoading = false;
          })
          .catch((e) => {
            this.notify({ type: 'error', message: 'Failed to transfer account' });
            console.error('Failed to transfer account', e);
            this.isLoading = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="less">
.dropdown {
  left: 50%;
  transform: translatey(-30%) rotatex(90deg) scale(0);
  margin-top: 0.55em;
  transform-origin: 0 0;
  border-radius: 0.35em;
  display: none;
  opacity: 0;
  transition: all 200ms linear;

  &.isOpen {
    transform: translatey(0%);
    display: block;
    opacity: 1;
  }
}
</style>
