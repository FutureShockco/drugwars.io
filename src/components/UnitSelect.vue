<template>
    <div class="column px-0 col-4 mb-6 sunit text-center">
        <div class="sunit" @click="handleClick">
            <div class="smalltitle">{{unit.name}}</div>
    
            <img class="preview unit small" :src="`//img.drugwars.io/units/${unit.id}.png`" />
            <i class="iconfont icon-plus"></i>
        </div>
        <input class="input" type="number" min="1" :max="item.amount" v-model="amount">
    </div>
</template>

<script>
import { units } from 'drugwars';

export default {
  props: ['item'],
  data() {
    return {
      amount: this.item.amount,
    };
  },
  computed: {
    unit() {
      return units[this.item.key];
    },
  },
  methods: {
    handleClick() {
      this.$emit('click', {
        key: this.unit.id,
        amount: this.amount,
      });
    },
  },
};
</script>


<style scoped lang="less">
.mini {
  width: 60px;
}

.small {
  width: 60px;
  height: 81px;
}

.sunit {
  height: 95px;
  width: 66px;
  margin-right: 10px;
}

input {
  width: 72px;
}

.icon-plus {
  text-shadow: 3px 3px 5px black;
  position: relative !important;
  font-size: 28px;
  top: -56px;
  color: #fbbd07;
  left: 0px;
}

.smalltitle {
  font-size: 8px;
  color: #fbbd07;
}
</style>
