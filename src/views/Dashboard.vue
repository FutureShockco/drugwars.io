<template>
  <div>
    <Header title="Overview" />
    <div class="p-4 after-header">
      <div class="item p-2">
        <h5>DRUGS PRODUCTION <Icon class="ml-2" :size="18" :color="'#fbbd08'" icon="drugs"/> </h5>
      </div>
      <BuildingProductionCompact
        v-for="building in drug_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="item mb-4">
      <h5>Total capacity : {{ drugStorage | amount }}
        Safe : {{ drugStorage /10 | amount }}</h5>
      </div>
      <div class="item p-2">
        <h5>WEAPONS PRODUCTION <Icon class="ml-2" :size="18" :color="'#fbbd08'" icon="weapons"/> </h5>
      </div>
      <BuildingProductionCompact
        v-for="building in weapon_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="item mb-4">
        <h5>Total capacity : {{ weaponStorage | amount }}
        Safe : {{ weaponStorage /10 | amount }}</h5>
      </div>
      <div class="item p-2">
        <h5>ALCOHOL PRODUCTION <Icon class="ml-2" :size="18" :color="'#fbbd08'" icon="alcohol"/> </h5>
      </div>
        <BuildingProductionCompact
        v-for="building in alcohol_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="item">
        <h5> Total capacity : {{ alcoholStorage | amount }}
        Safe : {{ alcoholStorage /10 | amount }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import buildings from '@/helpers/buildings.json';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      drug_buildings: pickBy(buildings, b => b.production_type === 'drugs'),
      weapon_buildings: pickBy(buildings, b => b.production_type === 'weapons'),
      alcohol_buildings: pickBy(buildings, b => b.production_type === 'alcohol'),
    };
  },
  computed: {
    drugStorage() {
      return this.$store.state.game.user.user.drug_storage;
    },
    weaponStorage() {
      return this.$store.state.game.user.user.weapon_storage;
    },
    alcoholStorage() {
      return this.$store.state.game.user.user.alcohol_storage;
    },
  },
};
</script>
