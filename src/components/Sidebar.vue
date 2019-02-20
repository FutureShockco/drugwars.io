<template>
  <div class="nav border-right" :class="{'nav--open': sidebarVisible}">
    <div class="text-center mt-4">
      <router-link to="/">
        <Avatar :size="100" :username="username"/>
      </router-link>
    </div>
    <ul>
      <li class="border-bottom pb-3 overflow-hidden">
        <div
          class="py-2 px-4 d-block text-center username"
          @click.native="toggleSidebar"
        >
          {{ username }}
        </div>
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
          to="/camp"
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
          to="/heist"
          class="py-2 px-4 d-block border-bottom"
          @click.native="toggleSidebar"
        >
          Heist
        </router-link>
      </li>
      <li>
        <router-link
          to="/about"
          class="py-2 px-4 d-block border-bottom"
          @click.native="toggleSidebar"
        >
          About
        </router-link>
      </li>
    </ul>
    <div class="mb-4">
      <Prize/>
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

.nav {
  z-index: @sidebar-zindex;
  font-size: 17px;
  position: fixed;
  top: @header-height;
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
    left: 0;

    @media @bp-small {
      left: auto;
    }
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;

    li {
      clear: both;

      .router-link-exact-active {
        opacity: 1;
        background-color: @primary-color;
        color: @bg-color;
      }

      a {
        font-family: 'Bebas Neue', Helvetica, Arial, sans-serif;
        text-decoration: none;
        color: #f6f6f7;
        opacity: 0.6;
        letter-spacing: 2px;
        font-size: 20px;
      }
    }
  }
}
</style>
