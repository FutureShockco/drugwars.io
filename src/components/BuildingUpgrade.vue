<template>
        <div v-if="upgrade">
        <h5 class="text-small mb-0 mt-1">{{upgrade.name}} </h5>
           <!--  <Icon class="ml-0 mr-1" :size="18" :name="`${upgrade.production_type}_icon`"/>{{upgrade.desc}} -->
          <Cost :drugsCost="upgrade.drugs_cost" :special="upgrade.cost" :weaponsCost="0" :alcoholsCost="0" :quantity="1" />
          <div >
            <span ><b>Current:</b></span> +{{ current | amount }}
            <span>/ DAY</span>
        </div>
                <div >
            <span><b>Next:</b></span> +{{ next | amount }}
            <span>/ DAY</span>
        </div>
        </div>
</template>

<script>
export default {
  props: ['upgrade'],
  computed: {
    perhour() {
      const perhour = Number(
        parseFloat(
          this.upgrade.production_rate * this.level * this.upgrade.coeff * 60 * 60,
        ).toFixed(2),
      );
      return perhour + (perhour / 100) * this.level;
    },
    current() {
      const current = Number(
        parseFloat(
          this.upgrade.production_rate * this.level * this.upgrade.coeff * 60 * 60,
        ).toFixed(2),
      );
      return current + (current / 100) * this.level;
    },
    next() {
      const next = Number(
        parseFloat(this.upgrade.production_rate * 1 * this.upgrade.coeff * 60 * 60).toFixed(2),
      );
      return next + (next / 100) * 1;
    },
  },
};
</script>
