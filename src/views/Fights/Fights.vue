<template>
  <div>
    <FightsTabs/>
    <div class="p-4 after-header">
      <div
        v-for="fight in fights"
        :key="fight.fight_key"
        class="mb-4"
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
        <div>{{ fight.is_stable ? 'stable' : 'pending' }}</div>
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
