import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
import { isWeb } from '@/helpers/utils';
import client from '@/helpers/client';

const Home = () => import(/* webpackChunkName: "home" */ '@/views/Home.vue');
const Callback = () => import(/* webpackChunkName: "callback" */ '@/views/Callback.vue');
const Jobs = () => import(/* webpackChunkName: "jobs" */ '@/views/Jobs/Jobs.vue');
const Tutorial = () => import(/* webpackChunkName: "tutorial" */ '@/views/Overview/Tutorial.vue');
const Overview = () => import(/* webpackChunkName: "overview" */ '@/views/Overview/Overview.vue');

const Buildings = () => import(/* webpackChunkName: "buildings" */ '@/views/Buildings/Office.vue');
const Drugs = () => import(/* webpackChunkName: "drugs" */ '@/views/Buildings/Drugs.vue');
const Weapons = () => import(/* webpackChunkName: "weapons" */ '@/views/Buildings/Weapons.vue');
const Alcohol = () => import(/* webpackChunkName: "alcohol" */ '@/views/Buildings/Alcohol.vue');

const Units = () => import(/* webpackChunkName: "units" */ '@/views/Bootcamp/Units.vue');
const Training = () => import(/* webpackChunkName: "training" */ '@/views/Bootcamp/Training.vue');

const Fight = () => import(/* webpackChunkName: "fight" */ '@/views/Actions/Fight.vue');
const Transport = () => import(/* webpackChunkName: "transport" */ '@/views/Actions/Transport.vue');

const Outgoing = () => import(/* webpackChunkName: "outgoing" */ '@/views/Actions/Outgoing.vue');
const Incoming = () => import(/* webpackChunkName: "incoming" */ '@/views/Actions/Incoming.vue');
const Targets = () => import(/* webpackChunkName: "targets" */ '@/views/Actions/Targets.vue');
const HallOfFame = () =>
  import(/* webpackChunkName: "hall-of-fame" */ '@/views/Actions/HallOfFame.vue');

const Gangs = () => import(/* webpackChunkName: "gangs" */ '@/views/Gangs/Gangs.vue');
const GangCreate = () => import(/* webpackChunkName: "gang-create" */ '@/views/Gangs/Create.vue');
const Gang = () => import(/* webpackChunkName: "gang" */ '@/views/Gangs/Gang.vue');
const GangSettings = () =>
  import(/* webpackChunkName: "gang-settings" */ '@/views/Gangs/GangSettings.vue');
const GangBuildings = () =>
  import(/* webpackChunkName: "gang-buildings" */ '@/views/Gangs/Buildings.vue');
const Diplomacy = () =>
  import(/* webpackChunkName: "gang-diplomacy" */ '@/views/Gangs/Diplomacy.vue');
const GangDeposits = () =>
  import(/* webpackChunkName: "gang-deposits" */ '@/views/Gangs/Deposits.vue');
const Rewards = () => import(/* webpackChunkName: "rewards" */ '@/views/Rewards.vue');

const NewContract = () =>
  import(/* webpackChunkName: "newcontract" */ '@/views/Contracts/Create.vue');
const Contracts = () =>
  import(/* webpackChunkName: "contracts" */ '@/views/Contracts/Contracts.vue');

const Shop = () => import(/* webpackChunkName: "shop" */ '@/views/Market/Shop.vue');
const Exchange = () => import(/* webpackChunkName: "exchange" */ '@/views/Market/Exchange.vue');
const Claim = () => import(/* webpackChunkName: "claim-token" */ '@/views/Market/Claim.vue');
const Deposit = () => import(/* webpackChunkName: "deposit" */ '@/views/Market/Deposit.vue');

const WMap = () => import(/* webpackChunkName: "map" */ '@/views/Map/Map.vue');

const Leaderboards = () =>
  import(/* webpackChunkName: "leaderboards" */ '@/views/Leaderboards/Leaderboards.vue');
const Heistboard = () =>
  import(/* webpackChunkName: "heistboard" */ '@/views/Leaderboards/Heistboard.vue');
const Fightboard = () =>
  import(/* webpackChunkName: "fightboard" */ '@/views/Leaderboards/Fightboard.vue');

const EarlyAccess = () => import(/* webpackChunkName: "earlyaccess" */ '@/views/EarlyAccess.vue');
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
  if (client.ws.readyState === 3) {
    client.restart();
    store.dispatch('login').then(() => {
      if (store.state.auth.username) {
        store.dispatch('init').then(() => {
          store.dispatch('refresh_inc_fights_count');
          store.dispatch('refresh_sent_fights_count');
          store.dispatch('refresh_inc_transport_count');
          store.dispatch('refresh_sent_transport_count');
          store.dispatch('refresh_inc_fights');
          store.dispatch('refresh_sent_fights');
          store.dispatch('refresh_gang_buildings');
          store.dispatch('hideLoading');
          next();
        });
      } else {
        store.dispatch('hideLoading');
        const redirect = to.fullPath === '/' ? undefined : to.fullPath;
        next({ name: 'login', query: { redirect } });
      }
    });
  } else if (!store.state.auth.username) {
    store.dispatch('showLoading');

    store.dispatch('login').then(() => {
      if (store.state.auth.username) {
        store.dispatch('init').then(() => {
          store.dispatch('refresh_inc_fights_count');
          store.dispatch('refresh_sent_fights_count');
          store.dispatch('refresh_inc_transport_count');
          store.dispatch('refresh_sent_transport_count');
          store.dispatch('refresh_inc_fights');
          store.dispatch('refresh_sent_fights');
          store.dispatch('refresh_gang_buildings');
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
      path: '/overview/tutorial',
      name: 'tutorial',
      beforeEnter: requireAuth,
      component: Tutorial,
    },
    {
      path: '/jobs',
      name: 'jobs',
      beforeEnter: requireAuth,
      component: Jobs,
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
      path: '/units/training',
      name: 'training',
      beforeEnter: requireAuth,
      component: Training,
    },
    {
      path: '/actions',
      name: 'actions',
      beforeEnter: requireAuth,
      component: Fight,
    },
    {
      path: '/actions/fight',
      name: 'fight',
      beforeEnter: requireAuth,
      component: Fight,
    },
    {
      path: '/actions/transport',
      name: 'transport',
      beforeEnter: requireAuth,
      component: Transport,
    },
    {
      path: '/actions/outgoing',
      name: 'outgoing',
      beforeEnter: requireAuth,
      component: Outgoing,
    },
    {
      path: '/actions/incoming',
      name: 'incoming',
      beforeEnter: requireAuth,
      component: Incoming,
    },
    {
      path: '/actions/targets',
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
      path: '/contracts',
      name: 'contracts',
      beforeEnter: requireAuth,
      component: Contracts,
    },
    {
      path: '/contracts/create',
      name: 'newcontract',
      beforeEnter: requireAuth,
      component: NewContract,
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
      path: '/gangs/gang/:id/settings',
      name: 'gang-settings',
      beforeEnter: requireAuth,
      component: GangSettings,
    },
    {
      path: '/gangs/gang/:id/buildings',
      name: 'gang-buildings',
      beforeEnter: requireAuth,
      component: GangBuildings,
    },
    {
      path: '/gangs/gang/:id/diplomacy',
      name: 'gang-diplomacy',
      beforeEnter: requireAuth,
      component: Diplomacy,
    },
    {
      path: '/gangs/gang/:id/deposit',
      name: 'gang-deposit',
      beforeEnter: requireAuth,
      component: GangDeposits,
    },

    {
      path: '/market/shop',
      name: 'shop',
      beforeEnter: requireAuth,
      component: Shop,
    },
    {
      path: '/market/future',
      name: 'future',
      beforeEnter: requireAuth,
      component: Claim,
    },
    {
      path: '/market/deposit',
      name: 'deposit',
      beforeEnter: requireAuth,
      component: Deposit,
    },
    {
      path: '/market/exchange',
      name: 'exchange',
      beforeEnter: requireAuth,
      component: Exchange,
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
      path: '/leaderboards/heist',
      name: 'heistboard',
      beforeEnter: requireAuth,
      component: Heistboard,
    },
    {
      path: '/leaderboards/fights',
      name: 'fightboard',
      beforeEnter: requireAuth,
      component: Fightboard,
    },
    {
      path: '/map',
      name: 'map',
      beforeEnter: requireAuth,
      component: WMap,
    },
    {
      path: '/settings',
      name: 'settings',
      beforeEnter: requireAuth,
      component: Settings,
    },
    {
      path: '/settings/referral',
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
