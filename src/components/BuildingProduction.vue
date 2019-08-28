<template>
    <div class="production">
        <div v-if="production_rate">
            <span v-if="!compactview"><b>Current:</b></span> +{{ current | amount }}
            <span>/ DAY</span>
        </div>
        <div v-if="production_rate && compactview">
            +{{ perhour | amount }} / HOUR
        </div>
        <div v-if="!compactview">
            <span><b>Next:</b></span> +{{ next | amount }}
            <span>/ DAY</span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['production_type', 'level', 'coeff', 'production_rate', 'compactview'],
  computed: {
    perhour() {
      const perhour = Number(
        parseFloat(this.production_rate * this.level * this.coeff * 60 * 60).toFixed(2),
      );
      return perhour + (perhour / 100) * this.level;
    },
    current() {
      const current = Number(
        parseFloat(this.production_rate * this.level * this.coeff * 60 * 60 * 24).toFixed(2),
      );
      return current + (current / 100) * this.level;
    },
    next() {
      const next = Number(
        parseFloat(this.production_rate * (this.level + 1) * this.coeff * 60 * 60 * 24).toFixed(2),
      );
      return next + (next / 100) * (this.level + 1);
    },
  },
};
</script>
