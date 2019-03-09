<template>
  <div>
    <FightsTabs/>
    <div class="p-4">
      <div v-if="ownUnits.length > 0">
        <h3>Select your army composition</h3>
        <div>
          <div
            class="d-inline-block m-2"
            v-for="ownUnit in ownUnits"
            :key="ownUnit.key"
            v-if="ownUnit.amount > 0"
          >
            <UnitSelect
              :item="ownUnit"
              :key="ownUnit.key"
              @click="addUnit"
            />
          </div>
        </div>
        <div class="mb-4">
          <h5>Your selected army</h5>
          <Army
            :units="selectedUnits"
          />
          <div v-if="selectedUnits.length === 0">
            <p>You need to select at least 1 unit.</p>
          </div>
        </div>
        <div class="mb-4 form">
          <h3>Select your target user</h3>
          <input
            class="input form-control btn-block mb-6"
            placeholder="username"
            v-model="target"
          >
          <h3>Add a fight message*</h3>
          <div>* optional</div>
          <input
            class="input form-control btn-block mb-6"
            placeholder="I'm coming for you"
            v-model="message"
            maxlength="280"
          >
          <button
            :disabled="selectedUnits.length === 0 || !target || isLoading"
            class="button button-large button-red mb-4"
            @click="handleSubmit"
          >
            <Loading v-if="isLoading"/>
            <span v-else>Attack</span>
          </button>
          <p class="text-red text-left" v-if="errorMessage">
            {{ errorMessage }}
          </p>
        </div>
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
    fights() {
      return this.$store.state.game.fights;
    },
    ownUnits() {
      return this.$store.state.game.user.units.map(unit => ({
        key: unit.unit,
        amount: unit.amount,
      }));
    },
  },
  methods: {
    ...mapActions(['startFight']),
    resetForm() {
      this.target = null;
      this.selectedUnits = [];
      this.message = null;
    },
    async handleSubmit() {
      this.isLoading = true;

      const payload = {
        target: this.target.toLowerCase(),
        units: this.selectedUnits,
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

      if (target === this.username) {
        this.errorMessage = 'Attack yourself? Are you serious?';
      }

      this.fights.forEach(fight => {
        if (fight.is_stable === 0 && fight.username === this.username) {
          this.errorMessage = 'You have already a fight waiting for confirmation';
        }

        if (fight.is_done === 0 && fight.username === this.username && fight.target === target) {
          this.errorMessage = `You have already a fight going on with '${target}'`;
        }
      });

      if (this.errorMessage) {
        return false;
      }

      try {
        const user = await client.requestAsync('get_user', target);

        if (!user || !user.user) {
          this.errorMessage = `Player '${target}' does not exist`;
        }

        if (user.user.shield_end >= parseInt(new Date().getTime() / 1000)) {
          this.errorMessage = `You can't attack player '${target}', he has a shield`;
        }

        const userFights = await client.requestAsync('get_fights', target);
        userFights.forEach(fight => {
          console.log(fight.is_done, fight.target);
          if (fight.is_done === 0 && fight.target === target) {
            this.errorMessage = 'Your target is already being attacked by someone else';
          }
        });

        return !this.errorMessage;
      } catch (e) {
        this.errorMessage = `Unable to load player '${target}'`;
        console.error(`Unable to load player '${target}'`, e);
        return false;
      }
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
