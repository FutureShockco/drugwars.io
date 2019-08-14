<template>
	<div>
		<MarketTabs />
		<div class="p-4 text-center">
			<h3 class="mb-4">
				You have
				<b>{{ user.dwd }} DWD</b> token(s) in-game
			</h3>
			<div v-if="steemAccount" class="m2-4">
				<h4>Withdraw DWD token(s) to SteemEngine</h4>
			</div>
			<div v-else> 
				<h5>At this moment SteemEngine is only available for Steem users.</h5>
			</div>
		</div>
		<div class="text-center">
			<form v-if="user.dwd > 0 && steemAccount" class="form mx-auto" @submit.prevent="handleSubmit">
				<input
					class="input input-primary mb-2"
					type="number"
					v-model="amount"
					:disabled="isLoading"
					maxlength="10"
					placeholder="Amount to change"
				/>
				<button
					:disabled="isLoading || user.dwd < amount"
					type="submit"
					class="button input-block button-large button-green"
				>
					<span v-if="!isLoading">Withdraw</span>
					<SmallLoading v-else />
				</button>
			</form>
			<div v-if="!picked">
				<p class="mb-4">You must choose your currency.</p>
			</div>
			<div v-else-if="picked && user.dwd === 0">
				<p class="mb-4">You don't have any token to claim.</p>
			</div>
			<div>
				<div class="p-4 text-center mt-6 mb-6 border-top">
					<h5 class="columns">DWD Token Informations</h5>
					<h6 class="column col-3 m-0">
						Max Supply
						<p class="text-yellow"> {{ this.maxSupply - this.nullBalance | amount }} DWD</p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
						Total to burn
						<p class="text-yellow"> {{ this.prizeProps.total_burn - this.nullBalance | amount }} DWD</p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
						Total Burned
						<p class="text-yellow"> {{ this.nullBalance | amount }} DWD</p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
						Staking activated
						<p class="text-yellow">False</p>
					</h6>
					<h6 class="column col-6 m-0">
					 Estimated end of issuance (Unissued tokens / yesterday reward)
						<p class="text-yellow"> {{ endDate }} </p>
					</h6>
					<h6 class="column col-6 m-0">
					 Estimated end of combustion (Unissued tokens / yesterday burn)
						<p class="text-yellow"> {{ endSupply }} </p>
					</h6>
					<h5 class="columns">
						Token distribution
					</h5>
					<h6 class="column col-4 m-0 ">
						Total circulating
						<p class="text-yellow">{{ (this.prizeProps.total_dwd + parseInt(this.supply)) /  parseInt(this.maxSupply- this.nullBalance) *100 | amount }} %</p>
					</h6>
					<h6 class="column col-4 m-0 border-left">
						Circulating (ON MARKET)
						<p class="text-yellow">{{ this.supply | amount }} DWD</p>
					</h6>
					<h6 class="column col-4 m-0 border-left">
						Circulating (IN GAME)
						<p class="text-yellow">{{ this.prizeProps.total_dwd | amount}} DWD</p>
					</h6>
					<h5 class="columns">Statistics</h5>
						<h6 class="column col-3 m-0">
					 Volume (24h)
						<p class="text-yellow">{{ this.volume | amount}} DWD</p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
					 Price Change
						<p class="text-red" :class="{ 'text-green' : this.priceChangePercent | amount > 0 }">{{ this.priceChangePercent }}%</p>
					</h6>
					 <h6 class="column col-3 m-0 border-left">
					 Last Price
					<p> ${{ parseFloat(this.lastPrice * this.prizeProps.steemprice).toFixed(3) }} </p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
					 Bid/Ask
						<p> ${{ parseFloat(this.highestBid * this.prizeProps.steemprice).toFixed(3)}} / ${{ parseFloat(this.lowestAsk * this.prizeProps.steemprice).toFixed(3)}}</p>
					</h6>
					<h6 class="column col-3 m-0">
					 Today spent
						<p :class="{ 'text-green' : this.prizeProps.daily_purchase > this.prizeProps.daily_rewards }">{{ this.prizeProps.daily_purchase | amount}} DWD</p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
					 Today rewards
						<p class="text-yellow">{{ this.prizeProps.daily_rewards | amount}} DWD</p>
					</h6>
					 <h6 class="column col-3 m-0 border-left">
					 Yesterday spents
					<p :class="{ 'text-green' : this.prizeProps.yesterday_purchase > this.prizeProps.yesterday_rewards }">{{ this.prizeProps.yesterday_purchase | amount}} DWD</p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
					 Yesterday rewards
						<p class="text-yellow">{{ this.prizeProps.yesterday_rewards | amount}} DWD</p>
					</h6>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import SSC from 'sscjs';

export default {
  data() {
    return {
      isLoading: false,
      nickname: null,
      picked: 'steem',
      amount: 0,
      supply: null,
      maxSupply: null,
      volume: null,
      priceChangePercent: null,
      priceChangeSteem: null,
      lastDayPrice: null,
      lastPrice: null,
      highestBid: null,
			lowestAsk: null,
			nullBalance:null,
    };
  },
  created() {
    const self = this;
    const ssc = new SSC('https://api.steem-engine.com/rpc/');
    ssc.find('tokens', 'tokens', { symbol: 'DWD' }, 1000, 0, [], (err, result) => {
      if (result) {
        self.supply = result[0].circulatingSupply;
        self.maxSupply = result[0].maxSupply;
        ssc.find('market', 'metrics', { symbol: 'DWD' }, 1000, 0, '', false).then(async metrics => {
          const [stat] = metrics;
          self.volume = stat.volume;
          self.priceChangePercent = stat.priceChangePercent.split('%')[0];
          self.priceChangeSteem = stat.priceChangeSteem;
          self.lastDayPrice = stat.lastDayPrice;
          self.lastPrice = stat.lastPrice;
          self.highestBid = stat.highestBid;
					self.lowestAsk = stat.lowestAsk;
					   ssc.findOne(
      'tokens',
      'balances', {
        account: `null`,
        symbol: `DWD`
      }, (err, result) => {
				 self.nullBalance = result.balance
			})
				});
			}
		})
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    prizeProps() {
      const { prizeProps } = this.$store.state.game;
      return prizeProps;
    },
    lastUpdate() {
      return new Date(
        Date.parse(this.$store.state.game.user.user.last_profile_update),
      ).toLocaleString();
    },
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
      return 0;
    },
    dwdToSteem() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(prizeProps.total_dwd / parseFloat(prizeProps.balance)).toFixed(0);
    },
    totalDWD() {
      const { prizeProps } = this.$store.state.game;
      return parseFloat(
        this.amount / (prizeProps.total_dwd / parseFloat(prizeProps.balance)),
      ).toFixed(3);
		},    
		endDate() {
			const { prizeProps } = this.$store.state.game;
			const end = parseFloat((10000000 - (parseInt(this.supply) + parseInt(this.prizeProps.total_dwd))) / this.prizeProps.yesterday_rewards).toFixed(0)
			var date = new Date();
			date.setDate(date.getDay() + end);
			return date.toLocaleString();
			},
			endSupply() {
				const { prizeProps } = this.$store.state.game;
				const end = parseFloat((10000000 - (parseInt(this.supply) + parseInt(this.prizeProps.total_dwd))) / (this.prizeProps.yesterday_purchase-this.prizeProps.yesterday_rewards))
						var date = new Date();
			date.setDate(date.getDay() + end);
			return date.toLocaleString();
    },
  },
  methods: {
    ...mapActions(['send', 'notify']),
    handleSubmit() {
      const payload = {
        currency: this.picked,
        amount: parseInt(this.amount),
        type: 'widthraw',
      };
      this.isLoading = true;
      this.send(payload)
        .then(result => {
          if (result) {
            this.isLoading = false;
          }
        })
        .catch(e => {
          this.notify({ type: 'error', message: `Failed to withdraw ${payload.amount} DWD` });
          console.error(`Failed to withdraw ${payload.amount} DWD`, e);
          this.isLoading = false;
        });
    },
  },
};
</script>

<style scoped lang="less">
.icons {
  margin-bottom: -3px;
}
.text-yellow {
  color: #ffc508;
}
</style>
