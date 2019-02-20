<template>
  <div class="cost">
    <div v-if="amount">
      <span v-if="drugs_cost">
        <Icon :size="18" :color="'#fbbd08'" :icon="'drugs'"/>
        {{ drugs_cost * amount | amount }}
      </span>
      <span v-if="weapons_cost">
        <Icon :size="18" :color="'#fbbd08'" :icon="'weapons'"/>
        {{ weapons_cost * amount | amount }}
      </span>
      <span v-if="alcohols_cost">
        <Icon :size="18" :color="'#fbbd08'" :icon="'alcohol'"/>
        {{ alcohols_cost * amount | amount }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['type', 'level', 'amount', 'drugs_cost', 'weapons_cost', 'alcohols_cost'],
};
</script>

<style scoped lang="less">
.cost div span {
  font-weight: 600;
  font-size: 15px;
  color: #c7c7c7;
  display: inline-flex;
  margin-right: 5px;
  line-height: 17px;
}
.cost .icon {
  margin-right: 5px;
}
</style>
