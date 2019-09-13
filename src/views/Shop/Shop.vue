<template>
    <div>
        <ShopTabs/>
        <div class="p-2 text-center anim-fade-in">
            <h2>DEALER SHOP</h2>
            <p class="mb-4 text-green">We always recommend you to use <a target="_blank" href="https://steem-engine.com/?p=market&t=DWD">SteemEngine</a> to get DWD tokens at a fair price decided by players.</p>
            <div class="columns">
                <ShopItem v-for="item in shop" :item="item" :key="item.name" />
            </div>
        </div>
        <div class="text-center">
            <p class="mb-4">When you buy DWD tokens in the official shop, we automatically burn the same amount of tokens you have bought.</p>
            <p class="mb-4">Where can I buy DWD tokens outside of the shop?</p>
            <div>
                <a href="https://steem-engine.com/?p=market&t=DWD">Buy on SteemEngine</a>.
            </div>
        </div>
    </div>
</template>


<script>
import { shop } from 'drugwars';

export default {
  data() {
    return {
      shop,
    };
  },
};
</script>

<style scoped lang="less">
</style>
