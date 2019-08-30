<template>
  <div>
    <MarketTabs />
    <div class="p-4 text-center anim-fade-in">
      <div class="row">
        <div class="col-md-12 stats">
          <h3 class="mb-3">DWD Market Depth</h3>
          <h5 class="column col-3 m-0">
            <div>Volume (24h)</div>
            <div
              class="text-yellow"
            >${{this.steemengine.volume *this.steemengine.lastPrice | amount}} <div class="text-blue">{{this.steemengine.volume *this.steemengine.lastPrice / prizeProps.steemprice | amount}}STEEM</div></div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Price Change</div>
            <div
              class="text-red"
              :class="{ 'text-green' : this.steemengine.priceChangePercent > 0 }"
            >{{ this.steemengine.priceChangePercent }}% <i class="iconfont icon-arrow-down" :class="{ 'icon-arrow-up' : this.steemengine.priceChangePercent > 0 }"></i> </div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Last Price</div>
            <div
              class="text-yellow"
            >${{parseFloat(1 *this.steemengine.lastPrice * prizeProps.steemprice).toFixed(3)  }} </div>
						<div class="text-blue"> {{parseFloat(1 *this.steemengine.lastPrice ).toFixed(5)}} STEEM</div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Bid/Ask</div>
            <div
              class="text-yellow"
            >
						${{ parseFloat(this.steemengine.highestBid * this.prizeProps.steemprice).toFixed(3)}} / ${{ parseFloat(this.steemengine.lowestAsk * this.prizeProps.steemprice).toFixed(3)}}</div>
         <div class="text-blue">						{{this.steemengine.highestBid | decimal}} / {{ this.steemengine.lowestAsk| decimal}}
</div>
				  </h5>
        </div>
      </div>
    </div>
    <div>
      <VueApexCharts width="100%" :options="options" :series="series" class="mb-6"></VueApexCharts>
    </div>

    <div class="px-3 columns text-left">
      <div class="column col-6 border-right p-0 m-0">
        <h4 class="mb-0 p-1">Buy DWD</h4>
          <div class="border-right"><input class="input form-control" v-model="quantity"> Price </div>
          <div class="border-right"> <input class="input form-control mt-1" v-model="quantity"> Quantity</div>
          <div class=""><input class="input form-control mt-1" v-model="quantity"> Total : </div>
					<div class="columns  p-0 m-0">
							<div class="column col-6 p-0 m-0">
								Balance :
						 </div>
						 <div class="column col-6 p-0 m-0">
							<button disabled class="button button-green">Buy DWD</button>
						 </div>
					</div>
      </div>
      <div class="column col-6 p-0 m-0 text-right">
        <h4 class="mb-0 p-1">Sell DWD</h4>
          <div class="border-right"> Price <input class="input form-control" v-model="quantity"></div>
          <div class="border-right">  Quantity <input class="input form-control mt-1" v-model="quantity"></div>
          <div class="">Total <input class="input form-control mt-1" v-model="quantity"></div>
						<div class="columns  p-0 m-0">
							<div class="column col-6 p-0 m-0">
								Balance :
						 </div>
						 <div class="column col-6 p-0 m-0">
							<button disabled class="button button-red">Sell DWD</button>
						 </div>
					</div>
      </div>
    </div>

    <div class="px-3 columns text-center">
      <div class="column col-6 border-right p-0 m-0">
        <h4 class="mb-0 p-1">Buy Orders</h4>
        <h5 class="columns p-0 m-0 border-bottom ">
          <div class="column col-3 border-right">Total</div>
          <div class="column col-3 border-right">STEEM</div>
          <div class="column col-3 border-right">Quantity</div>
          <div class="column col-3">USD Price</div>
        </h5>
        <div v-for="item in buyBook" :key="item.timestamp" class="datarow">
          <div class="columns p-0 m-0 border-bottom text-center">
            <div
              class="column col-3 border-right"
            >${{item.tokensLocked * prizeProps.steemprice | decimal}}</div>
            <div class="column col-3 border-right">{{item.tokensLocked | decimal}}</div>
            <div class="column col-3 border-right">{{item.quantity | decimal}}</div>
            <div class="column col-3">${{item.price | decimal}}</div>
          </div>
        </div>
      </div>
      <div class="column col-6 p-0 m-0 text-center">
        <h4 class="mb-0 p-1">Sell Orders</h4>
        <h5 class="columns p-0 m-0 border-bottom">
          <div class="column col-3 border-right">USD Price</div>
          <div class="column col-3 border-right">Quantity</div>
          <div class="column col-3 border-right">STEEM</div>
          <div class="column col-3">Total</div>
        </h5>
        <div v-for="item in sellBook" :key="item.timestamp" class="datarow2">
          <div class="columns p-0 m-0 border-bottom text-center">
            <div
              class="column  col-3 border-right"
            >${{item.quantity*item.price * prizeProps.steemprice | decimal}}</div>
            <div class="column col-3 border-right">{{item.quantity | decimal}}</div>
            <div class="column col-3 border-right">{{item.quantity*item.price | decimal}}</div>
            <div class="column col-3">${{item.price | decimal}}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center">
			        <h4 class="mb-0 p-3 ">Trade History</h4>

      <h5 class="columns p-0 m-0 border-bottom text-center">
        <div class="column col-4">Date</div>
        <div class="column col-2">Type</div>
        <div class="column col-2">Price</div>
        <div class="column col-2">Quantity</div>
        <div class="column col-2">Total</div>
      </h5>
      <div v-for="item in tradehistory" :key="item.timestamp+item.$loki">
        <div class="columns p-0 m-0 border-bottom text-center">
          <div class="column col-4 border-right">
            {{item.timestamp | fromnow}}
            <div class="detail">{{item.timestamp | dateparse}}</div>
          </div>
          <div
            class="column col-2 pt-2 text-uppercase text-red border-right"
            :class="{'text-green':item.type==='buy'}"
          >{{item.type}}</div>

          <div class="column col-2 pt-2 border-right">{{item.price}}</div>
          <div class="column col-2 pt-2 border-right">{{item.quantity}}</div>
          <div class="column col-2 pt-2">${{item.quantity * item.price | decimal}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
	import { mapActions } from 'vuex';
	import VueApexCharts from 'vue-apexcharts';
	import SSC from 'sscjs';

	export default {
		components: {
			VueApexCharts,
		},
		data() {
			return {
				isLoading: false,
				nickname: null,
				picked: 'steem',
				amount: 0,
				cat: [],
				tradehistory: [],
				maxBuy: [],
				maxSell: [],
				buyBook: [],
				sellBook: [],
				limitMin: 0,
				limitMax: 0,
				loading: false,
				errored: false,
				options: {
					tooltip: {
								enabled: false
					},
					chart: {
						height: 350,
						type: 'line',
						stacked: false,
						toolbar: false,
					},
					dataLabels: {
						enabled: false,
					},
					colors: ['#28a745', '#FF1654'],
					stroke: {
						width: [4, 4],
						curve: 'smooth',
					},
					plotOptions: {
						bar: {
							columnWidth: '25%',
						},
					},
					xaxis: {
						categories: this.cat,
						labels: {
							show: false,
						},
					},
					yaxis: [
						{
							axisTicks: {
								show: false,
							},
							axisBorder: {
								show: false,
								color: '#28a745',
							},
							labels: {
								style: {
									color: '#fff',
								},
							},
						},
						{
							opposite: true,
							axisTicks: {
								show: false,
							},
							axisBorder: {
								show: true,
								color: '#FF1654',
							},
							labels: {
								show: false,
								style: {
									color: '#FF1654',
								},
							},
						},
					],
					legend: {
						horizontalAlign: 'center',
						offsetX: 0,
						offsetY: -5,
					},
				},
				series: [
					{
						name: 'Bid',
						data: [],
						type: 'area',
					},
					{
						name: 'Ask',
						data: [],
						type: 'area',
					},
				],
				yaxis: [
					{
						title: {
							text: 'Bid',
						},
					},
					{
						opposite: true,
						title: {
							text: 'Ask',
						},
					},
				],
			};
		},
		created() {
			const self = this;
			const ssc = new SSC('https://api.steem-engine.com/rpc/');
			ssc
				.find(
					'market',
					'tradesHistory',
					{
						symbol: `DWD`,
					},
					20,
					0,
					[{ index: 'timestamp', descending: false }],
					false,
				)
				.then(async tradehistory => {
					self.tradehistory = tradehistory;
					ssc
						.find(
							'market',
							'buyBook',
							{
								symbol: `DWD`,
							},
							30,
							0,
							[{ index: 'timestamp', descending: false }],
							false,
						)
						.then(async buyBook => {
							self.buyBook = buyBook;
							self.buyBook.forEach(element => {
								if (element.price > self.maxBuy) self.maxBuy = element.price;
								self.series[0].data.push(element.price);
							});
							self.buyBook.forEach(element => {
								self.series[0].data.push(0);
							});
							ssc
								.find(
									'market',
									'sellBook',
									{
										symbol: `DWD`,
									},
									30,
									0,
									[{ index: 'price', descending: false }],
									false,
								)
								.then(async sellBook => {
									self.sellBook = sellBook;
									sellBook.forEach(element => {
										self.series[1].data.push(0);
									});
									sellBook.forEach(element => {
										if (element.price < self.limitMax) self.limitMax = element.price;
										self.series[1].data.push(element.price);
									});
									self.cat = [self.maxBuy, self.limitMax];
									ssc
										.find(
											'market',
											'sellBook',
											{
												symbol: `DWD`,
												account: 'ongame',
											},
											100,
											0,
											[{ index: 'timestamp', descending: true }],
											false,
										)
										.then(async personalSellBook => {
											console.log(personalSellBook);

											ssc
												.find(
													'market',
													'buyBook',
													{
														symbol: `DWD`,
														account: 'ongame',
													},
													100,
													0,
													[{ index: 'timestamp', descending: true }],
													false,
												)
												.then(async personalBuyBook => {
													console.log(personalBuyBook);
												});
										});
								});
						});
				});
		},
		computed: {
			user() {
				return this.$store.state.game.user.user;
			},
			steemengine() {
				return this.$store.state.game.prizeProps.seProps;
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
			endDate() {
				const { prizeProps } = this.$store.state.game;
				const end = parseFloat(
					(this.steemengine.maxSupply -
						this.steemengine.nullBalance -
						(parseInt(this.steemengine.supply) + parseInt(this.prizeProps.total_dwd))) /
						this.prizeProps.yesterday_rewards,
				).toFixed(0);
				const date = new Date();
				date.setDate(date.getDay() + end);
				return date.toLocaleString();
			},
			endSupply() {
				const { prizeProps } = this.$store.state.game;
				const end = parseFloat(
					(this.steemengine.maxSupply -
						this.steemengine.nullBalance -
						(parseInt(this.steemengine.supply) + parseInt(this.prizeProps.total_dwd))) /
						(this.prizeProps.yesterday_purchase - this.prizeProps.yesterday_rewards),
				);
				const date = new Date();
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

	.detail {
		font-size: 10px;
		color: burlywood;
		margin-bottom: 5px;
	}

	.datarow:nth-child(odd) {
  background: rgb(6, 20, 4);
}

.datarow:nth-child(even) {
  background: rgb(0, 63, 28);
}

	.datarow2:nth-child(odd) {
  background: rgb(53, 8, 8);
}

.datarow2:nth-child(even) {
  background: rgb(65, 2, 2);
}
</style>
  