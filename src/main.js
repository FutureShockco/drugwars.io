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
import Vue2TouchEvents from 'vue2-touch-events';
import VueApexCharts from 'vue-apexcharts'

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
Vue.filter('amount', value => numeral(value).format('0.[00] a'));
Vue.filter('million', value => numeral(value).format('0,0.0000'));
Vue.filter('decimal', value => numeral(value).format('0.[00000]'));

Vue.filter('dateparse', value => moment(new Date(value*1000), 'YYYY-MM-DD').format('MMMM Do YYYY, h:mm:ss a'));
Vue.filter('fromnow', value => moment(new Date(value*1000), 'YYYY-MM-DD').fromNow());


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
Vue.use(Vue2TouchEvents);

store.dispatch('loadSettings');

const language =
  (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
let languageWithoutRegionCode = 'en';

// if (messages[language.toLowerCase().split(/[_-]+/)[0]])
//   languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];
const i18n = new VueI18n({
  locale: languageWithoutRegionCode,
  messages,
  numberFormats,
});

Vue.filter(
  'translate',
  value =>
    i18n.messages[i18n.locale][value.split('.')[0]] &&
    i18n.messages[i18n.locale][value.split('.')[0]][value.split('.')[1]]
      ? i18n.messages[i18n.locale][value.split('.')[0]][value.split('.')[1]]
      : i18n.messages.en[value.split('.')[0]][value.split('.')[1]],
);

Vue.config.productionTip = false;

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app');
