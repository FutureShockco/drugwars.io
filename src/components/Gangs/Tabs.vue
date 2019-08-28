<template>
  <Header>
    <UiTabs>
      <UiTab to="/gangs">Gangs</UiTab>
      <UiTab v-if="!user.gang" to="/gangs/create">
        Create gang
      </UiTab>
      <UiTab :to="`/gangs/gang/${user.gang}`" v-if="user.gang">
        My gang
      </UiTab>
     <UiTab :to="`/gangs/gang/${user.gang}/buildings`" v-if="user.gang">
        Buildings
      </UiTab>
     <UiTab :to="`/gangs/gang/${user.gang}/diplomacy`" v-if="user.gang">
        Diplomacy
      </UiTab>
           <UiTab :to="`/gangs/gang/${user.gang}/deposit`" v-if="user.gang">
        Deposit
      </UiTab>
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
