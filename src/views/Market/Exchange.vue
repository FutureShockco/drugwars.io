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
				<div class="p-4 text-center mt-6 mb-6">
					<h5 class="columns">DWD Token Informations</h5>
					<h6 class="column col-4 m-0">
						Max Supply :
						<p class="text-yellow"> {{ this.maxSupply | amount }} DWD</p>
					</h6>
					<div class="column text-center col-4 m-0">
					<img  src="/img/icons/dwd.png" />
					</div>
					<h6 class="column col-4 m-0">
						Staking activated :
						<p class="text-yellow">False</p>
					</h6>
					<h5 class="columns">
						Token distribution
					</h5>
					<h6 class="column col-4 m-0">
						Total circulating :
						<p class="text-yellow">{{ (this.prizeProps.total_dwd + parseInt(this.supply)) /  parseInt(this.maxSupply) *100 | amount }} %</p>
					</h6>
					<h6 class="column col-4 m-0">
						Circulating (ON MARKET) :
						<p class="text-yellow">{{ this.supply | amount }} DWD</p>
					</h6>
					<h6 class="column col-4 m-0">
						Circulating (IN GAME) :
						<p class="text-yellow">{{ this.prizeProps.total_dwd | amount}} DWD</p>
					</h6>
					<h5 class="columns">Statistics</h5>
						<h6 class="column col-3 m-0">
					 Volume (24h):
						<p class="text-yellow">{{ this.volume | amount}} DWD</p>
					</h6>
					<h6 class="column col-3 m-0">
					 Price Change:
						<p class="text-red" :class="{ 'text-green' : this.priceChangePercent | amount > 0 }">{{ this.priceChangePercent }}%</p>
					</h6>
					 <h6 class="column col-3 m-0">
					 Last Price:
					<p> ${{ parseFloat(this.lastPrice * this.prizeProps.steemprice).toFixed(3) }} </p>
					</h6>
					<h6 class="column col-3 m-0">
					 Bid/Ask:
						<p> ${{ parseFloat(this.highestBid * this.prizeProps.steemprice).toFixed(3)}} / ${{ parseFloat(this.lowestAsk * this.prizeProps.steemprice).toFixed(3)}}</p>
					</h6>
					<h6 class="column col-3 m-0">
					 Today spent:
						<p :class="{ 'text-green' : this.prizeProps.daily_purchase > this.prizeProps.daily_rewards }">{{ this.prizeProps.daily_purchase | amount}} DWD</p>
					</h6>
					<h6 class="column col-3 m-0">
					 Today rewards:
						<p class="text-yellow">{{ this.prizeProps.daily_rewards | amount}} DWD</p>
					</h6>
					 <h6 class="column col-3 m-0">
					 Yesterday spent:
					<p :class="{ 'text-green' : this.prizeProps.yesterday_purchase > this.prizeProps.yesterday_rewards }">{{ this.prizeProps.yesterday_purchase | amount}} DWD</p>
					</h6>
					<h6 class="column col-3 m-0">
					 Yesterday rewards:
						<p class="text-yellow">{{ this.prizeProps.yesterday_rewards | amount}} DWD</p>
					</h6>
				</div>
			</div>
		</div>
					<div class="text-center p-6">
						More on SteemEngine
						<a
							href="https://steem-engine.com/?p=market&t=DWD"
						>https://steem-engine.com/</a>.
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
				volume:null,
				priceChangePercent:null,
				priceChangeSteem:null,
				lastDayPrice: null,
				lastPrice: null,
				highestBid:null,
				lowestAsk:null,
			};
		},
		created() {
			const self = this;
			const ssc = new SSC('https://api.steem-engine.com/rpc/');
			ssc.find('tokens', 'tokens', { symbol: 'DWD' }, 1000, 0, [], (err, result) => {
				if (result) {
					self.supply = result[0].circulatingSupply;
					self.maxSupply = result[0].maxSupply;
					ssc.find('market', 'metrics', {symbol: 'DWD' }, 1000, 0, '', false).then(async (metrics) => {
						let [stat] = metrics;
						console.log(stat)
						self.volume = stat.volume
						self.priceChangePercent = stat.priceChangePercent.split('%')[0]
						self.priceChangeSteem = stat.priceChangeSteem
						self.lastDayPrice = stat.lastDayPrice
						self.lastPrice = stat.lastPrice
						self.highestBid = stat.highestBid
						self.lowestAsk = stat.lowestAsk
					})
				}
			});
	
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
				return parseFloat(this.amount / (prizeProps.total_dwd / parseFloat(prizeProps.balance))).toFixed(
					3,
				);
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
	.text-yellow{
		color:#ffc508;
	}
</style>
