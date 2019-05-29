<template>
  <div class="cost">
    <span class="mr-2">
      Cost:
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': drugsCost * this.quantity > balances.drugs }"
      v-if="drugsCost"
    >
      <Icon :size="18" name="drug"/>
      {{ drugsCost * this.quantity | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': weaponsCost * this.quantity > balances.weapons }"
      v-if="weaponsCost"
    >
      <Icon :size="18" name="weapon"/>
      {{ weaponsCost * this.quantity | amount}}
    </span>
    <span
      class="mr-2"
      :class="{ 'not-enough': alcoholsCost * this.quantity > balances.alcohols }"
      v-if="alcoholsCost"
    >
      <Icon :size="18" name="alcohol"/>
      {{ alcoholsCost * this.quantity | amount}}
    </span>
  </div>
</template>

<script>
export default {
  props: ['type', 'level', 'quantity', 'drugsCost', 'weaponsCost', 'alcoholsCost'],
  computed: {
    balances() {
      let ocLvl = 0;
      if (this.$store.state.game.user.buildings.find(b => b.building === 'operation_center'))
        ocLvl = this.$store.state.game.user.buildings.find(b => b.building === 'operation_center')
          .lvl;
      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab'))
        labLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
          .lvl;
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center'))
        weaponLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
          .lvl;
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school'))
        distilleryLvl = this.$store.state.game.gang_buildings.find(
          b => b.building === 'distillery_school',
        ).lvl;
      return getBalances(
        this.user,
        ocLvl,
        labLvl,
        weaponLvl,
        distilleryLvl,
        this.$store.state.ui.timestamp,
      );
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars';

.cost {
  font-weight: 500;
  font-size: 16px;
  color: #c7c7c7;
  display: inline-flex;
  line-height: 20px;
  font-family: @heading-font;
  span {
    display: inline-flex;
  }
  .icon {
    margin-right: 5px;
  }

  .not-enough {
    color: @error-color;
  }
}
</style>
