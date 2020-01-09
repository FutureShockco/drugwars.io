<template>
    <div v-if="items">
        <div v-for="item in items" v-if="item.lvl !== 0" :key="item.building" class="d-inline-block">
            <div  class="mx-1 my-1 text-center" v-for="building in placeholder_buildings" :key="building.id"  v-if="building.id === item.building && building.type === 'defense'">
              <img width="50" :src="`//img.drugwars.io/buildings/${item.building}.jpg`">
            <div>
                {{ item.lvl }}
            <div>
              <h5 class="text-yellow label small">{{building.name}}</h5>
            </div>
            </div>
            </div>
        </div>
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
