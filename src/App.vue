<template>
  <div id="app">
    <Splash v-if="showLoading" />
    <template v-else>
      <TopNav v-if="username" />
      <Sidebars v-if="username && showSidebar" />
      <router-view
        :class="{
          content: showSidebar,
          'content--nav-open': sidebarVisible,
        }"
      />
    </template>
    <Notifications />
    <cookie-law style="z-index: 99999">
      <div slot="message">
        <h3 class="text-center text-red">
          Thanks to all for your loyalty to the game. The team will soon announce exciting news for
          Drugwars and all DWD holders!
        </h3>
      </div>
    </cookie-law>
  </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law';

export default {
  data() {
    return {
      modalIsOpen: localStorage.firstime || false,
      messageIsOpen: localStorage.message || false,
      attempt: 1,
      connected: false,
      timeIsopen: false,
      firstLoad: true,
    };
  },
  components: { CookieLaw },
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
  methods: {
    closeModal() {
      localStorage.setItem('firstime', true);
      this.modalIsOpen = true;
    },
    closeTimeModal() {
      this.timeIsopen = false;
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
  min-height: 99%;
  width: auto;
  height: auto;
  z-index: -100;
  background: url(//img.drugwars.io/bg4.jpg) no-repeat;
  background-size: cover;
}

.vue-ui-modal {
  z-index: 102;
  background: #000000b5;
  a {
    padding: 8px;
  }
}

.content {
  position: relative;
  left: 0;
  margin-top: @header-height;
  transition: left 0.3s;
  background: #000000;
  background-image: linear-gradient(to top, #0e0e0e, #0c0c0c 74%) !important;
  min-height: 93vh;
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
