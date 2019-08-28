<template>
    <div>
        <HelpTabs/>
        <div class="p-4">
            <h3>Community guides</h3>
            <p>
                <a href="https://steemit.com/drugwars/@timcliff/drug-wars-on-steem-ultimate-beginners-game-guide" target="_blank">
              Drug Wars on Steem - Ultimate Beginners Game Guide (Outdated)
            </a> by
                <router-link to="/@timcliff">timcliff</router-link>
            </p>
            <p>
                <a href="https://steemit.com/drugwars/@timcliff/drug-wars-on-steem-intermediate-game-guide-battles" target="_blank">
              Drug Wars on Steem - Intermediate Game Guide: Battles (Outdated)
            </a> by
                <router-link to="/@timcliff">timcliff</router-link>
            </p>
        </div>
    </div>
</template>

<script>
import faq from '@/../faq.json';

export default {
  data() {
    return {
      q: '',
    };
  },
  computed: {
    faq() {
      return faq.filter(q =>
        JSON.stringify(q)
          .toLowerCase()
          .includes(this.q.toLowerCase()),
      );
    },
  },
};
</script>

<style scoped class="less">
.help {
  font-size: 18px;
}
</style>
