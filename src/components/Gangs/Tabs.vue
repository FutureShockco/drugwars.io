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
     <!-- <UiTab :to="`/gangs/gang/${user.gang}/buildings`" v-if="user.gang">
        Buildings
      </UiTab>
     <UiTab :to="`/gangs/gang/${user.gang}/diplomacy`" v-if="user.gang">
        Diplomacy
      </UiTab> -->
    </UiTabs>
  </Header>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.game.user.user,
    };
  },
};
</script>
