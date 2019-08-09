<template>
    <Header>
        <UiTabs>
            <UiTab to="/cards/mycollection">My Collection</UiTab>
            <UiTab to="/cards/market">Market
            </UiTab>
            <UiTab to="/cards/allcards">View All</UiTab>
        </UiTabs>
        <div class="coordbase" v-if="base">
            <span class="text text-blue" v-if="main">
                       Primary
            </span>
            <span class="text text-orange" v-else-if="base.custom">
                       {{base.custom}}
            </span> {{base.territory}}:{{base.base}}
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
  },
};
</script>


<style lang="less" scoped>
.coordbase {
  position: absolute;
  right: 10px;
}
</style>
