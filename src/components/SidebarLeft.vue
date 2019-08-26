<template>
    <div class="sidebar sidebar-left" :class="{ 'sidebar-open': sidebarVisible }">
        <div class="d-flex flex-column height-full">
            <div class="text-center pt-3 pb-3">
                <!-- <h5 class="text-center text-red">LIVE MAINTENANCE, YOU MAY HAVE SOME ISSUE WHILE PLAYING. END TIME : 7PM UTC</h5> -->
                <Avatar :size="100" :username="user.nickname" :xp="xp" :rank="rank" :picture="user.picture" />
                <div class="username" @click.native="toggleSidebar">
                    {{ user.nickname }}
                    <div class="gang-label" v-if="user.ticker">
                        [{{ user.ticker }}]
                    </div>
                </div>
            </div>
            <div class="height-full">
                <ul class="pt-1 border-bottom">
                    <li>
                        <BaseDropdown class="pb-2 px-4 d-block" :config="config" />
                    </li>
                </ul>
                <ul class="pt-1 pb-2 border-bottom">
                    <li>
                        <router-link to="/overview" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Overview
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/buildings" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Buildings
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/units" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Bootcamp
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/actions" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Actions
                            <span class="text-red" v-if="activeIncFightsCount > 0">
                  ({{ activeIncFightsCount }}<i class="iconfont icon-arrow-down"></i>)
                </span> <span class="text-green" v-if="activeFightsCount > 0">
                  ({{ activeFightsCount }}<i class="iconfont icon-arrow-up"></i>)
                </span>
                            <span class="text-blue" v-if="activeIncTransportsCount > 0">
                  ({{ activeIncTransportsCount }}<i class="iconfont icon-arrow-down"></i>)
                </span>
                            <span class="text-blue" v-if="activeTransportsCount > 0">
                  ({{ activeTransportsCount }}<i class="iconfont icon-arrow-up"></i>)
                </span>
                            <span class="text-orange" v-if="activeStationsCount > 0">
                  ({{ activeStationsCount }}<i class="iconfont icon-arrow-up"></i>)
                </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/map" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Map
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/leaderboards" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Leaderboards
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/gangs" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Gangs
                        </router-link>
                    </li>
                    <!-- <li>
                <router-link
                  to="/contracts"
                  class="py-1 px-4 d-block"
                  @click.native="toggleSidebar"
                >
                  Contracts
                </router-link>
              </li> -->
                    <li>
                        <router-link to="/jobs" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Jobs <span class="text-red" v-if="jobs > 0">
                  ({{ jobs }})
                </span>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/rewards" class="py-1 px-4 d-block sidebar-rewards" @click.native="toggleSidebar">
                            Rewards
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/market/exchange" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Exchange
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/cards/mycollection" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Cards
                        </router-link>
                    </li>
                </ul>
                <ul class="pt-1 pb-2 border-bottom">
                    <li class="referral">
                        <router-link to="/referral" class="py-1 px-4 d-block " @click.native="toggleSidebar">
                            referral
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/settings" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Settings
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/help" class="py-1 px-4 d-block" @click.native="toggleSidebar">
                            Help
                        </router-link>
                    </li>
                    <li>
                        <a href="https://drugwars.tokenbb.io/" target="_blank" class="py-1 px-4 d-block">
                  Forum
                </a>
                    </li>
                </ul>
                <ul class="pt-1 pb-2 border-bottom">
                    <li>
                        <a @click.prevent="logout" class="py-1 px-4 text-gray d-block">
                  LOGOUT
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
import client from '@/helpers/client';

export default {
    data() {
        return {};
    },
    computed: {
        config() {
            return {
                options: [{
                        value: 'Attack',
                    },
                    {
                        value: 'Transport',
                    },
                ],
                backgroundColor: 'green',
            };
        },
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
        jobs() {
            let jobs = 0
            this.$store.state.game.user.jobs.forEach(element => {
                const pendingUpdate = new Date(element.date).getTime();
                const now = new Date().getTime();
                if (pendingUpdate >= now)
                    jobs++
            });
            return jobs;
        },
        activeIncFightsCount() {
            if (this.$store.state.game.inc_fights_count) {
                return this.$store.state.game.inc_fights_count;
            }
            return 0;
        },
        activeFightsCount() {
            if (this.$store.state.game.sent_fights_count) {
                return this.$store.state.game.sent_fights_count;
            }
            return 0;
        },
        activeIncTransportsCount() {
            if (this.$store.state.game.inc_transports_count) {
                return this.$store.state.game.inc_transports_count;
            }
            return 0;
        },
        activeTransportsCount() {
            if (this.$store.state.game.sent_transports_count) {
                return this.$store.state.game.sent_transports_count;
            }
            return 0;
        },
        activeIncStationsCount() {
            if (this.$store.state.game.inc_stations_count) {
                return this.$store.state.game.inc_stations_count;
            }
            return 0;
        },
        activeStationsCount() {
            if (this.$store.state.game.sent_stations_count) {
                return this.$store.state.game.sent_stations_count;
            }
            return 0;
        },
    },
    methods: {
        ...mapActions(['toggleSidebarVisibility']),
        toggleSidebar() {
            if (typeof window !== 'undefined' && window.matchMedia('(max-width: 1011px)').matches) {
                this.toggleSidebarVisibility();
            }
        },
        logout() {
            this.$auth.logOut();
            this.$router.push({ path: '/' });
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
                background-image: radial-gradient( ellipse farthest-corner at center 0px, #ffc400 -150%, #ffc400 45%, #ff8800 85%) !important;
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

.referral{
     background-image: linear-gradient(180deg, #b40000 0%, #7a0000 74%);
}
</style>
