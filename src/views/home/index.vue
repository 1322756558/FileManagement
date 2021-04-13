<!--
 * @Date: 2021-02-28 22:22:14
 * @LastEditors: zhou
 * @LastEditTime: 2021-04-06 19:13:53
 * @FilePath: \yfkj\src\views\home\index.vue
-->
<template>
  <a-layout id="main" class="main">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" v-if="isAdmin" @click="settingProject">
          项目管理
        </a-menu-item>
        <!-- 项目管理弹窗 -->
        <a-modal
          v-model="modalVisible"
          title="项目及人员管理"
          centered
          :footer="null"
          width="1000px"
        >
          <!-- 项目筛选 -->
          <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="项目筛选"
            @back="() => $router.go(-1)"
            :backIcon="false"
          >
            <template slot="extra">
              <a-button key="3" @click="getAllProject"> 全部项目 </a-button>
              <a-button key="1" type="primary" @click="adminDateSearch">
                查询
              </a-button>
            </template>
            <a-descriptions size="small" :column="3">
              <a-descriptions-item label="日期区间选择">
                <a-range-picker
                  :placeholder="['开始区间', '结束区间']"
                  format="YYYY-MM"
                  :value="value"
                  :mode="mode2"
                  @panelChange="handlePanelChange2"
                  @change="handleChange"
                />
              </a-descriptions-item>
            </a-descriptions>
          </a-page-header>
          <!-- 项目列表 -->
          <a-collapse>
            <a-collapse-panel
              :key="index"
              :header="item['project_name']"
              v-for="(item, index) in projectList"
            >
              <div
                style="
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                "
              >
                <a-descriptions>
                  <a-descriptions-item label="创建时间">
                    {{ moment(+item.createDate).format("YYYY-MM-DD") }}
                  </a-descriptions-item>
                </a-descriptions>
                <!-- <p>{{ text }}</p> -->
                <!-- 这里是穿梭框 -->
                <a-transfer
                  style="margin-bottom: 15px"
                  :data-source="allUserList"
                  :titles="['非项目用户', '项目用户']"
                  :target-keys="item['userList']"
                  :selected-keys="selectedKeys"
                  :render="(item) => item.title"
                  @change="
                    (nextTargetKeys, direction, moveKeys) => {
                      handeleCollapsePanelChange(
                        nextTargetKeys,
                        direction,
                        moveKeys,
                        item.id
                      );
                    }
                  "
                  @selectChange="handleCollapsePanelSelectChange"
                />
                <a-button
                  type="danger"
                  @click="
                    () => {
                      deleteProject(item.id);
                    }
                  "
                  block
                >
                  删除项目
                </a-button>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </a-modal>
        <!-- 项目添加弹窗 -->
        <a-menu-item key="2" v-if="isAdmin" @click="addProject">
          添加项目
        </a-menu-item>
        <a-modal
          v-model="addModalVisible"
          title="添加项目"
          centered
          :footer="null"
        >
          <a-form-model :model="form">
            <a-form-item>
              <a-select v-model="form.type" placeholder="选择你的项目类型">
                <a-select-option v-for="type in Types" v-bind:key="type.id">
                  {{ type.type_name }}</a-select-option
                >
              </a-select>
              <!-- <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick" v-model="form.type">
                  <a-menu-item v-for="type in Types" v-bind:key="type.id">
                    <a-icon type="user" />{{ type.type_name }}
                  </a-menu-item>
                </a-menu>
                <a-button style="margin-left: 8px">
                  项目类型 <a-icon type="down" />
                </a-button>
              </a-dropdown> -->
            </a-form-item>
            <a-form-item>
              <a-month-picker
                v-model="form.date"
                show-time
                type="date"
                placeholder="选择项目时间"
                style="width: 100%"
            /></a-form-item>
            <a-form-item>
              <a-input placeholder="请输入项目名称" v-model="form.name"
            /></a-form-item>
            <a-form-item>
              <a-button type="primary" @click="onAddProject"
                >添加</a-button
              ></a-form-item
            >
          </a-form-model>
        </a-modal>
        <a-menu-item key="3" v-if="isAdmin" @click="addProjectType">
          增加项目类
        </a-menu-item>
        <a-modal
          v-model="addModalTypeVisible"
          title="添加项目类"
          centered
          :footer="null"
        >
          <a-input-search
            placeholder="请输入项目类型"
            enter-button="添加"
            size="large"
            @search="addProjectTypeForName"
          />
        </a-modal>
        <a-menu-item key="4" @click="toLogin">
          退出登录
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout-sider width="200" style="background-color: #fff;">
        <!-- <a-menu
          mode="inline"
          :default-selected-keys="['1']"
          :default-open-keys="['sub1']"
          style="height: 100%"
        >
          <a-sub-menu v-for="years in yearList" v-bind:key="years.year">
            <span slot="title"><a-icon type="laptop" />{{ years.year }}年</span>
            <a-menu-item v-for="year2 in years.allData" v-bind:key="year2.id">{{
              year2.project_name
            }}</a-menu-item>
          </a-sub-menu>
        </a-menu> -->
        <!-- 
        <a-directory-tree
          multiple
          default-expand-all
          @select="onSelect"
          @expand="onExpand"
        >
          <a-tree-node
            v-bind:key="years.year"
            :title="years.year + '年'"
            v-for="years in yearList"
          >
            <a-tree-node
              v-bind:key="year2.id"
              :title="year2.project_name"
              v-for="year2 in years.allData"
              is-leaf
              class="ecllipsis"
            >
            </a-tree-node>
          </a-tree-node>
        </a-directory-tree> -->

        <a-directory-tree
          multiple
          :tree-data="yearList"
          default-expand-all
          :replace-fields="replaceFields"
          @select="onSelect"
          @expand="onExpand"
          class="an-directory-tree-label"
        />

        <!-- <a-directory-tree
          multiple
          :tree-data="fileTree"
          default-expand-all
          :replace-fields="replaceFields"
          @select="onSelect"
        /> -->
      </a-layout-sider>
      <a-layout style="padding: 0 24px 24px">
        <a-breadcrumb style="margin: 16px 0">
          <a-page-header
            style="border: 1px solid rgb(235, 237, 240)"
            title="项目筛选"
            @back="() => $router.go(-1)"
            :backIcon="false"
            v-if="hideDetail === '0'"
          >
            <template slot="extra">
              <a-button key="1" type="primary" @click="adminDateSearch">
                按时间查询
              </a-button>

              <a-button key="3" @click="getAllProject"> 全部项目 </a-button>

              <a-dropdown>
                <a-menu slot="overlay" @click="handleMenuClick">
                  <a-menu-item v-for="type in Types" v-bind:key="type.id">
                    <a-icon type="user" />{{ type.type_name }}
                  </a-menu-item>
                  <!-- <a-menu-item> <a-icon type="user" />全部项目 </a-menu-item> -->
                </a-menu>
                <a-button style="margin-left: 8px">
                  项目类型 <a-icon type="down" />
                </a-button>
              </a-dropdown>
            </template>
            <a-descriptions size="small" :column="3">
              <a-descriptions-item label="日期区间选择">
                <a-range-picker
                  :placeholder="['开始区间', '结束区间']"
                  format="YYYY-MM"
                  :value="value"
                  :mode="mode2"
                  @panelChange="handlePanelChange2"
                  @change="handleChange"
                />
              </a-descriptions-item>
            </a-descriptions>
          </a-page-header>
        </a-breadcrumb>
        <a-layout-content
          :style="{
            background: '#fff',
            padding: '24px',
            margin: 0,
            minHeight: '280px',
          }"
        >
          <div style="width: 1000px; margin: auto">
            <a-list
              :grid="{ gutter: 16, column: 4 }"
              :data-source="projectList"
              v-if="hideDetail === '0'"
            >
              <a-list-item
                slot="renderItem"
                slot-scope="item"
                @click="
                  () => {
                    toProjectDetail(item);
                  }
                "
              >
                <a-card :title="item['project_name']">
                  <p>创建时间：{{ item.year }}年{{ item.month }}月</p>
                  <p>项目类型：{{ item.type_name }}</p>
                </a-card>
              </a-list-item>
            </a-list>
            <!-- 项目详情 -->
            <project-detail
              :projectInfo="projectInfo"
              @backList="backList"
              @refreshList="refreshList"
              v-if="hideDetail === '1'"
              @listenToChildEvent="listenToChildEvent"
              @changeDetail="changeDetail"
            />
            <file-detail
              :fileInfo="fileInfo"
              @backList="backList"
              @refreshList="refreshList"
              v-if="hideDetail === '2'"
              @listenToChildEvent="listenToChildEvent"
            />
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
<script>
import moment from "moment";
import projectDetail from "./components/projectDetail";
import fileDetail from "./components/fileDetail";
// import { delete } from "vue/types/umd";
export default {
  components: { projectDetail, fileDetail },
  data() {
    return {
      collapsed: false,
      isAdmin: false,
      modalVisible: false,
      value: [],
      mode2: ["month", "month"],
      projectList: [],
      // activeKey: [],
      allUserList: [],
      yearList: [],
      selectedKeys: [],
      addModalVisible: false,
      addModalTypeVisible: false,
      moment,
      hideDetail: "0",
      projectInfo: {},
      fileInfo: {},
      typeName: {},
      form: {
        type: "",
        date: undefined,
        name: undefined,
      },
      Types: {},
      fileTree: [],
      replaceFields: {
        key: "id",
        children: "children",
        title: "file_name",
      },
      fileTrees: [],
    };
  },
  created () {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })
  },
  //初始化方法
  mounted() {
    this.isAdmin = this.$store.state.userInfo.admin;
    //console.log(this.isAdmin);
    this.getAllProject();
    this.listTypes();
  },
  methods: {
    async settingProject() {
      this.modalVisible = true;
      // 获取用户列表
      let UserList = await this.$WebApi["user"].listUsers();
      let newList = [];
      UserList.forEach((ele) => {
        if (!ele.admin) {
          newList.push({
            key: ele.id.toString(),
            title: ele.name,
          });
        }
      });
      this.allUserList = newList;
      //console.log(this.allUserList);
      // 所有项目信息
      this.getAllProject();
    },
    async getAllProject(momentStar, momentEnd) {
      let getProject = await this.$WebApi["home"].getProject({
        momentStar,
        momentEnd,
      });
      this.projectList = getProject;
      //console.log(getProject);

      // 判断不是数组  直接返回
      if (!Array.isArray(getProject)) {
        console.log("非数组");
      }
      // 遍历  删除  children 属性  做初始化操作
      getProject.forEach((item) => {
        delete item.children;
        item.file_name = item.project_name;
        // 1 创建一个新的promise对象,传一个执行器函数,带两个参数
        const p = new Promise((resolve, reject) => {
          // 2 执行异步任务
          setTimeout(() => {
            let files = this.$WebApi["home"].selectFileTree({
              projectId: item.id,
            });

            if (files) {
              // 3.1 如果成功，调用resolve(value)
              resolve(files);
            } else {
              // 3.2 如果失败，调用reject(reason)
              reject("失败的数据，time=");
            }
          }, 1000);
        });

        p.then(
          (value) => {
            // 接收得到成功的数据   onResolved
           // console.log("成功的回调", value);
            //console.log(value.message);
            this.fileTree = this.toTree(value.message);
            item.children = this.fileTree;
          },
          (reason) => {
            // 接收得到失败的reason数据   onRejected
            console.log("失败的回调", reason);
          }
        );

        // let files = this.selectFileTree(item.id);
        // console.log("=====")
        // console.log(files);
        // item.children = this.fileTree;
      });

      //  空对象
      let map = {};
      this.yearList=[];//清空
      getProject.forEach((item) => {
        if (!map[item.year]) {
          this.yearList.push({
            id: item.id,
            children: [item],
            file_name: item.year,
          });
          map[item.year] = item;
        } else {
          this.yearList.forEach((element) => {
            if (element.file_name == item.year) {
              element.children.push(item);
            }
          });
        }
      });

      // /**
      //  * map对象的 键: 是每个id  值：对应的item
      //  * 1: {id: 1, pid: 0, name: "body"}
      //  * 2: {id: 2, pid: 1, name: "title"}
      //  * 3: {id: 3, pid: 2, name: "div"}
      //  */
      // getProject.forEach((item) => {
      //   // item.pid 为0时 返回underfined
      //   let parent = map[item.pid];
      //   if (parent) {
      //     (parent.children || (parent.children = [])).push(item);
      //   } else {
      //     // 这里push的item是pid为0的数据
      //     yearList.push(item);
      //   }
      // });

      //按年分类
      // let d = {};
      // this.yearList = [];
      // getProject.forEach((ele) => {
      //   if (!d[ele.year]) {
      //     this.yearList.push({
      //       year: ele.year,
      //       allData: [ele],
      //     });
      //     d[ele.year] = ele;
      //   } else {
      //     this.yearList.forEach((element) => {
      //       if (element.year == ele.year) {
      //         element.allData.push(ele);
      //       }
      //     });
      //   }
      // });

      //console.log(this.yearList);

      //需要追加文件的列表
      //this.selectFileTree(projectId);

      //分为数组
      // if (!this.yearList[ele.year]) {
      //   // 如果对象中不存在这个年份
      //   // 使这个年份为空数组
      //   this.yearList[ele.year] = [];
      //   // 添加这一年
      //   this.yearList[ele.year].push(ele);
      // } else {
      //   // 有这一年直接添加
      //   this.yearList[ele.year].push(ele);
      // }
    },
    async onAddProject() {
      let date1 = new Date(this.form.date.valueOf());
      let projectName = this.form.name;
      let typeId = this.form.type;
      let year = date1.getFullYear();
      let month = date1.getMonth() + 1;
      const getAddProject = await this.$WebApi["home"].addProject({
        projectName,
        typeId,
        year,
        month,
      });
      if (getAddProject == "success") {
        this.$message.success("添加成功");
        this.addModalVisible = false;
        this.getAllProject();
      } else {
        this.$message.error("添加失败");
      }
    },
    async listTypes() {
      const getListTypes = await this.$WebApi["home"].listTypes();
      this.Types = getListTypes;
    },
    handleChange(value) {
      this.value = value;
    },
    handlePanelChange2(value, mode) {
      this.value = value;
      this.mode2 = [
        mode[0] === "date" ? "month" : mode[0],
        mode[1] === "date" ? "month" : mode[1],
      ];
    },
    adminDateSearch() {
      this.getAllProject(this.value[0].valueOf(), this.value[1].valueOf());
    },
    handleCollapsePanelSelectChange(sourceSelectedKeys, targetSelectedKeys) {
      this.selectedKeys = [...sourceSelectedKeys, ...targetSelectedKeys];
    },
    async handeleCollapsePanelChange(
      nextTargetKeys,
      direction,
      moveKeys,
      projectId
    ) {
      if (direction == "right") {
        let changeType = await this.$WebApi["home"].addCompetence({
          projectId: projectId,
          userId: moveKeys,
        });
        if (changeType != "success") {
          this.$message.error(changeType);
        }
      } else {
        let changeType = await this.$WebApi["home"].deleteCompetence({
          projectId: projectId,
          userId: moveKeys,
        });
        if (changeType != "success") {
          this.$message.error(changeType);
        }
      }
      this.getAllProject(
        this.value[0] ? this.value[0].valueOf() : undefined,
        this.value[1] ? this.value[1].valueOf() : undefined
      );
    },
    addProject() {
      this.addModalVisible = true;
    },
    async deleteProject(id) {
      this.$confirm({
        title: "是否确定删除？",
        content: "删除后无法复原，且项目下的文件将会删除",
        okText: "Yes",
        okType: "danger",
        cancelText: "No",
        onOk: async () => {
          await this.$WebApi["home"].deleteProject({
            projectId: id,
          });
          this.getAllProject(
            this.value[0] ? this.value[0].valueOf() : undefined,
            this.value[1] ? this.value[1].valueOf() : undefined
          );
          this.$message.success("删除成功");
        },
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    toProjectDetail(item) {
      this.projectInfo = item;
      this.hideDetail = "1";
    },
    addProjectType() {
      this.addModalTypeVisible = true;
    },
    async addProjectTypeForName(value) {
      let type = await this.$WebApi["home"].addProjectType({
        projectTypeName: value,
      });
      if (type == "success") {
        this.$message.success("添加成功");
        this.addModalTypeVisible = false;
        this.listTypes();
      } else {
        this.$message.error("添加失败");
      }
    },
    //test 筛选项目类型
    async handleMenuClick(e) {
      await this.getAllProject();
      let key = e.key;
      let newProjectList = [];
      this.projectList.forEach((ele) => {
        if (ele.type_id === key) {
          newProjectList.push(ele);
        }
      });
      //console.log("click",e.key);
      this.projectList = newProjectList;
    },
    //将数组转化为树
    toTree(data) {
      // 空数组
      let result = [];
      // 判断不是数组  直接返回
      if (!Array.isArray(data)) {
        console.log("非数组totree");
        return result;
      }
      // 遍历  删除  children 属性  做初始化操作
      data.forEach((item) => {
        delete item.children;
      });
      //  空对象
      let map = {};
      data.forEach((item) => {
        map[item.id] = item;
      });

      /**
       * map对象的 键: 是每个id  值：对应的item
       * 1: {id: 1, pid: 0, name: "body"}
       * 2: {id: 2, pid: 1, name: "title"}
       * 3: {id: 3, pid: 2, name: "div"}
       */
      data.forEach((item) => {
        // item.pid 为0时 返回underfined
        let parent = map[item.pid];
        if (parent) {
          (parent.children || (parent.children = [])).push(item);
        } else {
          // 这里push的item是pid为0的数据
          result.push(item);
        }
      });
      //console.log(result);
      return result;
    },
    async onSelect(keys) {
      this.hideDetail = "0";
      //console.log("选择", keys, event);
      // console.log(keys.toString());
      let project = await this.$WebApi["home"].selectOnlyProject({
        projectId: keys.toString(),
      });
      //console.log(project)
      //如果不存在错误信息
      if (!project.message) {
        this.projectInfo = project;
        this.hideDetail = "1";
        this.$message.success("打开了"+project.project_name);
      }else{
        this.$message.error("文件预览还未完成");
      }
    },
    onExpand() {
      console.log("打开");
    },
    backList() {
      this.hideDetail = "0";
    },
    refreshList(){
      this.getAllProject();
    },
    listenToChildEvent(fileInfo) {
      this.fileInfo = fileInfo;
      console.log(this.fileInfo);
    },
    changeDetail(hideDetail) {
      this.hideDetail = hideDetail;
    },
    toLogin() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style lang="less" scoped>
.logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}
.main {
  height: 100%;
}
.an-directory-tree-label {
    text-align: left;
}
</style>
