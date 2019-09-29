<template>
    <div>
        <div class="text-center mb-6 item border-bottom">
				<div class="text-center p-4">
					<h5 class="columns">  <img class="tokenimg" :src="`//img.drugwars.io/icons/${drug.id}_icon.png`" width="36" height="36" />DW{{drug.name.substring(0,4)}} Token Informations</h5>
					<h6 class="column col-4 m-0">
						Max Supply
						<p class="text-yellow"> 0</p>
					</h6>
					<h6 class="column col-4 m-0 border-left">
						Burnt
						<p class="text-yellow">0</p>
					</h6>
          <h6 class="column col-4 m-0 border-left">
						Staking
						<p class="text-yellow">None</p>
					</h6>
					<h5 class="columns">
						Token distribution
					</h5>
					<h6 class="column col-4 m-0 ">
						Total circulating
						<p class="text-yellow">0</p>
					</h6>
					<h6 class="column col-4 m-0 border-left">
						Circulating (ON MARKET)
						<p class="text-yellow">0</p>
					</h6>
					<h6 class="column col-4 m-0 border-left">
						Circulating (IN GAME)
						<p class="text-yellow">0</p>
					</h6>
					<h5 class="columns">Statistics</h5>
					<h6 class="column col-3 m-0">
						Volume (24h)
						<p class="text-yellow">0</p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
						Price Change
						<p class="text-red">0%</p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
						Last Price
						<p> $0 </p>
					</h6>
					<h6 class="column col-3 m-0 border-left">
						Bid/Ask
						<p> $0</p>
					</h6>
				</div>
          <div class="mt-6">
                <img class="preview" :src="`//img.drugwars.io/icons/drugs/${drug.icon}`">
            </div> 
            <div class="item-content width-full">
                <h5>{{ drug.name }}</h5>
                <div class="mb-2" v-html="drug.description"></div>
               <router-link :to="'/market?token=dw'+drug.name.substring(0,4).toLowerCase()"> <button
                  class="button btn-block button-blue mb-2">
                  <i class="iconfont icon-zap"/>
                TRADE ON MARKET
                </button></router-link>
            </div> 
          </div> 
          <div class="px-4">
            DRUGWARS DOLLARS (DWD) OR DRUGWARS {{drug.name.toUpperCase()}} (DW{{drug.name.substring(0,4).toUpperCase()}}) TOKENS ARE VIRTUAL CURRENCIES. 
          </div>
    </div>
</template>

<script>
import { drugs } from 'drugwars';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      drug: drugs.find(b => b.id === this.$route.query.name),
    };
  },
};
</script>

<style lang="less" scoped>
.tokenimg {
  margin-bottom: -10px;
  margin-right: 10px;
}
</style>
