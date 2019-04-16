import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { isWeb } from '@/helpers/utils';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Callback = () => import(/* webpackChunkName: "callback" */ '@/views/Callback.vue');
const Missions = () => import(/* webpackChunkName: "missions" */ '@/views/Missions/Missions.vue');
const Tutorial = () => import(/* webpackChunkName: "tutorial" */ '@/views/Missions/Tutorial.vue');
const Overview = () => import(/* webpackChunkName: "overview" */ '@/views/Overview.vue');
const Buildings = () => import(/* webpackChunkName: "buildings" */ '@/views/Buildings/Office.vue');
const Drugs = () => import(/* webpackChunkName: "drugs" */ '@/views/Buildings/Drugs.vue');
const Weapons = () => import(/* webpackChunkName: "weapons" */ '@/views/Buildings/Weapons.vue');
const Alcohol = () => import(/* webpackChunkName: "alcohol" */ '@/views/Buildings/Alcohol.vue');
const Units = () => import(/* webpackChunkName: "units" */ '@/views/Bootcamp/Units.vue');
const Trainings = () =>
  import(/* webpackChunkName: "trainings" */ '@/views/Bootcamp/Trainings.vue');
const Fight = () => import(/* webpackChunkName: "fight" */ '@/views/Fights/Fight.vue');
const Outgoing = () => import(/* webpackChunkName: "outgoing" */ '@/views/Fights/Outgoing.vue');
const Incoming = () => import(/* webpackChunkName: "incoming" */ '@/views/Fights/Incoming.vue');
const HallOfFame = () =>
  import(/* webpackChunkName: "hall-of-fame" */ '@/views/Fights/HallOfFame.vue');
const Targets = () => import(/* webpackChunkName: "targets" */ '@/views/Fights/Targets.vue');
const Gangs = () => import(/* webpackChunkName: "gangs" */ '@/views/Gangs/Gangs.vue');
const GangCreate = () => import(/* webpackChunkName: "gang-create" */ '@/views/Gangs/Create.vue');
const Gang = () => import(/* webpackChunkName: "gang" */ '@/views/Gangs/Gang.vue');
const Claim = () => import(/* webpackChunkName: "claim-token" */ '@/views/Claim.vue');
const Deposit = () => import(/* webpackChunkName: "deposit" */ '@/views/Deposit.vue');
const GangSettings = () =>
  import(/* webpackChunkName: "gang-settings" */ '@/views/Gangs/GangSettings.vue');
const Rewards = () => import(/* webpackChunkName: "rewards" */ '@/views/Rewards.vue');
const Shop = () => import(/* webpackChunkName: "shop" */ '@/views/Shop/Shop.vue');
const EarlyAccess = () => import(/* webpackChunkName: "earlyaccess" */ '@/views/EarlyAccess.vue');
const Leaderboards = () =>
  import(/* webpackChunkName: "leaderboards" */ '@/views/Leaderboards/Leaderboards.vue');
const Heistboard = () =>
  import(/* webpackChunkName: "leaderboards" */ '@/views/Leaderboards/Heistboard.vue');
const Settings = () => import(/* webpackChunkName: "settings" */ '@/views/Settings/Settings.vue');
const Referral = () => import(/* webpackChunkName: "referral" */ '@/views/Settings/Referral.vue');
const Invite = () => import(/* webpackChunkName: "invite" */ '@/views/Invite.vue');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const Help = () => import(/* webpackChunkName: "help" */ '@/views/Help/Help.vue');
const GetStarted = () => import(/* webpackChunkName: "getstarted" */ '@/views/Help/GetStarted.vue');
const Guides = () => import(/* webpackChunkName: "guides" */ '@/views/Help/Guides.vue');
const Error404 = () => import(/* webpachChunkName: "error404" */ '@/views/404.vue');

Vue.use(Router);

setInterval(() => {
  store.dispatch('updateTimestamp');
}, 1000);

const requireAuth = (to, from, next) => {
  if (!store.state.auth.username) {
    store.dispatch('showLoading');
    store.dispatch('login').then(() => {
      if (store.state.auth.username) {
        store.dispatch('init').then(() => {
          store.dispatch('refresh_inc_fights');
          store.dispatch('refresh_sent_fights');
          store.dispatch('hideLoading');
          next();
        });
      } else {
        store.dispatch('hideLoading');
        const redirect = to.fullPath === '/' ? undefined : to.fullPath;
        next({ name: 'login', query: { redirect } });
      }
    });
  } else {
    next();
  }
};

export default new Router({
  mode: isWeb() ? 'history' : 'hash',
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'overview',
      beforeEnter: requireAuth,
      component: Overview,
    },
    {
      path: '/overview',
      name: 'overview',
      beforeEnter: requireAuth,
      component: Overview,
    },
    {
      path: '/missions',
      name: 'missions',
      beforeEnter: requireAuth,
      component: Missions,
    },
    {
      path: '/missions/tutorial',
      name: 'tutorial',
      beforeEnter: requireAuth,
      component: Tutorial,
    },
    {
      path: '/buildings',
      name: 'buildings',
      beforeEnter: requireAuth,
      component: Buildings,
    },
    {
      path: '/buildings/drugs',
      name: 'drugs',
      beforeEnter: requireAuth,
      component: Drugs,
    },
    {
      path: '/buildings/weapons',
      name: 'weapons',
      beforeEnter: requireAuth,
      component: Weapons,
    },
    {
      path: '/buildings/alcohol',
      name: 'alcohol',
      beforeEnter: requireAuth,
      component: Alcohol,
    },
    {
      path: '/units',
      name: 'units',
      beforeEnter: requireAuth,
      component: Units,
    },
    {
      path: '/units/trainings',
      name: 'trainings',
      beforeEnter: requireAuth,
      component: Trainings,
    },
    {
      path: '/fight',
      name: 'fight',
      beforeEnter: requireAuth,
      component: Fight,
    },
    {
      path: '/fight/outgoing',
      name: 'outgoing',
      beforeEnter: requireAuth,
      component: Outgoing,
    },
    {
      path: '/fight/incoming',
      name: 'incoming',
      beforeEnter: requireAuth,
      component: Incoming,
    },
    {
      path: '/fight/targets',
      name: 'targets',
      beforeEnter: requireAuth,
      component: Targets,
    },
    {
      path: '/hall-of-fame',
      name: 'hall-of-fame',
      beforeEnter: requireAuth,
      component: HallOfFame,
    },
    {
      path: '/gangs',
      name: 'gangs',
      beforeEnter: requireAuth,
      component: Gangs,
    },
    {
      path: '/gangs/gang/:id',
      name: 'gang',
      beforeEnter: requireAuth,
      component: Gang,
    },
    {
      path: '/gang/:id/settings',
      name: 'gang-settings',
      beforeEnter: requireAuth,
      component: GangSettings,
    },
    {
      path: '/claim-token',
      name: 'claim-token',
      beforeEnter: requireAuth,
      component: Claim,
    },
    {
      path: '/shop/future',
      name: 'future',
      beforeEnter: requireAuth,
      component: Claim,
    },
    {
      path: '/shop/deposit',
      name: 'deposit',
      beforeEnter: requireAuth,
      component: Deposit,
    },
    {
      path: '/gangs/create',
      name: 'gang-create',
      beforeEnter: requireAuth,
      component: GangCreate,
    },
    {
      path: '/rewards',
      name: 'rewards',
      beforeEnter: requireAuth,
      component: Rewards,
    },
    {
      path: '/shop',
      name: 'shop',
      beforeEnter: requireAuth,
      component: Shop,
    },
    {
      path: '/leaderboards',
      name: 'leaderboards',
      beforeEnter: requireAuth,
      component: Leaderboards,
    },
    {
      path: '/leaderboards/heist',
      name: 'heistboard',
      beforeEnter: requireAuth,
      component: Heistboard,
    },
    {
      path: '/settings/referral',
      name: 'referral',
      beforeEnter: requireAuth,
      component: Referral,
    },
    {
      path: '/settings',
      name: 'settings',
      beforeEnter: requireAuth,
      component: Settings,
    },
    {
      path: '/i/:username',
      name: 'invite',
      component: Invite,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      beforeEnter: requireAuth,
      component: About,
    },
    {
      path: '/help',
      name: 'help',
      beforeEnter: requireAuth,
      component: Help,
    },
    {
      path: '/help/getstarted',
      name: 'getstarted',
      beforeEnter: requireAuth,
      component: GetStarted,
    },
    {
      path: '/help/guides',
      name: 'guides',
      beforeEnter: requireAuth,
      component: Guides,
    },
    {
      path: '/earlyaccess',
      name: 'earlyaccess',
      beforeEnter: requireAuth,
      component: EarlyAccess,
    },
    {
      path: '/login',
      name: 'login',
      component: Home,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '/callback',
      name: 'callback',
      component: Callback,
      meta: {
        hideSidebar: true,
      },
    },
    {
      path: '*',
      component: Error404,
      meta: {
        hideSidebar: true,
      },
    },
  ],
});
