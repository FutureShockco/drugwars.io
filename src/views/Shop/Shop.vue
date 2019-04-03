<template>
  <div>
    <ShopTabs/>
        <div class="p-2 text-center">
            <h2>DEALER SHOP</h2>
            <div class="columns">
              <Shopcard
        v-for="item in futureitems"
        :item="item"
        :key="item.name"
      />
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      futureitems: [
        {
          id: 'drugwars',
          name: '500 TOKENS',
          type: 'FUTURE',
          img: 'future',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 2.5,
          ref: 'future',
          quantity: 500,
        },
        {
          id: 'drugwars',
          name: '1000 TOKENS',
          type: 'FUTURE',
          img: 'future',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 5,
          ref: 'future',
          quantity: 1000,
        },
        {
          id: 'drugwars',
          name: '2000 TOKENS',
          type: 'FUTURE',
          img: 'future',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 10,
          ref: 'future',
          quantity: 2000,
        },
        {
          id: 'drugwars',
          name: '5000 TOKENS',
          type: 'FUTURE',
          img: 'future',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 25,
          ref: 'future',
          quantity: 5000,
        },
        {
          id: 'drugwars',
          name: '10000 TOKENS',
          type: 'FUTURE',
          img: 'future',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 50,
          ref: 'future',
          quantity: 10000,
        },
        {
          id: 'drugwars',
          name: '50000 TOKENS',
          type: 'FUTURE',
          img: 'future',
          detail: 'Buy any upgrades or units for a cheaper price.',
          price: 250,
          ref: 'future',
          quantity: 50000,
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
