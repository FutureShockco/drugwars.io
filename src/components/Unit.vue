<template>
  <div class="mb-4 d-flex flex-row border-bottom pb-4">
    <div class="mr-4">
      <img class="preview rounded-2" :src="`/img/units/${unit.image}.png`"/>
    </div>
    <div class="width-full">
      <h5>{{ unit.name }}</h5>
      {{ unit.desc }}
    </div>
    <Checkout/>
  </div>
</template>

<script>
export default {
  props: ['unit'],
};
</script>
