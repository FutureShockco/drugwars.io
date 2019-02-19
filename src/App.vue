<template>
  <div id="app">
    <template v-if="!showLoading">
      <Sidebar v-if="showSidebar"/>
          <Balances/>
      <router-view :class="{'content': showSidebar, 'content--nav-open': sidebarVisible}" />
    </template>
    <Loading v-else/>
  </div>
</template>

<script>
export default {
  computed: {
    showSidebar() {
      return !this.$route.meta.hideSidebar;
    },
    sidebarVisible() {
      return this.$store.state.ui.sidebarVisible;
    },
    showLoading() {
      return this.$store.state.ui.showLoading;
    },
  },
  created() {
    const stream = setInterval(() => {
      this.$store.dispatch('init');
    }, 10000);
  },
};
</script>

<style scoped lang="less">
@import './vars';

.content {
  position: relative;
  left: 0;
  transition: left 0.3s;

  @media @bp-small {
    margin-left: @sidebar-width !important;
  }

  &--nav-open {
    left: @sidebar-width;

    @media @bp-small {
      left: 0;
    }
  }
}
</style>
