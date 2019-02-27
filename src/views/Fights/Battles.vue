<template>
  <div>
    <FightsTabs/>
    <div class="p-4">
      <div v-if="ownUnits.length > 0">
        <UnitSelect
          v-for="ownUnit in ownUnits"
          :item="ownUnit"
          :key="ownUnit.key"
        />
        <div class="mb-4">
          <h5>Target</h5>
          <input
            class="input form-control"
            v-model="target"
          >
        </div>
        <button
          class="btn btn-large btn-primary mb-6"
          @click="handleSubmit"
        >
          Fight
        </button>
        <Loading v-if="isLoading"/>
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
      target: null,
    };
  },
  computed: {
    ownUnits() {
      const units = [];
      this.$store.state.game.user.units.forEach(unit => {
        units.push({
          key: unit.unit,
          amount: unit.amount,
        });
      });
      return units;
    },
  },
  methods: {
    ...mapActions(['startFight']),
    handleSubmit() {
      this.isLoading = true;
      const payload = {
        target: this.target.toLowerCase(),
        units: this.ownUnits,
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
  },
};
</script>
