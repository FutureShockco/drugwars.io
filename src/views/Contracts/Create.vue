<template>
    <div>
        <ContractsTabs />
        <div class="p-4 text-center">
            <h2>Create a contract</h2>
        <div class="width-full text-center">
                  <div class="columns">
				<div class="column col-3">
					<ProgressBar
						:icon="'drug'"
						:color="'#00b31e'"
						:width="70"
						font-size="20"
						:pv="progressPercent(drugs_amount,balances.drugs)"
						:total="drugs_amount"
						:cost="balances.drugs"
						:bold="12"
						:text-bg-color="'#1f1f1f'"
						:during="3"
						:border-color="'#ffc508'"
						:bg-color="'#fbb034'"
						:text-color="'#ffffff'"
					/>
					<input type="number" v-model="drugs_amount" placeholder="amount" class="mt-5 input width-full">
				</div>
				<div
					class="column col-3">
					<ProgressBar
						:icon="'weapon'"
						:color="'#00b31e'"
						:width="70"
						font-size="20"
						:pv="progressPercent(weapons_amount,balances.weapons)"
						:total="weapons_amount"
						:cost="balances.weapons"
						:bold="12"
						:text-bg-color="'#1f1f1f'"
						:during="3"
						:border-color="'#ffc508'"
						:bg-color="'#fbb034'"
						:text-color="'#ffffff'"
					/>
					<input type="number" v-model="weapons_amount" placeholder="amount" class="mt-5 input width-full">
				</div>
				<div class="column col-3">
					<ProgressBar
						:icon="'alcohol'"
						:color="'#00b31e'"
						:width="70"
						font-size="20"
						:pv="progressPercent(alcohol_amount,balances.alcohols)"
						:total="alcohol_amount"
						:cost="balances.alcohols"
						:bold="12"
						:text-bg-color="'#1f1f1f'"
						:during="3"
						:border-color="'#ffc508'"
						:bg-color="'#fbb034'"
						:text-color="'#ffffff'"
					/>
					<input type="number" v-model="alcohol_amount" placeholder="amount" class="mt-5 input width-full">
				</div>
				<div class="column col-3">
					<ProgressBar
						:icon="'dwd'"
						:color="'#00b31e'"
						:width="70"
						font-size="20"
						:pv="progressPercent(dwd_amount,user.dwd)"
						:total="dwd_amount"
						:cost="user.dwd"
						:bold="12"
						:text-bg-color="'#1f1f1f'"
						:during="3"
						:border-color="'#ffc508'"
						:bg-color="'#fbb034'"
						:text-color="'#ffffff'"
					/>
					<input type="number" v-model="dwd_amount" placeholder="amount" class="mt-5 input width-full">
				</div>
</div>
			</div>
            <div class=" container-xxs" >
                <h5>Target</h5>
                <input class="input input-primary mb-2" v-model="target" maxlength="16" placeholder="The nickname of your target" v-lowercase />
                <button class="button input-block button-green mb-2"  @click="handleSubmit" :disabled="isLoading">
                    <SmallLoading v-if="isLoading"/>
                    <span v-else>Create or contribute</span>
                  </button>
                      <button class="button input-block button-blue mb-2" @click="handleSubmitAnonymous" :disabled="isLoading">
                    <SmallLoading v-if="isLoading"/>
                    <span v-else>Create or contribute anonymously</span>
                  </button>
            </div>
            <p class="text-red text-center" v-if="errorMessage">
                    {{ errorMessage }}
                </p>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import { getBalances } from '@/helpers/utils';
import client from '@/helpers/client';

export default {
  data() {
    return {
      isLoading: false,
      target: this.$route.query.target || null,
      errorMessage: null,
      drugs_amount: 0,
      weapons_amount: 0,
      alcohol_amount: 0,
      dwd_amount: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.game.user.user;
    },
    nickname() {
      return this.$store.state.game.user.user.nickname;
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
    hasEnough() {
      return (
        this.balances.drugs > this.gangCreationFee.drugs &&
        this.balances.weapons > this.gangCreationFee.weapons &&
        this.balances.alcohols > this.gangCreationFee.alcohols
      );
    },
  },
  methods: {
    ...mapActions(['send', 'notify']),
    async handleSubmit() {
      const isValid = await this.validateForm();
      this.isLoading = true;
      const drugs = this.drugs_amount || 0;
      const weapons = this.weapons_amount || 0;
      const alcohol = this.alcohol_amount || 0;
      const dwd = this.dwd_amount || 0;
      if ((isValid && this.target) || drugs > 0 || weapons > 0 || alcohol > 0 || dwd > 0) {
        const payload = {
          target: this.target.trim().toLowerCase(),
          resources: { drugs, weapons, alcohol, dwd },
          type: 'dw-contracts',
          anonymous: false,
        };

        this.send(payload)
          .then(() => {
            this.$router.push('/contracts');
            this.isLoading = false;
          })
          .catch(e => {
            this.notify({ type: 'error', message: 'Failed to create gang' });
            console.error('Failed to create gang', e);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    },
    async handleSubmitAnonymous() {
      const isValid = await this.validateForm();
      this.isLoading = true;
      const drugs = this.drugs_amount || 0;
      const weapons = this.weapons_amount || 0;
      const alcohol = this.alcohol_amount || 0;
      const dwd = this.dwd_amount || 0;
      if ((isValid && this.target) || drugs > 0 || weapons > 0 || alcohol > 0 || dwd > 0) {
        const payload = {
          target: this.target.trim().toLowerCase(),
          resources: { drugs, weapons, alcohol, dwd },
          type: 'dw-contracts',
          anonymous: true,
        };

        this.send(payload)
          .then(() => {
            this.$router.push('/contracts');
            this.isLoading = false;
          })
          .catch(e => {
            this.notify({ type: 'error', message: 'Failed to create gang' });
            console.error('Failed to create gang', e);
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
  },
};
</script>

<style scoped lang="less">
</style>
