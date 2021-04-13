<!--
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-03-09 10:44:29
 * @FilePath: \yfkj\src\views\user\register.vue
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
      <a-form-model-item ref="name" label="姓名" prop="name">
        <a-input v-model="form.name" class="inputBox"> <img :src="user" slot="prefix" alt="" /></a-input>
      </a-form-model-item>
      <a-form-model-item ref="username" label="用户名" prop="username">
        <a-input v-model="form.username" class="inputBox"> <img :src="user" slot="prefix" alt="" /></a-input>
      </a-form-model-item>
      <a-form-model-item ref="password" label="密码" prop="password">
        <a-input-password v-model="form.password" class="inputBox"> <img :src="mima" slot="prefix" alt="" /></a-input-password>
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit"> 提交 </a-button>
        <!-- <a-button style="margin-left: 10px" @click="resetForm"> 清空 </a-button> -->
        <a-button style="margin-left: 10px" @click="toLogin"> 返回 </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import user from "../../assets/user.png";
import mima from "../../assets/mima.png";
export default {
  data() {
    let checkname = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };

    let checkusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名2"));
      } else {
        this.CheckRegisterInfo("username", value, (res) => {
          if (res) {
            callback();
          } else {
            callback(new Error("用户名已经存在2"));
          }
        });
      }
    };

    let checkpassword = (rule, value, callback) => {
      //const { form } = this.props;
      // 校验密码强度
      // 1. 必须同时包含大写字母、小写字母和数字，三种组合
      // 2. 长度在8-30之间
      const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/;
      if (value === "") {
        callback(new Error("密码不可为空"));
      } else {
        if (!passwordReg.test(value)) {
          callback(new Error("密码必须同时包含大写字母、小写字母和数字"));
        }
        if (value.length < 8 || value.length > 30) {
          callback(new Error("密码长度8-30位"));
        }
      }
      callback();
    };

    return {
      user: user,
      mima: mima,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "",
        username: "",
        password: "",
      },
      rules: {
        name: [
          {
            required: true,
            validator: checkname,
            // message: "姓名不可为空2",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            validator: checkusername,
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            validator: checkpassword,
            // message: "密码不可为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async onSubmit() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          const submit = await this.$WebApi["user"].register(this.form);
          if (submit === "success") {
            this.$message.success("注册成功, 为您跳转登录");
            this.$router.push({ name: "Login" });
          } else {
            this.$message.error("注册失败" + submit);
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    toLogin() {
      this.$router.push({ name: "Login" });
    },
    async CheckRegisterInfo(type, value, callback) {
      if (type === "username") {
        const isRepeat = await this.$WebApi["user"].checkUsername({
          username: value,
        });
        if (isRepeat === "success") {
          callback(true);
        } else {
          callback(false);
        }
      }
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