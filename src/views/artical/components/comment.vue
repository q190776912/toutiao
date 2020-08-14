<template>
  <div class="comment">
    <img class="aut_photo" :src="item.aut_photo" alt="">
    <van-cell>
      <template slot="title">
        <div class="title">
          <span class="word">{{item.aut_name}}{{comName ? `@${comName}` : ''}}</span>
          <div @click="liking(item)" :class="{ good: true, red: item.is_liking }" >
            <van-icon name="good-job-o" />
            <span>{{item.like_count}}</span>
          </div>
        </div>
      </template>
      <template slot="label">
        <div class="main">
          <p>{{item.content}}</p>
          <div class="reply-comment">
            <span>{{item.pubdate | formatTime}} </span>
            <van-button 
              v-if="type === 'a'" 
              @click="showPannel(item)" 
              round size="mini" color="gray"
            >{{item.reply_count}} 回复</van-button>
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { likingComment, unlikingComment } from '../../../api/comment';

@Component
export default class Comment extends Vue {
  @Prop()
  private item!: any;
  @Prop()
  private type!: string;
  @Prop()
  private comName!: string;
  @Prop()
  private showPannel!: (item: any) => any;

  private async liking(item: any) {
    if (item.is_liking) {
      const res = await unlikingComment(this.item.com_id);
      item.like_count--;
      item.is_liking = false;
    } else {
      const res = await likingComment(this.item.com_id);
      item.like_count++;
      item.is_liking = true;
    }
  }
}
</script>

<style lang="less">
.comment {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  .aut_photo {
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .title {
    display: flex;
    align-items: center;
    .word {
      flex: 1;
    }
    .good {
      display: flex;
      align-items: center;
    }
    .red {
      color: red;
    }
  }
  .main {
    color: #000;
    .reply-comment {
      display: flex;
      align-items: center;
      button {
        margin-left: 10px;
      }
    }
  }
}
</style>