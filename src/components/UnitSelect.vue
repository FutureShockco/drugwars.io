<template>
  <div class="mb-4 border-bottom pb-4">
    <h4>{{ unit.unit }}</h4>
    <input class="input form-control" :value="unit.amount">
  </div>
</template>

<script>
export default {
  props: ['unit'],
};
</script>
