<template>
  <div class="mb-4 d-flex flex-row border-bottom item">
    <img class="preview" :src="`/img/units/${unit.image}.png`">
    <div class="width-full mr-4">
      <div class="my-1 ml-2 ">
        <h5>{{ unit.name }}</h5>
        <div class="item-description" v-html="unit.desc"></div>
        <div v-if="unit.feature" class="item-special">
          Special: <span class="text-green">{{ unit.feature }}</span>
        </div>
        <div class="item-special">
         Attack : {{ unit.attack }}
         Defense : {{ unit.defense }}
         Speed : {{ unit.speed }}
         Capacity : {{ unit.capacity }}
        </div>
        <Cost
          :amount="1"
          :drugsCost="unit.drugs_cost"
          :weaponsCost="unit.weapons_cost"
          :alcoholsCost="unit.alcohols_cost"
        />
      </div>
    </div>
    <CheckoutUnit/>
  </div>
</template>

<script>
export default {
  props: ['unit'],
};
</script>
