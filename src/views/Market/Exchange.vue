<template>
	<div>
		<MarketTabs />
		<div class="p-4 text-center">
			<img src="/img/icons/dwd.png" />
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
			<form v-if="user.dwd > 0" class="form mx-auto" @submit.prevent="handleSubmit">
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
				<div class="p-4 text-center">
					<h5>DWD Informations</h5>
					<h6>
						Max Supply :
						<b> {{ this.maxSupply | amount }} DWD</b>
					</h6>
					<h6>
						Staking activated :
						<b>False</b>
					</h6>
					<h5>
						Token distribution
					</h5>
					<h6>
						Total issued :
						<b>{{ (this.prizeProps.total_dwd + parseInt(this.supply)) /  parseInt(this.maxSupply) *100 | amount }} %</b>
					</h6>
					<h6>
						Circulating Supply (ON MARKET):
						<b>{{ this.supply | amount }} DWD</b>
					</h6>
					<h6>
						Unissued Supply (IN GAME):
						<b>{{ this.prizeProps.total_dwd | amount}} DWD</b>
					</h6>
					<h5>Statistics</h5>
					<h6>
					 Today total spent:
						<b>{{ this.prizeProps.daily_purchase | amount}} DWD</b>
					</h6>
          <h6 v-if="this.prizeProps.yesterday_purchase">
					 Yesterday total spent:
					<b>{{ this.prizeProps.yesterday_purchase | amount}} DWD</b>
					</h6>
					<h6>
					 Today rewards:
						<b>{{ this.prizeProps.daily_rewards | amount}} DWD</b>
					</h6>
					<h6>
					 Yesterday rewards:
						<b>{{ this.prizeProps.yesterday_rewards | amount}} DWD</b>
					</h6>
					<div class="mt-4">
						More on SteemEngine
						<a
							href="https://steem-engine.com/?p=market&t=DWD"
						>https://steem-engine.com/</a>.
					</div>
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
			};
		},
		created() {
			const self = this;
			const ssc = new SSC('https://api.steem-engine.com/rpc/');
			ssc.find('tokens', 'tokens', { symbol: 'DWD' }, 1000, 0, [], (err, result) => {
				if (result) {
					self.supply = result[0].circulatingSupply;
					self.maxSupply = result[0].maxSupply;
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
</style>
