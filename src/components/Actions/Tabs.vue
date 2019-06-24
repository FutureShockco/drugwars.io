<template>
  <Header>
    <UiTabs>
      <UiTab to="/missions">Missions</UiTab>
      <UiTab to="/missions/outgoing">Out   
        <span>
          ({{ activeFightsCount + activeTransportsCount }})
        </span>
      </UiTab>
      <UiTab to="/missions/incoming">In   
        <span>
          ({{ activeIncFightsCount +  activeIncTransportsCount }})
        </span></UiTab>
      <UiTab to="/missions/targets">Targets</UiTab>
    </UiTabs>
        <div class="coordbase" v-if="base">
        <span class="text text-blue" v-if="main">
           Primary
        </span>
        <span class="text text-orange" v-else-if="base.custom">
           {{base.custom}}
        </span>
        {{base.territory}}:{{base.base}}</div>
  </Header>
</template>


<script>
export default {
  computed: {
    base() {
      return this.$store.state.game.base;
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
  },
};
</script>


<style lang="less" scoped>
.coordbase {
  position: absolute;
  right: 10px;
}
</style>
