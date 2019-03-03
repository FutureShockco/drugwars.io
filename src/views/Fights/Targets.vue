<template>
  <div>
    <FightsTabs/>
    <div v-if="isLoading" class="p-4">
      <Loading/>
    </div>
    <div v-if="!isLoading && targets.length > 0">
      <p class="p-4">Here is the players with a similar drug production that you. This is a good place to spot weak targets.</p>
      <Player
        :key="target.username"
        v-if="target.username !== username"
        :player="target"
        v-for="target in targets"
      />
    </div>
  </div>
</template>

<script>
import kbyte from '@/helpers/kbyte';

export default {
  data() {
    return {
      isLoading: false,
      targets: [],
      username: this.$store.state.auth.username,
    };
  },
  mounted() {
    this.isLoading = true;
    const maxDrugProductionRate = this.$store.state.game.user.user.drug_production_rate;

    kbyte
      .requestAsync('get_users', { maxDrugProductionRate })
      .then(users => {
        this.targets = users;
        this.isLoading = false;
      })
      .catch(e => {
        console.error('Failed to get users', e);
        this.isLoading = false;
      });
  },
};
</script>
