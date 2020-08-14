<template>
  <div class="TakePhoto">
    <van-popup :value="value" @input="input" @opened="getMedia">
      <video ref="video" width="300" height="300" autoplay></video>
      <van-button @click="takePhoto" type="default">拍照</van-button>
      <van-button @click="input" type="default">取消</van-button>
    </van-popup>
    <canvas ref="canvas" width="300" height="300"></canvas>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import { Toast } from 'vant';

@Component
export default class TakePhoto extends Vue {
  @Prop()
  private value!: boolean;

  @Emit()
  private input() {
    return false;
  }
  @Emit()
  private takePhoto() {
    const canvas = this.$refs.canvas as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(this.$refs.video as CanvasImageSource, 0, 0, 300, 300);
    }
    this.input();
    return canvas.toDataURL('image/png');
  }

  private getMedia() {
    const constraints = {
      video: { width: 300, height: 300 },
      audio: true,
    };
    navigator.mediaDevices.getUserMedia(constraints)
    .then((MediaStream: MediaStream) => {
      const video = this.$refs.video as HTMLMediaElement;
      video.srcObject = MediaStream;
      video.play();
    }).catch((err: Error) => {
        Toast(`${err.name}: ${err.message}`);
    });
  }
}
</script>

<style lang="less">
.TakePhoto {
  text-align: center;
  video {
    border: 1px solid #000;
  }
  canvas {
    display: none;
  }
}
</style>