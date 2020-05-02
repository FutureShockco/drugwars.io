<template>
  <div id="app">
    <Splash v-if="showLoading" />
    <template v-else>
      <UiCenter v-if="username && !modalIsOpen" class="vue-ui-modal pt-2 pb-7 youtube">
        <iframe
          width="100%"
          height="315"
          src="https://www.youtube.com/embed/RBzQQMykAjs"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <a
          class="button button-blue mr-1"
          href="https://www.youtube.com/channel/UCkL2TKHfMD1gUd_DTiX6WGA"
          target="_blank"
        >Follow us on Youtube</a>
        <button class="button button-red" id="show-modal" @click="closeModal()">Close</button>
      </UiCenter>

      <TopNav v-if="username" />
      <Sidebars v-if="username && showSidebar" />
      <!-- <BottomNav v-if="username"/> -->
      <!-- <balloon v-if="username" title="DrugWars LiveChat" position="bottom-right" :zooming="false"></balloon> -->
      <router-view
        :class="{
              content: showSidebar,
              'content--nav-open': sidebarVisible,
            }"
      />
    </template>
    <Notifications />
    <!-- <UiCenter v-if="username && checkTime && timeIsopen" class="vue-ui-modal pt-2 pb-7 youtube">
       <p>We detected an issue with your clock. Please check your local date time to avoid any display issue!</p>
    				<button class="button button-red" id="show-modal" @click="closeTimeModal()">Close</button>
    </UiCenter> -->
    <cookie-law style="z-index:99999">
      <div slot="message">
        <h3
          class="text-center text-red"
        >IMPORTANT NOTE: DRUGWARS v0.7 IS RELEASED, DON'T FORGET TO CHOOSE DETROIT AS YOUR CURRENT SERVER IF YOU WERE PLAYING BEFORE THIS UPDATE. THANK YOU FOR YOUR UNDERSTANDING</h3>
      </div>
    </cookie-law>
  </div>
</template>

<script>
import store from '@/store';
import client from '@/helpers/client';
import { setTimeout } from 'timers';
import CookieLaw from 'vue-cookie-law';

export default {
  data() {
    return {
      modalIsOpen: localStorage.firstime || false,
      messageIsOpen: localStorage.message || false,
      attempt: 1,
      connected: false,
      timeIsopen: false,
      firstLoad:true,
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
    // checkTime() {
    //   if (this.$store.state.game.prizeProps && this.$store.state.game.prizeProps.server_time && this.firstLoad) {
    //     this.firstLoad = false;
    //     const diff = Math.abs(this.$store.state.game.prizeProps.server_time - new Date().getTime());
    //     if (diff > 1500000) {
    //       this.timeIsopen = true;
    //       return true;
    //     }
    //     return false;
    //   }
    //   return false;
    // },
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
  background: url(//img.drugwars.io/bg.jpg) no-repeat;
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
