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
        if (fight.is_stable === 0) {
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
      const units = [];
      let unitExist = false;
      this.selectedUnits.forEach(unit => {
        if (unit.key === payload.key) {
          unitExist = true;
          units.push({
            key: unit.key,
            amount: parseInt(unit.amount) + parseInt(payload.amount),
          });
        } else {
          units.push(unit);
        }
      });
      if (!unitExist) {
        units.push({
          key: payload.key,
          amount: parseInt(payload.amount),
        });
      }
      this.selectedUnits = units;
    },
  },
};
</script>
