<template>
  <div>
    <BuildingsTabs/>
    <div class="p-4 after-header">
      <Building
        v-for="building in buildings"
        :building="building"
        :key="building.id"
      />
    </div>
  </div>
</template>

<script>
import buildings from '@/helpers/buildings.json';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      buildings: pickBy(buildings, b => b.type === 'alcohols'),
    };
  },
};
</script>
