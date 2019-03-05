<template>
  <div>
    <div>
    <Countdown   :starttime="now" 
         :endtime="timeToWait" 
         trans='{  
         "day":"Day",
         "hours":"Hours",
         "minutes":"Minutes",
         "seconds":"Seconds",
         "expired":"Payments are gone!.",
         "running":"Till the daily payments.",
         "status": {
            "expired":"Expired",
            "running":"Running",
            "upcoming":"Future"
           }}'/>
     </div>
    <div class="prize">
      <div class="detail">Today prize </div>
       ${{ parseInt(total) }}
       <div class="prizes">
       <div class="sub"><div>DAILY</div>  ${{totalDaily | amount}} <div class="subdetail">{{totalDailySteem}} STEEM</div></div>
       <div class="sub"><div>HEIST</div>  ${{totalHeist | amount}} <div class="subdetail">{{totalHeistSteem}} STEEM</div></div>
       </div>
    </div>
    <!-- <div class="text-gray hide-sm hide-md hide-lg pl-4 pt-1 pb-1">
    Estimated reward: <span class="text-green">+{{ myRewards }} STEEM</span>
  </div> -->
  </div>
</template>

<script>
export default {
  computed: {
    now() {
      return new Date();
    },
    timeToWait() {
      const midnight = new Date().setUTCHours(24, 0, 0, 0);
      return midnight;
    },
    prizeProps() {
      return this.$store.state.game.prizeProps;
    },
    total() {
      const { prizeProps } = this.$store.state.game;
      return (
        ((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) *
        (prizeProps.daily_percent + prizeProps.heist_percent)
      );
    },
    totalDaily() {
      const { prizeProps } = this.$store.state.game;
      return (
        ((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) * prizeProps.daily_percent
      );
    },
    totalDailySteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat((parseFloat(prizeProps.balance) / 100) * prizeProps.daily_percent).toFixed(
        2,
      );
    },
    totalHeist() {
      const { prizeProps } = this.$store.state.game;
      return (
        ((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) * prizeProps.heist_percent
      );
    },
    totalHeistSteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat((parseFloat(prizeProps.balance) / 100) * prizeProps.heist_percent).toFixed(
        2,
      );
    },
    user() {
      return this.$store.state.game.user.user;
    },
    myRewards() {
      const totalDailySteem =
        (parseFloat(this.prizeProps.balance) / 100) * this.prizeProps.daily_percent;
      const myRewards =
        (this.user.drug_production_rate / this.prizeProps.drug_production_rate) * totalDailySteem;
      return myRewards.toFixed(3);
    },
  },
};
</script>

<style lang="less" scoped>
@import '../vars';

.prize {
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  font-size: 60px;
  font-family: @heading-font;
  display: block;
  margin: 0 auto;
  text-shadow: 0 0 80px hsla(34, 100%, 23%, 0.5);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: #fbbd08d9;
  -webkit-animation: aitf 80s linear infinite;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  text-align: center;
  line-height: 40px;
  .detail {
    font-size: 26px;
  }

  .prizes {
    display: -webkit-box;
    .sub {
      margin-top: 10px;
      width: 50%;
      font-size: 24px;
      line-height: 24px;
    }
    .subdetail {
      font-size: 14px;
    }
  }
}
@-webkit-keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

@keyframes aitf {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}
</style>
