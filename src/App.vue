<template>
  <div id="app">
    <template v-if="!showLoading">
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
      showLoading: false,
    };
  },
  computed: {
    showSidebar() {
      return !this.$route.meta.hideSidebar;
    },
    sidebarVisible() {
      return this.$store.state.ui.sidebarVisible;
    },
  },
  created() {
    this.showLoading = true;

    this.$store.dispatch('getDynamicGlobalProperties').then(() => {
      this.showLoading = false;
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
