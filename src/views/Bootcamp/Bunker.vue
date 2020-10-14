<template>
  <div>
    <div v-if="ownBase">
      <BootcampTabs />
      <div v-if="ownBase && !bunker || !bunker.lvl" class="p-4 container-lg clearfix anim-fade-in text-center">
        <h2>  You must build a bunker first.</h2>
      </div>
      <div v-else  class="p-4 container-lg clearfix anim-fade-in text-center">
        <div
            v-if="ownUnits.length > 0 && !defenders || defenders.length <1"
            class="p-2 text-center"
          >Your bunker is empty.
          </div>
          <div v-else class="mt-4 mb-2">
            <h3>Units in the bunker</h3>
            <ArmyToSend :units="defenders" :disableicon="true" />
            <h5 class="mt-0">Army Value</h5>
            <h5
              class="mt-0"
            >Drugs: {{defendercost.drugs |amount}} - Weapons: {{defendercost.weapons |amount}} - Alcohol: {{defendercost.alcohol |amount}}</h5>
            <h5 class="mt-0">Power: {{defenderOffensivePower}}%</h5>
            <h5 class="mt-0">Supply: {{defendersupply |amount}} / {{maxSupply | amount}}</h5>
                      <button
            :disabled="!defenders || isLoading"
            class="button button-large button-red mb-5 "
            @click="handleRelease()"
          >
            <SmallLoading v-if="isLoading" />
            <span v-else>Release units</span>
          </button>
          </div>
        <div v-if="ownUnits.length > 0" class="column col-12 flex-md-items-start mt-0">
          <h3 class="mb-0 mt-0">Select units to hide</h3>
          <div v-if="showUnits && ownUnits && ownUnits.length > 0">
            <div v-for="ownUnit in ownUnits" :key="ownUnit.key+ownBase.territory+ownBase.base">
              <UnitSelect v-if="ownUnit.amount > 0" :item="ownUnit" @click="addUnit" />
            </div>
          </div>
          <div v-else>You must buy troops</div>
        </div>
           <button v-if="ownUnits.length > 0" class="button button-green mt-2 mb-2" :disabled="ownUnits.length === 0" @click="autoFill()">AutoFill</button>

        <div v-if="ownUnits.length > 0" class="column col-12">
          <div class="mb-2">
            <h3 class="mb-2">Your selected army</h3>
            <ArmyToSend :units="selectedUnits" />
          </div>
          <div class="mb-0 form width-full">
            <div v-if="selectedUnits.length === 0">
              <p>You need to select at least 1 unit to defend this base.</p>
            </div>
            <div v-else>
              <h5 class="mt-0">Defenders Value</h5>
              <h5
                class="mt-0"
                
              >Drugs: {{cost.drugs |amount}} - Weapons: {{cost.weapons |amount}} - Alcohol: {{cost.alcohol |amount}}</h5>
              <h5 class="mt-0">Power: {{offensivePower}}%</h5>
              <h5 class="mt-0">Supply: {{supply |amount}} / {{maxSupply | amount}}</h5>
              <button class="button button-blue mb-2" @click="removeUnits()">Remove all</button>
            </div>
          </div>
          <div v-if="defenders && defenders.length>0" class="mb-3">Please release your units before adding new units.</div>
          <button
            :disabled="defenders.length>0 || tooMuchSupply || selectedUnits.length === 0 || isLoading"
            class="button button-large button-red mb-5 "
            @click="handleSave()"
          >
            <SmallLoading v-if="isLoading" />
            <span v-else>Save</span>
          </button>

          <p class="text-red text-left" v-if="errorMessage">{{ errorMessage }}</p>
        </div>
        <h2 class="text-center" v-else>
          You don't have any unit.
          <div>
            <router-link :to="`/units`" class="text-yellow">Click here to start to recruit</router-link>
          </div>
        </h2>
      </div>
    </div>
    <div v-else class="p-2 text-center">
      <h2>You must choose a location on the map first.</h2>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';
import { units } from 'drugwars';
import Promise from 'bluebird';
import draggable from 'vuedraggable';

export default {
  data() {
    return {
      isLoading: false,
      base: this.$route.query.base || null,
      selectedUnits: [],
      message: null,
      username: this.$store.state.auth.username,
      errorMessage: null,
      baseName: null,
      favoriteCombinations: JSON.parse(localStorage.getItem('fav_combi_def')) || null,
      combination_name: null,
      units: [],
      bases: [],
      defenders: [],
      active: false,
      showUnits: true,
    };
  },
  components: {
    draggable,
  },
  created() {
    this.isLoading = true;
    this.loadDefenders();
  },
  watch: {
    ownBase() {
      this.loadDefenders();
    },
    ownUnits() {
      const units = [];
      this.storeUnits.forEach(element => {
        if (
          element.territory === this.ownBase.territory &&
          element.base === this.ownBase.base &&
          element.amount > 0
        )
          units.push({
            key: element.unit,
            amount: element.amount,
          });
      });
      return units;
    },
  },
  computed: {
    ownBase() {
      return this.$store.state.game.mainbase;
    },
    allbase() {
      return this.$store.state.game.user.buildings || null;
    },
    nickname() {
      return this.$store.state.game.user.user.nickname;
    },
    user() {
      return this.$store.state.game.user.user;
    },
    ownUnits() {
      const units = [];
      const self = this;
      this.showUnits = false;
      this.storeUnits.forEach(element => {
        if (
          element.territory === this.ownBase.territory &&
          element.base === this.ownBase.base &&
          element.amount > 0
        )
          units.push({
            key: element.unit,
            amount: element.amount,
          });
      });
      setTimeout(() => {
        self.showUnits = true;
      }, 100);
      return units;
    },
    storeUnits() {
      return this.$store.state.game.user.units;
    },
    defendersupply() {
      let supply = 0;
      if (this.defenders.length > 0)
        this.defenders.forEach(unit => {
          supply += units[unit.key].supply * unit.amount;
        });
      return supply;
    },
    supply() {
      let supply = 0;
      this.selectedUnits.forEach(unit => {
        supply += units[unit.key].supply * unit.amount;
      });
      return supply;
    },
    defensivePower() {
      let supply = 0;
      let power = 0;
      this.$store.state.game.user.units.forEach(unit => {
        supply += units[unit.unit].supply;
      });
      power = Math.round(100 - parseFloat(supply / 5).toFixed(0) / 100);
      const coordination = this.$store.state.game.user.trainings.find(
        b => b.key === 'coordination' || b.training === 'coordination',
      );
      if (coordination) power += parseInt(coordination.lvl) / 10;
      if (power >= 100) return 100;
      if (power >= 65) return power;
      return 65;
    },
    offensivePower() {
      let supply = 0;
      let power = 0;
      this.selectedUnits.forEach(unit => {
        supply += units[unit.key].supply * unit.amount;
      });
      power = Math.round(100 - parseFloat(supply / 6).toFixed(0) / 100);
      const coordination = this.$store.state.game.user.trainings.find(
        b => b.key === 'coordination' || b.training === 'coordination',
      );
      if (coordination) power += parseInt(coordination.lvl) / 10;
      if (power >= 100) return 100;
      if (power >= 60) return power;
      return 60;
    },
    defenderOffensivePower() {
      let supply = 0;
      let power = 0;
      this.defenders.forEach(unit => {
        supply += units[unit.key].supply * unit.amount;
      });
      power = Math.round(100 - parseFloat(supply / 6).toFixed(0) / 100);
      const coordination = this.$store.state.game.user.trainings.find(
        b => b.key === 'coordination' || b.training === 'coordination',
      );
      if (coordination) power += parseInt(coordination.lvl) / 10;
      if (power >= 100) return 100;
      if (power >= 65) return power;
      return 65;
    },
    cost() {
      const self = this;
      const cost = { drugs: 0, weapons: 0, alcohol: 0 };
      this.selectedUnits.forEach(unit => {
        cost.drugs += units[unit.key].drugs_cost * unit.amount;
        cost.weapons += units[unit.key].weapons_cost * unit.amount;
        cost.alcohol += units[unit.key].alcohols_cost * unit.amount;
      });
      return cost;
    },
    defendercost() {
      const self = this;
      const cost = { drugs: 0, weapons: 0, alcohol: 0 };
      if (this.defenders && this.defenders.length > 0)
        this.defenders.forEach(unit => {
          cost.drugs += units[unit.key].drugs_cost * unit.amount;
          cost.weapons += units[unit.key].weapons_cost * unit.amount;
          cost.alcohol += units[unit.key].alcohols_cost * unit.amount;
        });
      return cost;
    },
    maxSupply() {
      const max_supply = this.bunker.lvl * 2000;
      return max_supply;
    },
    tooMuchSupply() {
      return this.supply > this.maxSupply;
    },
    bunker() {
      return (
        this.$store.state.game.user.buildings.find(
          b =>
            b.building === 'bunker' &&
            b.base === this.$store.state.game.mainbase.base &&
            b.territory === this.$store.state.game.mainbase.territory,
        ) || {
          lvl: 0,
        }
      );
    },
  },
  methods: {
    ...mapActions(['missions', 'init', 'get_bases', 'setBase']),
    loadDefenders() {
      this.defenders = [];
      const params = { base: this.ownBase.base, territory: this.ownBase.territory };
      client.requestAsync('get_defenders', params).then(result => {
        if (result && result[0] && result[0].json) {
          this.defenders = JSON.parse(result[0].json).units;
        }
        this.isLoading = false;
      });
    },
    autoFill() {
      const fillunits = [];
      this.ownUnits.forEach(element => {
        if (element.key !== 'spy' && element.key !== 'occupation_troop' && element.key !== 'hobo') {
          fillunits.push(element);
        }
      });
      fillunits.forEach(element => {
        if (
          !this.selectedUnits.find(u => u.key === element.key) &&
          this.supply < (this.maxSupply / 100) * 85
        ) {
          let amount = Math.floor(this.maxSupply / fillunits.length / units[element.key].supply);
          if (amount > element.amount) {
            amount = element.amount;
          }
          this.selectedUnits.push({
            key: element.key,
            amount,
          });
          fillunits.splice(0, 1);
        }
      });
      this.autoFill();
    },
    resetForm() {
      this.target = null;
      this.base = null;
      this.selectedUnits = [];
      this.message = null;
      this.target_type = null;
    },
    chooseBase(territory, location, custom) {
      this.target = territory;
      this.base = location;
      this.farm_name = `${this.targetNickname} ${custom}`;
    },
    removeUnits() {
      this.selectedUnits = [];
    },
    handleSave() {
      this.isLoading = true;
      const self = this;
      let payload = {};
      payload = {
        from_territory: Number(self.ownBase.territory),
        from_base: Number(self.ownBase.base),
        units: this.selectedUnits,
        type: 'save-defense',
      };
      this.missions(payload)
        .then(() => {
          Promise.delay(3000).then(() => {
            self.loadDefenders();
            self.init();
            this.isLoading = false;
          });
        })
        .catch(e => {
          console.error('Failed to start a fight=', e);
          this.isLoading = false;
        });
    },
    handleRelease() {
      this.isLoading = true;
      const self = this;

      let payload = {};
      payload = {
        from_territory: Number(self.ownBase.territory),
        from_base: Number(self.ownBase.base),
        type: 'release-defense',
      };
      this.missions(payload)
        .then(() => {
          Promise.delay(3000).then(() => {
            self.loadDefenders();
            self.init();
            this.isLoading = false;
          });
        })
        .catch(e => {
          console.error('Failed to start a fight=', e);
          this.isLoading = false;
        });
    },
    async validateForm(type) {
      this.errorMessage = null;
      if (this.selectedUnits.length === 0) this.errorMessage = 'Please select some units';
      if (this.errorMessage) {
        return false;
      }
      return !this.errorMessage;
    },
    addUnit(payload) {
      const amount = parseInt(payload.amount);
      const selectedUnitsObj = {};
      const ownUnit = this.ownUnits.find(unit => unit.key === payload.key);

      this.selectedUnits.forEach(unit => {
        selectedUnitsObj[unit.key] = unit.amount;
      });
      selectedUnitsObj[payload.key] = !selectedUnitsObj[payload.key]
        ? amount
        : amount + parseInt(selectedUnitsObj[payload.key]);
      if (selectedUnitsObj[payload.key] > ownUnit.amount) {
        selectedUnitsObj[payload.key] = parseInt(ownUnit.amount);
      }
      if (selectedUnitsObj[payload.key] < 0) {
        selectedUnitsObj[payload.key] = 0;
      }

      this.selectedUnits = Object.keys(selectedUnitsObj).map(key => ({
        key,
        amount: selectedUnitsObj[key],
      }));
    },

    serialize(obj) {
      const str = [];
      for (const p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }
      return str.join('&');
    },
    onEnd() {
      localStorage.setItem('fav_combi_def', JSON.stringify(this.favoriteCombinations));
    },
    saveCombination() {
      let favs = [];
      if (localStorage.getItem('fav_combi_def')) {
        favs = JSON.parse(localStorage.getItem('fav_combi_def'));
      }
      const myarmy = this.selectedUnits.map(unit => ({
        key: unit.key,
        amount: unit.amount,
      }));

      const combi = {};
      combi.name = this.combination_name;
      combi.set = myarmy;
      favs.push(combi);
      this.favoriteCombinations = favs;
      this.combination_name = null;
      localStorage.setItem('fav_combi_def', JSON.stringify(favs));
    },
    loadCombination(combination) {
      const combinationtoload = [];
      combination.forEach(unit => {
        if (
          this.ownUnits.find(lunit => lunit.key === unit.key) &&
          unit.amount <= this.ownUnits.find(lunit => lunit.key === unit.key).amount
        ) {
          combinationtoload.push(unit);
        } else {
          if (this.ownUnits.find(lunit => lunit.key === unit.key))
            unit.amount = this.ownUnits.find(lunit => lunit.key === unit.key).amount;
          combinationtoload.push(unit);
        }
      });
      this.selectedUnits = combinationtoload;
    },
    deleteCombination(combination) {
      let favs = [];
      if (localStorage.getItem('fav_combi_def')) {
        favs = JSON.parse(localStorage.getItem('fav_combi_def'));
      }
      for (let i = 0; i < favs.length; i += 1) {
        if (favs[i].name === combination) {
          favs.splice(i, 1);
          i -= 1;
        }
      }
      localStorage.setItem('fav_combi_def', JSON.stringify(favs));
      this.favoriteCombinations = favs;
    },
  },
};
</script>


<style scoped lang="less">
.width-full {
  max-width: 100%;
}

.vue-ui-modal {
  background: rgba(0, 0, 0, 0.7);
  overflow-y: scroll;
}

.farm {
  background: rgba(0, 0, 0, 0.9);
}

@media screen and (min-width: 399px) and (max-width: 1119px) {
  .column.b {
    width: 100% !important;
  }
}

.dropdown {
  left: 50%;
  transform: translatey(-30%) rotatex(90deg) scale(0);
  margin-top: 0.55em;
  transform-origin: 0 0;
  border-radius: 0.35em;
  display: none;
  opacity: 0;
  transition: all 200ms linear;

  &.isOpen {
    transform: translatey(0%);
    display: block;
    opacity: 1;
  }
}

.rp {
  padding: 5px;
  background: black;
  color: #ffc508;
  z-index: 999999;
  text-transform: uppercase;
}

.rp:hover {
  background: #ffc508;
  color: black;
  font-weight: bold;
}
</style>
