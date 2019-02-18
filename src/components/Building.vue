<template>
  <div class="mb-4 d-flex flex-row border-bottom pb-4">
    <div class="mr-4">
      <img class="preview rounded-2" :src="`/img/buildings/${building.image}.png`"/>
    </div>
    <div class="width-full">
      <h5>{{ building.name }}</h5>
      {{ building.desc }}
      <p>{{ building.base_price }}</p>
    </div>
    <Checkout/>
  </div>
</template>

<script>
export default {
  props: ['building'],
};
</script>
