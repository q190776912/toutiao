<template>
  <div class="my">
    <div class="user-info">
      <div class="user">
        <img :src="my.photo" @click="$router.push(`/userInfo/${my.intro}`)">
        <span>{{my.name}}</span>
      </div>
      <div class="read">
        <p>今日阅读</p>
        <p>0分钟</p>
      </div>
      <van-grid :border="false" :column-num="3">
        <van-grid-item>
          <p>{{my.art_count}}</p>
          <p>动态</p>
        </van-grid-item>
        <van-grid-item>
          <p>{{my.follow_count}}</p>
          <p>关注</p>
        </van-grid-item>
        <van-grid-item>
          <p>{{my.fans_count}}</p>
          <p>粉丝</p>
        </van-grid-item>
      </van-grid>
    </div>
    <van-grid :border="false" :column-num="3">
      <van-grid-item>
        <van-icon color="red" size="28" name="star-o" />
        <p>收藏</p>
      </van-grid-item>
      <van-grid-item>
        <van-icon color="yellow" size="28" name="clock-o" />
        <p>历史</p>
      </van-grid-item>
      <van-grid-item>
        <van-icon color="blue" size="28" name="records" />
        <p>作品</p>
      </van-grid-item>
    </van-grid>
    <div class="function">
      <van-cell title="消息通知" is-link />
      <van-cell title="用户反馈" is-link />
      <van-cell @click="$router.push('/zhi')" title="小智同学" is-link />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getUserInfo } from '../../../api/user';
import { Toast } from 'vant';

@Component
export default class My extends Vue {
  private my: any = {};
  private async mounted() {
    try {
      const res = await getUserInfo();
      window.console.log(res);
      this.my = res.data.data;
    } catch {
      Toast.fail('获取用户信息失败！');
    }
  }
}
</script>

<style lang="less">
.my {
  .user-info {
    background-color: #3e9df8;
    position: relative;
    padding: 20px 0;
    color: #fff;
    .user {
      display: flex;
      padding: 0 20px;
      padding-top: 20px;
      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
      }
    }
    .read {
      position: absolute;
      right: 0;
      top: 40px;
      text-align: center;
      background-color: rgba(0, 0, 0, 0.3);
      border-top-left-radius: 20px;
      border-bottom-left-radius: 20px;
      p {
        margin: 5px 10px; 
      }
    }
    .van-grid-item__content {
      background-color: #3e9df8;
    }
  }
}
</style>