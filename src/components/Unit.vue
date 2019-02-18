<template>
  <div class="mb-4">
    <h5>{{ unit.name }}</h5>
    <p>{{ unit.desc }}</p>
  </div>
</template>

<script>
export default {
  props: ['unit'],
};
</script>
