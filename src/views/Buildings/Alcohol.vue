<template>
  <div>
    <BuildingsTabs/>
    <div>
      <Building
        v-for="item in items"
        :building="item"
        :key="item.id"
      />
    </div>
  </div>
</template>

<script>
import { buildings } from 'drugwars';
import { filter, pickBy } from 'lodash';

export default {
  data() {
    return {
      items: filter(pickBy(buildings, b => b.type === 'alcohols'), item => !item.disabled),
    };
  },
};
</script>
