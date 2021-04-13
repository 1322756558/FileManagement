<!--
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-03-03 15:56:47
 * @FilePath: \yfkj\src\App.vue
-->

<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view />
    </div>
  </a-config-provider>
</template>
<script>
import zh_CN from "ant-design-vue/lib/locale-provider/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";

moment.locale("zh-cn");
export default {
  data() {
    return {
      zh_CN,
    };
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  height: 100%;
}
</style>
