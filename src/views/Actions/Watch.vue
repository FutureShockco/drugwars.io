<template>
  <div class="p-0 m-0 text-center anim-fade-in">
    <h2>Fight {{ fight_key }}</h2>
    <img style="max-width: 100%" src="//img.drugwars.io/map/pa.png" />
    <button :disabled="isPlaying" @click="start" class="button button-red btn-block">Play</button>

    <div class="columns width-full p-0" v-if="fight">
      <div class="column col-6 p-0" v-if="fight.attacker.units">
        <div
          :id="'attacker' + unit.key"
          v-for="(unit, index) in fight.attacker.units"
          v-if="unit.amount !== 0"
          :key="unit.key"
          :style="'top:' + (100 + index * 60) + 'px'"
          class="d-inline-block mx-1 my-1 text-center unit attacker anim-bounce"
        >
          <img
            v-if="unit.key"
            :class="'preview unit mini ' + unit.key + unit.amount"
            :style="`background-image: url('//img.drugwars.io/cards/background/classic_unit${randomPickBkg}.png');`"
            width="50"
            :src="`//img.drugwars.io/units/${unit.key}.png`"
          />
          <!-- <span v-if="unit.dead">
              <span :class="{ 'text-red': unit.dead }">
                {{ unit.dead || 0 }}
              </span>
              /
            </span> -->
          <span class="amount">{{ unit.amount }}</span>
        </div>
      </div>

      <div class="column col-6 p-0" v-if="fight.target.units">
        <div
          :id="'defender' + unit.key"
          v-for="(unit, index) in fight.target.units"
          v-if="unit.amount !== 0"
          :key="unit.key"
          :style="'top:' + (100 + index * 60) + 'px'"
          class="d-inline-block mx-1 my-1 text-center unit defender"
        >
          <img
            v-if="unit.key"
            :class="'preview unit mini ' + unit.key + unit.amount"
            :style="`background-image: url('//img.drugwars.io/cards/background/classic_unit${randomPickBkg}.png');`"
            width="50"
            :src="`//img.drugwars.io/units/${unit.key}.png`"
          />
          <div>
            <!-- <span v-if="unit.dead">
              <span :class="{ 'text-red': unit.dead }">
                {{ unit.dead || 0 }}
              </span>
              /
            </span> -->
            <span class="amount">{{ unit.amount }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { mapActions } from 'vuex';
import axios from 'axios';

import goldwars from 'goldwars';

export default {
  data() {
    return {
      fight: null,
      ended: null,
      isPlaying: false,
      json: null,
      log: null,
    };
  },
  computed: {
    fight_key() {
      return this.$route.query.id || null;
    },
    randomPickBkg() {
      const rnd = Math.floor(Math.random() * Math.floor(process.env.VUE_APP_COMMON_RND_BKG)) + 1;
      return rnd;
    },
  },
  methods: {
    start() {
      //   this.isPlaying = true;
      let timeout = 0;
      console.log(this.log);
      this.log.forEach((element) => {
        timeout += 1000;
        setTimeout(() => {
          if (element.name === 'attacker') {
            console.log(element);
            document
              .getElementById('attacker' + element.unit)
              .animate(
                [
                  { transform: 'translateX(0px)' },
                  { transform: 'translateX(650px)' },
                  { transform: 'translateX(0px)' },
                ],
                {
                  duration: 900,
                  iterations: 1,
                },
              );
            console.log('is attack');
          } else {
            document
              .getElementById('defender' + element.unit)
              .animate(
                [
                  { transform: 'translateX(0px)' },
                  { transform: 'translateX(-650px)' },
                  { transform: 'translateX(0px)' },
                ],
                {
                  duration: 900,
                  iterations: 1,
                },
              );
            console.log('is defen');
          }
        }, timeout);
      });
    },
  },
  mounted() {
    axios
      .get(process.env.VUE_APP_HTTP_API_URL_S1 + '/fight/' + this.fight_key)
      .then((response) => {
        if (response.data);
        this.json = response.data[0];
        try {
          const result = new goldwars.Fight(JSON.parse(this.json.json));
          result.attackers.forEach((element) => {
            element.dead = 0;
          });
          result.defenders.forEach((element) => {
            element.dead = 0;
          });
          this.fight = result.fight();

          // this.log = result.getAnimLog();
        } catch (error) {}
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
      .then(() => {
        // always executed
      });
    console.log(this.fight_key);
  },
};
</script>


<style lang="less" scoped>
.unit {
  position: absolute;
  z-index: 999;
  animation: bounce 0.7s ease infinite;

  &.attacker {
    left: 10px;
  }

  &.defender {
    right: 50px;
  }
}

.amount {
  z-index: 999;
  width: 40px;
  font-size: 12px;
  position: absolute;
  color: white;
  text-align: center;
  top: 40px;
  text-shadow: 0px 0px 5px black;
  background: black;
  border-radius: 3px;
  animation: bounce 0.7s ease infinite;
}

@keyframes bounce {
  from {
    margin-top: 0px;
  }
  50% {
    margin-top: 5px;
  }
  to {
    margin-top: 0px;
  }
}
</style>
