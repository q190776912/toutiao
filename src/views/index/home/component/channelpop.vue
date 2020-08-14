<template>
  <div class="channelpop">
    <van-popup
      :value="value"
      @input="input"
      position="bottom"
      :style="{ height: '95%' }"
    >
      <!-- 关闭按钮 -->
      <van-cell :border="false">
        <template slot="title">
          <van-icon @click="input" class="cross" name="cross" />
        </template>
      </van-cell>
      <!-- 我的频道 -->
      <van-cell center :border="false">
        <template slot="title">
          <span>我的频道</span>
        </template>
        <template slot="default">
          <van-button @click="edit" v-if="isEdit" plain round size="small" type="warning">完成</van-button>
          <van-button @click="isEdit = true" v-else plain round size="small" type="warning">编辑</van-button>
        </template>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item v-for="(item, index) in channelsList" :key="index">
          <template slot="text">
            <div class="grid-cell" @click="changeChannel(index)">
              <span :class="{ active: active === index }">{{ item.name }}</span>
              <van-icon v-if="isEdit && index > 0" name="cross" @click="removeChannel(index)" />
            </div>
          </template>
        </van-grid-item>
      </van-grid>
      <!-- 频道推荐 -->
      <van-cell center :border="false">
        <template slot="title">
          <span>频道推荐</span>
        </template>
      </van-cell>
      <van-grid :border="false">
        <van-grid-item v-for="(item, index) in sugestChannels" :key="index">
          <template slot="text">
            <div class="grid-cell" @click="addChannel(item)">
              <van-icon v-if="isEdit" name="plus" />
              <span>{{ item.name }}</span>
            </div>
          </template>
        </van-grid-item>
      </van-grid>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Emit, Prop } from 'vue-property-decorator';
import { getAllChannels, editChannels } from '../../../../api/home';
import { Toast } from 'vant';
import { setLocal } from '../../../../utils/local';

@Component
export default class Channelpop extends Vue {
  @Prop()
  private value!: boolean;
  @Prop()
  private active!: number;
  @Prop()
  private channelsList!: any;

  private isEdit: boolean = false;
  private allChannels = [];

  @Emit()
  private input() {
    return false;
  }
  @Emit('update:active')
  private changeChannel(index: number) {
    if (!this.isEdit) {
      this.input();
    }
    return this.isEdit ? this.active : index;
  }

  private addChannel(item: any) {
    if (this.isEdit) {
      this.$set(item, 'articalList', []);
      this.$set(item, 'refreshing', false);
      this.$set(item, 'loading', false);
      this.$set(item, 'finished', false);
      this.channelsList.push(item);
    }
  }
  private removeChannel(index: number) {
    if (index && this.channelsList.length > 2) {
      this.channelsList.splice(index, 1);
    } else {
      Toast.fail('不能删除太多频道喔！');
    }
  }
  private async edit() {
    try {
      this.isEdit = false;
      const token = this.$store.state.user.token;
      if (token) {
        const myChannels = {
          channels: this.channelsList.slice(1, this.channelsList.length).map((item: any, index: number) =>
            ({ id: item.id, seq: index + 2 })),
        };
        await editChannels(myChannels);
      } else {
        setLocal('channels', this.channelsList);
      }
    } catch {
      Toast.fail('频道修改失败！');
    }
  }

  get channelsIdList() {
    return this.channelsList.map((item: any) => item.id);
  }
  get sugestChannels() {
    return this.allChannels.filter((item: any) => !this.channelsIdList.includes(item.id));
  }

  private async created() {
    try {
      const res = await getAllChannels();
      this.allChannels = res.data.data.channels;
    } catch {
      Toast.fail('频道获取失败！');
    }
  }
}
</script>

<style lang="less">
.channelpop {
  .cross {
    font-size: 30px;
  }
  .grid-cell {
    font-size: 14px;
    display: flex;
    justify-items: center;
  }
  .active {
    color: red;
  }
}
</style>