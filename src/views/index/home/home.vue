<template>
  <div class="home">
    <van-nav-bar fixed title="首页" />
    <van-tabs v-model="active">
      <van-tab v-for="(item, index) in channelsList" :key="index" :title="item.name">
        <van-pull-refresh v-model="item.refreshing" @refresh="onRefresh">
          <van-list v-model="item.loading" :finished="item.finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="(item, index) in item.articalList" :key="index" >
              <template slot="title">
                <div class="title">
                  <span class="word">{{item.title}}</span>
                  <van-image class="right" v-if="item.cover.type === 1" lazy-load :src="item.cover.images[0]" />
                </div>
              </template>
              <template slot="label">
                <van-grid v-if="item.cover.type !== 1" :border="false" :column-num="3">
                  <van-grid-item v-for="(imgSrc, imgIndex) in item.cover.images" :key="imgIndex">
                    <van-image lazy-load :src="imgSrc" />
                  </van-grid-item>
                </van-grid>
                <div class="base-info-bar">
                  <div class="base-info">
                    <span>{{item.aut_name}} </span>
                    <span>{{item.comm_count}}条评论 </span>
                    <span>{{item.pubdate | formatTime}}</span>
                  </div>
                  <van-icon @click="moreInfo(item.art_id, index, item.aut_id)" name="cross" />
                </div>
              </template>
            </van-cell>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
    <div class="menus" @click="show = true">
      <van-icon name="wap-nav" />
    </div>
    <channelpop v-model="show" :channelsList="channelsList" :active.sync="active" />
    <more 
      v-model="moreShow" 
      :del-artical="delArtical" 
      :send-artical-report="sendArticalReport" 
      :black-user="blackUser"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { getChannels, getArtical, dislikeArtical, sendReport, addBlacklists } from '../../../api/home';
import { Toast } from 'vant';
import { getLocal } from '../../../utils/local';
import channelpop from './component/channelpop.vue';
import more from './component/more.vue';

@Component({
  components: {
    channelpop,
    more,
  },
})
export default class Home extends Vue {
  private channelsList: any[] = [];
  private active: number = 0;
  private show: boolean = false;
  private moreShow: boolean = false;
  private artId: number = 0;
  private artIndex: number = 0;
  private userId: number = 0;

  private async onLoad() {
    try {
      const item = this.channelsList[this.active];
      const res = await getArtical({
        channel_id: item.id,
        timestamp: Date.now(),
        with_top: 1,
      });
      if (item.refreshing) {
        item.articalList = res.data.data.results;
        item.refreshing = false;
      } else {
        if (res.data.data.results.length) {
          item.articalList = [...item.articalList, ...res.data.data.results];
        } else {
          item.finished = true;
        }
      }
      item.loading = false;
    } catch {
      Toast.fail('文章获取失败！');
    }
  }
  private onRefresh() {
    this.channelsList[this.active].finished = false;
    this.channelsList[this.active].loading = true;
    this.onLoad();
  }
  private async getCannelsList() {
    try {
      const token = this.$store.state.user.token;
      if (token) {
        const res = await getChannels();
        this.channelsList = res.data.data.channels;
      } else {
        const channels = getLocal('channels');
        if (channels) {
          this.channelsList = channels;
        } else {
          const res = await getChannels();
          this.channelsList = res.data.data.channels;
        }
      }
    } catch {
      Toast.fail('频道获取失败！');
    }
    this.channelsList.forEach((item) => {
      this.$set(item, 'articalList', []);
      this.$set(item, 'refreshing', false);
      this.$set(item, 'loading', false);
      this.$set(item, 'finished', false);
    });
  }
  private moreInfo(artId: number, artIndex: number, userId: number) {
    this.moreShow = true;
    this.artId = artId;
    this.artIndex = artIndex;
    this.userId = userId;
  }
  private async delArtical() {
    this.channelsList[this.active].articalList.splice(this.artIndex, 1);
    try {
      await dislikeArtical(this.artId);
      Toast.success('取消成功');
    } catch {
      Toast.fail('取消失败');
    }
  }
  private async sendArticalReport(type: number) {
    try {
      await sendReport(this.artId, type);
      Toast.success('举报成功');
    } catch {
      Toast.fail('举报失败');
    }
  }
  private async blackUser() {
    try {
      await addBlacklists(this.userId);
      Toast.success('拉黑成功');
    } catch {
      Toast.fail('拉黑失败');
    }
  }

  private created() {
    this.getCannelsList();
    this.$emit('aaa');
  }
}
</script>

<style lang="less">
.home {
  margin-bottom: 50px;
  .van-nav-bar {
    position: sticky;
    top: 0;
    height: 50px;
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
      font-size: 16px;
    }
  }
  .van-tabs__wrap {
    position: sticky;
    width: 90%;
    top: 50px;
    z-index: 1;
  }
  .title {
    display: flex;
    .word {
      flex: 1;
    }
    .right {
      vertical-align: top;
      width: 100px;
    }
  }
  .base-info-bar {
    display: flex;
    align-items: center;
    .base-info {
      flex: 1;
    }
  }
  .menus {
    background-color: #fff;
    position: fixed;
    width: 10%;
    top: 50px;
    right: 0;
    text-align: center;
    font-size: 24px;
    line-height: 42px;
    z-index: 1;
    border: 1px solid #edeff3;
  }
}
</style>