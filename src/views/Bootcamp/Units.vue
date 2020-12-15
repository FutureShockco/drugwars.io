<template>
    <div>
        <BootcampTabs/>
        <div class="anim-fade-in">
            <div class="units" v-if="trainingFacility.level > 0">
                <Unit v-if="!unit.disabled && !unit.npc" v-for="unit in units" :unit="unit" :key="unit.id" />
            </div>
            <div v-else class="p-2 text-center">
                <h2> You must build a training facility first.</h2>
            </div>
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
    base() {
      return this.$store.state.game.selectedBase;
    },
    trainingFacility() {
      return (
        this.base.buildings.find(
          b =>
            b.name === 'training_facility'
        ) || {
          level: 0,
        }
      );
    },
  },
};
</script>
