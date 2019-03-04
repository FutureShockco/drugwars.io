<template>
  <div>
    <div>
      <b>Current:</b>
      {{ current | amount }} / day
    </div>
    <div v-if="!compactview">
      <b>Next:</b>
      {{ next | amount }} / day
    </div>
  </div>
</template>

<script>
export default {
  props: ['level', 'coeff', 'production_rate', 'compactview'],
  computed: {
    current() {
      return parseFloat((this.production_rate * this.level * this.coeff) * 60 * 60 * 24).toFixed(2);
    },
    next() {
      return parseFloat((this.production_rate * (this.level + 1) * this.coeff) * 60 * 60 * 24).toFixed(2);
    },
  }
};
</script>
