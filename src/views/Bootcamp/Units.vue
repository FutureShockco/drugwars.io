<template>
  <div>
    <BootcampTabs/>
    <div class="p-4 after-header">
      <Unit
        v-if="!unit.disabled"
        v-for="unit in units"
        :unit="unit"
        :key="unit.id"
      />
    </div>
  </div>
</template>

<script>
import units from '@/helpers/units.json';

export default {
  data() {
    return {
      units,
    };
  },
};
</script>
