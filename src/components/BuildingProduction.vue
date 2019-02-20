<template>
  <div class="production">
    <div v-if="this.production_rate">
      <span>Current : {{ parseFloat((this.production_rate * this.level * this.coeff) * 60 * 60 * 24).toFixed(2) | amount}}/Day</span>
    </div>
    <div v-if="this.level && !this.compactview">
      <span>Next : {{ parseFloat((this.production_rate * (this.level+1) * this.coeff) * 60 * 60 * 24).toFixed(2) | amount}}/Day</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['level', 'coeff', 'production_rate', 'compactview'],
};
</script>


<style scoped lang="less">
.production div span {
  font-weight: 600;
  font-size: 14px;
  color: #c7c7c7;
  display: inline-flex;
  margin-right: 5px;
  line-height: 17px;
}
</style>
