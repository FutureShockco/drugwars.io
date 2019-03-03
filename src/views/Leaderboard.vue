<template>
  <div>
    <Header title="Leaderboard" />
    <div v-if="isLoading" class="p-4">
      <Loading/>
    </div>
    <div v-if="!isLoading && users.length > 0" class="mb-4">
      <Player
        v-for="(user, key) in users"
        :player="user"
        :key="user.username"
        :rank="key + 1"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      users: [],
    };
  },
  computed: {
    username() {
      return this.$store.state.auth.username;
    },
  },
  mounted() {
    this.isLoading = true;

    fetch('https://rest.drugwars.io/leaderboard')
      .then(res => res.json())
      .then(result => {
        this.users = result.players;
        this.isLoading = false;
      })
      .catch(e => {
        console.error('Failed to get users', e);
        this.isLoading = false;
      });
  },
};
</script>
