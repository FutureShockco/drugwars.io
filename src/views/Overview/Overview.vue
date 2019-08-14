<template>
  <div>
    <OverviewTabs/>
    <div v-if="HQ && drugProductionRate && drugBalance">
      <div class="item">
      <div class="itemcompact">
        <h5><Icon name="drug" size="32"/> DRUGS PRODUCTION  </h5>
      </div>
      <BuildingProductionCompact
        v-for="building in drug_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="pt-2">
        <h4 class="text-center">
          <span> Total: {{ drugProductionRate * 60 * 60 * 24 | amount }}/Day <p>{{ drugProductionRate * 60 * 60 | amount }}/Hour</p></span>
          <span> Full in : <p>{{ (drugStorage - drugBalance) / drugProductionRate * 1000 | ms}}</p></span>
          <span>Total capacity : {{ drugStorage | amount }}</span>
          <span class="text-green"> Safe : {{ drugStorage /100*25 | amount }} </span>
        </h4>
        </div>
        </div>
        <div class="item">
        <div class="itemcompact">
        <h5> <Icon name="weapon" size="32"/>WEAPONS PRODUCTION  </h5>
      </div>
      <BuildingProductionCompact
        v-for="building in weapon_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="pt-2">
         <h4 class="text-center">
        <span > Total: {{ weaponProductionRate * 60 * 60 * 24 | amount }}/Day - <p>{{ weaponProductionRate * 60 * 60 | amount }}/Hour</p></span>
          <span > Full in :  <p>{{ (weaponStorage - weaponBalance) / weaponProductionRate * 1000 | ms }}</p></span>
             <span >Total capacity : {{ weaponStorage | amount }}</span>
          <span class="text-green"> Safe : {{ weaponStorage /100*25 | amount }}</span>
        </h4>
     
      </div>
      </div>
       <div class="item">
      <div class="itemcompact">
        <h5><Icon name="alcohol" size="32"/>ALCOHOL PRODUCTION  </h5>
      </div>
        <BuildingProductionCompact
        v-for="building in alcohol_buildings"
        :building="building"
        :key="building.id"
      />
      <div class="pt-2">
        <h4 class="text-center">
          <span> Total: {{ alcoholProductionRate * 60 * 60 * 24 | amount }}/Day - <p>{{ alcoholProductionRate * 60 * 60 | amount }}/Hour</p></span>
          <span> Full in : <p>{{ (alcoholStorage - alcoholBalance) / alcoholProductionRate * 1000 | ms}}</p></span>
        <span> Total capacity : {{ alcoholStorage | amount }}</span>
          <span class="text-green"> Safe : {{ alcoholStorage /100*25 | amount }}</span>
                  </h4>
        </div>
      </div>
    </div>
      <div  v-else class="p-2 text-center">
           <h2>  You must choose a location on the map first.</h2>
               </div>
  </div>
</template>

<script>
import { buildings } from 'drugwars';
import { pickBy } from 'lodash';

export default {
  data() {
    return {
      drug_buildings: pickBy(buildings, b => b.production_type === 'drugs') || [],
      weapon_buildings: pickBy(buildings, b => b.production_type === 'weapons') || [],
      alcohol_buildings: pickBy(buildings, b => b.production_type === 'alcohol') || [],
    };
  },
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    user() {
      return this.$store.state.game.user.user;
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
      return null;
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
      return this.HQ.drug_balance || 0;
    },
    weaponBalance() {
      return this.HQ.weapon_balance || 0;
    },
    alcoholBalance() {
      return this.HQ.alcohol_balance || 0;
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
  },
};
</script>

<style scoped lang="less">
h5 {
  display: inline-flex;
}

h4{
  font-size: 16px;
}

h3 {
  margin: 0px;
}

.icon {
  margin-right: 5px !important;
}
</style>
