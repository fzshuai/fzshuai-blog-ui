<template>
  <v-dialog v-model="loginFlag" :fullscreen="isMobile" max-width="460">
    <v-card class="login-container" style="border-radius:4px">
      <v-icon class="float-right" @click="loginFlag = false">
        mdi-close
      </v-icon>
      <div class="login-wrapper">
        <!-- 用户名 -->
        <v-text-field
          v-model="username"
          label="账号"
          placeholder="请输入您的账号"
          clearable
          @keyup.enter="login"
        />
        <!-- 密码 -->
        <v-text-field
          v-model="password"
          class="mt-7"
          label="密码"
          placeholder="请输入您的密码"
          @keyup.enter="login"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />
        <!-- 按钮 -->
        <v-btn
          class="mt-7"
          block
          color="blue"
          style="color:#fff"
          @click="login"
        >
          登录
        </v-btn>
        <!-- 注册和找回密码 -->
        <div class="mt-10 login-tip">
          <span @click="openRegister">立即注册</span>
          <span @click="openForget" class="float-right">忘记密码?</span>
        </div>
        <div v-if="socialLoginList.length > 0">
          <div class="social-login-wrapper mt-7">
            <!-- gitee登录 -->
            <a
              v-if="showLogin('gitee')"
              class="mr-3 iconfont icongitee-fill-round"
              style="color:#e05244"
              @click="doSocialLogin('gitee')"
            />
            <!-- qq登录 -->
            <a
              v-if="showLogin('qq')"
              class="iconfont iconqq"
              style="color:#00AAEE"
              @click="doSocialLogin('QQ')"
            />
          </div>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: function() {
    return {
      username: "",
      password: "",
      show: false
    };
  },
  computed: {
    loginFlag: {
      set(value) {
        this.$store.state.loginFlag = value;
      },
      get() {
        return this.$store.state.loginFlag;
      }
    },
    isMobile() {
      const clientWidth = document.documentElement.clientWidth;
      if (clientWidth > 960) {
        return false;
      }
      return true;
    },
    socialLoginList() {
      console.log(this.$store.state.blogInfo.websiteConfig.socialLoginList);
      return this.$store.state.blogInfo.websiteConfig.socialLoginList;
    },
    showLogin() {
      return function(type) {
        return this.socialLoginList.indexOf(type) != -1;
      };
    }
  },
  methods: {
    openRegister() {
      this.$store.state.loginFlag = false;
      this.$store.state.registerFlag = true;
    },
    openForget() {
      this.$store.state.loginFlag = false;
      this.$store.state.forgetFlag = true;
    },
    login() {
      if (this.username.trim().length == 0) {
        this.$toast({ type: "error", message: "账号不能为空" });
        return false;
      }
      if (this.password.trim().length == 0) {
        this.$toast({ type: "error", message: "密码不能为空" });
        return false;
      }
      const that = this;
      // 发送登录请求
      let param = new URLSearchParams();
      param.append("username", that.username);
      param.append("password", that.password);
      that.axios.post("/api/blogLogin", param).then(({ data }) => {
        if (data.code == 200) {
          that.username = "";
          that.password = "";
          that.$store.commit("login", data.data);
          that.$store.commit("closeModel");
          that.$toast({ type: "success", message: "登录成功" });
        } else {
          that.$toast({ type: "error", message: data.msg });
        }
      });
    },
    doSocialLogin(source) {
      this.axios.get("/api/system/social/binding/" + source).then(res => {
        if (res.data.code == 200) {
          window.location.href = res.data.msg;
        } else {
          this.$toast({ type: "error", message: res.data.message });
        }
      });
    }
  }
};
</script>

<style scoped>
.social-login-wrapper {
  margin-top: 1rem;
  font-size: 2rem;
}
.social-login-wrapper a {
  text-decoration: none;
}
</style>
