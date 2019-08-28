<template>
    <div class="d-flex flex-lg-row flex-column text-center text-lg-left item" :class="{ progress: inProgress, 'not-enough': hasNotEnough }">
        <div class="mr-3">
            <img class="preview" :src="`/img/trainings/${training.id}.jpg`">
        </div>
        <div class="level">{{ ownItem.lvl }}</div>
        <div class="item-content width-full mr-3 mb-4">
            <h5>{{ training.name }}</h5>
            <Cost :drugsCost="drugsCost" :weaponsCost="weaponsCost" :alcoholsCost="alcoholsCost" :quantity="1" />
            <div class="mb-2" v-html="training.desc"></div>
            <div v-if="training.feature" class="mb-2">
                <span class="text-orange">{{ training.feature }}</span>
            </div>
        </div>
        <div>
        </div>
        <div class="mx-auto">
            <CheckoutTraining :id="training.id" :level="ownItem.lvl + 1" :coeff="training.coeff" :researchCenterLvl="ownResearchCenter.lvl" :inProgress="inProgress" :price="drugsCost / 80000" :notEnough="hasNotEnough" />
        </div>
    </div>
</template>

<script>
import { utils } from 'drugwars';
import { getBalances } from '@/helpers/utils';

export default {
  props: ['training'],
  computed: {
    user() {
      return this.$store.state.game.user.user;
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
    hasNotEnough() {
      return (
        this.drugsCost > this.balances.drugs ||
        this.weaponsCost > this.balances.weapons ||
        this.alcoholsCost > this.balances.alcohols
      );
    },
    ownItem() {
      return (
        this.$store.state.game.user.trainings.find(b => b.training === this.training.id) || {
          lvl: 0,
        }
      );
    },
    ownResearchCenter() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'research_center' &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          lvl: 0,
        }
      );
    },
    drugsCost() {
      return utils.calculateCostToUpgrade(this.training.drugs_cost, this.ownItem.lvl);
    },
    weaponsCost() {
      return utils.calculateCostToUpgrade(this.training.weapons_cost, this.ownItem.lvl);
    },
    alcoholsCost() {
      return utils.calculateCostToUpgrade(this.training.alcohols_cost, this.ownItem.lvl);
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
  },
};
</script>
