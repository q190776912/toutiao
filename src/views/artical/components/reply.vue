<template>
  <div class="reply">
    <van-search
      v-model="value"
      show-action
      left-icon="comment-o"
      placeholder="请输入评论"
      @search="onSend"
    >
      <template slot="action">
        <span @click="onSend()">发送</span>
      </template>
    </van-search>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Toast } from 'vant';
import { addComment } from '../../../api/comment';
import { Eventbus } from '../../../utils/eventbus';

@Component
export default class Reply extends Vue {
  @Prop()
  private showPannel!: boolean;
  @Prop()
  private comId!: number;

  private value: string = '';

  private async onSend() {
    await this.$login(async () => {
      try {
        if (this.value) {
          const res = await addComment({
            target: this.showPannel ? this.comId.toString() : this.$route.params.articalId,
            content: this.value,
            art_id: this.showPannel ? this.$route.params.articalId : null,
          });
          Toast.success('评论发送成功！');
          this.value = '';
          if (this.showPannel) {
            Eventbus.$emit('sendCom', res.data.data.new_obj);
          } else {
            Eventbus.$emit('sendArt', res.data.data.new_obj);
          }
        } else {
          Toast.fail('评论不能为空！');
        }
      } catch {
        Toast.fail('评论发送失败！');
      }
    });
  }
}
</script>

<style lang="less">
.reply {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>