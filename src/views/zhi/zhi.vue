<template>
  <div class="Zhi">
    <van-nav-bar fixed title="小智同学" left-arrow @click-left="$router.back()" />
    <ul class="message">
      <li v-for="(item, index) in message" :key="index" :class="{robot: item.isRobot, user: !item.isRobot}">
        <div class="avatar">
          <img v-if="item.isRobot" src="http://img2.imgtn.bdimg.com/it/u=2986499689,763581727&fm=26&gp=0.jpg" alt="">
          <img v-else src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4087125932,4288183110&fm=26&gp=0.jpg" alt="">
        </div>
        <div class="comment">
          <i :class="{left: item.isRobot, right: !item.isRobot}" ></i>
          <p>{{item.msg}}</p>
        </div>
      </li>
    </ul>
    <van-search
      class="send"
      v-model="value"
      show-action
      left-icon="comment-o"
      placeholder="请输入评论"
      @search="onSend"
    >
      <template slot="action">
        <span @click="onSend">发送</span>
      </template>
    </van-search>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import io from 'socket.io-client';
import { Toast } from 'vant';

@Component
export default class Zhi extends Vue {
  private value: string = '';
  private message: any[] = [];
  private socket: any = null;

  private onSend() {
    if (this.value) {
      this.message.push({
        isRobot: false,
        msg: this.value,
      });
      this.socket.emit('message', {
        msg: this.value,
        timestamp: Date.now(),
      });
      this.value = '';
    } else {
      Toast.fail('发送内容不能为空！');
    }
  }

  private mounted() {
    this.message.push({
      isRobot: true,
      msg: '你好呀',
    });
    this.socket = io(`http://ttapi.research.itcast.cn?token=${this.$store.state.user.token}`);
    this.socket.on('message', (msg: any) => {
      this.message.push({
        isRobot: true,
        msg: msg.msg,
      });
    });
  }
}
</script>

<style lang="less">
.Zhi {
  .van-nav-bar {
    height: 50px;
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
      font-size: 16px;
    }
    .van-nav-bar__left {
      top: 0;
      .van-nav-bar__arrow {
        color: #fff;
        font-size: 16px;
      }
    }
  }
  .message {
    position: fixed;
    top: 50px;
    bottom: 50px;
    width: 100%;
    .robot,
    .user {
      display: flex;
      background-color: #f5f7f9;
      width: 100%;
      .avatar {
        position: relative;
        width: 50px;
        margin: 0 5px;
        img {
          position: absolute;
          margin: auto;
          top: 0;
          bottom: 0;
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
      }
      .comment {
        background-color: #f5f7f9;
        flex: 1;
        position: relative;
        .left,
        .right {
          display: block;
          position: absolute;
          height: 0;
          width: 0;
          margin: auto;
          top: 0;
          bottom: 0;
          border-top: 5px solid transparent;
          border-bottom: 5px solid transparent;
        }
        .left {
          border-right: 10px solid skyblue;
          left: 1px;
        }
        .right {
          border-left: 10px solid skyblue;
          right: 1px;
        }
        p {
          padding: 0 10px;
          word-wrap: wrap;
          word-break: break-all;
          background-color: skyblue; 
          line-height: 40px;
          font-size: 20px;
          border-radius: 10px;
        }
      }
    }
    .user {
      flex-direction: row-reverse;
      .comment {
        display: flex;
        flex-direction: row-reverse;
      }
    }
  }
  .send {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
}
</style>