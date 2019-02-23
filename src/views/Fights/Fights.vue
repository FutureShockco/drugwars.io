<template>
  <div>
    <FightsTabs/>
    <div class="p-4">
      <div
        v-for="fight in fights"
        :key="fight.fight_key"
        class="width-full border-bottom pb-4 mb-4"
      >
        <Avatar
          size="80"
          :username="fight.username"
        />
        <span>{{ fight.username }}</span>
        <span class="mx-4">VS</span>
        <Avatar
          size="80"
          :username="fight.target"
        />
        <span>{{ fight.target }}</span>
        <div>{{ fight.is_done ? 'Fight ended' : 'Fight incoming' }}</div>
        <div>{{ fight.is_stable ? 'stable' : 'pending' }}</div>
        <div v-if="fight.result">
          <h3 v-if="fight.result === 1">
            {{ fight.username === username ? 'You won': 'You lost' }}
          </h3>
          <h3 v-if="fight.result === 2">
            Draw
          </h3>
          <h3 v-if="fight.result === 3">
            {{ fight.target === username ? 'You won': 'You lost' }}
          </h3>
        </div>
        <div>{{ fight.fight_key }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.auth.username;
    },
    fights() {
      console.log(this.$store.state.game.fights);
      return this.$store.state.game.fights;
    },
  },
};
</script>
