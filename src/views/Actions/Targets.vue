<template>
    <div>
        <ActionsTabs/>
        <div v-if="isLoading" class="p-4 text-center mt-6">
            <Loading/>
        </div>
        <div v-if="!isLoading && targets.length > 0">
            <p class="p-4">Here is a good place to spot weak targets. Each time you try to find targets new players will appear. </p>
            <Player :key="target.username" v-if="target.username !== username" :player="target" v-for="target in targets" />
        </div>
    </div>
</template>

<script>
import client from '@/helpers/client';

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
    const accessToken = localStorage.getItem('access_token');
    client
      .requestAsync('get_users', { token: accessToken, maxDrugProductionRate })
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
