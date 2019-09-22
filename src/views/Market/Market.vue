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
            >${{this.steemengine.volume *this.steemengine.lastPrice/ prizeProps.steemprice | amount}} <div class="text-blue">{{this.steemengine.volume *this.steemengine.lastPrice/ prizeProps.steemprice / prizeProps.steemprice | amount}}STEEM</div></div>
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
						<div class="text-blue"> {{this.steemengine.lastPrice | decimal }} STEEM</div>
          </h5>
          <h5 class="column col-3 m-0 border-left">
            <div>Bid/Ask</div>
            <div
              class="text-yellow"
            >
						${{ parseFloat(this.steemengine.highestBid * this.prizeProps.steemprice).toFixed(3)}} / ${{ parseFloat(this.steemengine.lowestAsk * this.prizeProps.steemprice).toFixed(3)}}</div>
         <div class="text-blue">						{{this.steemengine.highestBid | decimal}} / {{ this.steemengine.lowestAsk| decimal}} STEEM
          </div>
				  </h5>
        </div>
      </div>
    </div>
    <div>
      <VueApexCharts width="100%" :options="options" :series="series" class="mb-6"></VueApexCharts>
    </div>

    <div class="px-3 columns text-left ">
      <div class="column col-6 border-right p-0 m-0 border-bottom pb-3">
        <h4 class="mb-0 p-1">Buy DWD</h4>
          <div class="border-right"><input class="input form-control" v-model="buyprice"> STEEM <small class="small text-blue" v-if="buyprice"> ${{buyprice*prizeProps.steemprice | decimal}}</small></div>
          <div class="border-right"> <input class="input form-control mt-1" v-model="buyquantity"> Quantity</div>
          <div class=""><input class="input form-control mt-1" :placeholder="buyprice*buyquantity | decimal" > Total <small class="small text-blue" v-if="buyprice"> ${{buyprice*buyquantity*prizeProps.steemprice | decimal}}</small></div>
					<div class="columns  p-0 m-0">
							<div class="column col-6 p-0 m-0">
							Balance :  
              <br/><span class="text-blue">{{steemBalance}} STEEM</span>
                <br/>
               <span class="text-blue">${{steemBalance*prizeProps.steemprice | decimal}} </span>
						 </div>
						 <div class="column col-6 p-0 m-0">
							<button disabled class="button button-green">Buy DWD</button>
						 </div>
					</div>
      </div>
      <div class="column col-6 p-0 m-0 text-right border-bottom  pb-3">
        <h4 class="mb-0 p-1">Sell DWD</h4>
          <div class="border-right">  <small class="small text-blue" v-if="sellprice"> ${{sellprice*prizeProps.steemprice | decimal}} </small> STEEM <input class="input form-control" v-model="sellprice"></div>
          <div class="border-right">  Quantity <input class="input form-control mt-1" v-model="sellquantity"></div>
          <div class=""><small class="small text-blue" v-if="sellprice"> ${{sellprice*sellquantity*prizeProps.steemprice | decimal}}</small> Total <input class="input form-control mt-1" :placeholder="sellprice*sellquantity | decimal"></div>
						<div class="columns  p-0 m-0">
							<div class="column col-6 p-0 m-0 ">
						  Balance :  
              <br/>
               <span class="text-yellow">{{myDWDBalance | decimal}} DWD</span>
               <br/>
               <span class="text-yellow">${{myDWDBalance*this.steemengine.lastPrice * prizeProps.steemprice | decimal}} </span>
						 </div>
						 <div class="column col-6 p-0 m-0">
							<button disabled class="button button-red">Sell DWD</button>
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
      steemOn:false,
      amount: 0,
      cat: [],
      tradehistory: [],
      maxBuy: [],
      maxSell: [],
      buyBook: [],
      totalBuy:0,
      sellBook: [],
      totalSell:0,
      mySteemBalance:0,
      myDWDBalance:0,
      sellprice:null,
      sellquantity:null,
      buyprice:null,
      buyquantity:null,
      limitMin: 0,
      limitMax: 0,
      loading: false,
      errored: false,
      options: {
        tooltip: {
          enabled: false,
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
            [{ index: 'price', descending: true }],
            false,
          )
          .then(async buyBook => {
            self.buyBook = buyBook;
            let totalBuy =0;
         
            self.buyBook.forEach(element => {
              totalBuy=totalBuy+Number(element.tokensLocked);
              element.tokensTotal = totalBuy;
              if (element.price > self.maxBuy) self.maxBuy = element.price;
              self.series[0].data.push(element.price);
            });
            self.buyBook.forEach(element => {
              self.series[0].data.push(0);
            });
            self.totalBuy = totalBuy;
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
                let totalSell =0;
                self.sellBook = sellBook;
                sellBook.forEach(element => {
                  self.series[1].data.push(0);
                });
                sellBook.forEach(element => {
                  totalSell=totalSell+Number(element.quantity);
                  element.tokensTotal = totalSell;
                  if (element.price < self.limitMax) self.limitMax = element.price;
                  self.series[1].data.push(element.price);
                });
                self.sellBook = sellBook;
                 self.totalSell = totalSell;
                self.cat = [self.maxBuy, self.limitMax];
                ssc
                  .find(
                    'market',
                    'sellBook',
                    {
                      symbol: `DWD`,
                      account: this.user.username,
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
                          account: this.user.username,
                        },
                        100,
                        0,
                        [{ index: 'timestamp', descending: true }],
                        false,
                      )
                      .then(async personalBuyBook => {
                        console.log(personalBuyBook);
                          ssc.findOne(
                                'tokens',
                                'balances', {
                                  account: this.user.username,
                                  symbol: `DWD`
                                }).then(async mybalance => {
                                  if(mybalance)
                                    this.myDWDBalance = Number(this.dwdBalance)+Number(mybalance.balance);
                                })
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
      return parseFloat(
        this.amount / (prizeProps.total_dwd / parseFloat(prizeProps.balance)),
      ).toFixed(3);
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
    steemBalance() {
      if (this.$store.state.auth.account)
        return parseFloat(this.$store.state.auth.account.balance).toFixed(3) || 0;
      return 0;
    },
    dwdBalance() {
      return parseFloat(this.user.dwd).toFixed(3);
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
    setBuy(price,qt){
      this.buyprice = price;
      this.buyquantity = qt;
    },
    setSell(price,qt){
      this.sellprice = price;
      this.sellquantity = qt;
    },
    switchCurrency(){
      this.steemOn = !this.steemOn
    }
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
</style>
