<template>
  <div class="comment-list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div v-for="(item, index) in commentList" :key="index">
        <comment 
          :item="item" 
          :type="type" 
          :showPannel="showPannel" 
          :com-name="comName ? comName : ''"
        ></comment>
      </div>
    </van-list>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit, Watch } from 'vue-property-decorator';
import { getComment } from '../../../api/comment';
import comment from './comment.vue';
import { Eventbus } from '../../../utils/eventbus';

@Component({
  components: {
    comment,
  },
})
export default class CommentList extends Vue {
  @Prop()
  private type!: string;
  @Prop()
  private comId!: number;
  @Prop()
  private comName!: string;

  private commentList: any[] = [];
  private loading: boolean = false;
  private finished: boolean = false;
  private lastId: number = 0;

  @Emit()
  private showPannel(item: any) {
    return item;
  }

  private async onLoad() {
    const source = this.type === 'a' ? this.$route.params.articalId : this.comId.toString();
    const res = await getComment({
      type: this.type, source,
      offset: this.lastId ? this.lastId : null,
    });
    if (res.data.data.results.length) {
      this.lastId = res.data.data.last_id;
      this.commentList = [...this.commentList, ...res.data.data.results];
    } else {
      this.finished = true;
    }
    this.loading = false;
  }

  @Watch('comId')
  private clearList(val: any) {
    this.commentList = [];
    this.lastId = 0;
    this.finished = false;
  }

  private mounted() {
    if (this.type === 'a') {
      Eventbus.$off('sendArt');
      Eventbus.$on('sendArt', (obj: any) => {
        this.commentList.unshift(obj);
      });
    } else {
      Eventbus.$off('sendCom');
      Eventbus.$on('sendCom', (obj: any) => {
        this.commentList.unshift(obj);
        Eventbus.$emit('addReplyNum');
      });
    }
  }
}
</script>

<style lang="less">
.comment-list {
  margin-bottom: 54px;
}
</style>