<template>
  <div>
    <FightsTabs/>
    <div class="p-4">
      <FightsFight
        v-if="fights.length > 0"
        v-for="fight in fights"
        :key="fight.fight_key"
        :fight="fight"
      />
      <p v-if="!fights.length">You did not fight.</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    fights() {
      return this.$store.state.game.sent_fights || {};
    },
  },
};
</script>
