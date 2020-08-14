<template>
  <div class="login">
    <van-nav-bar fixed title="登录" />
    <van-cell-group>
      <van-field v-model="formData.mobile" :error-message="check.mobile" placeholder="请输入手机号">
        <template slot="left-icon">
          <span class="iconfont icon-phone"></span>
        </template>
      </van-field>
      <van-field v-model="formData.code" :error-message="check.code" clearable placeholder="请输入验证码">
        <template slot="left-icon">
          <span class="iconfont icon-lock"></span>
        </template>
        <van-button @click="sendCode" slot="button" size="small" type="primary" color="#ededed">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <div class="loginbtn">
      <van-button @click="btnClick" type="info" :loading="loading">登录</van-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { login } from '../../api/login';
import { Toast } from 'vant';

@Component
export default class Login extends Vue {
  private formData = {
    mobile: '13911111111',
    code: '',
  };
  private check = {
    mobile: '',
    code: '',
  };
  private loading: boolean = false;
  private formCheck(): boolean {
    let flag = true;
    if (this.formData.mobile.length !== 11 || /\D/.test(this.formData.mobile.trim())) {
      this.check.mobile = '手机格式有误';
      flag = false;
    } else {
      this.check.mobile = '';
    }
    if (this.formData.code) {
      this.check.code = '';
    } else {
      this.check.code = '请输入验证码';
      flag = false;
    }
    return flag;
  }
  private async btnClick() {
    this.loading = true;
    try {
      if ((this.formCheck() && this.loading)) {
        const res = await login(this.formData);
        this.$store.commit('setUser', res.data.data);
        if (this.$route.path === '/login') {
          this.$router.push('/');
        } else {
          this.$router.back();
        }
      }
    } catch {
      Toast.fail('手机或验证码有误！');
    }
    this.loading = false;
  }
  private sendCode(): void {
    this.formData.code = '246810';
  }
}
</script>

<style lang="less">
.login {
  .van-nav-bar {
    height: 50px;
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
      font-size: 16px;
    }
  }
  .van-cell-group {
    background-color: #fff;
    padding: 0 15px;
    margin-top: 50px;
    .van-cell {
      padding: 10px 0;
    }
    .iconfont {
      font-size: 24px;
    }
    .van-button {
      border-radius: 14px;
      .van-button__text {
        color: #666666;
      }
    }
  }
  .loginbtn {
    padding: 20px 20px;
    .van-button {
      width: 100%;
      border-radius: 10px;
    }
  }
}
</style>