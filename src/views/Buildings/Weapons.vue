<template>
  <div>
    <BuildingsTabs/>
    <div class="p-4">
      <Building
        v-for="item in items"
        :building="item"
        :key="item.id"
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
      items: pickBy(buildings, b => b.type === 'weapons'),
    };
  },
};
</script>
