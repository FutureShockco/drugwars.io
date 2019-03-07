<template>
    <div class="production">
    <div v-if="production_rate">
      <span v-if="!compactview">Current:</span>
      +{{ current | amount }}
         <span>/ DAY</span>
    </div>
    <div v-if="production_rate && compactview">
      +{{ perhour | amount }}
         / HOUR
    </div>
    <div v-if="level && !compactview">
      <span>Next:</span>
      +{{ next | amount }}
      <span>/ DAY</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['level', 'coeff', 'production_rate', 'compactview'],
  computed: {
    perhour() {
      return parseFloat(this.production_rate * this.level * this.coeff * 60 * 60).toFixed(2);
    },
    current() {
      return parseFloat(this.production_rate * this.level * this.coeff * 60 * 60 * 24).toFixed(2);
    },
    next() {
      return parseFloat(
        this.production_rate * (this.level + 1) * this.coeff * 60 * 60 * 24,
      ).toFixed(2);
    },
  },
};
</script>
