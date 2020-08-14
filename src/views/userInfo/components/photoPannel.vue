<template>
  <div class="PhotoPannel">
    <van-popup :value="value" @input="input" >
      <van-uploader :after-read="afterRead">
        <p class="cell">从相册中选择</p>
      </van-uploader>
      <p @click="showTakePhoto = true" class="cell">拍照</p>
      <p @click="input()" class="cell">取消</p>
    </van-popup>
    <takePhoto v-model="showTakePhoto" @take-photo="sendPhoto"></takePhoto>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Toast, Dialog } from 'vant';
import takePhoto from './takePhoto.vue';

@Component({
  components: {
    takePhoto,
  },
})
export default class PhotoPannel extends Vue {
  @Prop()
  private value!: boolean;

  private showTakePhoto: boolean = false;

  @Emit()
  private input() {
    return false;
  }
  @Emit('update:photo')
  private sendPhoto(content: string) {
    this.input();
    return content;
  }

  private async afterRead(file: any) {
    await Dialog.confirm({
      title: '提示',
      message: '是否替换头像？',
    }).then(() => {
      this.sendPhoto(file.content);
    }).catch(() => {
      Toast('取消替换');
    });
  }
}
</script>

<style lang="less">
.PhotoPannel {
  .cell {
    width: 300px;
    height: 40px;
    line-height: 40px;
    font-size: 18px;
    text-align: center;
    border-top: 1px solid #ccc;
  }
}
</style>