<template>
    <div v-if="items">
        <div v-for="item in items" v-if="item.lvl !== 0" :key="item.building" class="d-block text-left">
            <div v-for="building in placeholder_buildings" :key="building.id">
                <BuildingProductionCompact v-if="building.id === item.building" :item="item" :building="building" />
            </div>
        </div>
        <h5>
            <div>PRODUCTION PER DAY</div>
            {{totalDrugs * 60 * 60 * 24 | amount}}
            <Icon name="drug" size="20" /> {{totalWeapons * 60 * 60 * 24 | amount}}
            <Icon name="weapon" size="20" /> {{totalAlcohol * 60 * 60 * 24 | amount}}
            <Icon name="alcohol" size="20" />
        </h5>
    </div>
</template>

<script>
import { buildings } from 'drugwars';

export default {
  props: ['items'],
  data() {
    return {
      placeholder_buildings: buildings,
    };
  },
  computed: {
    totalDrugs() {
      let totalDrugs = 0;
      this.items.forEach(element => {
        if (this.placeholder_buildings[element.building]) {
          const b = this.placeholder_buildings[element.building];
          if (element.lvl && b.production_rate && b.production_type === 'drugs')
            totalDrugs +=
              b.production_rate * Number(element.lvl) * b.coeff +
              ((b.production_rate * Number(element.lvl) * b.coeff) / 100) * Number(element.lvl);
        }
      });
      return totalDrugs;
    },
    totalWeapons() { 
      let totalWeapons = 0;
      this.items.forEach(element => {
        if (this.placeholder_buildings[element.building]) {
          const b = this.placeholder_buildings[element.building];
          if (element.lvl && b.production_rate && b.production_type === 'weapons')
            totalWeapons +=
              b.production_rate * Number(element.lvl) * b.coeff +
              ((b.production_rate * Number(element.lvl) * b.coeff) / 100) * Number(element.lvl);
        }
      });
      return totalWeapons;
    },
    totalAlcohol() {
      let totalDrugs = 0;
      this.items.forEach(element => {
        if (this.placeholder_buildings[element.building]) {
          const b = this.placeholder_buildings[element.building];
          if (element.lvl && b.production_rate && b.production_type === 'alcohol')
            totalDrugs +=
              b.production_rate * Number(element.lvl) * b.coeff +
              ((b.production_rate * Number(element.lvl) * b.coeff) / 100) * Number(element.lvl);
        }
      });
      return totalDrugs;
    },
  },
};
</script>
