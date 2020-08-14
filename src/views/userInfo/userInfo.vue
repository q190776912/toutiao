<template>
  <div class="UserInfo">
    <van-nav-bar 
      fixed title="搜索结果" left-arrow 
      right-text="保存" @click-left="$router.back()"
      @click-right="onClickRight"
    />
    <div class="main">
      <van-cell @click="showPhoto = true" center title="头像" is-link>
        <template slot="default">
          <img :src="my.photo" alt="">
        </template>
      </van-cell>
      <van-cell title="昵称" is-link >
        <template slot="default">
          <label>
            <input @blur.stop="name = false" v-if="name" type="text" v-model="my.name">
            <span @click.stop="name = true" v-else>{{my.name}}</span>
          </label>
        </template>
      </van-cell>
      <van-cell title="介绍" is-link>
        <template slot="default">
          <label>
            <input @blur.stop="intro = false" v-if="intro" type="text" v-model="my.intro">
            <span @click.stop="intro = true" v-else>{{my.intro}}</span>
          </label>
        </template>
      </van-cell>
      <van-cell title="性别" is-link>
        <template slot="default">
          <label>
            <input @blur.stop="gender = false" v-if="gender" type="text" v-model="my.gender">
            <span @click.stop="gender = true" v-else>{{my.gender}}</span>
          </label>
        </template>
      </van-cell>
      <van-cell title="生日" is-link>
        <template slot="default">
          <label>
            <input @blur.stop="birthday = false" v-if="birthday" type="text" v-model="my.birthday">
            <span @click.stop="birthday = true" v-else>{{my.birthday}}</span>
          </label>
        </template>
      </van-cell>
    </div>
    <photoPannel v-model="showPhoto" :photo.sync="my.photo"></photoPannel>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { getUserProfile, editUserProfile } from '../../api/user';
import { Toast } from 'vant';
import photoPannel from './components/photoPannel.vue';

@Component({
  components: {
    photoPannel,
  },
})
export default class UserInfo extends Vue {
  private my: any = {};
  private name: boolean = false;
  private intro: boolean = false;
  private gender: boolean = false;
  private birthday: boolean = false;
  private showPhoto: boolean = false;

  private async onClickRight() {
    try {
      const res = await editUserProfile({
        name: this.my.name,
        photo: this.my.photo.split('base64,')[1],
        gender: this.my.gender === '男' ? 0 : 1,
        birthday: this.my.birthday,
        intro: this.my.intro,
      });
      Toast.success('修改成功！');
    } catch {
      Toast.success('修改失败！');
    }
  }

  private async mounted() {
    const res = await getUserProfile();
    this.$set(this.my, 'photo', res.data.data.photo);
    this.$set(this.my, 'name', res.data.data.name);
    this.$set(this.my, 'intro', this.$route.params.intro);
    this.$set(this.my, 'gender', res.data.data.gender ? '女' : '男');
    this.$set(this.my, 'birthday', res.data.data.birthday);
  }
}
</script>

<style lang="less">
.UserInfo {
  height: 100%;
  .van-nav-bar {
    height: 50px;
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
      font-size: 16px;
    }
    .van-nav-bar__left {
      top: 0;
      .van-nav-bar__arrow {
        color: #fff;
        font-size: 16px;
      }
    }
    .van-nav-bar__right {
      top: -2px;
      .van-nav-bar__text {
        color: #fff;
      }
    }
  }
  .main {
    margin-top: 50px;
    img {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
}
</style>