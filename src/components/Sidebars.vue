<template>
  <div class="sidebar-container">
    <div class="sidebars">
      <div class="sidebar sidebar-left border-right border-lg-left" :class="{ 'sidebar-open': sidebarVisible }">
        <div class="text-center my-4">
          <router-link
            to="/"
            @click.native="toggleSidebar"
          >
            <Avatar :size="100" :username="username"/>
          </router-link>
        </div>
        <ul>
          <li class="border-bottom pb-3 overflow-hidden">
            <div
              class="py-1 px-4 d-block text-center username"
              @click.native="toggleSidebar"
            >
              {{ username }}
            </div>
          </li>
          <li>
            <router-link
              to="/"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Overview
            </router-link>
          </li>
          <li>
            <router-link
              to="/missions"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Missions
            </router-link>
          </li>
          <li>
            <router-link
              to="/buildings"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Buildings
            </router-link>
          </li>
          <li>
            <router-link
              to="/camp"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Boot camp
            </router-link>
          </li>
          <li>
            <router-link
              to="/battles"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Battles
            </router-link>
          </li>
          <li>
            <router-link
              to="/leaderboard"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Leaderboard
            </router-link>
          </li>
          <li>
            <router-link
              to="/about"
              class="py-1 px-4 d-block border-bottom border-top"
              @click.native="toggleSidebar"
            >
              About
            </router-link>
          </li>
        </ul>
      </div>
      <div class="sidebar sidebar-right border-left border-sm-right pt-4">
        <Prize/>
        <Heist/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  computed: {
    sidebarVisible() {
      return this.$store.state.ui.sidebarVisible;
    },
    username() {
      return this.$store.state.auth.username;
    },
  },
  methods: {
    ...mapActions(['toggleSidebarVisibility']),
    toggleSidebar() {
      if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1011px)').matches) {
        this.toggleSidebarVisibility();
      }
    },
  },
};
</script>

<style scoped lang="less">
@import '../vars';

.sidebar-container {
  background-color: @sidebar-bg-color;
  position: fixed;
  top: 0;
  bottom: 0;
  width: @main-width;
}

.sidebars {
  z-index: 9;
  left: 0;
  position: relative;
  display: block;
  height: 100%;

  .sidebar {
    width: @sidebar-width;
    top: @header-height;
    bottom: 0;
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: rgb(0, 0, 0);
    transition: left 0.3s;

    @media @bp-small {
      top: @topnav-height;
    }

    &.sidebar-right {
      right: -@sidebar-width;

      @media @bp-small {
        right: 0;
      }
    }

    &.sidebar-left {
      left: -@sidebar-width;

      @media @bp-small {
        left: 0;
      }

      &.sidebar-open {
        left: 0;
      }
    }
  }
}

.sidebar-left {
  ul {
    list-style: none;
    font-family: @heading-font;
    letter-spacing: 2px;
    font-size: 20px;

    li {
      clear: both;

      .router-link-exact-active {
        opacity: 1;
        color: black;
        background: url(/img/icons/tab-brush.svg) black;
        background-size: 100% 100%;
        background-position: -20px;
        text-shadow: 0px 0px 6px #fbbd08, 0px 0px 6px #fbbd08, 0px 0px 6px #fbbd08,
          0px 0px 6px #fbbd08, 0px 0px 6px #fbbd08;
        background-repeat: no-repeat;
      }

      a {
        color: @white-darker;
        opacity: 0.8;
      }
    }
  }

  .username {
    position: absolute;
    width: 100%;
    top: 100px;
  }
}
</style>
