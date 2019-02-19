<template>
<div>
  <div v-if="this.level">
    <span v-if="this.drugs_cost">
      <Icon :size="18" :color="'#fbbd08'" :icon="'drugs'"/>
      {{ drugs_cost * (level+1*(level+1)*(2*(level+1)))/5 }}
    </span>
    <span v-if="weapons_cost">
      <Icon :size="18" :color="'#fbbd08'" :icon="'weapons'"/>
      {{ weapons_cost * (level+1*(level+1)*(2*(level+1)))/5 }}
    </span>
    <span v-if="alcohols_cost">
      <Icon :size="18" :color="'#fbbd08'" :icon="'alcohol'"/>
      {{ alcohols_cost * (level+1*(level+1)*(2*(level+1)))/5 }}
    </span>
  </div>
    <div v-if="amount">
    <span v-if="drugs_cost">
      <Icon :size="18" :color="'#fbbd08'" :icon="'drugs'"/>
      {{ drugs_cost * amount }}
    </span>
    <span v-if="weapons_cost">
      <Icon :size="18" :color="'#fbbd08'" :icon="'weapons'"/>
      {{ weapons_cost * amount }}
    </span>
    <span v-if="alcohols_cost">
      <Icon :size="18" :color="'#fbbd08'" :icon="'alcohol'"/>
      {{ alcohols_cost * amount }}
    </span>
  </div>
   </div>
</template>

<script>
export default {
  props: ['type', 'level', 'amount', 'drugs_cost', 'weapons_cost', 'alcohols_cost'],
};
</script>
