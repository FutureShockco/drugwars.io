<template>
  <div>
    <ShopTabs />
    <div class="p-2 text-center anim-fade-in">
      <h2>GOVERNMENT SHOP</h2>
      <p class="mb-4 text-green">
        We always recommend you to use
        <a target="_blank" href="https://steemscan.com/steem-engine/?p=market&t=DWD">SteemEngine</a> to get DWD tokens at a fair price decided by players.
      </p>
      <div class="columns">
        <Shopcard v-for="item in shop" :item="item" :key="item.name" />
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      shop: [
        {
          id: 'drugwars',
          name: '50 TOKENS',
          type: 'DWD',
          img: 'dwd',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 2.5,
          ref: 'dwd',
          quantity: 50,
        },
        {
          id: 'drugwars',
          name: '100 TOKENS',
          type: 'DWD',
          img: 'dwd',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 5,
          ref: 'dwd',
          quantity: 100,
        },
        {
          id: 'drugwars',
          name: '200 TOKENS',
          type: 'DWD',
          img: 'dwd',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 10,
          ref: 'dwd',
          quantity: 200,
        },
        {
          id: 'drugwars',
          name: '500 TOKENS',
          type: 'DWD',
          img: 'dwd',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 25,
          ref: 'dwd',
          quantity: 5000,
        },
        {
          id: 'drugwars',
          name: '1000 TOKENS',
          type: 'DWD',
          img: 'dwd',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 50,
          ref: 'dwd',
          quantity: 1000,
        },
        {
          id: 'drugwars',
          name: '5000 TOKENS',
          type: 'DWD',
          img: 'dwd',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 250,
          ref: 'dwd',
          quantity: 5000,
        },
      ],
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
