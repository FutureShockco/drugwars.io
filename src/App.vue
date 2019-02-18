<template>
  <div id="app">
    <template v-if="!showLoading && initialized">
      <Sidebar v-if="showSidebar"/>
      <router-view :class="{'content': showSidebar, 'content--nav-open': sidebarVisible}" />
    </template>
    <VueLoadingIndicator class="overlay fixed big transparent" v-else/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      initialized: false,
    }
  },
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
    this.$store.dispatch('getPrizeProps').then(() => {
      this.initialized = true;
    });
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
