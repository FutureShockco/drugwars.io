<template>
  <Header>
    <UiTabs>
      <UiTab to="/fight">Fight</UiTab>
      <UiTab to="/fight/ongoing">OnGoing   
        <span v-if="activeFightsCount > 0">
          ({{ activeFightsCount }})
        </span>
      </UiTab>
      <UiTab to="/fight/incoming">Incoming   
        <span v-if="activeIncFightsCount > 0">
          ({{ activeIncFightsCount }})
        </span></UiTab>
      <UiTab to="/fight/targets">Find targets</UiTab>
    </UiTabs>
  </Header>
</template>


<script>
export default {
  computed: {
    activeIncFightsCount() {
      if (this.$store.state.game.inc_fights) {
        const activeFights = this.$store.state.game.inc_fights.filter(fight => fight.is_done === 0);
        return activeFights.length;
      }
      return 0;
    },
    activeFightsCount() {
      if (this.$store.state.game.sent_fights) {
        const activeSentFights = this.$store.state.game.sent_fights.filter(
          fight => fight.is_done === 0,
        );
        return activeSentFights.length;
      }
      return 0;
    },
  },
};
</script>
