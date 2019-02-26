<template>
  <div class="sidebar sidebar-left border-right border-lg-left" :class="{ 'sidebar-open': sidebarVisible }">
    <div class="d-flex flex-column height-full">
      <div class="text-center border-bottom pt-5 pb-6">
        <router-link
          to="/"
          @click.native="toggleSidebar"
        >
          <Avatar
            :size="100"
            :username="username"
            :xp="xp"
          />
          <div
            class="username"
            @click.native="toggleSidebar"
          >
            {{ username }}
          </div>
        </router-link>
      </div>
      <div class="height-full">
        <ul class="border-bottom">
          <li>
            <router-link
              to="/"
              class="py-2 px-3 d-block"
              @click.native="toggleSidebar"
            >
              <img :src="`/img/icons/overview.png`">
              Overview
            </router-link>
          </li>
          <li>
            <router-link
              to="/missions"
              class="py-2 px-3 d-block"
              @click.native="toggleSidebar"
            >
             <img :src="`/img/icons/missions.png`">
              Missions
            </router-link>
          </li>
          <li>
            <router-link
              to="/buildings"
              class="py-2 px-3 d-block"
              @click.native="toggleSidebar"
            >
            <img :src="`/img/icons/buildings.png`">
              Buildings
            </router-link>
          </li>
          <li>
            <router-link
              to="/units"
              class="py-2 px-3 d-block"
              @click.native="toggleSidebar"
            >
            <img :src="`/img/icons/bootcamp.png`">
              Bootcamp
            </router-link>
          </li>
          <li>
            <router-link
              to="/battles"
              class="py-2 px-3 d-block"
              @click.native="toggleSidebar"
            >
            <img :src="`/img/icons/battles.png`">
              Battles
              <span v-if="activeFightsCount > 0">
              ({{ activeFightsCount }})
            </span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/leaderboard"
              class="py-2 px-3 d-block"
              @click.native="toggleSidebar"
            >
            <img :src="`/img/icons/leaderboard.png`">
              Leaderboard
            </router-link>
          </li>
        </ul>
        <ul class="pt-1 pb-2 border-bottom">
          <li>
            <router-link
              to="/referral"
              class="py-2 px-3 d-block"
              @click.native="toggleSidebar"
            >
              Referral
            </router-link>
          </li>
          <li>
            <router-link
              to="/help"
              class="py-2 px-3 d-block"
              @click.native="toggleSidebar"
            >
              Help
            </router-link>
          </li>
        </ul>
      </div>
      <Footer/>
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
    xp() {
      return this.$store.state.game.user.user.xp;
    },
    activeFightsCount() {
      const activeFights = this.$store.state.game.fights.filter(fight => fight.is_done === 0);
      return activeFights.length;
    },
  },
  methods: {
    ...mapActions(['toggleSidebarVisibility', 'logout']),
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

.sidebar-left {
  left: -@sidebar-width;
  @media @bp-small {
    left: 0;
  }

  &.sidebar-open {
    left: 0;
  }

  ul {
    list-style: none;
    font-family: @heading-font;
    letter-spacing: 2px;
    font-size: 20px;
    margin:0px;
    li {
      clear: both;
      a{
        img{
            width: 24px;
            border-radius: 5px;
            border:1px solid #ffc400;
            margin-bottom: -5px;
            margin-right: 5px;
            background: grey;
        }
      }

      .router-link-exact-active {
        opacity: 1;
        color: black;
        background-image: radial-gradient(ellipse farthest-corner at center 0,#ffc400 -150%,#ffc400 45%,#f80 85%);
        box-shadow: 0 1px 2px transparent, inset 0 0 1px 1px #f80;
        text-shadow: 0px 0px 5px black, 0px 0px 5px black, 0px 0px 5px black;
        color: #fff;
            img{
            border:1px solid #000000;
            background: #2d2d2d;
        }
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
    text-shadow: 2px 2px 0 black;
    top: 110px;
  }
}
</style>
