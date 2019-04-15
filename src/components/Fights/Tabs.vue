<template>
  <Header>
    <UiTabs>
      <UiTab to="/fight">Fight</UiTab>
      <UiTab to="/fights">OnGoing   <span v-if="activeFightsCount > 0">
              ( {{ activeFightsCount }}<i class="iconfont icon-arrow-up"></i>)
            </span></UiTab>
      <UiTab to="/receiving">Incoming   <span v-if="activeIncFightsCount > 0">
              ( {{ activeIncFightsCount }}<i class="iconfont icon-arrow-down"></i>)</span></UiTab>
      <UiTab to="/targets">Find targets</UiTab>
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
