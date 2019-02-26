<template>
  <div class="production">
    <div v-if="production_rate">
      <span>Current:</span>
      {{ parseFloat((production_rate * level * coeff) * 60 * 60 * 24).toFixed(2) | amount}}
    </div>
    <div v-if="level && !compactview">
      <span>Next:</span>
      {{ parseFloat((production_rate * (level+1) * coeff) * 60 * 60 * 24).toFixed(2) | amount}}
      <span>/ DAY</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['level', 'coeff', 'production_rate', 'compactview'],
};
</script>
