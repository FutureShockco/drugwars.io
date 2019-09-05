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
          	<UiCenter v-if="!isConnected" class="vue-ui-modal pt-2 pb-7 youtube">
              <h5>A new patch has been released!</h5>
              <div class="text-red" >Try to reconnect</div>
    				<button class="button button-green" id="show-modal"  @click="forceReconnect()" >Reconnect</button>
    			</UiCenter>
    			<TopNav v-if="username"/>
    			<Sidebars v-if="username && showSidebar"/>
          <!-- <BottomNav v-if="username"/> -->
    			<balloon v-if="username" title="DrugWars LiveChat" position="bottom-right" :zooming="false">
    			</balloon>
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
import store from '@/store';
import client from '@/helpers/client';
import { setTimeout } from 'timers';

export default {
  data() {
    return {
      modalIsOpen: localStorage.firstime || false,
      attempt:1,
      connected:false
    };
  },
  watch:{
    connected(){
      this.connected = this.$store.state.game.isconnected;
    }
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
    isConnected() {
      if (store.state.auth.username) 
      {
        return this.$store.state.game.isconnected;
      }
      return true;
    },
  },

  methods: {
    closeModal() {
      localStorage.setItem('firstime', true);
      this.modalIsOpen = true;
    },
    forceReconnect() {
      const self = this;
      client.restart();
      store.dispatch('login').then(() => {
        if (store.state.auth.username) {
          store.dispatch('init').then(() => {
       
            self.attempt = 1;
          });
        } else {
          this.$router.push({ path: '/login' });
        }
      });
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
  margin-top: @header-height;
  transition: left 0.3s;
  background: #000000;
  background-image: linear-gradient(to top, #0e0e0e, #0c0c0c 74%) !important;
  min-height: 94vh;
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
