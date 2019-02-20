<template>
  <div id="app">
    <Loading v-if="showLoading"/>
    <template v-else>
      <Sidebar v-if="showSidebar"/>
          <Balances/>
      <router-view
        :class="{
          content: showSidebar,
          'content--nav-open': sidebarVisible,
        }"
      />
    </template>
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
    setInterval(() => {
      this.$store.dispatch('init');
    }, 10000);
  },
};
</script>

<style scoped lang="less">
@import './vars';

#app {
  min-height: 100%;
  width: 100%;
  max-width: 1160px;
  margin: 0 auto;
  overflow-x: hidden;
  background-color: @sidebar-bg-color;
  display: table;
  color: @text-color;
  text-align: left !important;
}

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
