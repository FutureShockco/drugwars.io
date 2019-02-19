<template>
<div>
  <div v-if="this.level">
    <span v-if="this.drugs_cost">
      <Icon size="18" :color="'#fbbd08'" :icon="'drugs'"/>
      {{ this.drugs_cost * (this.level+1*(this.level+1)*(2*(this.level+1)))/5 }}
    </span>
    <span v-if="this.weapons_cost">
      <Icon size="18" :color="'#fbbd08'" :icon="'weapons'"/>
      {{ this.weapons_cost * (this.level+1*(this.level+1)*(2*(this.level+1)))/5 }}
    </span>
    <span v-if="this.alcohols_cost">
      <Icon size="18" :color="'#fbbd08'" :icon="'alcohol'"/>
      {{ this.alcohols_cost * (this.level+1*(this.level+1)*(2*(this.level+1)))/5 }}
    </span>
  </div>
    <div v-if="this.amount">
    <span v-if="this.drugs_cost">
      <Icon size="18" :color="'#fbbd08'" :icon="'drugs'"/>
      {{ this.drugs_cost * this.amount }}
    </span>
    <span v-if="this.weapons_cost">
      <Icon size="18" :color="'#fbbd08'" :icon="'weapons'"/>
      {{ this.weapons_cost * this.amount }}
    </span>
    <span v-if="this.alcohols_cost">
      <Icon size="18" :color="'#fbbd08'" :icon="'alcohol'"/>
      {{ this.alcohols_cost * this.amount }}
    </span>
  </div>
   </div>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 32,
      required: true,
    },
    level: {
      type: Number,
      default: 32,
    },
    amount: {
      type: Number,
      default: 32,
    },
    drugs_cost: {
      type: Number,
      default: 32,
      required: true,
    },
    weapons_cost: {
      type: Number,
      default: 32,
      required: true,
    },
    alcohols_cost: {
      type: Number,
      default: 32,
      required: true,
    },
  },
};
</script>