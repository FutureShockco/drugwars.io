<template>
  <div class="mb-4">
    <h5>{{ building.name }}</h5>
    <p><b>Price:</b> {{ building.base_price }}</p>
  </div>
</template>

<script>
export default {
  props: ['building'],
};
</script>
