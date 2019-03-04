<template>
  <div>
    <BootcampTabs/>
    <div>
      <div v-if="trainingFacility.lvl > 0">
        <Unit
          v-if="!unit.disabled"
          v-for="unit in units"
          :unit="unit"
          :key="unit.id"
        />
      </div>
      <p v-else>
        You must building a training facility first.
      </p>
    </div>
  </div>
</template>

<script>
import { units } from 'drugwars';

export default {
  data() {
    return {
      units,
    };
  },
  computed: {
    trainingFacility() {
      return (
        this.$store.state.game.user.buildings.find(b => b.building === 'training_facility') || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
