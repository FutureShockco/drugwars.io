<template>
  <div>
    <SettingsTabs />
    <div class="p-4 text-center anim-fade-in">
      <h2>AIRDROP FOR TELEGRAM</h2>
      <h5>Copy/paste the code below in your telegram game in the task section.</h5>
      <h5>
        FutureShock Team can not recover/airdrop your tokens if you give your code to another user.
      </h5>

      <form class="form container-xxs" v-if="user">
        <input readonly class="input input-primary mb-2" v-model="user" maxlength="48" :placeholder="'0xcaa9601....'"
          v-lowercase />

        <h5>
          This code can be used once and will give you {{ amount }} DW Token per 2 weeks during 52 weeks.
        </h5>

      </form>

      <h5 v-else>
        Unfortunately you are not eligible for the airdrop.
      </h5>

    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

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
      if (this.$store.state.game.user.dropcode && this.$store.state.game.user.dropcode[0])
        return this.$store.state.game.user.dropcode[0].code;
      else return false
    },
    amount() {
      if (this.$store.state.game.user.dropcode && this.$store.state.game.user.dropcode[0])
        return this.$store.state.game.user.dropcode[0].amount;
      else return false
    },
    lastUpdate() {
      return new Date(
        Date.parse(this.$store.state.game.user.user.last_profile_update),
      ).toLocaleString();
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
