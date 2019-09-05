<template>
  <Header>
    <UiTabs>
      <UiTab to="/leaderboards">Production</UiTab>
      <UiTab to="/leaderboards/heist">Heist</UiTab>
      <UiTab to="/leaderboards/fights">Fight</UiTab>
      <UiTab to="/leaderboards/jobs">Job</UiTab>
      <UiTab to="/leaderboards/lottery">Lottery</UiTab>
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
  data() {
    return {
      user: this.$store.state.game.user.user,
    };
  },
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
  },
};
</script>


<style lang="less" scoped>
.coordbase {
  position: absolute;
  right: 10px;
}
</style>
