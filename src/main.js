import 'primer/index.scss';
import '@vue/ui/dist/vue-ui.css';
import '@/styles.less';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
import VueUi from '@vue/ui';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import prettyMs from 'pretty-ms';
import urlParse from 'url-parse';
import moment from 'moment';
import numeral from 'numeral';
import VueAnalytics from 'vue-analytics';
import client from '@/helpers/client';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import messages from '@/translation.json';
import numberFormats from '@/number.json';
import AuthPlugin from './helpers/auth_plugin';

Vue.use(VueAnalytics, {
  id: 'UA-135445665-1',
});

const requireComponent = require.context('./components', true, /[\w-]+\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));
  Vue.component(componentName, componentConfig.default || componentConfig);
});

setInterval(() => client.request('heartbeat', null), 10 * 1000);

Vue.filter('date', value => moment(value, 'YYYY-MM-DD').format('MMM D, YYYY'));
Vue.filter('ms', value => prettyMs(parseInt(value / 1000) * 1000));
Vue.filter('parseUrl', value => urlParse(value).host);
Vue.filter('amount', value => numeral(value).format('0.[00]a'));

Vue.directive('lowercase', {
  update: el => {
    el.value = el.value.toLowerCase(); // eslint-disable-line no-param-reassign
  },
});

Vue.directive('uppercase', {
  update: el => {
    el.value = el.value.toUpperCase(); // eslint-disable-line no-param-reassign
  },
});
Vue.use(AuthPlugin);
Vue.use(VueUi);
Vue.use(VueI18n);

store.dispatch('loadSettings');

const i18n = new VueI18n({
  locale: 'en',
  messages,
  numberFormats,
});

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
