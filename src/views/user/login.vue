<!--
 * @Date: 2021-03-08 16:59:05
 * @LastEditors: zhou
 * @LastEditTime: 2021-03-08 21:32:19
 * @FilePath: \yfkj\src\views\user\login.vue
-->

<template>
  <div class="login-container">
    <h2 class="login-title">项目管理系统</h2>
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      class="login-form"
    >
      <h2 class="title">用户注册 REGISTER</h2>
      <a-form-model-item ref="username" label="用户名" prop="username">
        <a-input v-model="form.username" ><img :src="user" slot="prefix" alt="" /></a-input>
      </a-form-model-item>
      <a-form-model-item ref="password" label="密码" prop="password">
        <a-input-password v-model="form.password" ><img :src="mima" slot="prefix" alt="" /></a-input-password>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        <!-- <a-button style="margin-left: 10px;" @click="resetForm">
        清空
      </a-button> -->
        <a-button style="margin-left: 10px" @click="toRegister">
          注册
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import user from "../../assets/user.png";
import mima from "../../assets/mima.png";
export default {
  data() {
    return {
      user: user,
      mima: mima,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "用户名不可为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不可为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const submit = await this.$WebApi["user"].login(this.form);
          if (submit.token) {
            this.$ls.set("ACCESS_TOKEN", "Bearer " + submit.token);
            this.$router.push({ name: "Home" });
            // 这里待完善 应该在store中
            this.$store.commit("SET_USER_INFO", submit.user);
            this.$message.success("欢迎回来" + submit.user.name);
          }
        } else {
          this.$message.error("登录失败");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    toRegister() {
      this.$router.push({ name: "Register" });
    },
  },
};
</script>

<style>
.login-form {
  width: 565px;
  height: 372px;
  margin: 0 auto;
  background: url("../../assets/houTaiKuang.png");
  padding: 40px 110px;
}

/* 背景 */
.login-container {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url("../../assets/houTaiBg.png");
}

/* Log */
.login-title {
  color: #fff;
  text-align: center;
  margin: 5% 0;
  font-size: 48px;
  font-family: Microsoft Yahei;
}
/* 登陆按钮 */
.submit {
  width: 100%;
  height: 45px;
  font-size: 16px;
}
/* 用户登陆标题 */
.title {
  margin-bottom: 20px;
  color: #fff;
  font-weight: 700;
  font-size: 24px;
  font-family: Microsoft Yahei;
}
/* 输入框 */
.inputBox {
  /* height: 45px; */
}
/* 输入框内左边距50px */
.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 50px;
}
</style>