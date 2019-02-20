<template>
  <div class="mb-4 d-flex flex-row border-bottom item">
    <img class="preview" :src="`/img/units/${unit.image}.png`">
    <div class="width-full mr-4">
        <h5>{{ unit.name }}</h5>
      <div class="item-description my-1">
        <div class="ml-2" v-html="unit.desc"></div>
      </div>
      <div v-if="unit.feature" class="ml-2 item-special">
          Special:
          <span class="text-green">{{ unit.feature }}</span>
        </div>
      <div class="ml-2 item-special">
       Attack : {{ unit.attack }}
       Defense : {{ unit.defense }}
       Speed : {{ unit.speed }}
       Capacity : {{ unit.capacity }}
        <UnitCost
          :amount="1"
          :drugs_cost="unit.drugs_cost"
          :weapons_cost="unit.weapons_cost"
          :alcohols_cost="unit.alcohols_cost"
        />
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
