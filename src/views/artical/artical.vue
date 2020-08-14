<template>
  <div class="artical">
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h2 class="title">{{title}}</h2>
      <div class="aut">
        <img class="aut-photo" :src="autPhoto">
        <div class="aut-info">
          <p class="aut-name">{{autName}}</p>
          <p class="pubdate">{{pubdate | formatTime}}</p>
        </div>
        <van-button 
          v-if="isFollowed" 
          @click="unfollow" 
          class="attention" 
          size="small" 
          round 
          type="default"
        >已关注</van-button>
        <van-button 
          v-else 
          @click="follow" 
          class="attention" 
          size="small" 
          round 
          type="info"
        >关注</van-button>
      </div>
      <div class="content" v-html="content"></div>
      <div class="function">
        <van-button 
          @click="liking(false)" 
          :class="{ red: attitude }" 
          plain icon="star-o" round type="default"
        > 点赞 </van-button>
        <van-button 
          @click="liking(true)" 
          :class="{ red: !attitude}" 
          plain 
          icon="delete" 
          round 
          type="default"
        >不喜欢</van-button>
      </div>
    </div>
    <commentList :type="'a'" @show-pannel="openPannel"></commentList>
    <pannel v-model="showPannel" :com="com"></pannel>
    <reply :show-pannel="showPannel" :com-id="com.com_id"></reply>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getArtical, likingArtical, dislikeArtical } from '../../api/artical';
import { followingUser, unfollowUser } from '../../api/user';
import { Toast } from 'vant';
import commentList from './components/commentList.vue';
import reply from './components/reply.vue';
import pannel from './components/pannel.vue';
import { Eventbus } from '../../utils/eventbus';

@Component({
  components: {
    commentList,
    reply,
    pannel,
  },
})
export default class Artical extends Vue {
  private artical: any = {};
  private title: string = '';
  private autPhoto: string = '';
  private autName: string = '';
  private pubdate: string = '';
  private isFollowed: boolean = false;
  private attitude: boolean = false;
  private content: string = '';
  private autId: number = 0;
  private showPannel: boolean = false;
  private com: any = {};

  private async follow() {
    try {
      const res = await followingUser(this.autId);
      Toast.success('关注成功！');
      this.isFollowed = true;
    } catch {
      Toast.fail('关注有误！');
    }
  }
  private async unfollow() {
    try {
      const res = await unfollowUser(this.autId);
      Toast.success('取消关注！');
      this.isFollowed = false;
    } catch {
      Toast.fail('取消关注有误！');
    }
  }
  private async liking(type: boolean) {
    //  type: false点赞， true不喜欢
    try {
      if (type) {
        await dislikeArtical(this.$route.params.articalId);
        this.attitude = false;
        Toast.success('已不喜欢该文章！');
      } else {
        await likingArtical(this.$route.params.articalId);
        this.attitude = true;
        Toast.success('点赞成功！');
      }
    } catch {
      Toast.fail('点赞有误！');
    }
  }
  private openPannel(com: any) {
    this.showPannel = true;
    this.com = com;
    Eventbus.$off('addReplyNum');
    Eventbus.$on('addReplyNum', () => {
      this.com.reply_count++;
    });
  }

  private async mounted() {
    try {
      const res = await getArtical(this.$route.params.articalId);
      const artical = res.data.data;
      this.title = artical.title;
      this.autPhoto = artical.aut_photo;
      this.autName = artical.aut_name;
      this.pubdate = artical.pubdate;
      this.isFollowed = artical.is_followed;
      this.content = artical.content;
      this.autId = artical.aut_id;
      this.attitude = artical.attitude ? true : false;
    } catch {
      Toast.fail('文章详情获取失败！');
    }
  }
}
</script>

<style lang="less">
.artical{
  .red {
    color: red;
    border-color: red;
  }
  .gray {
    color: gray;
    border-color: gray;
  }
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
  .detail {
    margin-top: 50px;
    padding: 20px;
    .title {
      text-align: center;
    }
    .aut {
      display: flex;
      align-items: center;
      margin: 20px auto;
      .aut-photo {
        display: block;
        width: 50px;
        border-radius: 50%;
      }
      .aut-info {
        flex: 1;
        margin: 0 10px;
        .aut-name {
          margin-bottom: 6px;
        }
      }
    }
    .function {
      display: flex;
      justify-content: space-around;
      margin-top: 20px;
    }
  }
}
</style>