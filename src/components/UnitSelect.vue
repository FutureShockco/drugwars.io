<template>
  <div class="mb-4 border-bottom pb-4">
    <h5>{{ unit.name }}</h5>
    <img class="preview rounded-2" :src="`/img/units/${unit.id}.png`"/>
    <div class="v-align-middle mb-6">
      <input
        class="input form-control mr-2"
        :value="item.amount"
        type="number"
        min="0"
        :max="1"
      >
      <button class="button button-blue">
        Add
      </button>
    </div>
  </div>
</template>

<script>
import units from 'drugwars/units.json';

export default {
  props: ['item'],
  computed: {
    unit() {
      return units[this.$props.item.key];
    },
  },
};
</script>
