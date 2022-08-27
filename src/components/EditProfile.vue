<template>
  <div class="container">
    <div class="user_avatar">
      <img
        class="avatar"
        :src="`http://localhost:8080/common/download?name=` + user.avatar"
        alt=""
        @click="$router.push('/personal')"
      />
    </div>
    <div class="uploadBox">
      <div class="text">用户头像:</div>
      <el-upload
        class="upload-demo"
        ref="upload"
        action="http://localhost:8888/api/common/upload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :on-success="uploadSuccess"
        :before-upload="handleBeforeUpload"
        :on-change="handleChange"
        :file-list="fileList"
        :auto-upload="false"
      >
        <el-button slot="trigger" size="small" type="primary" class="selBtn"
          >选择图片</el-button
        >
        <!-- <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    > -->
        <div
          slot="tip"
          class="el-upload__tip"
          style="font-size: 15px; color: white"
        >
          只能上传jpg/png文件，且不超过500kb
        </div>
      </el-upload>
    </div>
    <div class="infoBox">
      <div class="signature" v-if="edit !== 1">
        个性签名: <input type="text" v-model="user.signature" />
      </div>
      <div class="signature" v-if="edit !== 1">
        手机号: <input type="text" v-model="user.phone" />
      </div>
      <div class="signature" v-if="edit !== 1">
        性别:
        <select name="" id="sex" v-model="user.sex">
          <option value="1">男</option>
          <option value="0">女</option>
        </select>
      </div>
      <button class="submit" @click="submit">提交</button>
    </div>
    <div class="backBox" @click="goHome"></div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "EditProfile",
  computed: {
    ...mapState(["user"]),
  },
  data() {
    return {
      // fileList: [],
      // userNickname: "",
      ptUrl: "",
      // userAd: "",
      submitflag: false,
    };
  },
  methods: {
    ...mapActions([
      "saveUser",
      "saveSse",
      "addUnreadMsgCount",
      "saveSseMessage",
    ]),
    goHome() {
      this.$router.push("/home");
    },
    edit() {
      this.$http({
        method: "put",
        url: "/user",
        data: this.user,
      }).then((res) => {
        if (res.data.code === 1) {
          console.log(this.user);
          this.saveUser(this.user);
          this.$router.push("/personal");
        } else {
          alert("修改失败！");
        }
      });
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleBeforeUpload(file) {
      console.log(file);
      return true;
    },
    handleChange(file, fileList) {
      console.log("filelist", fileList);
      console.log("file", file);
      this.submitflag = true;
      console.log("this.submitflag: ", this.submitflag)
    },
    setPtUrl(ptUrl) {
      console.log("param:", ptUrl);
      this.ptUrl = ptUrl;
      console.log("this.pturl:", this.ptUrl);
    },
    uploadSuccess(response, file, fileList) {
      console.log("response:", response);
      // ptUrl = response.data;
      this.setPtUrl(response.data);
      let data = this.user;
      data.userPtUrl = response.data;
      data.avatar = response.data;
      // data.userNickName = this.userNickname;
      // data.userAd = this.userAd;
      console.log("data", data);
      this.saveUser(data);
      this.$http({
        method: "put",
        url: "/user",
        data: data,
      }).then(
        (res) => {
          console.log("axios response", res);
          alert("修改信息成功");
          this.$router.push("/personal");
        },
        (err) => {
          console.log(err);
        }
      );
    },
    submit() {
      if (this.submitflag === true) {
        console.log("111111111111111111111111");
        this.$refs.upload.submit();
      } else {
        let data = this.user;
        // data.userNickName = this.userNickname;
        // data.userAd = this.userAd;
        console.log("data", data);
        this.saveUser(data);
        this.$http({
          method: "put",
          url: "/user",
          data: data,
        }).then(
          (res) => {
            console.log("axios response", res);
            alert("修改信息成功");
            this.$router.push("/personal");
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* background-color: rgb(48, 48, 48); */
  background: url("../assets/personal.png") no-repeat;
  background-size: 100% 100%;
}
.user_avatar {
  position: relative;
  left: calc(50% - 60px);
  top: 5.5%;
}
.avatar {
  height: 120px;
  width: 120px;
  /* border: #333 1px solid; */
  border-radius: 50%;
  cursor: pointer;
}
.editBox {
  position: absolute;
  top: 16%;
  left: 71.5%;
  height: 40px;
  width: 40px;
  cursor: pointer;
  /* border:1px saddlebrown solid; */
}
.infoBox {
  position: relative;
  left: 23%;
  top: 15%;
  height: 500px;
  width: 53.6%;
  /* border:1px saddlebrown solid; */
}
.account,
.username,
.signature,
.diaryInfo {
  height: 60px;
  /* border:1px rgb(38, 36, 34) solid; */
  color: white;
  font-weight: lighter;
  font-size: 30px;
  margin-left: 7%;
  padding-top: 15px;
}
.diaryInfo {
  padding-top: 10px;
  font-size: 35px;
}
.backBox {
  position: absolute;
  top: 90%;
  left: 2%;
  height: 40px;
  width: 160px;
  cursor: pointer;
  /* border:1px rgb(38, 36, 34) solid; */
}
input {
  position: absolute;
  left: 25%;
  height: 30px;
  font-size: 25px;
  border: 0px;
  outline: none;
  background: rgb(210, 210, 210);
}
.submit {
  position: relative;
  left: 45%;
  height: 50px;
  width: 100px;
  background: rgb(92, 188, 63);
  border: 0ch;
  outline: none;
  font-size: 25px;
  color: white;
  font-weight: lighter;
  border-radius: 10px;
  cursor: pointer;
}
#sex {
  height: 50px;
  height: 30px;
  border: 0ch;
  outline: none;
  position: absolute;
  left: 25%;
}
.uploadBox {
  position: relative;
  left: 26.8%;
  top: 80px;
  width: 33%;
  /* border: 1px saddlebrown solid; */
  display: flex;
  justify-content: space-between;
  height: 100px;
  font: 2em sans-serif;
  border-radius: 30px;
  background: rgba(255, 255, 255, 0);
  /* margin-top: 50px; */
  color: rgb(255, 255, 255);
}
.upload-demo {
  width: 300px;
  /* border: 1px saddlebrown solid; */
  position: relative;
  left: 0%;
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* padding-left: 30px; */
  height: auto;
  color: white !important;
}
.selBtn {
  /* margin-top: 40px; */
  width: 120px;
  height: 50px;
  font-size: 20px;
  font-weight: lighter;
}
.text {
  display: flex;
  align-items: center;
  font-weight: lighter;
}
</style>