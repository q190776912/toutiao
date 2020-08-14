import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './filters/filter';
import '@/style/base.css';
import vant from 'vant';
import 'vant/lib/index.css';
import { Lazyload } from 'vant';
import '@/style/iconfont.css';
import MyPlugin from '@/utils/MyPlugin';

Vue.use(vant);
Vue.use(Lazyload);
Vue.use(MyPlugin);

Vue.config.productionTip = false;

const vue = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
