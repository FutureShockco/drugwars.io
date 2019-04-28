<template>
    <div>
        <FightsTabs/>
        <div class="p-4 columns">
            <div v-if="ownUnits.length > 0" class="column b col-6 text-center">
                <h3>Select your army composition</h3>
                <div>
                    <div v-for="ownUnit in ownUnits" :key="ownUnit.key" v-if="ownUnit.amount > 0">
                        <UnitSelect :item="ownUnit" :key="ownUnit.key" @click="addUnit" />
                    </div>
                </div>
            </div>
    
            <div v-if="ownUnits.length > 0" class="column b col-6 text-center">
                <div>
                    <div class="mb-4">
                        <h3>Your selected army</h3>
                        <ArmyToSend :units="selectedUnits" />
                    </div>
                </div>
                <div class="mb-4 form width-full">
                    <div v-if="selectedUnits.length === 0">
                        <p>You need to select at least 1 unit.</p>
                    </div>
                    <div v-else>
                        <button class="button button-blue" @click="removeUnits()">Remove all</button>
                        <h3>Offensive Power : {{offensivePower}}%</h3>
                    </div>
                </div>
                <h3>Select your target user</h3>
                <input class="input form-control btn-block mb-6" placeholder="username" v-model="target">
                <h3>Add a fight message*</h3>
                <div>* optional</div>
                <input class="input form-control btn-block mb-6" placeholder="I'm coming for you" v-model="message" maxlength="280">
                <button :disabled="selectedUnits.length === 0 || !target || isLoading" class="button button-large button-red mb-4" @click="handleSubmit">
                <Loading v-if="isLoading"/>
                <span v-else>Attack</span>
              </button>
                <p class="text-red text-left" v-if="errorMessage">
                    {{ errorMessage }}
                </p>
                <h3>Defensive Power : {{defensivePower}}%</h3>
    
                <a href="https://simulator.drugwars.io/next" target="_blank">
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
      selectedUnits: [],
      message: null,
      username: this.$store.state.auth.username,
      errorMessage: null,
    };
  },
  computed: {
    sent_fights() {
      return this.$store.state.game.sent_fights;
    },
    nickname() {
      return this.$store.state.game.user.user.nickname;
    },
    ownUnits() {
      return this.$store.state.game.user.units.map(unit => ({
        key: unit.unit,
        amount: unit.amount,
      }));
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
      const power = Math.round(100 - parseFloat(supply / 5).toFixed(0) / 100);
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
    removeUnits() {
      this.selectedUnits = [];
    },
    async handleSubmit() {
      this.isLoading = true;

      const payload = {
        target: this.target.toLowerCase(),
        units: this.selectedUnits,
        type: 'fight',
      };

      if (this.message) {
        payload.message = this.message;
      }

      const isValid = await this.validateForm();

      if (isValid) {
        this.startFight(payload)
          .then(() => {
            this.isLoading = false;
            this.resetForm();
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
      const target = this.target.toLowerCase();

      if (target === this.nickname) {
        this.errorMessage = 'Attack yourself? Are you serious?';
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
          console.log(user);
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
