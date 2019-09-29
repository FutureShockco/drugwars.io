<template>
    <div v-if="ownBase">
        <BuildingsTabs/>
        <div class="anim-fade-in">
            <Building v-for="item in items" :building="item" :key="item.id" />
        </div>
    </div>
     <div v-else class="p-2 text-center">
                <h2> You must choose a location on the map first.</h2>
            </div>
</template>

<script>
import { buildings } from 'drugwars';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      items: pickBy(buildings, b => b.type === 'main'),
    };
  },
  computed: {
    ownBase() {
      return this.$store.state.game.mainbase;
    },
  },
};
</script>
