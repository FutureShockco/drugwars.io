<template>
    <div>
        <OverviewTabs />
        <div class="anim-fade-in" v-if="HQ && drugProductionRate && drugBalance">
            <div class="item">
                <div class="itemcompact">
                    <h5>DRUGS PRODUCTION</h5>
                </div>
                <BuildingProductionCompact v-for="building in drug_buildings" :building="building" :key="building.id" />
                <h4 class="columns">
                    <span class="column col-4">
                    Capacity: {{ drugStorage | amount }}
                    <p>
                      Full in:
                      <span
                        v-if="(drugStorage - drugBalance) / drugProductionRate * 1000 > 0"
                        class="text-green"
                      >{{ (drugStorage - drugBalance) / drugProductionRate * 1000 | ms}}</span>
                    <span v-else class="text-red">Now</span>
                    </p>
                    </span>
                    <span class="column col-4">
                    Safe:
                    <span class="text-green">{{ drugStorage /100*20 | amount }}</span>
                    <p>
                        Out of safe in:
                        <span v-if="((drugStorage/100*20)  - drugBalance) / drugProductionRate * 1000 > 0" class="text-green">{{ ((drugStorage/100*20) - drugBalance) / drugProductionRate * 1000 | ms}}</span>
                        <span v-else class="text-red">Now</span>
                    </p>
                    </span>
                    <span class="column col-4 text-right">
                    PRODUCTION: {{ drugProductionRate * 60 * 60 * 24 | amount }}/Day
                    <p>{{ drugProductionRate * 60 * 60 | amount }}/Hour</p>
                  </span>
                </h4>
            </div>
            <div class="item">
                <div class="itemcompact">
                    <h5>WEAPONS PRODUCTION</h5>
                </div>
                <BuildingProductionCompact v-for="building in weapon_buildings" :building="building" :key="building.id" />
                <h4 class="columns">
                    <span class="column col-4">
                    Capacity: {{ weaponStorage | amount }}
                    <p>
                      Full in:
                      <span
                        v-if="(weaponStorage - weaponBalance) / weaponProductionRate * 1000 > 0"
                        class="text-green"
                      >{{ (weaponStorage - weaponBalance) / weaponProductionRate * 1000 | ms}}</span>
                    <span v-else class="text-red">Now</span>
                    </p>
                    </span>
                    <span class="column col-4">
                    Safe:
                    <span class="text-green">{{ weaponStorage /100*20 | amount }}</span>
                    <p>
                        Out of safe in:
                        <span v-if="((weaponStorage/100*20)  - weaponBalance) / weaponProductionRate * 1000 > 0" class="text-green">{{ ((weaponStorage/100*20) - weaponBalance) / weaponProductionRate * 1000 | ms}}</span>
                        <span v-else class="text-red">Now</span>
                    </p>
                    </span>
                    <span class="column col-4 text-right">
                    PRODUCTION: {{ weaponProductionRate * 60 * 60 * 24 | amount }}/Day
                    <p>{{ weaponProductionRate * 60 * 60 | amount }}/Hour</p>
                  </span>
                </h4>
            </div>
            <div class="item">
                <div class="itemcompact">
                    <h5>ALCOHOL PRODUCTION</h5>
                </div>
                <BuildingProductionCompact v-for="building in alcohol_buildings" :building="building" :key="building.id" />
                <h4 class="columns">
                    <span class="column col-4">
                    Capacity: {{ alcoholStorage | amount }}
                    <p>
                      Full in:
                      <span
                        v-if="(alcoholStorage - alcoholBalance) / alcoholProductionRate * 1000 > 0"
                        class="text-green"
                      >{{ (alcoholStorage - alcoholBalance) / alcoholProductionRate * 1000 | ms}}</span>
                    <span v-else class="text-red">Now</span>
                    </p>
                    </span>
                    <span class="column col-4">
                    Safe:
                    <span class="text-green">{{ alcoholStorage /100*20 | amount }}</span>
                    <p>
                        Out of safe in:
                        <span v-if="((alcoholStorage/100*20)  - alcoholBalance) / alcoholProductionRate * 1000 > 0" class="text-green">{{ ((alcoholStorage/100*20) - alcoholBalance) / alcoholProductionRate * 1000 | ms}}</span>
                        <span v-else class="text-red">Now</span>
                    </p>
                    </span>
                    <span class="column col-4 text-right">
                    PRODUCTION: {{ alcoholProductionRate * 60 * 60 * 24 | amount }}/Day
                    <p>{{ alcoholProductionRate * 60 * 60 | amount }}/Hour</p>
                  </span>
                </h4>
            </div>
        </div>
        <div v-else class="p-2 text-center">
            <h2>You must choose a location on the map first.</h2>
        </div>
    </div>
</template>

<script>
import { buildings } from 'drugwars';
import { pickBy } from 'lodash';
import { getBalances } from '@/helpers/utils';

export default {
  data() {
    return {
      drug_buildings: pickBy(buildings, b => b.production_type === 'drugs') || [],
      weapon_buildings: pickBy(buildings, b => b.production_type === 'weapons') || [],
      alcohol_buildings: pickBy(buildings, b => b.production_type === 'alcohol') || [],
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
  },
};
</script>

<style scoped lang="less">
h5 {
  display: inline-flex;
}

h4 {
  font-size: 16px;
}

.columns {
  background: #181818;
  margin: 0px;
  padding-top: 10px;
  padding-bottom: 0px;
}

p {
  font-size: 16px;
}

h3 {
  margin: 0px;
}

.icon {
  margin-right: 5px !important;
}
</style>
