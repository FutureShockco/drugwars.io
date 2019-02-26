<template>
  <div class="cost">
    Cost:
    <span
      class="ml-2 mr-2"
      :class="{ 'not-enough': drugsCost > drugsBalance }"
      v-if="drugsCost"
    >
      <Icon :size="18" name="drugs"/>
      {{ drugsCost | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': weaponsCost > weaponsBalance }"
      v-if="weaponsCost"
    >
      <Icon :size="18" name="weapons"/>
      {{ weaponsCost | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': alcoholsCost > alcoholsBalance }"
      v-if="alcoholsCost"
    >
      <Icon :size="18" name="alcohol"/>
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
  font-size: 15px;
  color: #c7c7c7;
  width: 100%;
  display: inline-flex;
  .not-enough {
    color: @error-color;
  }
  span{
    display: inline-flex;
  }
}
</style>
