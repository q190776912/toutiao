<template>
  <div class="index">
    <router-view class="index-main" />
    <van-tabbar route>
      <van-tabbar-item to="/index/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/index/search" icon="search">问答</van-tabbar-item>
      <van-tabbar-item to="/index/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/index/my" icon="setting-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="less">
.index {
  .index-main {
    margin-bottom: 50px;
  }
}
</style>