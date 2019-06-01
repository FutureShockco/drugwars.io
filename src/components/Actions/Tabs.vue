<template>
  <Header>
    <UiTabs>
      <UiTab to="/actions">Fight</UiTab>
      <UiTab to="/actions/transport">Transport   
      </UiTab>
      <UiTab to="/actions/outgoing">Out   
        <span v-if="activeFightsCount > 0">
          ({{ activeFightsCount }})
        </span>
      </UiTab>
      <UiTab to="/actions/incoming">In   
        <span v-if="activeIncFightsCount > 0">
          ({{ activeIncFightsCount }})
        </span></UiTab>
      <UiTab to="/actions/targets">Targets</UiTab>
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
