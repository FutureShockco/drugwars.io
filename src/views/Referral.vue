<template>
  <div>
    <Header title="Referral" />
    <div class="p-4">
      <h1>Invite your friends!</h1>
      <p>Use the link below and obtain 5% Bonus on their STEEM rewards</p>
      <input class="input input-block" :value="uri"/>
      <h2>Your referrals</h2>
      <div v-for="referral in referrals">
        {{ referral.username }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    referrals() {
      return this.$store.state.game.user.referals;
    },
  },
};
</script>
