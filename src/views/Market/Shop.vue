<template>
	<div>
		<MarketTabs/>
		<div class="p-2 text-center">
			<h2>DEALER SHOP</h2>
			<div class="columns">
				<Shopcard v-for="item in shop" :item="item" :key="item.name"/>
			</div>
		</div>
		<div class="text-center">
			<p class="mb-4">Where can I buy FUTURE tokens outside of the shop?</p>
			<div>
				Buy with BTC by using
				<a href="https://cryptox.pl/">Cryptox.pl</a>.
			</div>
			<div>
				Buy with GBYTE by using the official
				<a href="https://obyte.org/">Obyte Wallet</a>.
			</div>
		</div>
	</div>
</template>


<script>
import { mapActions } from 'vuex';
import { shop } from 'drugwars';

export default {
  data() {
    return {
      shop,
    };
  },
  methods: {
    ...mapActions(['logout']),
    play(audio) {
      audio.isPlaying = true; // eslint-disable-line no-param-reassign
      audio.loop = true; // eslint-disable-line no-param-reassign
      audio.file.play();
    },
    pause(audio) {
      audio.isPlaying = false; // eslint-disable-line no-param-reassign
      audio.file.pause();
    },
  },
};
</script>

<style scoped lang="less">
</style>
