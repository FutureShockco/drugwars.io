<template>
  <div v-if="units">
    <div
      v-for="unit in units"
      v-if="unit.amount !== 0"
      :key="unit.key"
      class="d-inline-block mx-1 text-center"
    >
      <img width="50" :src="`/img/units/${unit.key}.png`">
      <div>
        <span v-if="withDead" :class="{ 'text-red' : unit.dead }">
          {{ unit.dead || 0 }}
        </span>
        <span v-if="withDead">/</span>
        {{ unit.amount }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['units', 'withDead'],
};
</script>
