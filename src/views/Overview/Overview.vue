<template>
  <div>
    <OverviewTabs />
    <div class="anim-fade-in" v-if="HQ && drugProductionRate">
      <div class="item"> 
        <div class="itemcompact">
          <h5>DRUGS PRODUCTION</h5>
        </div>
        <BuildingProductionCompact
          v-for="building in drug_buildings"
          :building="building"
          :key="building.id"
        />
        <h4 class="columns">
          <div class="column col-6">
            Capacity: {{ drugStorage | amount }}
            <p>
              Full in:
              <span
                v-if="(drugStorage - drugBalance) / drugProductionRate * 1000 > 0"
                class="text-green"
              >{{ (drugStorage - drugBalance) / drugProductionRate * 1000 | ms}}</span>
              <span v-else class="text-red">Now</span>
            </p>
          </div>
          <div class="column col-6 text-right">
            Safe:
            <span class="text-green">{{ drugStorage /100*20 | amount }}</span>
            <p>
              Out of safe in:
              <span
                v-if="((drugStorage/100*20)  - drugBalance) / drugProductionRate * 1000 > 0"
                class="text-green"
              >{{ ((drugStorage/100*20) - drugBalance) / drugProductionRate * 1000 | ms}}</span>
              <span v-else class="text-red">Now</span>
            </p>
          </div>
          <div class="column col-6">
            PRODUCTION:
            <span class="text-orange">{{ drugProductionRate * 60 * 60 * 24 | amount }}</span>/Day <span class="text-yellow" v-if="booster">booster x2</span>
            <p>{{ drugProductionRate * 60 * 60 | amount }}/Hour</p>
          </div>
          <div class="column col-6 text-right">
            BONUS:
            <span class="text-orange">{{ drugBonus | amount }}</span>/Day <span class="text-yellow" v-if="booster">booster x2</span>
            <p>
              OP. CENTER:
              <span
                class="text-orange"
              >{{ (drugProductionRate * 60 * 60 * 24 )* ownOc * 0.005 | amount }}</span> - SC. LAB:
              <span
                class="text-orange"
              >{{ (drugProductionRate * 60 * 60 * 24 )* ownLab * 0.0025 | amount }}</span>
            </p>
          </div>
        </h4>
      </div>
      <div class="item">
        <div class="itemcompact">
          <h5>WEAPONS PRODUCTION</h5>
        </div>
        <BuildingProductionCompact
          v-for="building in weapon_buildings"
          :building="building"
          :key="building.id"
        />
        <h4 class="columns">
          <div class="column col-6">
            Capacity: {{ weaponStorage | amount }}
            <p>
              Full in:
              <span
                v-if="(weaponStorage - weaponBalance) / weaponProductionRate * 1000 > 0"
                class="text-green"
              >{{ (weaponStorage - weaponBalance) / weaponProductionRate * 1000 | ms}}</span> 
              <span v-else class="text-red">Now</span>
            </p>
          </div>
          <div class="column col-6 text-right">
            Safe:
            <span class="text-green">{{ weaponStorage /100*20 | amount }}</span>
            <p>
              Out of safe in:
              <span
                v-if="((weaponStorage/100*20)  - weaponBalance) / weaponProductionRate * 1000 > 0"
                class="text-green"
              >{{ ((weaponStorage/100*20) - weaponBalance) / weaponProductionRate * 1000 | ms}}</span> 
              <span v-else class="text-red">Now</span>
            </p>
          </div>
          <div class="column col-6">
             PRODUCTION:<span class="text-orange"> {{ weaponProductionRate * 60 * 60 * 24 | amount }}</span> /Day <span class="text-yellow" v-if="booster">booster x2</span>
            <p>{{ weaponProductionRate * 60 * 60 | amount }}/Hour</p>
          </div>
          <div class="column col-6 text-right">
            BONUS:
            <span class="text-orange">{{ weaponBonus | amount }}</span>/Day <span class="text-yellow" v-if="booster">booster x2</span>
            <p>
              OP. CENTER:
              <span
                class="text-orange"
              >{{ (weaponProductionRate * 60 * 60 * 24 )* ownOc * 0.005 | amount }}</span> - WEAP. CENTER:
              <span
                class="text-orange"
              >{{ (weaponProductionRate * 60 * 60 * 24 )* ownWC * 0.005 | amount }}</span>
            </p>
          </div>
        </h4>
      </div>
      <div class="item">
        <div class="itemcompact">
          <h5>ALCOHOL PRODUCTION</h5>
        </div>
        <BuildingProductionCompact
          v-for="building in alcohol_buildings"
          :building="building"
          :key="building.id"
        />
        <h4 class="columns">
          <div class="column col-6">
            Capacity: {{ alcoholStorage | amount }}
            <p>
              Full in:
              <span
                v-if="(alcoholStorage - alcoholBalance) / alcoholProductionRate * 1000 > 0"
                class="text-green"
              >{{ (alcoholStorage - alcoholBalance) / alcoholProductionRate * 1000 | ms}}</span>
              <span v-else class="text-red">Now</span>
            </p>
          </div>
          <div class="column col-6 text-right">
            Safe:
            <span class="text-green">{{ alcoholStorage /100*20 | amount }}</span>
            <p>
              Out of safe in:
              <span
                v-if="((alcoholStorage/100*20)  - alcoholBalance) / alcoholProductionRate * 1000 > 0"
                class="text-green"
              >{{ ((alcoholStorage/100*20) - alcoholBalance) / alcoholProductionRate * 1000 | ms}}</span>
              <span v-else class="text-red">Now</span>
            </p>
          </div>
          <div class="column col-6">
            PRODUCTION:  <span class="text-orange">{{ alcoholProductionRate * 60 * 60 * 24 | amount }}</span> /Day <span class="text-yellow" v-if="booster">booster x2</span>
            <p>{{ alcoholProductionRate * 60 * 60 | amount }}/Hour</p>
          </div>
          <div class="column col-6 text-right">
            BONUS:
            <span class="text-orange">{{ alcoholBonus | amount }}</span>/Day <span class="text-yellow" v-if="booster">booster x2</span>
            <p>
              OP. CENTER:
              <span
                class="text-orange"
              >{{ (alcoholProductionRate * 60 * 60 * 24 )* ownOc * 0.005 | amount }}</span> - DIST. SCHOOL:
              <span
                class="text-orange"
              >{{ (alcoholProductionRate * 60 * 60 * 24 )* ownDS * 0.005 | amount }}</span>
            </p>
          </div>
        </h4>
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
    booster() {
      const date = new Date().getTime() / 1000;
      return Number(this.$store.state.game.user.user.booster) > date;
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
        this.booster,
      );
    },
    booster() {
      const date = new Date().getTime() / 1000;
      return Number(this.$store.state.game.user.user.booster) > date;
    },
    ownOc() {
      let oc = 0;
      if (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'operation_center' &&
            b.territory === this.base.territory &&
            b.base === this.base.base,
        )
      )
        oc =
          this.$store.state.game.user.buildings.find(
            b =>
              b.building === 'operation_center' &&
              b.territory === this.base.territory &&
              b.base === this.base.base,
          ).lvl || 0;
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
        )
      ) {
        oc =
          this.$store.state.game.user.buildings.find(
            b =>
              b.building === 'operation_center' &&
              b.territory === this.base.territory &&
              b.base === this.base.base,
          ).lvl || 0;
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
        )
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
        )
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
  background: #181818;
  margin: 0px;
  padding-top: 10px;
  padding-bottom: 0px;
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
