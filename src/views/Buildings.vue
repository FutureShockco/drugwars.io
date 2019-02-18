<template>
  <div>
    <Header title="Buildings" />
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

export default {
  data() {
    return {
      buildings,
    };
  },
};
</script>
