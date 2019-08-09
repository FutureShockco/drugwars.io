<template>
  <div>
    <SettingsTabs/>
    <div class="p-4">
      <p>Invite your friends! Use the link below and obtain 15% bonus on their DWD rewards.</p>
      <div class="link mb-4">
        <a :href="url" target="_blank">
          {{ url }}
        </a>
      </div>
      <h3>Your referrals</h3>
      <div>
        <div :key="key" v-for="(referral, key) in referrals">
          <p>
            {{ referral.username }}
            <span class="text-green" v-if="getReferralRewardsDWD(referral.drug_production_rate) > 0">
              +{{ getReferralRewardsDWD(referral.drug_production_rate) }} DWD
            </span>
            <span class="text-red" v-else>
              Not enough drug production
            </span>
          </p>
        </div>
      </div>
      <div v-if="!referrals.length">
        <p>You have not referred anyone yet.</p>
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
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
  },
  methods: {
    getReferralRewards(drugProductionRate) {
      const totalDailySteem =
        (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.daily_percent;
      const referralRewards =
        (((drugProductionRate / this.prizeProps.drug_production_rate) * totalDailySteem) / 100) *
        15;
      return referralRewards.toFixed(3);
    },
    getReferralRewardsDWD(drugProductionRate) {
      const totalDailySteem =
        (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.daily_percent;
      const referralRewards =
        (((drugProductionRate / this.prizeProps.drug_production_rate) * totalDailySteem) / 100) *
        15;
      return parseFloat(referralRewards / 0.005).toFixed(3);
    },
  },
};
</script>

<style scoped lang="less">
.link {
  font-size: 26px;
}
</style>
