<template>
  <div>
    <Header title="Overview" />
    <div>
      <!-- <div class="rounded-2 bg-gray-dark overflow-hidden position-relative" style="height: 20px;">
        <div class="bg-blue position-absolute" :style="{ width: '50%' }">
          Balance
        </div>
        <div class="bg-green position-absolute" :style="{ width: '20%' }">
          Safe
        </div>
      </div> -->
      <div class="item  pl-4">
        <h5>DRUGS PRODUCTION <Icon name="drugs"/> </h5>
      </div>
      <BuildingProductionCompact
        v-for="building in drug_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="item p-2">
        <div class="right-floated">
          <h3 class="total"> Total: {{ user.drug_production_rate * 60 * 60 * 24 | amount }}/Day</h3>
          <h5 class="m-0"> Full in : {{ (drugStorage - user.drugs_balance) / user.drug_production_rate * 1000 | ms}}</h5>
        </div>
      <div class="total">Total capacity : {{ drugStorage | amount }}</div>
        <h5 class="m-0 text-green">Safe : {{ drugStorage /10 | amount }}
      </h5>
        </div>
      <div class="item  pl-4">
        <h5>WEAPONS PRODUCTION <Icon name="weapons"/> </h5>
      </div>
      <BuildingProductionCompact
        v-for="building in weapon_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="item p-2">
        <div class="right-floated">
        <h3 class="total"> Total: {{ user.weapon_production_rate * 60 * 60 * 24 | amount }}/Day</h3>
          <h5 class="m-0"> Full in : {{ (weaponStorage - user.weapons_balance) / user.weapon_production_rate * 1000 | ms }}</h5>
        </div>
        <div class="total">Total capacity : {{ weaponStorage | amount }}</div>
          <h5 class="m-0 text-green">Safe : {{ weaponStorage /10 | amount }}</h5>
      </div>
      <div class="item p-2">
        <h5>ALCOHOL PRODUCTION <Icon name="alcohol"/> </h5>
      </div>
        <BuildingProductionCompact
        v-for="building in alcohol_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="item  p-2">
        <div class="right-floated">
        <h3 class="total"> Total: {{ user.alcohol_production_rate * 60 * 60 * 24 | amount }}/Day</h3>
          <h5 class="m-0"> Full in : {{ (alcoholStorage - user.alcohols_balance) / user.alcohol_production_rate * 1000 | ms}}</h5>
        </div>
        <div class="total"> Total capacity : {{ alcoholStorage | amount }}</div>
          <h5 class="m-0 text-green">Safe : {{ alcoholStorage /10 | amount }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
import buildings from 'drugwars/buildings.json';
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
    user() {
      return this.$store.state.game.user.user;
    },
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
