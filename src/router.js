import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { isWeb } from '@/helpers/utils';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Callback = () => import(/* webpackChunkName: "callback" */ '@/views/Callback.vue');
const Missions = () => import(/* webpackChunkName: "missions" */ '@/views/Missions.vue');
const Overview = () => import(/* webpackChunkName: "overview" */ '@/views/Overview.vue');
const Buildings = () => import(/* webpackChunkName: "buildings" */ '@/views/Buildings/Office.vue');
const Drugs = () => import(/* webpackChunkName: "drugs" */ '@/views/Buildings/Drugs.vue');
const Weapons = () => import(/* webpackChunkName: "weapons" */ '@/views/Buildings/Weapons.vue');
const Alcohol = () => import(/* webpackChunkName: "alcohol" */ '@/views/Buildings/Alcohol.vue');
const Units = () => import(/* webpackChunkName: "units" */ '@/views/Bootcamp/Units.vue');
const Fight = () => import(/* webpackChunkName: "fight" */ '@/views/Fights/Fight.vue');
const Fights = () => import(/* webpackChunkName: "fights" */ '@/views/Fights/Fights.vue');
const HallOfFame = () =>
  import(/* webpackChunkName: "hall-of-fame" */ '@/views/Fights/HallOfFame.vue');
const Targets = () => import(/* webpackChunkName: "targets" */ '@/views/Fights/Targets.vue');
const Gangs = () => import(/* webpackChunkName: "gangs" */ '@/views/Gangs/Gangs.vue');
const GangCreate = () => import(/* webpackChunkName: "gang-create" */ '@/views/Gangs/Create.vue');
const Gang = () => import(/* webpackChunkName: "gang" */ '@/views/Gangs/Gang.vue');
const Claim = () => import(/* webpackChunkName: "claim-token" */ '@/views/Claim.vue');
const GangSettings = () =>
  import(/* webpackChunkName: "gang-settings" */ '@/views/Gangs/GangSettings.vue');
const Rewards = () => import(/* webpackChunkName: "rewards" */ '@/views/Rewards.vue');
const EarlyAccess = () => import(/* webpackChunkName: "earlyaccess" */ '@/views/EarlyAccess.vue');
const Leaderboards = () =>
  import(/* webpackChunkName: "leaderboards" */ '@/views/Leaderboards.vue');
const Referral = () => import(/* webpackChunkName: "referral" */ '@/views/Referral.vue');
const Invite = () => import(/* webpackChunkName: "invite" */ '@/views/Invite.vue');
const About = () => import(/* webpackChunkName: "about" */ '@/views/About.vue');
const Help = () => import(/* webpackChunkName: "help" */ '@/views/Help.vue');
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
      path: '/missions',
      name: 'missions',
      beforeEnter: requireAuth,
      component: Missions,
    },
    {
      path: '/buildings',
      name: 'buildings',
      beforeEnter: requireAuth,
      component: Buildings,
    },
    {
      path: '/drugs',
      name: 'drugs',
      beforeEnter: requireAuth,
      component: Drugs,
    },
    {
      path: '/weapons',
      name: 'weapons',
      beforeEnter: requireAuth,
      component: Weapons,
    },
    {
      path: '/alcohol',
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
      path: '/fight',
      name: 'fight',
      beforeEnter: requireAuth,
      component: Fight,
    },
    {
      path: '/fights',
      name: 'fights',
      beforeEnter: requireAuth,
      component: Fights,
    },
    {
      path: '/hall-of-fame',
      name: 'hall-of-fame',
      beforeEnter: requireAuth,
      component: HallOfFame,
    },
    {
      path: '/targets',
      name: 'targets',
      beforeEnter: requireAuth,
      component: Targets,
    },
    {
      path: '/gangs',
      name: 'gangs',
      beforeEnter: requireAuth,
      component: Gangs,
    },
    {
      path: '/gang/:id',
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
      path: '/leaderboards',
      name: 'leaderboards',
      beforeEnter: requireAuth,
      component: Leaderboards,
    },
    {
      path: '/referral',
      name: 'referral',
      beforeEnter: requireAuth,
      component: Referral,
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
