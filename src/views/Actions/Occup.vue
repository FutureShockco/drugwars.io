<template>
    <div>
        <ActionsTabs/>
        <div class="p-4 mt-2 columns">
            <div v-if="ownUnits.length > 0" class="column b col-6 text-center">
                <h3>Select your army composition</h3>
                <div>
                    <div v-for="ownUnit in ownUnits" :key="ownUnit.key">
                        <UnitSelect :item="ownUnit" :key="ownUnit.key" @click="addUnit" v-if="ownUnit.amount > 0" />
                    </div>
                </div>
            </div>
            <div v-if="ownUnits.length > 0" class="column b col-6 text-center">
                <div>
                    <div class="mb-2">
                        <h3 class="mb-2">Your selected army</h3>
                        <ArmyToSend :units="selectedUnits" />
                    </div>
    
                </div>
                <div class="mb-0 form width-full">
                    <div v-if="selectedUnits.length === 0">
                        <p>You need to select at least 1 occupation troop.</p>
                    </div>
                </div>
                <h3>Select your target user</h3>
                <div>
                    Territory :
                    <input class="input form-control mb-4" type="number" placeholder="Territory" v-model="territory">
                </div>
                <div>
                    Base :
                    <input class="input form-control mb-4" type="number" placeholder="Base" v-model="base">
                </div>
                <div>
                    Name :
                    <input class="input form-control mb-4" placeholder="Base name" v-model="name">
                </div>
                <button :disabled="selectedUnits.length === 0 || !territory || hasNotEnough || isLoading || selectedTotal > carry" class="button button-large button-blue mb-4" @click="handleSubmit">
                          <SmallLoading v-if="isLoading"/>
                        <span v-else>Take base</span>
                      </button>
                <p class="text-red text-left" v-if="errorMessage">
                    {{ errorMessage }}
                </p>
            </div>
            <div v-else>
                <p>You don't have any unit.</p>
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
      territory: this.$route.query.target || null,
      base: this.$route.query.base || null,
      selectedUnits: [],
      message: null,
      name: null,
      username: this.$store.state.auth.username,
      errorMessage: null,
    };
  },
  created() {},
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    sent_fights() {
      return this.$store.state.game.sent_fights;
    },
    nickname() {
      return this.$store.state.game.user.user.nickname;
    },
    ownBase() {
      return this.$store.state.game.mainbase;
    },
    ownUnits() {
      return this.$store.state.game.user.units.map(unit => ({
        key: unit.unit,
        amount: unit.amount,
      }));
    },
    hasNotEnough() {
      return (
        parseInt(this.drugs_amount) > this.user.drugs_balance ||
        parseInt(this.weapons_amount) > this.user.weapons_balance ||
        parseInt(this.alcohol_amount) > this.user.alcohols_balance ||
        parseInt(this.dwd_amount) > this.user.dwd
      );
    },
  },
  methods: {
    ...mapActions(['send', 'init', 'get_bases', 'setBase']),
    resetForm() {
      this.territory = null;
      this.selectedUnits = [];
      this.base = null;
      this.name = null;
    },
    progressPercent(total, cost) {
      let progress;
      if (total && cost) {
        this.up = false;
        progress = parseFloat((total * 100) / cost).toFixed(2);
        return progress;
      }
      this.up = false;
      return 0;
    },
    removeUnits() {
      this.selectedUnits = [];
    },
    async handleSubmit() {
      const self = this;
      const isValid = await this.validateForm();
      if (isValid) {
        this.isLoading = true;
        if (this.territory > 0 && this.base > 0) {
          const payload = {
            territory: Number(this.territory),
            base: Number(this.base),
            name: this.name,
            type: 'dw-base',
          };
          this.send(payload)
            .then(() => {
              self.resetForm();
              client.requestAsync('get_bases', this.location).then(result => {
                self.init();
                self.isLoading = false;
              });
              self.isLoading = false;
            })
            .catch(e => {
              console.error('Failed to start a fight=', e);
              this.isLoading = false;
            });
        } else {
          this.isLoading = false;
          this.errorMessage = 'Not enough resources?';
        }
      } else {
        this.isLoading = false;
      }
    },
    async validateForm() {
      this.errorMessage = null;
      const base = this.base;
      const territory = this.territory;
      const params = { base, territory };
      const now = new Date();
      if (!this.name) {
        this.errorMessage = `Please choose a name for your base`;
      }
      if (this.name.length > 25) {
        this.errorMessage = `Please choose a shorter name for your base`;
      }
      const isPunished = new Date(Date.parse(this.$store.state.game.user.user.punished));
      if (isPunished > now) {
        this.errorMessage = `Hmm Bad talks are not appropriated in DrugWars, try again after ${isPunished.toLocaleString()}`;
      }

      if (!this.errorMessage)
        try {
          const baseIsValid = await client.requestAsync('check_base', params);
          if (baseIsValid) {
            this.errorMessage = `Base number '${base}' is already taken`;
          }
          return !this.errorMessage;
        } catch (e) {
          this.errorMessage = `Base number '${base}' doesn't exist`;
          console.error(`Base number '${base}' doesn't exist`, e);
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
