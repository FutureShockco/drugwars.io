<template>
  <div class="mb-4 d-flex flex-row border-bottom item rounded-2">
    <div class="py-3 px-3">
      <img class="preview" :src="`/img/trainings/${training.image}.png`"/>
    </div>
    <div class="width-full py-3">
      <router-link :to="'/trainings/' + training.id">
        <h5>{{ training.name }}</h5>
      </router-link>
      <div class="item-description">{{ training.desc }}</div>
      <p>{{ training.base_price }}</p>
      <div v-if="training.feature">
        Special:
        <span class="text-green">
          {{ training.feature }}
        </span>
      </div>
    </div>
    <Checkout/>
  </div>
</template>

<script>
export default {
  props: ['training'],
};
</script>
