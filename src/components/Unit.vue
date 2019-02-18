<template>
  <div class="mb-4 d-flex flex-row border-bottom pb-4">
    <div class="mr-4">
      <img class="preview rounded-2" :src="`/img/units/${unit.image}.png`"/>
    </div>
    <div class="width-full">
      <h5 class="item-title">{{ unit.name }}</h5>
      <div class="item-description">{{ unit.desc }}</div>
      <div>
        {{ unit.attack }}
        {{ unit.defense }}
        {{ unit.speed }}
        <div>
          Point per unit: {{ unit.score }}
        </div>
        <div v-if="unit.feature">
          Special: {{ unit.feature }}
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
