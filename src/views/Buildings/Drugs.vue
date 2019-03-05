<template>
  <div>
    <BuildingsTabs/>
    <div>
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
import { buildings } from 'drugwars';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      items: pickBy(buildings, b => b.type === 'drugs'),
    };
  },
};
</script>
