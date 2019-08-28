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
                        <p>You need to select at least 1 unit.</p>
                    </div>
                    <div v-else>
                        <h3>Transport : {{carry | amount}}</h3>
                        <button class="button button-blue mb-2" @click="removeUnits()">Remove all</button>
                        <div class="columns mt-2">
                            <div class="column col-3">
                                <ProgressBar :icon="'drug'" :color="'#00b31e'" :width="70" font-size="20" :pv="progressPercent(drugs_amount,selectedTotal)" :total="drugs_amount" :cost="carry - selectedTotal" :bold="12" :text-bg-color="'#1f1f1f'" :during="3" :border-color="'#ffc508'"
                                    :bg-color="'#fbb034'" :text-color="'#ffffff'" />
                                <input type="number" v-model="drugs_amount" placeholder="amount" class="mt-5 input width-full">
                            </div>
                            <div class="column col-3">
                                <ProgressBar :icon="'weapon'" :color="'#00b31e'" :width="70" font-size="20" :pv="progressPercent(weapons_amount,selectedTotal)" :total="weapons_amount" :cost="carry - selectedTotal" :bold="12" :text-bg-color="'#1f1f1f'" :during="3" :border-color="'#ffc508'"
                                    :bg-color="'#fbb034'" :text-color="'#ffffff'" />
                                <input type="number" v-model="weapons_amount" placeholder="amount" class="mt-5 input width-full">
                            </div>
                            <div class="column col-3">
                                <ProgressBar :icon="'alcohol'" :color="'#00b31e'" :width="70" font-size="20" :pv="progressPercent(alcohol_amount,selectedTotal)" :total="alcohol_amount" :cost="carry - selectedTotal" :bold="12" :text-bg-color="'#1f1f1f'" :during="3" :border-color="'#ffc508'"
                                    :bg-color="'#fbb034'" :text-color="'#ffffff'" />
                                <input type="number" v-model="alcohol_amount" placeholder="amount" class="mt-5 input width-full">
                            </div>
                            <div class="column col-3">
                                <ProgressBar :icon="'dwd'" :color="'#00b31e'" :width="70" font-size="20" :pv="progressPercent(dwd_amount,selectedTotal)" :total="dwd_amount" :cost="carry - selectedTotal" :bold="12" :text-bg-color="'#1f1f1f'" :during="3" :border-color="'#ffc508'" :bg-color="'#fbb034'"
                                    :text-color="'#ffffff'" />
                                <input type="number" v-model="dwd_amount" placeholder="amount" class="mt-5 input width-full">
                            </div>
                        </div>
                        <h5 :class="{'text-red': progressPercent(selectedTotal,carry)>100}">Total {{progressPercent(selectedTotal,carry)}}%</h5>
                    </div>
                </div>
                <h3>Select your target user</h3>
                <h5 class="mt-0">(you can send resources to player with at least one smaller type of production)</h5>
                <input class="input form-control btn-block mb-4" placeholder="username" v-model="target">
                <h3>Add a message*</h3>
                <div>* optional</div>
                <input class="input form-control btn-block mb-4" placeholder="I'm coming for you" v-model="message" maxlength="280">
                <button :disabled="selectedUnits.length === 0 || !target || hasNotEnough || isLoading || selectedTotal > carry" class="button button-large button-blue mb-4" @click="handleSubmit">
                      <SmallLoading v-if="isLoading"/>
                    <span v-else>Transport</span>
                  </button>
                <p class="text-red text-left" v-if="errorMessage">
                    {{ errorMessage }}
                </p>
            </div>
            <div v-else>
                <p>You don't have any unit.</p>
                <router-link class="text-green">Create units
                </router-link>
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
      drugs_amount: 0,
      weapons_amount: 0,
      alcohol_amount: 0,
      dwd_amount: 0,
    };
  },
  created() {
    this.load_buildings();
  },
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
    ownUnits() {
      return this.$store.state.game.user.units.map(unit => ({
        key: unit.unit,
        amount: unit.amount,
      }));
    },
    selectedTotal() {
      let selected = 0;
      const drugs = parseInt(this.drugs_amount) || 0;
      const weapons = parseInt(this.weapons_amount) || 0;
      const alcohol = parseInt(this.alcohol_amount) || 0;
      const dwd = parseInt(this.dwd_amount) || 0;
      selected = drugs + weapons + alcohol + dwd;
      return selected;
    },
    carry() {
      let carry = 0;
      this.selectedUnits.forEach(unit => {
        carry += units[unit.key].capacity * unit.amount;
      });
      return carry;
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
    ...mapActions(['transport', 'init', 'refresh_gang_buildings']),
    resetForm() {
      this.target = null;
      this.selectedUnits = [];
      this.message = null;
      this.drugs_amount = 0;
      this.weapons_amount = 0;
      this.alcohol_amount = 0;
      this.dwd_amount = 0;
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
    load_buildings() {
      this.isLoading = true;
      this.refresh_gang_buildings()
        .then(() => {
          this.isLoading = false;
        })
        .catch(e => {
          console.error('Failed', e);
          this.isLoading = false;
        });
    },
    removeUnits() {
      this.selectedUnits = [];
    },
    async handleSubmit() {
      this.isLoading = true;

      const isValid = await this.validateForm();
      if (isValid) {
        const drugs = parseInt(this.drugs_amount) || 0;
        const weapons = parseInt(this.weapons_amount) || 0;
        const alcohol = parseInt(this.alcohol_amount) || 0;
        const dwd = parseInt(this.dwd_amount) || 0;
        if (drugs >= 0 && weapons >= 0 && alcohol >= 0 && dwd >= 0) {
          const payload = {
            target: this.target.toLowerCase(),
            units: this.selectedUnits,
            resources: { drugs, weapons, alcohol, dwd },
          };
          if (this.message) {
            payload.message = this.message;
          }
          this.resetForm();
          this.transport(payload)
            .then(() => {
              this.isLoading = false;
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
      const target = this.target.toLowerCase();

      if (target === this.nickname) {
        this.errorMessage = 'Attack yourself? Are you serious?';
      }
      const now = new Date();
      const isPunished = new Date(Date.parse(this.$store.state.game.user.user.punished));
      if (isPunished > now) {
        this.errorMessage = `Hmm Bad talks are not appropriated in DrugWars, try again after ${isPunished.toLocaleString()}`;
      }

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
