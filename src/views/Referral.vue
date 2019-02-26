<template>
  <div>
    <Header title="Referral" />
    <div class="p-4">
      <h1>Invite your friends!</h1>
      <p>Use the link below and obtain 5% Bonus on their STEEM rewards</p>
      <div class="link mb-4">
        {{ url }}/i/{{ username }}
      </div>
      <div v-if="referrals.length > 0">
        <h3>Your referrals</h3>
        <div :key="key" v-for="(referral, key) in referrals">
          <p>{{ referral.username }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.auth.username,
      url: window.location.origin,
    };
  },
  computed: {
    referrals() {
      return this.$store.state.game.user.referals;
    },
  },
};
</script>

<style scoped lang="less">
.link {
  font-size: 26px;
}
</style>
