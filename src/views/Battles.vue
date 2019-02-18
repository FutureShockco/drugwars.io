<template>
  <div>
    <Header title="Battles" />
    <div class="p-4 after-header">
      <UnitSelect
        v-for="unit in units"
        :unit="unit"
        :key="unit"
      />
      <button class="btn btn-large btn-primary mb-6">
        Fight
      </button>
      <p>Battles are disabled temporarily and will come back with a lot of improvements, thank you for your understanding.</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    units() {
      return this.$store.state.game.user.units;
    },
  },
};
</script>
