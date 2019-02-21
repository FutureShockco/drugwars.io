<template>
  <div class="cost mb-2">
    Cost:
    <span
      class="mr-2"
      :class="{ 'not-enought': drugsCost > drugsBalance }"
      v-if="drugsCost"
    >
      <Icon :size="18" :color="'#fbbd08'" icon="drugs"/>
      {{ drugsCost | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enought': weaponsCost > weaponsBalance }"
      v-if="weaponsCost"
    >
      <Icon :size="18" :color="'#fbbd08'" icon="weapons"/>
      {{ weaponsCost | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enought': alcoholsCost > alcoholsBalance }"
      v-if="alcoholsCost"
    >
      <Icon :size="18" :color="'#fbbd08'" icon="alcohol"/>
      {{ alcoholsCost | amount}}
    </span>
  </div>
</template>

<script>
export default {
  props: ['type', 'level', 'amount', 'drugsCost', 'weaponsCost', 'alcoholsCost'],
  computed: {
    drugsBalance() {
      return this.$store.state.game.user.drugs_balance;
    },
    weaponsBalance() {
      return this.$store.state.game.user.user.weapons_balance;
    },
    alcoholsBalance() {
      return this.$store.state.game.user.user.alcohols_balance;
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars';

.cost {
  font-weight: 600;
  font-size: 15px;
  color: #c7c7c7;
  display: inline-flex;
  .not-enought {
    color: @error-color;
  }
}

.cost span {
  margin-left: 5px;
  display: inline-flex;
}
.cost span img {
  margin-right: 5px;
}
</style>
