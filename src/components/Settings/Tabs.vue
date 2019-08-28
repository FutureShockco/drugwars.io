<template>
  <Header>
    <UiTabs>
      <UiTab to="/settings">Settings</UiTab>
       <UiTab v-if="!steemAccount" to="/settings/steem">Steem</UiTab>
     <!-- <UiTab to="/settings/building">Delete building</UiTab> -->
      <UiTab to="/settings/privacy">Privacy</UiTab>
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
    steemAccount() {
      if (this.$store.state.auth.account) return this.$store.state.auth.account;
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
