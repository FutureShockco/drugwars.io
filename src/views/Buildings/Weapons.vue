<template>
  <div>
    <BuildingsTabs/>
    <div class="p-3">
      <Building
        v-if="!item.disabled"
        v-for="item in items"
        :building="item"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script>
import buildings from 'drugwars/buildings.json';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      items: pickBy(buildings, b => b.type === 'weapons'),
    };
  },
};
</script>
