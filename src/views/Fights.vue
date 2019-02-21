<template>
  <div>
    <FightsTabs/>
    <div class="p-4 after-header">
      <div v-for="fight in fights">
        <h5>{{ fight.username }} vs {{ fight.target }} {{ fight.is_done }}</h5>
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
      return this.$store.state.game.fights;
    },
  },
};
</script>
