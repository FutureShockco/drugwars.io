<template>
  <div>
    <HelpTabs/>
    <div class="p-4">
      <h3>How to play</h3>
      <ul class="help">
        <li>First of all, upgrade your buildings and try to produce as many resources as possible.</li>
        <li>When you are ready, build some units and train them in the art of war! They will need it.</li>
        <li>You can attack other players and they can attack you to steal your resources!</li>
        <li>When players attack or get attacked they have differents options to defend theirself, they can also choose to build more defense and let their defense taking care about the opponents.</li>
        <li>Good luck - all is fair in love and DrugWars!</li>
      </ul>
      <h3>Community guides</h3>
      <p>
        <a
          href="https://steemit.com/drugwars/@timcliff/drug-wars-on-steem-ultimate-beginners-game-guide"
          target="_blank"
        >
          Drug Wars on Steem - Ultimate Beginners Game Guide
        </a>
        by
        <router-link to="/@timcliff">
          timcliff
        </router-link>
      </p>
      <h3>F.A.Q.</h3>
      <input
        class="input btn-large btn-block mb-4"
        placeholder="Search"
        v-model="q"
      />
      <div>
        <div>
          <div
            :key="key"
            v-for="(question, key) in faq"
            class="mb-4"
          >
            <p><b class="mr-3">{{ question.q }}</b></p>
            <p>{{ question.a }}</p>
          </div>
        </div>
      </div>
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
      return faq.filter((q) => {
        return JSON.stringify(q).toLowerCase().includes(this.q.toLowerCase());
      });
    },
  },
};
</script>

<style scoped class="less">
.help {
  font-size: 18px;
}
</style>
