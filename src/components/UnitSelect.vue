<template>
  <div class="d-inline-block column col-4 mb-4">
    <div class="sunit" @click="handleClick">
    <img class="mini rounded-2" :src="`/img/units/${unit.id}.jpg`" />
    <i class="iconfont icon-plus"></i>
    </div>
      <input
        class="input form-control"
        type="number"
        min="1"
        :max="item.amount"
        v-model="amount"
      >
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

.sunit {
  height: 65px;
}

input {
  width: 60px;
}

.icon-plus {
  text-shadow: 3px 3px 5px black;
  position: relative;
  font-size: 28px;
  top: -56px;
  color: #fbbd07;
  left: 17px;
}
</style>
