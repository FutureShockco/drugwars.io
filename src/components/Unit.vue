<template>
    <div class="d-flex flex-lg-row flex-column text-center text-lg-left item" :class="{ progress: inProgress }">
        <div class="item-content width-full mr-3 mb-4">
            <div class="mr-2 left-floated">
                <img class="preview unit" :src="`/img/units/${unit.id}.png`">
                <div class="skill-icons text-center">
                </div>
            </div>
            <div class="level">{{ ownItem.amount }}</div>
            <h5 class="mt-0 mb-0">{{ unit.name }} <span class="unit-type">{{ unit.type }}</span></h5>
            <Cost :drugsCost="unit.drugs_cost" :weaponsCost="unit.weapons_cost" :alcoholsCost="unit.alcohols_cost" :quantity="quantity" />Supply : {{unit.supply}} - Cluster : {{unit.group}}
            <div class="mb-1 mt-1" v-html="unit.desc"></div>
            <div class="mb-1 item-skill" v-if="unit.feature">
                <span class="text-orange">
                     {{ unit.feature }}
            </span>
            </div>
            <UnitValues :unit="unit" :modifiedValues="modifiedValues" :speed="speed" />
    
        </div>
        <div class="mx-auto">
            <input class="input form-control input-block mb-2" type="number" v-model="quantity" min="1">
            <CheckoutRecruit :id="unit.id" :level="training_facility.lvl" :coeff="unit.coeff" :inProgress="inProgress" :price="unit.drugs_cost / 150000  + unit.weapons_cost / 150000 + unit.alcohols_cost / 150000 " :notEnough="hasNotEnough" :quantity="quantity" />
        </div>
    </div>
</template>

<script>
import { getBalances, unitValues } from '@/helpers/utils';

export default {
  props: ['unit'],
  watch: {
    inProgress(val) {
      if (val) {
        this.waitingConfirmation = false;
      }
    },
  },
  data() {
    return {
      quantity: 1,
      isLoading: false,
      waitingConfirmation: false,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    modifiedValues() {
      const trainings = this.$store.state.game.user.trainings || [];
      if (trainings.length > 0) {
        return unitValues(this.unit, trainings);
      }
      return this.unit;
    },
    speed() {
      let routing = 0;
      if (this.$store.state.game.user.trainings.find(b => b.training === 'routing'))
        routing = this.$store.state.game.user.trainings.find(b => b.training === 'routing').lvl;
      const speed = this.unit.speed * 60 * 1000;
      return speed - (speed / 200) * routing;
    },
    base() {
      return this.$store.state.game.mainbase;
    },
    HQ() {
      if (
        this.base &&
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      ) {
        return this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'headquarters' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        );
      }
      return this.$store.state.game.user.buildings.find(b => b.building === 'headquarters');
    },
    balances() {
      let ocLvl = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        ocLvl = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
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
        this.HQ,
        ocLvl,
        labLvl,
        weaponLvl,
        distilleryLvl,
        this.$store.state.ui.timestamp,
      );
    },
    hasNotEnough() {
      return (
        this.unit.drugs_cost * this.quantity > this.balances.drugs ||
        this.unit.weapons_cost * this.quantity > this.balances.weapons ||
        this.unit.alcohols_cost * this.quantity > this.balances.alcohols
      );
    },
    ownItem() {
      return (
        this.$store.state.game.user.units.find(
          b =>
            b.unit === this.unit.id &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          amount: 0,
        }
      );
    },
    inProgress() {
      if (!this.ownItem) return false;
      if (this.ownItem.pending_update) {
        const pendingUpdate = new Date(this.ownItem.pending_update).getTime();
        const now = new Date().getTime();
        return pendingUpdate >= now;
      }
      const nextUpdate = new Date(this.ownItem.next_update).getTime();
      const now = new Date().getTime();
      return nextUpdate >= now;
    },
    training_facility() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'training_facility' &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          lvl: 0,
        }
      );
    },
  },
};
</script>


<style scoped lang="less">
.skill-icons {
  position: relative;
  top: -25px;
  left: 0px;
  max-width: 100px;
}

.skill-defense {
  font-size: 12px;
}

.unit-type {
  font-size: 12px;
  color: gray;
}
</style>
