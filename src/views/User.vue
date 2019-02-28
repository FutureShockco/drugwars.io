<template>
  <div>
    <Header :title="username" />
    <div class="p-4">
      <div v-if="isLoading">
        <Loading/>
      </div>
      <div v-else-if="user.user" class="text-center">
        <div class="mb-4">
          <Avatar :username="username" size="140"/>
        </div>
        <div class="mb-4">
          <p :key="unit.unit" v-for="unit in user.units">
            {{ unit.unit }} x {{ unit.amount }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kbyte from '@/helpers/kbyte';

export default {
  data() {
    return {
      username: this.$route.params.username,
      isLoading: false,
      user: null,
    };
  },
  computed: {
    mission6() {
      return this.$store.state.game.user.units.length > 0;
    },
  },
  created() {
    this.isLoading = true;
    kbyte.requestAsync('get_user', this.username).then(user => {
      console.log(user);
      this.user = user;
      this.isLoading = false;
    });
  },
};
</script>
