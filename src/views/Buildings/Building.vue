<template>
  <div class="mb-4 d-flex flex-row border-bottom pb-4">
    <div class="mr-4">
      <img class="preview rounded-2" :src="`/img/buildings/${building.image}.png`"/>
    </div>
    <div class="width-full">
      <router-link :to="'/buildings/' + building.id">
        <h5>{{ building.name }}</h5>
      </router-link>
      <div class="item-description">
        {{ building.desc }}
      </div>
      <p>{{ building.base_price }}</p>
    </div>
    <Checkout/>
  </div>
</template>

<script>
import buildings from '@/helpers/buildings.json';

export default {
  data() {
    return {
      building: buildings[this.$route.params.id],
    };
  },
};
</script>
