<template>
  <div v-if="items">
    <div
      v-for="item in items"
      v-if="item.lvl !== 0"
      :key="item.training"
      class="d-inline-block mx-1 my-1 text-center"
    >
      <img width="50" :src="`//img.drugwars.io/trainings/${item.training}.jpg`" />
      <div>
        {{ item.lvl }}
        <div>
          <h5 class="text-yellow label small">{{item.training}}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['items'],
};
</script>
