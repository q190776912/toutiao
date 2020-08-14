<template>
  <div class="pannel">
    <van-popup
      :value="value"
      @input="input"
      position="bottom"
      :overlay-style="{ height: '90%' }"
      :style="{ height: '50%' }"
    >
      <van-cell class="top-title" :border="false">
        <template slot="title">
          <div class="title">
            <van-icon @click="input" class="cross" name="cross" />
            <span class="word">{{com.reply_count}} 回复</span>
          </div>
        </template>
      </van-cell>
      <comment :item="com"></comment>
      <van-cell title="当前评论的回复信息"></van-cell>
      <commentList :type="'c'" :comId="com.com_id" :com-name="com.aut_name"></commentList>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';
import comment from './comment.vue';
import commentList from './commentList.vue';

@Component({
  components: {
    comment,
    commentList,
  },
})
export default class Pannel extends Vue {
  @Prop()
  private value!: boolean;
  @Prop()
  private com!: any;

  @Emit()
  private input() {
    return false;
  }
}
</script>

<style lang="less">
.pannel {
  position: relative;
  .van-popup {
    margin-bottom: 50px;
  }
  .top-title {
    position: sticky;
    top: 0;
    z-index: 1;
    .title {
      text-align: center;
      .cross {
        display: block;
        height: 14px;
        position: absolute;
        margin: auto;
        left: 0;
        top: 0;
        bottom: 0;
      }
    }
  }
  .aut {
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
}
</style>