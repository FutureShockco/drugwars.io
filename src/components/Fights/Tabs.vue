<template>
  <Header>
    <UiTabs>
      <UiTab to="/fight">Fight</UiTab>
      <UiTab to="/fight/outgoing">OutGoing   
        <span v-if="activeFightsCount > 0">
          ({{ activeFightsCount }})
        </span>
      </UiTab>
      <UiTab to="/fight/incoming">Incoming   
        <span v-if="activeIncFightsCount > 0">
          ({{ activeIncFightsCount }})
        </span></UiTab>
      <UiTab to="/fight/targets">Targets</UiTab>
    </UiTabs>
  </Header>
</template>


<script>
export default {
  computed: {
    activeIncFightsCount() {
      if (this.$store.state.game.inc_fights) {
        return this.$store.state.game.inc_fights_count;
      }
      return 0;
    },
    activeFightsCount() {
      if (this.$store.state.game.sent_fights_count) {
        return this.$store.state.game.sent_fights_count;
      }
      return 0;
    },
  },
};
</script>
