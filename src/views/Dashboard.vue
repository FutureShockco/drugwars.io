<template>
  <div>
    <Header title="Overview" />
    <div class="p-4">
      <Quickstart/>


      <h3><Icon name="drugs" size="30" class="mr-2"/> Drugs production</h3>
      {{ user.drugs_balance | amount }} / {{ drugStorage | amount }}

      <h3><Icon name="weapons" size="30" class="mr-2"/> Weapons production</h3>
      {{ user.weapons_balance | amount }} / {{ weaponStorage | amount }}

      <h3><Icon name="alcohols" size="30" class="mr-2"/> Alcohols production</h3>
      {{ user.alcohols_balance | amount }} / {{ alcoholStorage | amount }}


      <div class="rounded-2 bg-gray-dark overflow-hidden position-relative" style="height: 20px;">
        <div class="bg-blue position-absolute" :style="{ width: '50%' }">
          Balance
        </div>
        <div class="bg-green position-absolute" :style="{ width: '20%' }">
          Safe
        </div>
      </div>

      <BuildingProductionCompact
        v-for="building in drug_buildings"
        :building="building"
        :key="building.id"
      />
      <div>
        <div class="right floated">
          <h5> Total: {{ user.drug_production_rate * 60 * 60 * 24 | amount }}/Day</h5>
          <h5> Full in : {{ (drugStorage - user.drugs_balance) / user.drug_production_rate * 1000 | ms}}</h5>
        </div>
      <h5>Total capacity : {{ drugStorage | amount }}</h5>
        <h5 class="text-green">Safe : {{ drugStorage /10 | amount }}
      </h5>
        </div>
      <div class="mb-2 item p-2">
        <h5>WEAPONS PRODUCTION <Icon name="weapons"/> </h5>
      </div>
      <BuildingProductionCompact
        v-for="building in weapon_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="item mb-4 p-2">
        <div class="right floated">
        <h5>Total: {{ user.weapon_production_rate * 60 * 60 * 24 | amount }}/Day</h5>
          <h5>Full in: {{ (weaponStorage - user.weapons_balance) / user.weapon_production_rate * 1000 | ms }}</h5>
        </div>
        <h5>Total capacity : {{ weaponStorage | amount }}</h5>
          <h5 class="text-green">Safe : {{ weaponStorage /10 | amount }}</h5>
      </div>
      <div class="mb-2 item p-2">
        <h5>ALCOHOL PRODUCTION <Icon name="alcohol"/> </h5>
      </div>
        <BuildingProductionCompact
        v-for="building in alcohol_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="item p-2">
        <h5>Total: {{ user.alcohol_production_rate * 60 * 60 * 24 | amount }}/Day</h5>
        <h5>Full in: {{ (alcoholStorage - user.alcohols_balance) / user.alcohol_production_rate * 1000 | ms}}</h5>
        <h5>Total capacity: {{ alcoholStorage | amount }}</h5>
        <h5 class="text-green">Safe: {{ alcoholStorage /10 | amount }}</h5>
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
