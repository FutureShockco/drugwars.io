<template>
  <div class="mb-4 border-bottom pb-4">
    <h4>{{ unit.unit }}</h4>
    <div class="v-align-middle mb-6">
      <input
        class="input form-control mr-2"
        :value="unit.amount"
        type="number"
        min="0"
        :max="1"
      >
      <button class="btn btn-blue btn-primary">
        Add
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['unit'],
};
</script>
