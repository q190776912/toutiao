import store from '@/store';
import router from '@/router';
import { Toast } from 'vant';

const MyPlugin = {
  install(Vue: any) {
    Vue.prototype.$login = (success?: () => void, fail?: () => void) => {
      const token = store.state.user.token;
      if (token) {
        if (success) {
          success();
        }
      } else {
        if (fail) {
          fail();
        }
        Toast.fail('请先登录！');
        router.push('/checkLogin');
      }
    };
  },
};

export default MyPlugin;
