<template>
  <div class="write">
    <el-tabs type="border-card" v-model="activetab">
      <el-tab-pane label="写文章" name="wirte">
        <el-form ref="form" label-width="80px">
          <el-row>
            <el-col :span="15">
              <el-form-item label="文章标题">
                <el-input v-model="title"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="15">
              <el-form-item label="缩略图">
                <div class="banner">
                  <div class="banimggroup" v-if="artban!=''">
                    <img :src="$File+artban">
                  </div>

                  <div class="uploadbtn">
                    <i class="el-icon-plus"></i>
                    <input type="file" @change="upartbanner">
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <!-- <el-row>
            <el-col :span="15">
              <el-form-item label="文章分类">
                <div class="category">
                  <el-input></el-input>
                </div>
              </el-form-item>
            </el-col>
          </el-row> -->

          <el-row>
            <el-col :span="15">
              <el-form-item label="文章内容">
                <div class="concent">
                  <ueditor ref="content"></ueditor>
                </div>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="15">
              <el-button @click="saveartfun">保存文章</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="链接提取" name="draw">
        <el-form ref="form" label-width="80px">
          <el-row>
            <el-col :span="15">
              <el-form-item label="链接地址">
                <el-input v-model="drawlink"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row class="drawurl">
            <el-button @click="drawbtn">提取链接</el-button>
          </el-row>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ueditor from "@/components/ueditor";
export default {
  data() {
    return {
      title:"",
      artban: "",
      activetab: "wirte",
      drawlink: ""
    };
  },
  components: {
    ueditor
  },
  methods: {
    // 提取链接
    drawbtn: function() {
      if (this.drawlink == "") {
        this.$notify({ title: "链接不能为空", type: "warning" });
        return;
      }
      this.$axios({
        url: "/extract",
        method: "POST",
        data: {
          url: this.drawlink
        }
      })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    //上传封面图
    upartbanner: function(e) {
      var that = this;
      let File = e.target.files[0];
      let size = File.size / 1024 / 1024 < 2; //文件是否小于2M
      if (!size) {
        this.$notify({ message: "上传文件不能大于2M", type: "warning" });
        return;
      }
      let reader = new FileReader();
      reader.readAsDataURL(File);
      reader.onload = function(e) {
        let imgdata = e.target.result;
        let file = {
          file: imgdata
        };
        that
          .$axios({
            url: "/upload",
            method: "POST",
            data: {
              file: file
            }
          })
          .then(({ data }) => {
            if (data.code == 100) {
              that.artban = data.data.path;
            } else if (data.code == 10) {
              that.$notify({ message: "登录失效", type: "success" });
              setTimeout(function() {
                that.$router.push({
                  path: "/login",
                  query: { redirect: "/home/article/write" }
                });
              }, 800);
            }
          })
          .catch(err => {
            console.log(err);
          });
      };
    },
    saveartfun:function(){
        if(this.title==""){
              this.$notify({ title: "文章标题不能为空", type: "warning" });
              return;
        }
        if(this.artban==""){
              this.$notify({ title: "文章主题图片不能为空", type: "warning" });
              return;
        }
        if(this.$refs.content.msg==""){
              this.$notify({ title: "文章内容不能为空", type: "warning" });
              return;
        }
        this.$axios({
            url:"/savecompanyarticle",
            method:"POST",
            data:{
                title:this.title,
                artlogo:this.artban,
                content:this.$refs.content.msg
            }
        }).then(({data})=>{
          if(data.code==100){
             this.$notify({ message: "保存成功", type: "success" });
             var that=this;
              setTimeout(function() {
                that.$router.push({
                  path: "/home/article/index",
                })
              },500)
          }
        }).catch((err)=>{
            console.log(err);
        })

    }
  },
  mounted: function() {},
  created: function() {}
};
</script>

<style scoped>
.write {
  width: auto;
  height: auto;
  background: #ffffff;
  padding: 5px;
  box-shadow: none !important;
}
.write .el-tab {
  box-shadow: none !important;
}
.drawurl {
  display: flex;
  justify-content: left;
}
.banner {
  width: auto;
  height: 100px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
}
.banner .uploadbtn {
  width: 100px;
  height: 100px;
  border-radius: 5px;
  border: #b2b2b2 dashed 1px;
  position: relative;
}
.banner .uploadbtn i {
  display: block;
  font-size: 40px;
  width: 100%;
  height: 100%;
  text-align: center;
  line-height: 100px;
}
.banner .uploadbtn input {
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
.banimggroup {
  width: auto;
  height: 100px;
  margin-right: 10px;
}
.banimggroup img {
  width: auto;
  height: 100px;
}
</style>

