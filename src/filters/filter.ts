import Vue from 'vue';
Vue.filter('formatTime', (date: any): string => {
  const unit: string[] = ['年', '个月', '天', '小时', '分', '秒'];
  const amount: number[] = [12, 30, 24, 60, 60];
  let p: number = 5;
  let now = Math.floor((Date.now() - new Date(date).valueOf()) / 1000);
  while (p > 0 && now / amount[p - 1] >= 1) {
    now = Math.floor(now / amount[--p]);
  }
  return `${now}${unit[p]}前`;
});
