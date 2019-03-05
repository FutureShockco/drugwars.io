<template>
  <div>
    <LeaderboardTabs/>
    <div class="mb-4">
      <Player
        v-for="(player, key) in players"
        :player="player"
        :key="player.username"
        :rank="key + 1"
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
