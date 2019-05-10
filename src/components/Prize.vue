<template>
	<div class="border-bottom">
		<div>
			<Countdown
				:starttime="now"
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
			<div class="detail">Today's prize</div>
			<div class="mb-4">
				{{ totalFuture | amount }}
				<img class="future_logo" width="44" src="/img/icons/future.png">
			</div>
			<div class="prizes">
				<div class="sub">
					<div>BATTLE {{prizeProps.fight_percent}}%</div>
					{{totalFight+prizeProps.free_future-prizeProps.daily_rewards | amount}}
				</div>
				<div class="sub">
					<div>DAILY {{prizeProps.daily_percent}}%</div>
					{{totalDaily | amount}}
				</div>
				<div class="sub">
					<div>HEIST {{prizeProps.heist_percent}}%</div>
					{{totalHeist | amount}}
				</div>
			</div>
			<div class="population mt-4">REDUCE THE POPULATION AND GET REWARDED</div>
			<div class="popdetail mb-0 mt-3">POPULATION : {{this.prizeProps.fight_supply | amount}}</div>
			<div class="popsubdetail mb-3 mt-0">Total units x supply</div>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      population: null,
      future_price: 0.005,
    };
  },
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
        (prizeProps.fight_percent + prizeProps.daily_percent + prizeProps.heist_percent)
      );
    },
    lastDayFuture() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(prizeProps.daily_purchase);
    },
    totalFuture() {
      const { prizeProps } = this.$store.state.game;
      return (
        (((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) *
          (prizeProps.fight_percent + prizeProps.daily_percent + prizeProps.heist_percent)) /
          this.future_price +
        prizeProps.free_future -
        prizeProps.daily_rewards
      );
    },
    totalSteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(
        (parseFloat(prizeProps.balance) / 100) *
          (prizeProps.daily_percent + prizeProps.heist_percent),
      ).toFixed(3);
    },
    totalDaily() {
      const { prizeProps } = this.$store.state.game;
      return (
        (((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) *
          prizeProps.daily_percent) /
        this.future_price
      );
    },
    totalFight() {
      const { prizeProps } = this.$store.state.game;
      return (
        (((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) *
          prizeProps.fight_percent) /
        this.future_price
      );
    },
    totalHeist() {
      const { prizeProps } = this.$store.state.game;
      return (
        (((parseFloat(prizeProps.balance) * prizeProps.steemprice) / 100) *
          prizeProps.heist_percent) /
        this.future_price
      );
    },
    user() {
      return this.$store.state.game.user.user;
    },
  },
};
</script>

<style lang="less" scoped>
@import '../vars';

.prize {
  font-size: 52px;
  font-family: @special-font;
  display: block;
  margin: 0 auto;
  margin-right: 0px;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: #ffc508;
  -webkit-animation: aitf 80s linear infinite;
  -webkit-transform: translateZ(0);
  -webkit-backface-visibility: hidden;
  text-align: center;
  line-height: 40px;

  .future {
    font-family: 'Bebas Neue', Helvetica, Arial, sans-serif;
    font-size: 16px;
    text-transform: uppercase;
    top: -22px;
    width: 200px;
    left: 35%;
    text-align: center;
    margin: 0;
    line-height: 0px;
    position: relative;
    text-rendering: optimizeLegibility;
    font-weight: 900;
    -webkit-text-fill-color: #ffc508;
    color: #ffc508 !important;
    text-shadow: 1px 4px 6px #000, 0 0 0 #0b0b0b, 1px 4px 6px #101010;
    white-space: nowrap;
    margin-bottom: 25px;
  }

  .future_logo {
    margin-bottom: -3px;
  }
  .detail {
    font-size: 28px;
    margin: 0px;
  }

  .popdetail {
    font-size: 20px;
    margin-top: 5px;
    line-height: 20px;
    margin-bottom: 5px;
  }
  .popsubdetail {
    font-size: 14px;
    margin-top: 0px;
    line-height: 20px;
    margin-bottom: 0px;
  }
  .population {
    font-size: 20px;
    line-height: 18px;
    -webkit-text-fill-color: #c9c9c9;
    color: #cfcfcf !important;
  }
  .sub {
    font-size: 18px;
  }
  .prizes {
    background: #ffc508;
    -webkit-text-fill-color: #000000;
    margin-top: 0px;
    display: -webkit-box;
    padding: 5px;
    .sub {
      margin-left: 12px;
      margin-top: 0px;
      width: 26%;
      font-size: 18px;
      line-height: 20px;
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
