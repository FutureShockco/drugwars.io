<template>
    <div>
        <BootcampTabs/>
        <div class="anim-fade-in">
            <div v-if="researchCenter.lvl > 0">
                <Training v-for="training in trainings" :training="training" :key="training.id" />
            </div>
            <div v-else class="p-2 text-center">
                <h2> You must build a research center first.</h2>
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
    researchCenter() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'research_center' &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          lvl: 0,
        }
      );
    },
  },
};
</script>
