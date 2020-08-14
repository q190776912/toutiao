import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '@/views/index/index.vue';
import login from '@/views/login/login.vue';
import home from '@/views/index/home/home.vue';
import search from '@/views/index/search/search.vue';
import video from '@/views/index/video/video.vue';
import my from '@/views/index/my/my.vue';
import artical from '@/views/artical/artical.vue';
import searchResult from '@/views/index/searchResult/searchResult.vue';
import userInfo from '@/views/userInfo/userInfo.vue';
import zhi from '@/views/zhi/zhi.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    redirect: '/index/home',
    component: index,
    children: [
      {
        path: 'home',
        component: home,
      },
      {
        path: 'search',
        component: search,
      },
      {
        path: 'searchResult/:key',
        component: searchResult,
      },
      {
        path: 'video',
        component: video,
      },
      {
        path: 'my',
        component: my,
      },
    ],
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/checkLogin',
    component: login,
  },
  {
    path: '/artical/:articalId',
    component: artical,
  },
  {
    path: '/userInfo/:intro',
    component: userInfo,
  },
  {
    path: '/zhi',
    component: zhi,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
