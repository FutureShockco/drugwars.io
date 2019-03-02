<template>
  <div>
    <BootcampTabs/>
    <div v-if="training_facility.lvl>0" class="p-4 after-header">
      <Unit
        v-if="!unit.disabled"
        v-for="unit in units"
        :unit="unit"
        :key="unit.id"
      />
    </div>
    <h5 v-else class="p-2">
      You must building a training facility first.
    </h5>
  </div>
</template>

<script>
import units from 'drugwars/units.json';

export default {
  data() {
    return {
      units,
    };
  },
  computed: {
    training_facility() {
      return (
        this.$store.state.game.user.buildings.find(b => b.building === 'training_facility') || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
