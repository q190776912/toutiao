<template>
  <div class="search">
    <van-search
      class="fixed"
      v-model="value"
      shape="round"
      background="#3296fa"
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @input="onInput"
    >
    </van-search>
    <div class="main">
      <van-cell-group v-if="value">
        <van-cell title="联想内容" />
        <van-cell @click="onSearch(item)" v-for="(item, index) in thickList" :key="index" icon="search" >
          <template slot="title" >
            <span v-html="light(item)"></span>
          </template>
        </van-cell>
      </van-cell-group>
      <van-cell-group v-if="historyList.length">
        <van-cell title="历史记录" >
          <van-icon
            @click="delHistoryList"
            slot="right-icon"
            name="delete"
            style="line-height: inherit;"
          />
        </van-cell>
        <van-cell 
          @click="onSearch(item)" 
          v-for="(item, index) in historyList" 
          :key="index" :title="item" icon="search" 
        >
          <van-icon
            @click.stop="delHistory(index)"
            slot="right-icon"
            name="close"
            style="line-height: inherit;"
          />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { Toast, Dialog } from 'vant';
import { getSuggestion } from '../../../api/search';
import { getLocal, setLocal, remLocal } from '../../../utils/local';

@Component
export default class Search extends Vue {
  private value: string = '';
  private thickList: string[] = [];
  private historyList: string[] = getLocal('historyList') || [];

  private onSearch(val: string) {
    this.historyList.unshift(val);
    this.historyList = [...new Set(this.historyList)];
    setLocal('historyList', this.historyList);
    this.$router.push(`/index/searchResult/${val}`);
  }
  private onInput(q: string) {
    if (!q) {
      return;
    }
    this.debounce(async () => {
      try {
        const res = await getSuggestion(q);
        this.thickList = res.data.data.options;
      } catch {
        Toast.fail('获取联想失败！');
      }
    }, 300);
  }
  private light(item: any): string {
    return item.replace(new RegExp(this.value, 'i'),
      (match: string) => `<span style='color: red;'>${match}</span>`);
  }
  private debounce(callback: () => void, time: number) {
    let timer: any;
    return (() => {
      clearInterval(timer);
      timer = setTimeout(callback, time);
    })();
  }
  private delHistory(index: number) {
    this.historyList.splice(index, 1);
    setLocal('historyList', this.historyList);
  }
  private delHistoryList() {
    Dialog.confirm({
      title: '提示',
      message: '是否删除历史记录',
    }).then(() => {
      this.historyList = [];
      remLocal('historyList');
      Toast.success('删除成功！');
    }).catch(() => {
      Toast.fail('取消删除！');
    });
  }
}
</script>

<style lang="less">
.search {
  .fixed {
    position: fixed;
    width: 100%;
    top: 0;
    z-index: 1;
  }
  .main {
    margin-top: 50px;
  }
}
</style>