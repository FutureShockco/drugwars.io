<template>
  <div>
    <Header title="Leaderboard" />
    <div class="p-4 after-header">
      <Player
        v-for="player in players"
        :player="player"
        :key="player.username"
      />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.auth.username;
    },
    players() {
      return this.$store.state.game.props.players;
    },
  },
};
</script>
