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
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import messages from '@/translation.json';
import numberFormats from '@/number.json';

const requireComponent = require.context('./components', true, /[\w-]+\.vue$/);
requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName);
  const componentName = upperFirst(camelCase(fileName.replace(/^\.\//, '').replace(/\.\w+$/, '')));
  Vue.component(componentName, componentConfig.default || componentConfig);
});

Vue.filter('date', value => moment(value, 'YYYY-MM-DD').format('MMM D, YYYY'));
Vue.filter('ms', value => prettyMs(value));
Vue.filter('parseUrl', value => urlParse(value).host);
Vue.filter('amount', value => numeral(value).format('0.00a'));

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
