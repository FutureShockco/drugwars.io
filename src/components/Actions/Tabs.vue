<template>
  <Header>
    <UiTabs>
      <UiTab to="/actions">Fight</UiTab>
      <UiTab to="/actions/transport">Transport   
      </UiTab>
      <UiTab to="/actions/outgoing">Out   
        <span>
          ({{ activeFightsCount + activeTransportsCount }})
        </span>
      </UiTab>
      <UiTab to="/actions/incoming">In   
        <span>
          ({{ activeIncFightsCount +  activeIncTransportsCount }})
        </span></UiTab>
      <UiTab to="/actions/targets">Targets</UiTab>
    </UiTabs>
  </Header>
</template>


<script>
export default {
  computed: {
    activeIncFightsCount() {
      if (this.$store.state.game.inc_fights_count) {
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
    activeIncTransportsCount() {
      if (this.$store.state.game.inc_transports_count) {
        return this.$store.state.game.inc_transports_count;
      }
      return 0;
    },
    activeTransportsCount() {
      if (this.$store.state.game.sent_transports_count) {
        return this.$store.state.game.sent_transports_count;
      }
      return 0;
    },
  },
};
</script>
