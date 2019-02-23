<template>
  <div class="production">
    <div v-if="production_rate">
      <b>Current:</b>
      {{ parseFloat((production_rate * level * coeff) * 60 * 60 * 24).toFixed(2) | amount}} / day
    </div>
    <div v-if="level && !compactview">
      <b>Next:</b>
      {{ parseFloat((production_rate * (level+1) * coeff) * 60 * 60 * 24).toFixed(2) | amount}} / day
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
  width: 140px;
}
</style>
