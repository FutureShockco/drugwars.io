<template>
    <Header>
        <UiTabs>
    
            <!-- <UiTab to="/actions/station">Station   
            </UiTab> -->
            <!-- <UiTab to="/actions/station">Occupy   
          </UiTab> -->
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
