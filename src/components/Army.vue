<template>
    <div v-if="units">
        <div v-for="unit in units" v-if="unit.amount !== 0" :key="unit.key" class="d-inline-block mx-1 my-1 text-center">
            <img v-if="unit.key || unit.id" class="preview unit mini" :style="`background-image: url('//img.drugwars.io/cards/background/classic_unit${randomPickBkg}.png');`" width="50" :src="`//img.drugwars.io/units/${unit.key || unit.id}.png`">
            <img v-else class="preview unit mini" :style="`background-image: url('//img.drugwars.io/cards/background/classic_unit${randomPickBkg}.png');`" width="50" :src="`//img.drugwars.io/units/${unit}.png`">
            <div>
                <span v-if="withDead && unit.dead">
              <span :class="{ 'text-red' : unit.dead }">
                {{ unit.dead || 0 }}
              </span> /
                </span>
                {{ unit.amount }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['units', 'withDead'],
  computed: {
    randomPickBkg() {
      const rnd = Math.floor(Math.random() * Math.floor(process.env.VUE_APP_COMMON_RND_BKG)) + 1;
      return rnd;
    },
  },
};
</script>
