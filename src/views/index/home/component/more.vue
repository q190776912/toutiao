<template>
  <div>
    <van-popup :value="value" @input="input" @closed="isReport = false" :style="{ width: '80%' }">
      <van-cell-group v-if="isReport">
        <van-cell>
          <template slot="title">
            <van-icon @click.stop="isReport = false" name="arrow-left" />
          </template>
        </van-cell>
        <van-cell @click="sendArticalReport(item.id), input()" v-for="(item, index) in typeList" :key="index" :title="item.type" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell @click="delArtical(), input()" title="不感兴趣" icon="label-o" />
        <van-cell @click="isReport = true" title="反馈垃圾内容" icon="notes-o">
          <van-icon
            slot="right-icon"
            name="arrow"
            style="line-height: inherit;"
          />
        </van-cell>
        <van-cell @click="blackUser(), input()" title="拉黑作者" icon="delete" />
      </van-cell-group>
    </van-popup>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
export default class More extends Vue {
  @Prop()
  private value!: number;
  @Prop()
  private delArtical!: () => void;
  @Prop()
  private sendArticalReport!: () => void;
  @Prop()
  private blackUser!: () => void;

  private isReport: boolean = false;
  private typeList = [
    { id: 0, type: '其他问题'},
    { id: 1, type: '标题夸张'},
    { id: 2, type: '低俗色情'},
    { id: 3, type: '错别字多'},
    { id: 4, type: '旧闻重复'},
    { id: 5, type: '广告软文'},
    { id: 6, type: '内容不实'},
    { id: 7, type: '涉嫌违法犯罪'},
    { id: 8, type: '侵权'},
  ];

  @Emit()
  private input() {
    return false;
  }
}
</script>