<template>
  <div class="mb-4 d-flex flex-row border-bottom item rounded-2">
    <div class="py-3 px-3">
      <img class="preview" :src="`/img/buildings/${building.image}.png`"/>
    </div>
    <div class="width-full py-3">
      <router-link :to="'/buildings/' + building.id">
        <h5>{{ building.name }}</h5>
      </router-link>
      <div class="item-description">{{ building.desc }}</div>
      <p>{{ building.base_price }}</p>
      <div v-if="building.feature">
        Special:
        <span class="text-green">
          {{ building.feature }}
        </span>
      </div>
    </div>
    <Checkout/>
  </div>
</template>

<script>
export default {
  props: ['building'],
};
</script>
