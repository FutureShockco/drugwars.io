<template>
  <div v-if="items">
    <div
      v-for="item in items"
      v-if="item.lvl !== 0"
      :key="item.building"
      class="d-inline-block mx-1 my-1 text-center"
    >
      <img width="50" :src="`/img/buildings/${item.building}.png`">
      <div>
        {{ item.lvl }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
};
</script>
