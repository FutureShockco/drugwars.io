<template>
    <div v-if="units">
        <div v-for="unit in units" v-if="unit.amount !== 0" :key="unit.key" class="d-inline-block mx-1 my-1 text-center all" @click="handleClick(unit.key)">
            <img  class="preview unit mini" :style="`background-image: url('//img.drugwars.io/cards/background/classic_unit${randomPickBkg}.png');`" width="50" :src="`//img.drugwars.io/units/${unit.key}.png`">
            <i v-if="!disableicon" class="iconfont icon-diff-removed"></i>
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
  props: ['units', 'withDead', 'disableicon'],
  computed: {
    randomPickBkg() {
      const rnd = Math.floor(Math.random() * Math.floor(process.env.VUE_APP_COMMON_RND_BKG)) + 1;
      return rnd;
    },
  },
  methods: {
    handleClick(key) {
      if(!this.disableicon)
      this.$parent.$data.selectedUnits = this.units.filter(unit => unit.key != key);
    },
  },
};
</script>

<style scoped lang="less">
.all {
  position: relative;
}
.icon-diff-removed {
  text-shadow: 3px 3px 5px black;
  position: absolute !important;
  font-size: 28px;
  top: 14px;
  color: #fbbd07;
  left: 6px;
}

.smalltitle {
  font-size: 8px;
  color: #fbbd07;
}
</style>
