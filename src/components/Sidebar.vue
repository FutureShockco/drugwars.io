<template>
  <div class="nav border-right" :class="{'nav--open': sidebarVisible}">
    <div class="p-4">
      <router-link
        to="/"
        @click.native="toggleSidebar"
      >
        <span class="logo iconfont icon-beaker text-white"/>
      </router-link>
    </div>
    <h5 class="py-2 px-4 d-block">
      {{ prizeProps.balance }}
    </h5>
    <ul>
      <li class="border-bottom">
        <router-link
          to="/"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          {{ username }}
        </router-link>
      </li>
      <li>
        <router-link
          to="/"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          Overview
        </router-link>
      </li>
      <li>
        <router-link
          to="/missions"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          Missions
        </router-link>
      </li>
      <li>
        <router-link
          to="/buildings"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          Buildings
        </router-link>
      </li>
      <li>
        <router-link
          to="/units"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          Boot camp
        </router-link>
      </li>
      <li>
        <router-link
          to="/battles"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          Battles
        </router-link>
      </li>
      <li>
        <router-link
          to="/leaderboard"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          Leaderboard
        </router-link>
      </li>
      <li>
        <router-link
          to="/about"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          About
        </router-link>
      </li>
    </ul>
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
    prizeProps() {
      return this.$store.state.game.prizeProps;
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

.nav {
  z-index: @sidebar-zindex;
  font-size: 17px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: -@sidebar-width;
  width: @sidebar-width;
  overflow: auto;
  background-color: @sidebar-bg-color;
  transition: left 0.3s;

  @media @bp-small {
    left: auto;
  }

  &--open {
    left: 0 !important;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;

    li {
      clear: both;
      border-color: #2f3136 !important;

      .router-link-exact-active {
        opacity: 1;
      }

      a {
        text-decoration: none;
        color: #f6f6f7;
        opacity: 0.3;
      }
    }
  }
}
</style>
