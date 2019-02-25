<template>
  <div v-if="units">
    <div :key="unit.key" v-for="unit in units" class="d-inline-block mx-1">
      <img width="50" :src="`/img/units/${unit.key}.png`">
      <div>
        <span :class="{ 'text-red' : unit.dead }">
          {{ unit.dead || 0 }}
        </span>
        / {{ unit.amount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['units'],
};
</script>
