<template>
  <Header>
    <UiTabs>
      <UiTab to="/gangs">Gangs</UiTab>
      <UiTab v-if="!user.gang" to="/gangs/create">
        Create gang
      </UiTab>
      <UiTab :to="`/gang/${user.gang}`" v-else>
        My gang
      </UiTab>
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
