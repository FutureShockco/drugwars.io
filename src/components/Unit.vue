<template>
  <div class="mb-4 d-flex flex-row border-bottom item rounded-2">
    <img class="preview" :src="`/img/units/${unit.image}.png`">
    <div class="width-full mr-4">
      <router-link :to="'/units/' + unit.id">
        <h5>{{ unit.name }}</h5>
      </router-link>
      <div class="item-description pb-2 ml-2">{{ unit.desc }}</div>
      <div class="ml-2">
        {{ unit.attack }}
        {{ unit.defense }}
        {{ unit.speed }}
        <!-- <div>Point per unit: {{ unit.score }}</div> -->
        <Cost
          :level="false"
          :amount="1"
          :drugs_cost="unit.drugs_cost"
          :weapons_cost="unit.weapons_cost"
          :alcohols_cost="unit.alcohols_cost"
        />
        <div v-if="unit.feature">
          Special:
          <span class="text-green">{{ unit.feature }}</span>
        </div>
      </div>
    </div>
    <Checkout/>
  </div>
</template>

<script>
export default {
  props: ['unit'],
};
</script>
