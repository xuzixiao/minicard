<template>
  <div class="company">
    <el-row>
      <el-col class="manage-btn">
        <router-link to="/home/article/write">
          <el-button>添加文章</el-button>
        </router-link>
      </el-col>
    </el-row>

    <el-tabs type="border-card" tab-position="2" v-model="activetab" class="artlist">
      <el-tab-pane label="用户文章" name="userart">
        <el-row>
          <el-col :span="24">
            <el-table :data="tableData" border width="500" class="companylist">
              <el-table-column prop="arttitle" label="文章标题" width="250"></el-table-column>
              <el-table-column label="封面图" width="120">
                <template slot-scope="scope">
                  <div class="bannerimg">
                    <img
                      :src="scope.row.artbanner==''||scope.row.artbanner==null?$Filepath+'/uploadfile/nothave.jpg':$Filepath+scope.row.artbanner"
                    >
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="user" label="用户" width="130"></el-table-column>
              <el-table-column prop="categoryname" label="文章分类" width="100"></el-table-column>
              <el-table-column prop="statename" label="文章状态" width="100"></el-table-column>
              <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="godetail(scope.row.Id)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col class="page" v-if="false">
            <el-pagination background :page-size="5" layout="prev, pager, next" :total="10"></el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="公司文章" name="companyart">
           <el-row>
          <el-col :span="24">
            <el-table :data="companytableData" border width="500" class="companylist">
              <el-table-column prop="title" label="文章标题" width="250"></el-table-column>
              <el-table-column label="封面图" width="120">
                <template slot-scope="scope">
                  <div class="bannerimg">
                    <img
                      :src="scope.row.artlogo==''||scope.row.artlogo==null?$Filepath+'/uploadfile/nothave.jpg':$File+scope.row.artlogo"
                    >
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="user" label="用户" width="130"></el-table-column>
              <el-table-column prop="categoryname" label="文章分类" width="100"></el-table-column>
              <el-table-column prop="statename" label="文章状态" width="100"></el-table-column> -->
              <el-table-column prop="createtime" label="创建时间" width="200"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button type="text" size="small" @click="godetail(scope.row.Id)">查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
          <el-col class="page" v-if="false">
            <el-pagination background :page-size="5" layout="prev, pager, next" :total="10"></el-pagination>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
        activetab:"userart",
        tableData: [],
        companytableData:[]
    };
  },
  methods: {
    getlist: function() {
      this.$axios({
        url: "/articlelist",
        method: "POST"
      }).then(
        ({ data }) => {
          console.log(data);
          if (data.code == 100) {
            if (data.data.length > 0) {
              //    data.data.forEach(item => {
              //         item.status==1?item.status="启用":item.status="禁用";
              //         item.createtime=item.createtime.split(".")[0];
              //     });
              this.tableData = data.data;
            } else {
              this.tableData = [];
            }
          } else if (data.code == 10) {
            this.$notify({
              message: "登录失效",
              type: "success"
            });
            var that = this;
            setTimeout(function() {
              that.$router.push({
                path: "/login",
                query: {
                  redirect: "/home/user"
                }
              });
            }, 800);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    getlistofcompany: function() {
      this.$axios({
        url: "/getcompanyarticle",
        method: "POST"
      }).then(
        ({ data }) => {
          console.log(data);
          if (data.code == 100) {
            if (data.data.length > 0) {
              //    data.data.forEach(item => {
              //         item.status==1?item.status="启用":item.status="禁用";
              //         item.createtime=item.createtime.split(".")[0];
              //     });
              this.companytableData = data.data;
            } else {
              this.companytableData = [];
            }
          } else if (data.code == 10) {
            this.$notify({
              message: "登录失效",
              type: "success"
            });
            var that = this;
            setTimeout(function() {
              that.$router.push({
                path: "/login",
                query: {
                  redirect: "/home/user"
                }
              });
            }, 800);
          }
        },
        err => {
          console.log(err);
        }
      );
    },
    godetail: function(id) {
      this.$router.push({
        path: "/home/article/detail",
        query: {
          id: id
        }
      });
    }
  },
  mounted: function() {},
  created: function() {
    this.getlist();
    this.getlistofcompany();
  }
};
</script>

<style scoped>
.company {
  width: 100%;
  height: auto;
  background: #ffffff;
  padding: 10px 0px;
}
.artlist{
    margin: 5px 10px;
}
.handerbtn {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
}
.companylist {
  width: auto;
}
.page {
  margin: 10px 0px;
}
.bannerimg {
  width: 100px;
  height: auto;
  display: flex;
  align-items: center;
}
.bannerimg img {
  display: block;
  height: auto;
  width: 100px;
}
.manage-btn {
  padding: 0px 0px 10px 10px;
  display: flex;
}
</style>

