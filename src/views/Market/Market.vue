<template>
  <div>
    <MarketTabs />
    <div class="p-4 text-center anim-fade-in mb-4 pb-0">
      <div class="row mb-0 pb-0">
        <div class="col-md-12 stats mb-0 pb-0">
          <h3 class="mb-3">{{token}} Market Depth</h3>
          <h5 class="column col-3 m-0">
            <div>Volume (24h)</div>
            <div
              class="text-yellow"
            >${{marketDepth.volume* prizeProps.steemprice | amount}} <div class="text-blue mini">{{marketDepth.volume | amount}}STEEM</div></div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Price Change</div>
            <div
              class="text-red"
              :class="{ 'text-green' : marketDepth.priceChangePercent > 0 }"
            >{{ marketDepth.priceChangePercent }}% <i class="iconfont icon-arrow-down" :class="{ 'icon-arrow-up' : marketDepth.priceChangePercent > 0 }"></i> </div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Last Price</div>
            <div
              class="text-yellow"
            >${{parseFloat(1 *marketDepth.lastPrice * prizeProps.steemprice).toFixed(3)  }} </div>
						<div class="text-blue mini"> {{marketDepth.lastPrice | decimal }} STEEM</div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Bid/Ask</div>
            <div
              class="text-yellow"
            >
						${{ parseFloat(marketDepth.highestBid * prizeProps.steemprice).toFixed(3)}} / ${{ parseFloat(marketDepth.lowestAsk * prizeProps.steemprice).toFixed(3)}}</div>
         <div class="text-blue mini">						{{marketDepth.highestBid | decimal}} / {{ marketDepth.lowestAsk| decimal}} STEEM
          </div>
				  </h5>
        </div>
        <div class="col-md-12 stats mb-0 pb-0">
          <h5 class="column col-3 m-0">
            <div>Max supply</div>
            <div v-if="marketDepth.nullBalance && marketDepth.maxSupply"
              class="text-yellow"
            >{{ marketDepth.maxSupply - marketDepth.nullBalance | million }} </div>
                        <div v-else
              class="text-yellow"
            >{{ marketDepth.maxSupply | amount }} </div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Circulating</div>
            <div
              class="text-yellow"
            >{{ (prizeProps.total_dwd + parseInt(marketDepth.supply)) / parseInt(marketDepth.maxSupply- marketDepth.nullBalance) *100 | amount }} %  </div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Market cap</div>
            <div
              class="text-yellow"
            >${{(Number(marketDepth.maxSupply)) * Number(marketDepth.lastPrice) * Number(prizeProps.steemprice) | amount}}</div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Burnt</div>
            <div class="text-yellow"> {{ marketDepth.nullBalance | amount }}
          </div>
				  </h5>
        </div>
      </div>
    </div>
    <div>
      <VueApexCharts width="100%" height="350px" :options="options" :series="series" class="mt-0 mb-6"></VueApexCharts>
    </div>

    <div class="px-3 columns text-left">
      <div class="column col-6 border-right p-0 m-0 border-bottom pb-3  mt-2">
        <h4 class="mb-0 p-1">Buy {{token}}</h4>
          <div class="border-right"><input class="input form-control" v-model="buyprice"> <small class="small text-blue" v-if="buyprice"> ${{buyprice*prizeProps.steemprice | decimal}}</small></div>
          <div class="border-right"> <input class="input form-control mt-1" v-model="buyquantity"> Quantity</div>
          <div class=""><input class="input form-control mt-1" :placeholder="buyprice*buyquantity | decimal" > Total <small class="small text-blue" v-if="buyprice"> ${{buyprice*buyquantity*prizeProps.steemprice | decimal}}</small></div>
					<div class="columns  p-0 m-0 mt-2">
							<div class="column col-6 p-0 m-0">
							Balance :  
              <span class="text-blue" v-if="steemOn"><br/>{{steemBalance}} STEEM</span>
                <br/>
               <span class="text-blue" :class="{ 'mini' : steemOn }">${{steemBalance*prizeProps.steemprice | decimal}} </span>
               <span class="text-blue mini" v-if="!steemOn"><br/>{{steemBalance}} STEEM</span>
						 </div>
						 <div class="column col-6 p-0 m-0" v-if="steemOn">
							<!-- <button class="button button-green" :disabled="!buyquantity || !buyprice || buyquantity <=0 || buyprice <=0 || (buyprice*buyquantity> steemBalance)" @click="buySteem()">Buy with STEEM</button> -->
						 	<button class="button button-green" disabled>Buy with STEEM</button>
             </div>

					</div>
      </div>
      <div class="column col-6 p-0 m-0 text-right border-bottom  pb-3  mt-2">
        <h4 class="mb-0 p-1">Sell {{token}}</h4>
          <div class="border-right">  <small class="small text-blue" v-if="sellprice"> ${{sellprice*prizeProps.steemprice | decimal}} </small> STEEM <input class="input form-control" v-model="sellprice"></div>
          <div class="border-right">  Quantity <input class="input form-control mt-1" v-model="sellquantity"></div>
          <div class=""><small class="small text-blue" v-if="sellprice"> ${{sellprice*sellquantity*prizeProps.steemprice | decimal}}</small> Total <input class="input form-control mt-1" :placeholder="sellprice*sellquantity | decimal"></div>
						<div class="columns  p-0 m-0 mt-2">
							<div class="column col-6 p-0 m-0 ">
						  Balance :  
              <br/>
               <span class="text-yellow">{{myBalance | decimal}} {{token}}</span>
               <br/>
               <span class="text-yellow mini">${{myBalance*this.marketDepth.lastPrice * prizeProps.steemprice | decimal}} </span>
						 </div>
						 <div class="column col-6 p-0 m-0">
							<!-- <button class="button button-red" :disabled="!sellquantity || !sellprice || sellquantity <=0 || sellprice <=0 || (sellprice*sellquantity> myBalance)"  @click="sell">Sell {{token}}</button> -->
								<button class="button button-red" disabled >Sell {{token}}</button>
             </div>
					</div>
      </div>
    </div>

    <div class="px-3 columns text-center pt-3">
      <div class="row">
        <button v-if="steemOn" class="button button-blue" @click="switchCurrency()">Switch to USD</button>
        <button v-else class="button button-blue" @click="switchCurrency()">Switch to Steem</button>
      </div>
      <div class="column col-6 border-right p-0 m-0">
        <h4 class="mb-0 p-1">Buy Orders</h4>
        <h5 class="columns p-0 m-0 border-bottom ">
          <div class="column col-3 border-right">SUM</div>
          <div class="column col-3 border-right">Total</div>
          <div class="column col-3 border-right">Quantity</div>
          <div class="column col-3">Price</div>
        </h5>
        <div v-for="item in buyBook" :key="item.timestamp" class="datarow">
          <div v-if="steemOn" class="columns p-0 m-0 border-bottom text-center" @click="setSell(item.price,item.quantity)">
            <div class="column col-3 border-right">{{item.tokensTotal | decimal}}</div>
            <div class="column col-3 border-right">{{item.tokensLocked | decimal}}</div>
            <div class="column col-3 border-right">{{item.quantity | decimal}}</div>
            <div class="column col-3">{{item.price | decimal}}</div>
          </div>
          <div v-else class="columns p-0 m-0 border-bottom text-center" @click="setSell(item.price,item.quantity)">
            <div class="column col-3 border-right">${{item.tokensTotal * prizeProps.steemprice | decimal}}</div>
            <div class="column col-3 border-right">${{item.tokensLocked * prizeProps.steemprice | decimal}}</div>
            <div class="column col-3 border-right">{{item.quantity | decimal}}</div>
            <div class="column col-3">${{item.price * prizeProps.steemprice | decimal}}</div>
          </div>
        </div>
          Buy volume ${{totalBuy* prizeProps.steemprice | amount}} - {{totalBuy | amount}} STEEM
      </div>
      <div class="column col-6 p-0 m-0 text-center">
        <h4 class="mb-0 p-1">Sell Orders</h4>
        <h5 class="columns p-0 m-0 border-bottom">
          <div class="column col-3 border-right">Price</div>
          <div class="column col-3 border-right">Quantity</div>
          <div class="column col-3 border-right">Total</div>
          <div class="column col-3">SUM</div>
        </h5>
        <div v-for="item in sellBook" :key="item.timestamp" class="datarow2">
          <div v-if="steemOn" class="columns p-0 m-0 border-bottom text-center" @click="setBuy(item.price,item.quantity)">
            <div class="column  col-3 border-right">{{item.price  | decimal}}</div>
            <div class="column col-3 border-right">{{item.quantity | decimal}}</div>
            <div class="column col-3 border-right">{{item.price *item.quantity | decimal}}</div>
            <div class="column col-3">{{item.tokensTotal * item.price | decimal}}</div>
          </div>
          <div v-else class="columns p-0 m-0 border-bottom text-center" @click="setBuy(item.price,item.quantity)">
            <div class="column  col-3 border-right">${{item.price * prizeProps.steemprice | decimal}}</div>
            <div class="column col-3 border-right">{{item.quantity | decimal}}</div>
            <div class="column col-3 border-right">${{item.price *item.quantity* prizeProps.steemprice| decimal}}</div>
            <div class="column col-3">${{item.tokensTotal * item.price * prizeProps.steemprice| decimal}}</div>
          </div>
        </div>
        Sell volume ${{totalSell* prizeProps.steemprice | amount}} - {{totalSell | amount}} STEEM
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
      steemOn: this.$store.state.auth.account,
      amount: 0,
      token: this.$route.query.token.toUpperCase() || 'DWD',
      cat: [],
      tradehistory: [],
      maxBuy: [],
      maxSell: [],
      buyBook: [],
      totalBuy: 0,
      sellBook: [],
      totalSell: 0,
      mySteemBalance: 0,
      marketDepth: {},
      myDWDBalance: 0,
      sellprice: null,
      sellquantity: null,
      buyprice: null,
      buyquantity: null,
      limitMin: 0,
      limitMax: 0,
      loading: false,
      errored: false,
      options: {
        tooltip: {
          enabled: false,
        },
        chart: {
          height: 200,
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
    const ssc = new SSC('https://api.steem-engine.net/rpc/');

    if (self.token === 'DWD') {
      self.marketDepth = this.$store.state.game.prizeProps.seProps;
      self.loadMarketDepth();
    } else
      ssc.find('tokens', 'tokens', { symbol: self.token }, 1000, 0, [], (err, result) => {
        ssc
          .find('market', 'metrics', { symbol: self.token }, 1000, 0, '', false)
          .then(async metrics => {
            const [stat] = metrics;
            if (stat) {
              self.marketDepth = stat;
              self.marketDepth.supply = result[0].circulatingSupply;
              self.marketDepth.maxSupply = Number(result[0].maxSupply);
              self.loadMarketDepth();
            }
          });
      });
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    steemengine() {
      if (this.token === 'dwd') {
        return this.$store.state.game.prizeProps.seProps;
      }
      return {};
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
    steemBalance() {
      if (this.$store.state.auth.account)
        return parseFloat(this.$store.state.auth.account.balance).toFixed(3) || 0;
      return 0;
    },
    myBalance() {
      return parseFloat(this.user[this.token.toLowerCase()]).toFixed(3);
    },
  },
  methods: {
    ...mapActions(['send', 'notify', 'requestBuyBot', 'requestSellBot']),
    handleSubmit() {
      const self = this;
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
          this.notify({
            type: 'error',
            message: `Failed to withdraw ${payload.amount} ${self.token}`,
          });
          console.error(`Failed to withdraw ${payload.amount} ${self.token}`, e);
          this.isLoading = false;
        });
    },
    setBuy(price, qt) {
      if (this.steemOn) this.buyprice = price;
      else this.buyprice = price * this.prizeProps.steemprice;
      this.buyquantity = qt;
    },
    setSell(price, qt) {
      if (this.steemOn) this.sellprice = price;
      else this.sellprice = price * this.prizeProps.steemprice;
      this.sellquantity = qt;
    },
    switchCurrency() {
      this.steemOn = !this.steemOn;
    },
    buySteem() {
      const self = this;
      self.requestBuyBot({
        memo: `token:${self.token},amount:${self.buyquantity},price:${self.buyprice}`,
        amount: `${parseFloat(self.buyprice * self.buyquantity).toFixed(3)} STEEM`,
      });
    },
    sell() {
      const self = this;
      self.requestSellBot({
        memo: `token:${self.token},amount:${self.sellquantity},price:${self.sellprice}`,
        amount: `${Math.floor(parseFloat(self.sellprice * self.sellquantity).toFixed(3))} STEEM`,
      });
    },
    loadMarketDepth() {
      const ssc = new SSC('https://api.steem-engine.net/rpc/');
      const self = this;
      ssc
        .find(
          'market',
          'tradesHistory',
          {
            symbol: `${self.token}`,
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
                symbol: `${self.token}`,
              },
              20,
              0,
              [{ index: 'priceDec', descending: true }],
              false,
            )
            .then(buyBook => {
              self.buyBook = buyBook;
              ssc
                .find(
                  'market',
                  'sellBook',
                  {
                    symbol: `${self.token}`,
                  },
                  20,
                  0,
                  [{ index: 'priceDec', descending: false }],
                  false,
                )
                .then(sellBook => {
                  let totalBuy = 0;
                  self.sellBook = sellBook;

                  self.buyBook.forEach(element => {
                    const buy = element;
                    totalBuy += Number(buy.tokensLocked);
                    buy.tokensTotal = totalBuy;
                    if (buy.price > self.maxBuy) self.maxBuy = buy.price;
                    self.series[0].data.push(buy.price);
                  });
                  self.sellBook.forEach(element => {
                    self.series[0].data.push(0);
                  });
                  self.series[0].data.push(0);
                  self.totalBuy = totalBuy;

                  let totalSell = 0;
                  self.buyBook.forEach(element => {
                    self.series[1].data.push(0);
                  });
                  self.series[1].data.push(0);
                  sellBook.forEach(element => {
                    const sell = element;
                    totalSell += Number(sell.quantity);
                    sell.tokensTotal = totalSell;
                    if (sell.price < self.limitMax) self.limitMax = sell.price;
                    self.series[1].data.push(sell.price);
                  });
                  self.sellBook = sellBook;
                  self.totalSell = totalSell;
                  self.cat = [self.maxBuy, self.limitMax];
                  ssc
                    .find(
                      'market',
                      'sellBook',
                      {
                        symbol: `${self.token}`,
                        account: this.user.username,
                      },
                      100,
                      0,
                      [{ index: 'timestamp', descending: true }],
                      false,
                    )
                    .then(async personalSellBook => {
                      ssc
                        .find(
                          'market',
                          'buyBook',
                          {
                            symbol: `${self.token}`,
                            account: this.user.username,
                          },
                          100,
                          0,
                          [{ index: 'timestamp', descending: true }],
                          false,
                        )
                        .then(async personalBuyBook => {
                          ssc
                            .findOne('tokens', 'balances', {
                              account: this.user.username,
                              symbol: `${self.token}`,
                            })
                            .then(async mybalance => {
                              if (mybalance)
                                this.myDWDBalance =
                                  Number(this.myBalance) + Number(mybalance.balance);
                            });
                        });
                    });
                });
            });
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

.datarow:nth-child(odd):hover {
  background: rgb(17, 58, 12);
}

.datarow:nth-child(even) {
  background: rgb(0, 29, 13);
}

.datarow:nth-child(even):hover {
  background: rgb(0, 51, 23);
}

.datarow2:nth-child(odd) {
  background: rgb(53, 8, 8);
}

.datarow2:nth-child(odd):hover {
  background: rgb(32, 4, 4);
}

.datarow2:nth-child(even) {
  background: rgb(65, 2, 2);
}

.datarow2:nth-child(even):hover {
  background: rgb(36, 0, 0);
}

.mini {
  font-size: 0.8em;
}
</style>
