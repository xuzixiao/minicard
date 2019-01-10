<template>
  <div class="articledetail">
    <el-row>
      <el-col :span="3">文章头图</el-col>
      <el-col :span="20">
        <img :src="$Filepath+artdetail.artbanner" v-if="artdetail.artbanner" class="artlogo">
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3">文章标题</el-col>
      <el-col :span="20">
        <p class="arttit">{{artdetail.arttitle}}</p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3">文章分类</el-col>
      <el-col :span="20">
        <p class="arttit">{{artdetail.categoryname}}</p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3">创建时间</el-col>
      <el-col :span="20">
        <p class="arttit">{{artdetail.createtime}}</p>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3">文章内容</el-col>
      <el-col :span="20">
        <div class="artcon">
          <div class="artmain">
            <div class="artitem" v-for="item,index in artdetail.artcon">
              <div class="section text" v-if="item.type=='text'">
                <p>{{item.data}}</p>
              </div>
              <div class="section image" v-if="item.type=='img'">
                <div class="section imagegroup" v-for="images in item.data">
                  <img :src="$Filepath+images">
                </div>
              </div>
              <div class="section video" v-if="item.type=='video'">
                <div class="section video" v-for="videogroup in item.data">
                  <video :src="$Filepath+videogroup" controls></video>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3">文章链接</el-col>
      <el-col :span="20">
        <el-button
          type="success"
          size="mini">点击查看</el-button>
      </el-col>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="3">文章状态</el-col>
      <el-col :span="20">{{artdetail.statename}}</el-col>
    </el-row>

    <el-row>
      <el-col :span="3">操作</el-col>
      <el-col :span="20">
        <el-button
          type="warning"
          size="mini"
          v-if="artdetail.status==50"
          @click="changeartstatus(0)"
        >审核驳回</el-button>
        <el-button
          type="success"
          size="mini"
          v-if="artdetail.status==50"
          @click="changeartstatus(100)"
        >审核通过</el-button>
        <el-button
          type="warning"
          size="mini"
          v-if="artdetail.status==100"
          @click="changeartstatus(0)"
        >审核驳回</el-button>
        <el-button
          type="success"
          size="mini"
          v-if="artdetail.status==0"
          @click="changeartstatus(100)"
        >审核通过</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userid: "",
      artdetail: ""
    };
  },
  methods: {
    getdetail: function() {
      this.$axios({
        url: "/getacticle",
        method: "POST",
        data: {
          id: this.artid
        }
      }).then(
        ({ data }) => {
          if (data.code == 100) {
            let artdata = data.data[0];
            artdata.artcon = JSON.parse(artdata.artcon);
            this.artdetail = artdata;
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
    changeartstatus: function(status) {
      this.$axios({
        url: "/updateartstatus",
        method: "POST",
        data: {
          id: this.artid,
          state: status
        }
      })
        .then(({ data }) => {
          if (data.code == 100) {
            this.$notify({
              message: "操作成功",
              type: "success"
            });
            this.getdetail();
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
                  redirect: "/home/article"
                }
              });
            }, 800);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted: function() {},
  created: function() {
    this.artid = this.$route.query.id;
    this.getdetail();
  }
};
</script>

<style scoped>
.articledetail {
  height: auto;
  background: #ffffff;
  padding:10px;
  padding-bottom: 100px;
}
.el-row{
    width: 100%;
    min-height: 50px;
    line-height: 50px;
}
.el-row .el-col:first-child{
    text-align: center;
    font-weight: bold;
    font-size: 18px;
}
.el-row .el-col:last-child{
    text-align: left;
    font-size: 16px;
}
video{
    max-width: 600px;
    height:auto;
}
.artcon{
    padding:5px;
    border-radius: 5px;
    border:#dfdfdf dashed 0.5px;
}
.artlogo{
    max-width: 500px;
    height: auto;
    margin: 5px;
}
</style>

