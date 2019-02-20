<template>
  <div>
    <Header title="Overview" />
    <div class="p-4 after-header">
      <BuildingProductionCompact
        v-for="building in drug_buildings"
        :building="building"
        :key="building.id"
      />
      <div>
      Total capacity : {{ drugStorage | amount }}
        Safe : {{ drugStorage /10 | amount }}
      </div>
      <BuildingProductionCompact
        v-for="building in weapon_buildings"
        :building="building"
        :key="building.id"
      />
      <div>
      Total capacity : {{ weaponStorage | amount }}
        Safe : {{ weaponStorage /10 | amount }}
      </div>
        <BuildingProductionCompact
        v-for="building in alcohol_buildings"
        :building="building"
        :key="building.id"
      />
      <div>
        Total capacity : {{ alcoholStorage | amount }}
        Safe : {{ alcoholStorage /10 | amount }}
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
