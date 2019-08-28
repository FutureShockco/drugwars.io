<template>
    <div>
        <ReferralTabs/>
        <div class="p-4 anim-fade-in text-center">
            <h1>DrugWars Referral Program</h1>
            <h3>1.Invite your friends with this link!      <a :href="url" target="_blank">
              {{ url }}
            </a></h3>
            <h3>2.Make them win a Steem account!</h3>
            <h3>3.And obtain 15% bonus on their DWD crypto rewards.</h3>
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
            <img class="refferalimg" :src="'/img/referral.png'">
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
.refferalimg {
  z-index: 0;
  position: absolute;
  width: 50%;
  bottom: 0px;
}
</style>
