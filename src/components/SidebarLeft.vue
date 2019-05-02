<template>
  <div class="sidebar sidebar-left" :class="{ 'sidebar-open': sidebarVisible }">
    <div class="d-flex flex-column height-full">
      <div class="text-center pt-5 pb-3">
        <!-- <h5 class="text-center text-red">LIVE MAINTENANCE, YOU MAY HAVE SOME ISSUE WHILE PLAYING. END TIME : 4PM UTC</h5> -->
        <Avatar
          :size="100"
          :username="user.nickname"
          :xp="xp"
          :rank="rank"
          :picture = "user.picture"
        />
        <div
          class="username"
          @click.native="toggleSidebar">
          {{ user.nickname }}
          <div class="gang-label" v-if="user.ticker">
            [{{ user.ticker }}]
          </div>
        </div>
      </div>
      <div class="height-full">
        <ul class="pt-1 pb-2 border-bottom">
          <li>
            <router-link
              to="/overview"
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
              <span class="text-red" v-if="activeIncFightsCount > 0">
              ( {{ activeIncFightsCount }}<i class="iconfont icon-arrow-down"></i>)
            </span>              <span class="text-green" v-if="activeFightsCount > 0">
              ( {{ activeFightsCount }}<i class="iconfont icon-arrow-up"></i>)
            </span>
            </router-link>
          </li>
          <li>
            <router-link
              to="/map"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Map
            </router-link>
          </li>
          <li>
            <router-link
              to="/leaderboards/fights"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Leaderboards
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
              class="py-1 px-4 d-block sidebar-rewards"
              @click.native="toggleSidebar"
            >
              Rewards
            </router-link>
          </li>
          <li>
            <router-link
              to="/market/shop"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Market
            </router-link>
          </li>
        </ul>
        <ul class="pt-1 pb-2 border-bottom">
          <li>
            <router-link
              to="/settings"
              class="py-1 px-4 d-block"
              @click.native="toggleSidebar"
            >
              Settings
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
    activeIncFightsCount() {
      if (this.$store.state.game.inc_fights) {
        const activeFights = this.$store.state.game.inc_fights.filter(fight => fight.is_done === 0);
        return activeFights.length;
      }
      return 0;
    },
    activeFightsCount() {
      if (this.$store.state.game.sent_fights) {
        const activeSentFights = this.$store.state.game.sent_fights.filter(
          fight => fight.is_done === 0,
        );
        return activeSentFights.length;
      }
      return 0;
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

@media screen and (min-width: 1119px) {
  .sidebar-rewards {
    display: none !important;
  }
}

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
      .router-link-active {
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
