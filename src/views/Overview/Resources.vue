<template>
  <div>
    <OverviewTabs />
    <div class="anim-fade-in" v-if="HQ && drugProductionRate">
      <div class="columns m-0 pt-4">
        <div class="row text-center">
             <h2>Resource inventory</h2>
        </div>
        <div class="column p-3 col-4 text-center" v-for="drug in drugs" :key="drug.id">
          <img :src="`//img.drugwars.io/icons/${drug.icon}`" width="36" height="36" />
          <div>
            <router-link v-if="drug.id" :to="`/market?token=DW${drug.name.substring(0,4).toUpperCase()}`">
          <h5 class="mt-0 mb-0"><span class="text-orange">{{drug.name}} </span></h5>
        </router-link>
          </div>
          <div>DW{{drug.name.substring(0,4).toUpperCase()}} : 0</div>
        </div>
      </div>
    </div>
    <div v-else class="p-2 text-center">
      <h2>You must choose a location on the map first.</h2>
    </div>
  </div>
</template>

<script>
import { buildings, drugs } from 'drugwars';
import { pickBy } from 'lodash';
import { getBalances } from '@/helpers/utils';

export default {
  data() {
    return {
      drug_buildings: pickBy(buildings, b => b.production_type === 'drugs') || [],
      weapon_buildings: pickBy(buildings, b => b.production_type === 'weapons') || [],
      alcohol_buildings: pickBy(buildings, b => b.production_type === 'alcohol') || [],
      drugs,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
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
      return { drug_balance: 0 };
    },
    drugStorage() {
      return this.HQ.drug_storage || 0;
    },
    weaponStorage() {
      return this.HQ.weapon_storage || 0;
    },
    alcoholStorage() {
      return this.HQ.alcohol_storage || 0;
    },
    drugBalance() {
      return this.balances.drugs || 0;
    },
    weaponBalance() {
      return this.balances.weapons || 0;
    },
    alcoholBalance() {
      return this.balances.alcohols || 0;
    },
    drugProductionRate() {
      return this.HQ.drug_production_rate || 1;
    },
    weaponProductionRate() {
      return this.HQ.weapon_production_rate || 1;
    },
    alcoholProductionRate() {
      return this.HQ.alcohol_production_rate || 1;
    },
    balances() {
      let ocLvl = 0;
      if (
        this.$store.state.game.user.buildings &&
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      ) {
        ocLvl = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      }

      let labLvl = 0;
      if (
        this.$store.state.game.gang_buildings &&
        this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
      )
        labLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
          .lvl;
      let weaponLvl = 0;
      if (
        this.$store.state.game.gang_buildings &&
        this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
      )
        weaponLvl = this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
          .lvl;
      let distilleryLvl = 0;
      if (
        this.$store.state.game.gang_buildings &&
        this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school')
      )
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
    ownOc() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl
      )
        oc = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      return oc;
    },
    ownLab() {
      let lab = 0;
      if (
        this.$store.state.game.gang_buildings &&
        this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab')
      )
        lab =
          this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab').lvl || 0;
      return lab;
    },
    ownWC() {
      let wc = 0;
      if (
        this.$store.state.game.gang_buildings &&
        this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center')
      )
        wc =
          this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center').lvl || 0;
      return wc;
    },
    ownDS() {
      let ds = 0;
      if (
        this.$store.state.game.gang_buildings &&
        this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school')
      )
        ds =
          this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school').lvl ||
          0;
      return ds;
    },
    drugBonus() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl
      ) {
        oc = this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl;
      }

      let labLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab'))
        labLvl =
          this.$store.state.game.gang_buildings.find(b => b.building === 'scientific_lab').lvl || 0;
      return parseFloat(
        this.drugProductionRate * 60 * 60 * 24 * oc * 0.005 +
          this.drugProductionRate * 60 * 60 * 24 * labLvl * 0.0025,
      ).toFixed(2);
    },
    weaponBonus() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl
      ) {
        oc =
          this.$store.state.game.user.buildings.find(
            b =>
              b.building === 'operation_center' &&
              b.territory === this.base.territory &&
              b.base === this.base.base,
          ).lvl || 0;
      }
      let weaponLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center'))
        weaponLvl =
          this.$store.state.game.gang_buildings.find(b => b.building === 'weapon_center').lvl || 0;
      return parseFloat(
        this.weaponProductionRate * 60 * 60 * 24 * oc * 0.005 +
          this.weaponProductionRate * 60 * 60 * 24 * weaponLvl * 0.005,
      ).toFixed(2);
    },
    alcoholBonus() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        ).lvl
      ) {
        oc =
          this.$store.state.game.user.buildings.find(
            b =>
              b.building === 'operation_center' &&
              b.territory === this.base.territory &&
              b.base === this.base.base,
          ).lvl || 0;
      }
      let distilleryLvl = 0;
      if (this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school'))
        distilleryLvl =
          this.$store.state.game.gang_buildings.find(b => b.building === 'distillery_school').lvl ||
          0;
      return parseFloat(
        this.alcoholProductionRate * 60 * 60 * 24 * oc * 0.005 +
          this.alcoholProductionRate * 60 * 60 * 24 * distilleryLvl * 0.005,
      ).toFixed(2);
    },
  },
};
</script>

<style scoped lang="less">
h5 {
  display: inline-flex;
}

h4 {
  font-size: 15px;
}

.columns {
  background: -webkit-gradient(linear, left top, left bottom, from(#0e111496), to(#000000cc)),
    url(//img.drugwars.io/fake-brick.png);
  background: linear-gradient(#0e111496, #000000cc), url(//img.drugwars.io/fake-brick.png);
  min-height: 86vh;
}

p {
  font-size: 15px;
}

h3 {
  margin: 0px;
}

.icon {
  margin-right: 5px !important;
}
</style>
