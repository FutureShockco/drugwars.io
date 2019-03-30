<template>
  <div id="app">
    <video class="video" autoplay loop poster="/img/bg.jpg" id="bgvid">
    <source src="/img/background.mp4" type="video/mp4">
    </video>
    <Splash v-if="showLoading"/>
    <template v-else>
      <TopNav v-if="username"/>
      <Sidebars v-if="username && showSidebar"/>
      <router-view
        :class="{
          content: showSidebar,
          'content--nav-open': sidebarVisible,
        }"
      />
    </template>
    <Notifications/>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.auth.username;
    },
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
};
</script>

<style scoped lang="less">
@import './vars';

#app {
  min-height: 100%;
  width: 100%;
  max-width: @main-width;
  margin: 0 auto;
  overflow-x: hidden;
  display: table;
  color: @text-color;
  text-align: left !important;
}

.video {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  background: url(/img/bg.jpg) no-repeat;
  background-size: cover;
}

.content {
  position: relative;
  left: 0;
  margin-top: @header-height;
  transition: left 0.3s;
  background: #000000b7;
  @media @bp-small {
    margin-left: @sidebar-width !important;
    margin-right: @sidebar-width !important;
    margin-top: @topnav-height;
  }

  &--nav-open {
    left: @sidebar-width;

    @media @bp-small {
      left: 0;
    }
  }
}
</style>
