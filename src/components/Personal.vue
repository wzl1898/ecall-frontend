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
    <div class="editBox" @click="startEdit"></div>
    <div class="infoBox">
      <div class="account" v-if="edit !== 1">账号: {{ user.id }}</div>
      <div class="username" v-if="edit !== 1">用户名: {{ user.name }}</div>
      <div class="signature" v-if="edit !== 1">个性签名: hello, world!</div>
      <div class="signature" v-if="edit !== 1">手机号: {{ user.phone }}</div>
      <div class="signature" v-if="edit !== 1">性别: {{ user.sex === "1" ? "男" : "女" }}</div>
      <div class="diaryInfo">一共写了xx篇日记</div>
    </div>
    <div class="backBox" @click="goHome"></div>
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
  /* border:1px rgb(38, 36, 34) solid; */
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