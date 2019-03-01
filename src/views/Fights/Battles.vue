<template>
  <div>
    <FightsTabs/>
    <div class="p-4" v-if="ownUnits.length > 0">
      <h4>Select your army composition</h4>
      <div class="columns">
        <div class="column col-3" v-for="ownUnit in ownUnits" :key="ownUnit.key">
          <UnitSelect
            v-if="ownUnit.amount > 0"
            :item="ownUnit"
            :key="ownUnit.key"
            @click="addUnit"
          />
        </div>
      </div>
      <div class="mb-4">
        <h4>Your army</h4>
        <Army
          :units="selectedUnits"
        />
        <div v-if="selectedUnits.length === 0">
          <p>You need to select at least 1 unit.</p>
        </div>
      </div>
      <div class="mb-4 form">
        <h4>Target</h4>
        <input
          class="input form-control btn-block mb-2"
          placeholder="username"
          v-model="target"
        >
        <button
          :disabled="selectedUnits.length === 0 || !target || isLoading || isPending"
          class="button btn-block button-red mb-4"
          @click="handleSubmit"
        >
          <Loading v-if="isLoading || isPending"/>
          <span v-else>Start a war</span>
        </button>
      </div>
    </div>
    <div v-else>
      <p>You don't have any unit to fight.</p>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      isLoading: false,
      target: null,
      selectedUnits: [],
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
    handleSubmit() {
      this.isLoading = true;
      const payload = {
        target: this.target.toLowerCase(),
        units: this.selectedUnits,
      };
      this.startFight(payload)
        .then(() => {
          this.isLoading = false;
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
