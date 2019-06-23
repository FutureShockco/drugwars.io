<template>
    <div>
        <ActionsTabs/>
        <div class="p-4 mt-2 columns">
            <div v-if="ownUnits.length > 0" class="column b col-6 text-center">
                <h3>Select your army composition</h3>
                <div>
                    <div v-for="ownUnit in ownUnits" :key="ownUnit.key">
                        <UnitSelect  v-if="ownUnit.amount > 0" :item="ownUnit" :key="ownUnit.key" @click="addUnit" />
                    </div>
                </div>
                <div class="column pl-0 mt-6 col-6 text-left width-full">
                  <input class="input form-control" :disabled="selectedUnits.length === 0" placeholder="New Squad name" v-model="combination_name" maxlength="24">
                  <button class="button button-green" :disabled="selectedUnits.length === 0 || !combination_name" @click="saveCombination()">Save squad</button>
                  <div class="mt-2" v-for="combination in favoriteCombinations" :key="combination.key">
                  <button class="button button-red" @click="deleteCombination(combination.name)">delete squad</button>
                  <button class="button button-blue ml-2" @click="loadCombination(combination.set)">load {{combination.name}}</button>
                </div>
                </div>
            </div>
            <div v-if="ownUnits.length > 0" class="column b col-6 text-center">
                <h3 >Select your action type</h3>
                <div>
                  <button class="button button-red mb-4">ATTACK</button>
                  <button class="button button-blue ml-1 mb-4">TRANSPORT</button>
                  <button class="button button-green ml-1 mb-4">STATION</button>
                  <button class="button button-yellow ml-1 mb-4">OCCUP</button>
                </div>
                <div>
                    <div class="mb-2">
                        <h3 class="mb-2">Your selected army</h3>
                        <ArmyToSend :units="selectedUnits" />
                    </div>

                </div>
                <div class="mb-0 form width-full">
                    <div v-if="selectedUnits.length === 0">
                        <p>You need to select at least 1 unit.</p>
                    </div>
                    <div v-else>
                        <h3>Offensive Power : {{offensivePower}}%</h3>
                        <button class="button button-blue mb-2" @click="removeUnits()">Remove all</button>
                    </div>
                </div>
                 <h3 >Type a nickname</h3>
                  <div>
                  Nickname :
                  <input class="input form-control mb-4" type="string" placeholder="Nickname" v-model="targetNickname">
                  <button class="button button-green" @click="getUserBase()"><i class="iconfont icon-search"></i></button>
                  <div v-for="base in bases" :key="base.id">
                    <button class="button button-yellow" @click="chooseBase(base.territory,base.base)"> Territory : {{base.territory}} - Location : {{base.base}}</button>
                  </div>
                </div>
                <h3 >or Select your target location</h3>

                <div>
                  Territory :
                  <input class="input form-control mb-4" type="number" placeholder="Territory" v-model="target">
                </div>
                 <div>
                   Base :
                <input class="input form-control mb-4" type="number" placeholder="Base" v-model="base">
                </div>
                <h3>Add a fight message*</h3>
                <div>* optional</div>
                <input class="input form-control btn-block mb-4" placeholder="I'm coming for you" v-model="message" maxlength="280">
                <button :disabled="selectedUnits.length === 0 || !target || isLoading" class="button button-large button-red mb-4" @click="handleSubmit">
                  <SmallLoading v-if="isLoading"/>
                <span v-else>Attack</span>
              </button>
                <p class="text-red text-left" v-if="errorMessage">
                    {{ errorMessage }}
                </p>
                <h3>Defensive Power : {{defensivePower}}%</h3>

                <a @click="openInNewTab()" target="_blank">
                  Access to the Fight simulator
                </a>
            </div>
            <div v-else>
                <p>You don't have any unit to fight.</p>
            </div>

        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import client from '@/helpers/client';
import { units } from 'drugwars';

export default {
  data() {
    return {
      isLoading: false,
      target: this.$route.query.target || null,
      base: this.$route.query.base || null,
      selectedUnits: [],
      message: null,
      targetNickname: null,
      username: this.$store.state.auth.username,
      errorMessage: null,
      favoriteCombinations: JSON.parse(localStorage.getItem('fav_combi')) || null,
      combination_name: null,
      units: [],
      bases:[]
    };
  },
  computed: {
    ownBase() {
      return this.$store.state.game.base;
    },
    sent_fights() {
      return this.$store.state.game.sent_fights;
    },
    nickname() {
      return this.$store.state.game.user.user.nickname;
    },
    ownUnits() {
      return this.$store.state.game.user.units.map(
        unit =>
          unit.base === this.ownBase.base &&
          unit.territory === this.ownBase.territory && {
            key: unit.unit,
            amount: unit.amount,
          },
      );
    },
    defensivePower() {
      let supply = 0;
      this.$store.state.game.user.units.forEach(unit => {
        supply += units[unit.unit].supply;
      });
      const power = Math.round(100 - parseFloat(supply / 5).toFixed(0) / 100);
      if (power >= 60) return power;
      return 60;
    },
    offensivePower() {
      let supply = 0;
      this.selectedUnits.forEach(unit => {
        supply += units[unit.key].supply * unit.amount;
      });
      const power = Math.round(100 - parseFloat(supply / 6).toFixed(0) / 100);
      if (power >= 60) return power;
      return 60;
    },
  },
  methods: {
    ...mapActions(['startFight', 'init']),
    resetForm() {
      this.target = null;
      this.selectedUnits = [];
      this.message = null;
    },
    chooseBase(territory,location){
        this.target = territory;
        this.base = location;
    },
    getUserBase(){
        const self = this;
        self.bases = null;
        client.requestAsync('get_user_bases', self.targetNickname).then(result => {
            self.bases = result;
            self.isLoading = false;
        });
    },
    removeUnits() {
      this.selectedUnits = [];
    },
    async handleSubmit() {
      this.isLoading = true;
      const self = this;
      const payload = {
        from_territory:Number(self.ownBase.territory),
        from_base:Number(self.ownBase.base),
        territory: Number(self.target),
        base: Number(self.base),
        units: self.selectedUnits,
        type: 'fight',
      };

      if (self.message) {
        payload.message = self.message;
      }

      const isValid = await this.validateForm();

      if (isValid) {
        this.resetForm();
        console.log(payload)
        this.startFight(payload)
          .then(() => {
            this.isLoading = false;
          })
          .catch(e => {
            console.error('Failed to start a fight=', e);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    },
    async validateForm() {
      this.errorMessage = null;
      const target = this.targetNickname.toLowerCase();

      if (target === this.nickname) {
        this.errorMessage = 'Attack yourself? Are you serious?';
      }
      const now = new Date();
      const isPunished = new Date(Date.parse(this.$store.state.game.user.user.punished));
      if (isPunished > now) {
        this.errorMessage = `Hmm Bad talks are not appropriated in DrugWars, try again after ${isPunished.toLocaleString()}`;
      }

      // if (this.sent_fights && this.sent_fights.length > 0)
      //   this.sent_fights.forEach(fight => {
      //     if (fight.is_stable === 0) {
      //       this.errorMessage =
      //         'You have already a fight waiting for confirmation, please wait a bit';
      //       this.init();
      //     }
      //   });
      if (!this.errorMessage)
        try {
          const user = await client.requestAsync('check_user', target);
          if (!user || !user[0].nickname) {
            this.errorMessage = `Player '${target}' does not exist`;
          }
          return !this.errorMessage;
        } catch (e) {
          this.errorMessage = `Player with nickname '${target}' doesn't exist`;
          console.error(`Player with nickname '${target}' doesn't exist`, e);
          return false;
        }
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
    openInNewTab() {
      const url = 'https://simulator.drugwars.io/';
      const myarmy = this.$store.state.game.user.units.map(unit =>
        this.serialize({
          p: 1,
          key: unit.unit,
          n: unit.amount,
        }),
      );
      const mytraining = this.$store.state.game.user.trainings.map(training =>
        this.serialize({
          p: 1,
          key: training.training,
          lvl: training.lvl,
        }),
      );

      const toOpen = `${myarmy},${mytraining}`;
      const win = window.open(`${url}?${toOpen}`, '_blank');
      win.focus();
    },
    serialize(obj) {
      /* eslint-disable */
      const str = [];
      for (const p in obj)
        if (obj.hasOwnProperty(p)) {
          str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
        }
      return str.join('&');
    },
    saveCombination() {
      let favs = [];
      if (localStorage.getItem('fav_combi')) {
        favs = JSON.parse(localStorage.getItem('fav_combi'));
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
      localStorage.setItem('fav_combi', JSON.stringify(favs));
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
      if (localStorage.getItem('fav_combi')) {
        favs = JSON.parse(localStorage.getItem('fav_combi'));
      }
      for (let i = 0; i < favs.length; i += 1) {
        if (favs[i].name === combination) {
          favs.splice(i, 1);
          i -= 1;
        }
      }
      localStorage.setItem('fav_combi', JSON.stringify(favs));
      this.favoriteCombinations = favs;
            /* eslint-enable */
    },
  },
};
</script>


<style scoped lang="less">
.width-full {
  max-width: 100%;
}

@media screen and (min-width: 399px) and (max-width: 1119px) {
  .column.b {
    width: 100% !important;
  }
}
</style>
