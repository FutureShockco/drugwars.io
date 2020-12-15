<template>
  <div>
    <BootcampTabs />
    <div class="anim-fade-in">
      <div v-if="researchCenter.level > 0">
        <Training v-for="training in trainings" :training="training" :key="training.id" />
      </div>
      <div v-else class="p-2 text-center">
        <div v-if="!base" class="p-2 text-center">
          <h2>You must choose a location on the map first.</h2>
        </div>
        <h2 v-else>You must build a research center first.</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { trainings } from 'drugwars';

export default {
  data() {
    return {
      trainings,
    };
  },
  computed: {
    base() {
      return this.$store.state.game.selectedBase;
    },
    researchCenter() {
      return (
        this.base.buildings.find((b) => b.name === 'research_center') || {
          level: 0,
        }
      );
    },
  },
};
</script>
