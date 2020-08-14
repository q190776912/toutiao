<template>
  <div class="searchResult">
    <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" />
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell @click="toArtical(item.art_id)" v-for="(item, index) in list" :key="index" >
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
          </div>
          <van-grid :border="false" :column-num="3">
            <van-grid-item icon="comment-o" :text="`${item.comm_count}`" />
            <van-grid-item icon="like-o" :text="`${item.like_count}`" />
            <van-grid-item icon="chat-o" text="分享" />
          </van-grid>
        </template>
      </van-cell>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getSearchResult } from '../../../api/search';
import { Toast } from 'vant';

@Component
export default class SearchResult extends Vue {
  private list: any[] = [];
  private loading: boolean = false;
  private finished: boolean = false;
  private page: number = 1;

  private async onLoad() {
    const res = await getSearchResult({ page: this.page++, q: this.$route.params.key });
    if (res.data.data.results.length) {
      this.list = [...this.list, ...res.data.data.results];
    } else {
      this.finished = true;
    }
    this.loading = false;
  }
  private toArtical(articalId: number) {
    this.$router.push(`/artical/${articalId}`);
  }

  private async mounted() {
    const res = await getSearchResult({ page: this.page++, q: this.$route.params.key });
    this.list = res.data.data.results;
  }
}
</script>

<style lang="less">
.searchResult {
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
  .list {
    margin-top: 50px;
  }
  .base-info-bar {
    display: flex;
    align-items: center;
    .base-info {
      flex: 1;
    }
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
  .van-grid-item__content {
    display: flex;
    flex-direction: row;
    padding: 4px 0;
    .van-icon {
      font-size: 20px;
    }
    .van-grid-item__text {
      margin-top: 0;
      margin-left: 10px;
    }
  }
}
</style>