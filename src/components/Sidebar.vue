<template>
  <div class="nav border-right" :class="{'nav--open': sidebarVisible}">
    <ul>
      <li class="stripper">
          <router-link class="width-fit"
            to="/"
            @click.native="toggleSidebar"
          >
            <div >
            <Avatar class="m-1" :size="80" :username="username"/>
           <div class="username">{{ username }} <span class="level">{{ parseFloat(((Math.sqrt(625 + 100 * xp) - 25) / 50) + 1).toFixed(0) }}</span></div>
            </div>
          </router-link>
        <Prize/>
      </li>
      <li>
        <router-link
          to="/missions"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          <img class="mini" :src="`/img/icons/missions.png`">
          Missions
        </router-link>
      </li>
      <li>
        <router-link
          to="/buildings"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          <img class="mini" :src="`/img/icons/buildings.png`">
          Buildings
        </router-link>
      </li>
      <li>
        <router-link
          to="/camp"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          <img class="mini" :src="`/img/icons/bootcamp.png`">
          Boot camp
        </router-link>
      </li>
      <li>
        <router-link
          to="/battles"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          <img class="mini" :src="`/img/icons/battles.png`">
          Battles
        </router-link>
      </li>
      <li>
        <router-link
          to="/leaderboard"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          <img class="mini" :src="`/img/icons/gangs.png`">
          Gangs
        </router-link>
      </li>
      <li>
        <router-link
          to="/heist"
          class="py-2 px-4 d-block border-bottom"
          @click.native="toggleSidebar"
        >
          <img class="mini" :src="`/img/icons/heist.png`">
          Heist
        </router-link>
      </li>
      <li>
        <router-link
          to="/"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          <img class="mini" :src="`/img/icons/overview.png`">
          Overview
        </router-link>
      </li>
      <li>
        <router-link
          to="/leaderboard"
          class="py-2 px-4 d-block"
          @click.native="toggleSidebar"
        >
          <img class="mini" :src="`/img/icons/leaderboard.png`">
          Leaderboard
        </router-link>
      </li>
      <li>
        <router-link
          to="/about"
          class="py-2 px-4 d-block border-bottom"
          @click.native="toggleSidebar"
        >
          <img class="mini" :src="`/img/icons/dw.png`">
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
    xp() {
      return this.$store.state.game.user.user.xp;
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
  position: fixed;
  top: @header-height;
  bottom: 0;
  left: -@sidebar-width;
  width: @sidebar-width;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: rgb(0, 0, 0);
  transition: left 0.3s;

  @media @bp-small {
    top: @topnav-height;
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
    background: #2a2a34;
    margin: 0px;
    li {
      clear: both;

      .router-link-exact-active {
        background-image: radial-gradient(
          ellipse farthest-corner at center 0px,
          #ffc400 -150%,
          #ffc400 45%,
          #ff8800 85%
        );
        color: white;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0), inset 0 0 1px 1px #ff8800;
        img {
          -webkit-filter: grayscale(0%); /* Safari 6.0 - 9.0 */
          filter: grayscale(0%);
          border: 1px solid black;
        }
      }

      a {
        letter-spacing: 2px;
        display: inline-block;
        text-transform: uppercase;
        color: #fbbd08;
        font-family: 'Bebas Neue', Helvetica, Arial, sans-serif;
        box-shadow: 0 0 8px #000, 0 0 8px #000 !important;
        border: 1px solid #282828;
        background: url(/img/stripe.png) top left;
        border-top: none;
        text-transform: uppercase;
        text-shadow: 1px 1px 8px #000;
      }
    }
  }

  .username {
    background: #ffc400 !important;
    color: #000 !important;
    position: absolute;
    font-size: 16px;
    top: 55px;
    left: 2px;
    text-shadow: none !important;
    padding-left: 10px;
  }

  .level {
    background: #0b0b0b;
    color: white;
    border-radius: 0px;
    padding: 3px;
    border: 0px;
    text-shadow: none !important;
  }

  .mini {
    height: 28px;
    width: 28px;
    margin-left: -10px;
    margin-right: 10px;
    margin-bottom: -8px;
    box-shadow: inset 3px 3px 5px black;
    border-radius: 19px;
    background: #545454;
    -webkit-filter: grayscale(100%); /* Safari 6.0 - 9.0 */
    filter: grayscale(100%);
  }

  .stripper {
    border: 1px solid #282828;
    background: url(/img/stripe.png) top left;
    border-top: none;
  }

  .width-fit {
    width: 100%;
    border: 2px #ffc400 solid;
    box-shadow: 0px 5px 5px #17171b !important;
  }
}
</style>
