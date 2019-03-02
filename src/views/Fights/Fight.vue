<template>
  <div>
    <FightsTabs/>
    <div class="p-4">
      <div v-if="ownUnits.length > 0">
        <h3>Select your army composition</h3>
        <div>
          <div class="d-inline-block m-2" v-for="ownUnit in ownUnits" :key="ownUnit.key">
            <UnitSelect
              v-if="ownUnit.amount > 0"
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
            :disabled="selectedUnits.length === 0 || !target || isLoading || isPending"
            class="button button-large button-red mb-4"
            @click="handleSubmit"
          >
            <Loading v-if="isLoading || isPending"/>
            <span v-else>Attack</span>
          </button>
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

export default {
  data() {
    return {
      isLoading: false,
      target: this.$route.query.target || null,
      selectedUnits: [],
      message: null,
      username: this.$store.state.auth.username,
    };
  },
  computed: {
    ownUnits() {
      return this.$store.state.game.user.units.map(unit => ({
        key: unit.unit,
        amount: unit.amount,
      }));
    },
    isPending() {
      let isPending = false;
      this.$store.state.game.fights.forEach(fight => {
        if (fight.username === this.username && fight.is_stable === 0) {
          isPending = true;
        }
      });
      return isPending;
    },
  },
  methods: {
    ...mapActions(['startFight']),
    resetForm() {
      this.target = null;
      this.selectedUnits = [];
      this.message = null;
    },
    handleSubmit() {
      this.isLoading = true;
      const payload = {
        target: this.target.toLowerCase(),
        units: this.selectedUnits,
      };

      if (this.message) {
        payload.message = this.message;
      }

      this.startFight(payload)
        .then(() => {
          this.isLoading = false;
          this.resetForm();
        })
        .catch(e => {
          console.error('Failed to start a fight=', e);
          this.isLoading = false;
        });
    },
    addUnit(payload) {
      const amount = parseInt(payload.amount);
      const selectedUnitsObj = {};
      const ownUnit = this.ownUnits.find((unit) => unit.key === payload.key);

      this.selectedUnits.forEach((unit) => {
        selectedUnitsObj[unit.key] = unit.amount;
      });
      selectedUnitsObj[payload.key] = (!selectedUnitsObj[payload.key])
        ? amount
        : amount + parseInt(selectedUnitsObj[payload.key]);
      if (selectedUnitsObj[payload.key] > ownUnit.amount) {
        selectedUnitsObj[payload.key] = parseInt(ownUnit.amount);
      }
      if (selectedUnitsObj[payload.key] < 0) {
        selectedUnitsObj[payload.key] = 0;
      }

      this.selectedUnits = Object.keys(selectedUnitsObj)
        .map((key) => ({ key, amount: selectedUnitsObj[key] }));
    },
  },
};
</script>
