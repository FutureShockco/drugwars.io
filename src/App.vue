<template>
   <div id="app">
    <!-- <video class="video" autoplay loop poster="/img/bg.jpg" id="bgvid">
    <source src="/img/background.mp4" type="video/mp4">
    </video> -->
    <Splash v-if="showLoading"/>
    <template v-else>
        <UiCenter v-if="username && !modalIsOpen" class="vue-ui-modal pt-2 pb-7 youtube">
        <iframe width="100%" height="315" src="https://www.youtube.com/embed/RBzQQMykAjs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <a class="button button-blue mr-1" href="https://www.youtube.com/channel/UCkL2TKHfMD1gUd_DTiX6WGA" target="_blank">Follow us on Youtube</a>
        <button class="button button-red" id="show-modal" @click="closeModal()">Close</button>
      </UiCenter>
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
  data() {
    return {
      modalIsOpen: localStorage.firstime || false,
    };
  },
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
  background: url(/img/bg.jpg) no-repeat;
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
  min-height: 99vh;
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
