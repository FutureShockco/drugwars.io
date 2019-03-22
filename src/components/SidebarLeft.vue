<template>
  <div class="sidebar sidebar-left" :class="{ 'sidebar-open': sidebarVisible }">
    <div class="d-flex flex-column height-full">
      <div class="text-center pt-5 pb-3">
        <Avatar
          :size="100"
          :username="username"
          :xp="xp"
          :rank="rank"
        />
        <div
          class="username"
          @click.native="toggleSidebar">
          {{ username }}
          <div class="gang-label" v-if="user.ticker">
            [{{ user.ticker }}]
          </div>
        </div>
      </div>
      <div class="height-full">
        <ul class="pt-1 pb-2 border-bottom">
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
              to="/units"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Bootcamp
            </router-link>
          </li>
          <li>
            <router-link
              to="/fight"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Battles
              <span v-if="activeFightsCount > 0">
              ({{ activeFightsCount }})
            </span>
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
              to="/gangs"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Gangs
            </router-link>
          </li>
          <li>
            <router-link
              to="/rewards"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Rewards
            </router-link>
          </li>
        </ul>
        <ul class="pt-1 pb-2 border-bottom">
          <li>
            <router-link
              to="/referral"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Referral
            </router-link>
          </li>
          <li>
            <router-link
              to="/help"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Help
            </router-link>
          </li>
          <li>
            <a
              href="https://drugwars.tokenbb.io/"
              target="_blank"
              class="py-1 px-4 d-block"
            >
              Forum
            </a>
          </li>
          <li>
          <router-link
              to="/earlyaccess"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Early Access (TOS)
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
    user() {
      return this.$store.state.game.user.user;
    },
    rank() {
      return this.$store.state.game.user.rank[0].rank;
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
    font-size: 20px;

    li {
      clear: both;
      font-family: @special-font;
      .router-link-exact-active {
        opacity: 1;
        color: black;
        background-image: radial-gradient(
          ellipse farthest-corner at center 0px,
          #ffc400 -150%,
          #ffc400 45%,
          #ff8800 85%
        ) !important;
        background-size: cover;
        background-repeat: no-repeat;
        color: black !important;
        background-size: cover;
        background-repeat: no-repeat;
      }

      a {
        color: @white-darker;
        opacity: 0.8;
      }
    }
  }
}
</style>
