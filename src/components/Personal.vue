<template>
  <div class="container">
    <div class="navBar">
      <div class="navigation" @click="$router.push('/home')">
        <div style="font-size: 18px">Home</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Diary</div> -->
      </div>
      <div class="navigation" @click="$router.push('/editDiary')">
        <div style="font-size: 18px">Anything&nbsp;to&nbsp;talk&nbsp;to&nbsp;us?</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Diary</div> -->
      </div>
      <div class="navigation" @click="$router.push('/myDiary')">
        <div style="font-size: 18px">My&nbsp;daily&nbsp;journeys</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Diary</div> -->
      </div>

      
      <div class="navigation" @click="$router.push('/analysisCenter')">
        <div style="font-size: 18px">Analysis&nbsp;for&nbsp;me</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Analyze</div> -->
      </div>
      <div class="navigation" @click="$router.push('/chatList/{}/{}')">
        <div style="font-size: 18px">Let's&nbsp;Chat</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Chat</div> -->
      </div>
    </div>
    <div class="user_avatar">
      <img
        class="avatar"
        :src="`http://localhost:8080/common/download?name=` + user.avatar"
        alt=""
        @click="$router.push('/personal')"
      />
    </div>
    <div class="editBox"><i @click="startEdit" class="el-icon-edit"></i></div>
    <div class="infoBox">
      <div class="account" v-if="edit !== 1">账号: {{ user.id }}</div>
      <div class="username" v-if="edit !== 1">用户名: {{ user.username }}</div>
      <!-- <div class="signature" v-if="edit !== 1">个性签名: {{ user.signature }} </div> -->
      <div class="signature" v-if="edit !== 1">手机号: {{ user.phone }}</div>
      <div class="signature" v-if="edit !== 1">性别: {{ user.sex === "1" ? "男" : "女" }}</div>
      <!-- <div class="diaryInfo">一共写了xx篇日记</div> -->
    </div>
    <!-- <div class="backBox" @click="goHome"></div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Personal",
  data(){
    return {
      phone: "",
      sex: "",
      userPturl: "",
      edit: 0,
    }
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    goHome(){
      this.$router.push("/home");
    },
    startEdit(){
      this.$router.push("/editProfile");
    }
  }
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* background-color: rgb(48, 48, 48); */
  background: url("../assets/personal.jpg") no-repeat;
  background-size: 100% 100%;
}
.navBar {
  /* visibility: hidden  ; */
  position: absolute;
  left: 35.5%;
  top: 4.4%;
  height: 30px;
  /* width: 500px; */
  display: flex;
  font-weight: bold;
  color: rgb(79, 73, 121);
  /* border: 1px solid saddlebrown; */
}
.navigation {
  background: rgb(255, 255, 255,0);
  /* border: 1px solid rgb(55, 47, 42); */
  /* width: 150px; */
  margin-left: 10px;
}
.navigation:hover {
  cursor: pointer;
}
.user_avatar {
  position: relative;
  left: calc(50% - 75px);
  top: 13%;
  /* border: 1px saddlebrown solid; */
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
  top: 25%;
  left: 71.5%;
  height: 40px;
  width: 40px;
  cursor: pointer;
  /* border:1px saddlebrown solid; */
  font-size: 30px;
}
.infoBox {
  position: relative;
  left: 23%;
  top: 9%;
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
  border:1px rgb(38, 36, 34) solid;
}
input{
  height: 30px;
  font-size: 25px;
  border: 0px;
  outline: none;
  background: rgb(210, 210, 210);
}
button{
  position: absolute;
  left: 68%;
  top: 90%;
  height: 50px;
  width: 100px;
  background: rgb(92, 188, 63);
  /* border: 0ch; */
  /* outline: none; */
  font-size: 25px;
  color: white;
  font-weight: lighter;
  border-radius: 10px;
  cursor: pointer;
}
</style>