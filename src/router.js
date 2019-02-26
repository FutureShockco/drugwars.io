import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { isWeb } from '@/helpers/utils';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Callback = () => import(/* webpackChunkName: "callback" */ '@/views/Callback.vue');
const Dashboard = () => import(/* webpackChunkName: "dashboard" */ '@/views/Dashboard.vue');
const Missions = () => import(/* webpackChunkName: "missions" */ '@/views/Missions.vue');
const Buildings = () => import(/* webpackChunkName: "buildings" */ '@/views/Buildings/Office.vue');
const Drugs = () => import(/* webpackChunkName: "drugs" */ '@/views/Buildings/Drugs.vue');
const Weapons = () => import(/* webpackChunkName: "weapons" */ '@/views/Buildings/Weapons.vue');
const Alcohol = () => import(/* webpackChunkName: "alcohol" */ '@/views/Buildings/Alcohol.vue');
const Units = () => import(/* webpackChunkName: "units" */ '@/views/Bootcamp/Units.vue');
const Battles = () => import(/* webpackChunkName: "battles" */ '@/views/Fights/Battles.vue');
const Fights = () => import(/* webpackChunkName: "fights" */ '@/views/Fights/Fights.vue');
const Leaderboard = () => import(/* webpackChunkName: "leaderboard" */ '@/views/Leaderboard.vue');
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
  routes: [
    {
      path: '/',
      name: 'dashboard',
      beforeEnter: requireAuth,
      component: Dashboard,
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
      path: '/battles',
      name: 'battles',
      beforeEnter: requireAuth,
      component: Battles,
    },
    {
      path: '/fights',
      name: 'fights',
      beforeEnter: requireAuth,
      component: Fights,
    },
    {
      path: '/leaderboard',
      name: 'leaderboard',
      beforeEnter: requireAuth,
      component: Leaderboard,
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
