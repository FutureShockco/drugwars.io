<template>
  <div
    class="d-flex flex-row border-bottom item mb-4"
    :class="{ progress: inProgress }"
  >
    <div class="mr-3">
      <img class="preview" :src="`/img/units/${unit.image}.png`">
    </div>
    <div class="item-content width-full mr-3 mb-4">
      <h5>{{ unit.name }}</h5>
      <Cost
        :drugsCost="unit.drugs_cost"
        :weaponsCost="unit.weapons_cost"
        :alcoholsCost="unit.alcohols_cost"
      />
      <div class="mb-2" v-html="unit.desc"></div>
      <div class="mb-2">
        <span class="mr-2">
          <i class="iconfont icon-target text-red"/>
          {{ unit.attack }}
        </span>
        <span class="mr-2">
          <i class="iconfont icon-shield1 text-blue"/>
          {{ unit.defense }}
        </span>
        <span class="mr-2">
          <i class="iconfont icon-run text-green"/>
          {{ unit.speed }}
        </span>
        <span class="mr-2">
          {{ unit.type }}
        </span>
      </div>
      <div class="mb-2">
        Point per unit: {{ unit.score }}
      </div>
      <div class="mb-2" v-if="unit.feature">
        Special:
        <span class="text-green">
          {{ unit.feature }}
        </span>
      </div>
    </div>
    <div>
      <Checkout
        :id="unit.id"
        :inProgress="inProgress"
        :price="unit.drugs_cost / 10000"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['unit'],
  computed: {
    inProgress() {
      return false;
    },
  },
};
</script>
