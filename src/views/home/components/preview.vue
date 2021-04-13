<!--
 * @Autor: junhui li
 * @Date: 2021-04-08 00:34:38
 * @LastEditors: zhou
 * @LastEditTime: 2021-04-09 00:14:32
 * @Description: 
 * @FilePath: /yfkj/src/views/home/components/preview.vue
-->
<template>
  <div class="main">
    <div class="title">
      <a-button type="primary" @click="() => $router.go(-1)" style="margin-right: 25px;">
        <a-icon type="left" />返回
      </a-button>
      <h2 class="textStyle">文件预览</h2>
    </div>
    <div class="previewMain">
      <img :src="url" alt="" v-if="type != 'pdf'" >
      <pdf
            v-for="i in numPages"
            :key="i"
            :src="url"
            :page="i"
            style="width: 100%;"
        ></pdf>
    </div>
  </div>
</template>

<script>
// baseUrl + "/file/downloadFile?fileId=" + data.id
import baseUrl from "@/api/baseUrl";
import pdf from 'vue-pdf'
export default {
  name: 'preview',
  components: {
    pdf
  },
  data(){
    return {
      url: '',
      type: '',
      numPages: undefined,
    }
  },
  mounted(){
    this.url =  baseUrl + "/file/downloadFile?fileId=" +  this.$route.params.id
    this.type = this.$route.params.type
    let loadingTask = pdf.createLoadingTask(this.url);
    loadingTask.promise.then(pdf => {
      this.numPages = pdf.numPages;
    });
  }
}
</script>

<style lang="less" scoped>
.main {
  width: 1200px;
  margin: auto;

  .title {
    text-align: center;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    
    .textStyle {
      display: block;
      margin-top: 20px;
    }
  }

  .previewMain {
    overflow: auto;
  }
}
</style>