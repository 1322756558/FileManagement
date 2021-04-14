<!--
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-04-13 11:09:15
 * @FilePath: \yfkj\src\views\home\components\projectDetail.vue
-->
<template>
  <div class="main">
    <a-button type="primary" @click="backList" style="float: left">
      <a-icon type="left" />返回
    </a-button>
    <a-button @click="addFolder" style="float: left">
      <a-icon type="inbox" />新建文件夹
    </a-button>
    <a-button @click="addFile" style="float: left">
      <a-icon type="inbox" />上传文件
    </a-button>
    <a-modal
      v-model="addModalVisible"
      title="添加文件夹"
      centered
      :footer="null"
    >
      <a-form-model :model="form">
        <a-form-item>
          <a-input placeholder="请输入文件夹名称" v-model="form.name"
        /></a-form-item>
        <a-form-item>
          <a-button type="primary" @click="onAddFolder"
            >添加</a-button
          ></a-form-item
        >
      </a-form-model>
    </a-modal>
    <a-modal
      v-model="uploadModalVisible"
      title="上传文件"
      centered
      :footer="null"
    >
      <!-- 上传 -->
      <a-upload-dragger
        name="file"
        :multiple="true"
        :action="baseUrl + '/file/uploadFile'"
        @change="handleChange"
        :headers="headers"
        :data="projectInfo"
      >
        <p class="ant-upload-drag-icon">
          <a-icon type="inbox" />
        </p>
        <p class="ant-upload-text">点击或将文件拖拽到这里上传</p>
        <!-- <p class="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibit from uploading
        company data or other band files
      </p> -->
      </a-upload-dragger>
    </a-modal>
    <!-- 项目信息 -->
    <a-descriptions title="项目信息" :bordered="true">
      <a-descriptions-item label="项目名称">
        {{ projectInfo["project_name"] }}
      </a-descriptions-item>
      <a-descriptions-item label="创建时间">
        {{ moment(+projectInfo["createDate"]).format("YYYY-MM-DD") }}
      </a-descriptions-item>
    </a-descriptions>

    <a-table
      :columns="fileTableColumns"
      :data-source="fileTableData"
      :pagination="pagination"
      @change="handlePageChange"
    >
      <span slot="date" slot-scope="text, record">
        <span>{{ moment(+record.date).format("YYYY-MM-DD") }}</span>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button-group>
          <a-button
            type="danger"
            @click="
              () => {
                deleteFile(record);
              }
            "
          >
            删除
          </a-button>
          <a-button
            type="primary"
            @click="
              () => {
                downloadFile(record);
              }
            "
          >
            下载
          </a-button>
          <a-button
            type="primary"
            @click="
              () => {
                renameFile(record);
              }
            "
          >
            重命名
          </a-button>
          <a-button
            type="primary"
            @click="
              () => {
                moveFile(record);
              }
            "
          >
            移动
          </a-button>
          <a-button
            type="primary"
            @click="
              () => {
                openFolder(record);
              }
            "
            >打开</a-button
          >
        </a-button-group>
      </span>
    </a-table>
    <a-modal v-model="renameModal" title="重命名" @ok="renameSubmit">
      <a-input v-model="renameValue" placeholder="请输入新的名字" />
    </a-modal>
    <a-modal v-model="moveModal" title="移动文件至其他项目" @ok="moveSubmit">
      <a-select
        default-value="lucy"
        style="width: 120px"
        v-model="moveProjectId"
      >
        <a-select-option
          v-for="(project, index) in projectList"
          :key="index"
          :value="project.id"
        >
          {{ project.project_name }}
        </a-select-option>
      </a-select>
    </a-modal>
  </div>
</template>

<script>
import moment from "moment";
import baseUrl from "@/api/baseUrl";
import Vue from "vue";
export default {
  data() {
    return {
      moment,
      baseUrl,
      headers: {},
      UserId: "0",
      addModalVisible: false,
      uploadModalVisible: false,
      hideDetail: "1",
      form: {
        type: "0",
        date: undefined,
        name: undefined,
      },
      fileTableColumns: [
        {
          title: "文件名称",
          dataIndex: "file_name",
          key: "name",
        },
        {
          title: "上传时间",
          dataIndex: "date",
          key: "date",
          scopedSlots: { customRender: "date" },
        },
        {
          title: "上传人",
          dataIndex: "username",
          key: "username",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          scopedSlots: { customRender: "action" },
        },
      ],
      fileTableData: [],
      pagination: {
        "show-size-changer": true,
        pageSizeOptions: ["10", "20", "30", "40", "50"],
        current: 1,
        pageSize: 10,
        total: 0,
      },
      renameModal: false,
      renameValue: "",
      renameFileId: 0,
      moveModal: false,
      moveProjectId: 0,
      moveFileId: 0,
      projectList: [],
    };
  },
  props: {
    projectInfo: {
      type: Object,
      default: () => {
        return {};
      },
    },
    // fileInfo: {
    //   type: Object,
    //   default: () => {
    //     return {};
    //   },
    // },
  },
  mounted() {
    const token = Vue.ls.get("ACCESS_TOKEN");
    this.UserId = this.$store.state.userInfo.id;
    //console.log(this.UserId);
    this.headers = {
      Authorization: token,
    };
    this.getTableData();
    // console.log("---------------------");
    // console.log(this.projectInfo);
  },
  methods: {
    async getTableData() {
      const getFileTableData = await this.$WebApi["file"].getFiles({
        projectId: this.projectInfo.id,
        pid: "0",
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
      });
      getFileTableData.message.fileList.forEach((ele) => {
        let fileType = ele.file_name.split(".")[1];
        ele.canPreview = fileType;
      });
      this.fileTableData = getFileTableData.message.fileList;
      this.pagination.total = getFileTableData.message.fileListSize;
    },
    backList() {
      this.$emit("backList");
    },
    refreshList() {
      this.$emit("refreshList");
    },
    addFolder() {
      this.addModalVisible = true;
    },
    addFile() {
      this.uploadModalVisible = true;
    },
    async onAddFolder() {
      //console.log(this.form.type.valueOf());
      //上传fileFolder
      let projectId = this.projectInfo.id;
      let pid = 0;
      let fileName = this.form.name;
      let saveFile = this.projectInfo["project_name"];
      let uploadUserId = this.UserId;
      let isFolder = true;
      const getAddFile = await this.$WebApi["home"].uploadFolder({
        projectId,
        pid,
        fileName,
        saveFile,
        uploadUserId,
        isFolder,
      });
      if (getAddFile == "success") {
        this.$message.success("添加成功");
        this.addModalVisible = false;
        //刷新一下页面
        this.getTableData();
        this.refreshList();
      } else {
        this.$message.error("添加失败");
      }
    },
    openFolder(data) {
      if (data.isFolder === true) {
        console.log("打开文件夹");
        //根据id查找以下的文件树，若是没有则新建文件夹
        this.fileInfo = data;
        this.$emit("listenToChildEvent", this.fileInfo);
        this.hideDetail = "2";
        this.$emit("changeDetail", this.hideDetail);
      } else {
        console.log(data);
        if (
          data.canPreview == "png" ||
          data.canPreview == "jpg" ||
          data.canPreview == "pdf"
        ) {
          this.$router.push({
            name: "Preview",
            params: { id: data.id, type: data.canPreview },
          });
        } else {
          this.$message.error("当前格式不支持预览，仅支持图片及pdf格式");
        }
      }
      //this.projectInfo = this.FolderDetail;
      //this.hideDetail = false;
    },
    handleChange(info) {
      const status = info.file.status;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        this.$message.success(`${info.file.name} 上传成功.`);
        this.getTableData();
      } else if (status === "error") {
        this.$message.error("上传失败" + info.file.response.message);
      }
    },
    async deleteFile(data) {
      let _this = this;
      this.$confirm({
        title: "确定删除当前文件吗?",
        content: "删除后将无法恢复",
        okText: "删除",
        okType: "danger",
        cancelText: "取消",
        async onOk() {
          console.log("OK");
          await _this.$WebApi["file"].deleteFiles({
            FileId: data.id,
            projectName: data.save_file,
          });
          _this.getTableData();
          _this.refreshList();
        },
        onCancel() {
          console.log("Cancel");
        },
        // save_file
        // id
      });

      console.log(data);
    },
    downloadFile(data) {
      window.open(baseUrl + "/file/downloadFile?fileId=" + data.id, "132321");
    },
    handlePageChange(pagination) {
      // console.log(pagination)
      this.pagination.current = pagination.current;
      this.pagination.pageSize = pagination.pageSize;
      this.getTableData();
    },
    renameFile(data) {
      // console.log(data)
      this.renameFileId = data.id;
      this.renameModal = true;
    },
    renameSubmit() {
      if (!this.renameValue) {
        this.$message.error("新名字不可为空");
        return;
      }
      this.$WebApi["file"]
        .renameFile({
          FileId: this.renameFileId,
          newFileName: this.renameValue,
        })
        .then(() => {
          this.$message.success("修改成功");
          this.renameValue = "";
          this.getTableData();
          this.refreshList();
          this.renameModal = false;
        })
        .catch(() => {
          this.$message.error("修改失败");
        });
    },
    async moveFile(data) {
      console.log("点击文件的输出");
      console.log(data);
      this.moveFileId = data.id;
      this.moveModal = true;

      const projectList = await this.$WebApi["home"].getProject();
      this.moveProjectId = projectList[0].id;
      this.projectList = projectList;
      this.refreshList();
    },
    moveSubmit() {
      this.$WebApi["file"]
        .moveFile({
          FileId: this.moveFileId,
          ProjectId: this.moveProjectId,
        })
        .then(() => {
          this.$message.success("移动成功");
          this.moveModal = false;
          this.getTableData();
        })
        .catch((err) => {
          console.log(err);
          this.$message.err("移动失败");
        });
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  width: 1000px;
}
</style>