<template>
  <div class="mb-4 d-flex flex-row border-bottom item rounded-2">
      <img class="preview" :src="`/img/buildings/${building.image}.png`">
    <div class="width-full mr-4">
      <router-link :to="'/buildings/' + building.id">
        <h5>{{ building.name }}</h5>
      </router-link>
      <div class="item-description pb-2 ml-2">{{ building.desc }}</div>
      <Cost class="ml-2"
        :level="1"
        :amount="false"
        :drugs_cost="building.drugs_cost"
        :weapons_cost="building.weapons_cost"
        :alcohols_cost="building.alcohols_cost"
      />
      <div v-if="building.feature" class="ml-2">
        Special:
        <span class="text-green">{{ building.feature }}</span>
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
