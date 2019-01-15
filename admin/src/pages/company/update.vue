<template>
  <div class="company">
    <el-tabs type="border-card" tab-position="2" v-model="activetab">
      <el-tab-pane label="基本信息" name="infor">
        <el-form ref="form" :model="company" label-width="80px">
          <el-row>
            <el-col :span="20">
              <el-form-item label="公司名称">
                <el-input v-model="company.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20" class="state">
              <el-form-item label="当前状态">
                <el-switch v-model="company.state" :change="!company.state" active-text="开启"></el-switch>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20" class="state">
              <el-form-item label="开通时间">
                <el-input-number class="extime" :min="1" :max="30" v-model="company.exptime"></el-input-number>
                <el-select v-model="company.exptype" placeholder="请选择年月日" class="extype">
                  <el-option label="日" value="d"></el-option>
                  <el-option label="月" value="m"></el-option>
                  <el-option label="年" value="y"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              <el-form-item label="公司描述">
                <el-input v-model="company.desc" type="textarea" rows="3"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="管理员" name="manager">
        <el-form ref="form" :model="company.manager" label-width="80px">
          <el-row>
            <el-col :span="10">
              <el-form-item label="管理员">
                <el-input v-model="company.manager.name"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="原密码">
                <el-input v-model="company.manager.oldpwd" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="新密码">
                <el-input v-model="company.manager.pwd" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="10">
              <el-form-item label="确认密码">
                <el-input v-model="company.manager.repwd" type="password"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>

      <el-tab-pane label="广告图" name="banner">
        <el-form ref="form" :model="company" label-width="80px">
          <el-row class="adimg-item" v-for="item,index in company.adgroup" :key="index">
            <el-form-item label="广告位置:" class="ad-position">
              <span>{{item.adname}}</span>
            </el-form-item>
            <el-form-item label="广告说明:" class="ad-position">
              <p>{{item.adinfo}}</p>
            </el-form-item>
            <el-form-item label="广告图片:">
              <div class="ad-imgs">
                <div class="adimgitem" v-for="(imgs,imgsindex) in item.adimgs">
                  <span class="delthisimg" @click="deluploadimg(index,imgsindex)">
                    <i class="el-icon-delete"></i>
                  </span>
                  <img :src="$File+imgs.path">
                </div>

                <div class="adimgitem uploadbtn">
                  <input type="file" @change="Uploadfile" :data-index="index">
                  <i class="el-icon-plus"></i>
                </div>
              </div>
            </el-form-item>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <el-row class="form-btn">
      <el-button type="primary" @click="savecompany">保存修改</el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activetab: "infor", //展示页
      id: "",
      company: {
        name: "",
        desc: "",
        state: true,
        exptime: 1,
        exptype: "",
        manager: {
          name: "",
          oldpwd: "",
          pwd: "",
          repwd: ""
        },
        adgroup: [
          {
            adname: "首页广告位",
            adinfo: "800px*300px 首页轮播广告位 5张以下",
            adimgs: []
          },
          {
            adname: "登录页面广告位",
            adinfo: "800px*100px 用户登录页广告位 1张",
            adimgs: []
          }
        ]
      }
    };
  },
  computed: {
    expiration: function() {
      return this.company.exptime + this.company.exptype;
    }
  },
  methods: {
    savecompany: function() {
      if (this.company.name == "") {
        this.$notify({
          title: "警告",
          message: "公司名称不能为空",
          type: "warning"
        });
        return;
      } else if (this.company.exptime == "" || this.company.exptype == "") {
        this.$notify({
          title: "警告",
          message: "请选择开通时间",
          type: "warning"
        });
        return;
      } else if (this.company.desc == "") {
        this.$notify({
          title: "警告",
          message: "公司描述不能为空",
          type: "warning"
        });
        return;
      }
      this.activetab = "infor";
      this.company.adgroup.forEach(item => {
        item.adimgs.forEach(imggroup => {
          imggroup.file = "";
        });
      });
      let updatedata = this.company;
      updatedata.id = this.id;
      this.$axios({
        url: "/updatecompany",
        method: "POST",
        data: updatedata
      })
        .then(({ data }) => {
          if (data.code == 100) {
            this.$notify({
              message: "修改成功",
              type: "success"
            });
            var that = this;
            setTimeout(function() {
              that.$router.push({
                path: "/home/company"
              });
            }, 800);
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
                  redirect: "/home/company/update"
                }
              });
            }, 800);
          } else {
            this.$notify({
              message: data.msg,
              type: "warning"
            });
          }
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getcompanyinfo: function() {
      this.$axios({
        url: "/getupdateinfo",
        method: "POST",
        data: {
          id: this.id
        }
      })
        .then(({ data }) => {
          console.log(data);
          if (data.code == 100) {
            this.company.name = data.data[0].name;
            this.company.desc = data.data[0].depict;
            this.company.state = data.data[0].state == 1 ? true : false;
            this.company.exptime = data.data[0].exptime;
            this.company.exptype = data.data[0].exptype;
            this.company.manager.name = data.data[0].manager;
            if (data.data[0].ad != null && data.data[0].ad != "") {
              this.company.adgroup = JSON.parse(data.data[0].ad);
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    Uploadfile: function(e) {
      let index = e.target.dataset.index;
      let file = e.target.files[0];
      let size = file.size / 1024 / 1024 < 2; //文件是否小于2M
      if (!size) {
        this.$notify({ message: "上传文件不能大于2M", type: "warning" });
        return;
      }
      var filename = file.name;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      var vm = this;
      reader.onload = function(e) {
        var file = { name: filename, file: e.target.result };
        vm.$axios({
          url: "/upload",
          method: "POST",
          data: {
            file: file
          }
        })
          .then(({ data }) => {
            console.log(data);
            if (data.code == 100) {
              file.path = data.data.path;
              vm.company.adgroup[index].adimgs.push(file);
            } else if (data.code == 10) {
              vm.$notify({ message: "登录失效", type: "success" });
              setTimeout(function() {
                vm.$router.push({
                  path: "/login",
                  query: { redirect: "/home/company/add" }
                });
              }, 800);
            } else {
              vm.$notify({ message: data.msg, type: "warning" });
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
    },
    deluploadimg: function(index, imgsindex) {
      this.company.adgroup[index].adimgs.splice(imgsindex, 1);
    }
  },
  created: function() {
    this.id = this.$route.query.id;
    this.getcompanyinfo();
  }
};
</script>

<style scoped>
.company {
  height: auto;
  background: #ffffff;
  margin: 5px;
  border: #e4e7ed solid 1px;
  padding-bottom: 50px;
}
.handerbtn {
  padding: 10px;
  display: flex;
  justify-content: flex-start;
}
.companylist {
  width: auto;
  margin: 0 10px;
}
.page {
  margin: 10px 0px;
}
.state {
  text-align: left;
}
.form-btn {
  text-align: left;
  margin-left: 80px;
}
.extime {
  width: 125px;
}
.extype {
  width: 150px;
}
.el-tabs--border-card {
  box-shadow: none;
  border: none;
}
.adimg-item {
  border: #e4e7ed dashed 1px;
  border-radius: 5px;
  margin-bottom: 10px;
}
.ad-imgs,
.ad-position {
  text-align: left;
}
.ad-position span {
  font-weight: bold;
  font-size: 16px;
}
.ad-imgs {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: flex-start;
}
.ad-imgs img {
  display: block;
  height: 100px;
  margin-right: 10px;
  margin-bottom: 10px;
}
.uploadbtn {
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-size: 30px;
  border: #b2b2b2 dashed 1px;
  border-radius: 5px;
  color: #666;
}
.uploadbtn:hover {
  border: #01a9f5 dashed 1px;
  color: #01a9f5;
}
.adimgitem {
  position: relative;
}
.adimgitem span {
  display: block;
  width: 25px;
  height: 25px;
  position: absolute;
  right: 15px;
  top: 5px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  line-height: 25px;
  text-align: center;
  cursor: pointer;
}
.adimgitem span i {
  color: #fff;
  font-size: 14px;
}
.uploadbtn {
  position: relative;
}
.uploadbtn input {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 5;
  opacity: 0;
}
.uploadbtn i {
  width: 100%;
  height: 100%;
  font-size: 40px;
  line-height: 100px;
  text-align: center;
}
</style>

