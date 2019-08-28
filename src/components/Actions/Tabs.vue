<template>
    <Header>
        <UiTabs>
            <UiTab to="/actions">Actions</UiTab>
            <UiTab to="/actions/outgoing">Out
                <span>
                          ({{ activeFightsCount + activeTransportsCount }})
                        </span>
            </UiTab>
            <UiTab to="/actions/incoming">In
                <span>
                          ({{ activeIncFightsCount +  activeIncTransportsCount }})
                        </span></UiTab>
            <UiTab to="/actions/station">Station
                <span>
                          ({{ activeStationsCount }})
                        </span></UiTab>
            <!-- <UiTab to="/actions/targets">Targets</UiTab> -->
        </UiTabs>
    
        <div class="coordbase text-right" v-if="base">
            <div class="text text-blue tab name" v-if="main">
                Primary
            </div>
            <div class="text text-orange tab name" v-else-if="base.custom">
                {{base.custom}}
            </div> {{base.territory}}:{{base.base}}
        </div>
    </Header>
</template>


<script>
export default {
  computed: {
    base() {
      return this.$store.state.game.mainbase;
    },
    main() {
      return (
        this.$store.state.game.user.buildings.find(
          b => b.main === 1 && b.base === this.base.base && b.territory === this.base.territory,
        ) || null
      );
    },
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
    activeIncStationsCount() {
      if (this.$store.state.game.inc_stations_count) {
        return this.$store.state.game.inc_stations_count;
      }
      return 0;
    },
    activeStationsCount() {
      if (this.$store.state.game.sent_stations_count) {
        return this.$store.state.game.sent_stations_count;
      }
      return 0;
    },
  },
};
</script>


<style lang="less" scoped>
.coordbase {
  position: absolute;
  right: 10px;
}
</style>
