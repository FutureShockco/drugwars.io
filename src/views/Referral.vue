<template>
  <div>
    <Header title="Referral" />
    <div class="p-4">
      <p>Invite your friends! Use the link below and obtain 5% bonus on their STEEM rewards.</p>
      <div class="link mb-4">
        <a :href="url" target="_blank">
          {{ url }}
        </a>
      </div>
      <h3>Your referrals</h3>
      <div>
        <div :key="key" v-for="(referral, key) in referrals">
          <p>{{ referral.username }}</p>
        </div>
      </div>
      <div v-if="!referrals.length">
        <p>You don't have referred anyone.</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.auth.username,
      url: `${window.location.origin}/i/${this.$store.state.auth.username}`,
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
