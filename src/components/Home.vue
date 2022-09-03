<template>
  <div class="container">
    <!-- <div class="user_avatar">
      <img
        class="avatar"
        :src="`http://localhost:8080/common/download?name=` + user.avatar"
        alt=""
        @click="$router.push('/personal')"
      />
    </div> -->
    <div class="user_avatar">
      <img
        class="avatar"
        :src="`http://localhost:8080/common/download?name=` + user.avatar"
        alt=""
        @click="$router.push('/personal')"
      />
    </div>
    <div class="navBar">

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
    <!-- <div class="textBox">
      <div class="text">Hello, {{user.name}}&nbsp;!</div>
      <div class="text">Welcome back.</div>
      <div class="text1">欢迎回来&nbsp;!</div>
    </div> -->
    <!-- <div class="cardBox">
      <div class="card" @click="goPersonal"></div>
      <div class="card" @click="$router.push('/myDiary')"></div>
      <div class="card"></div>
      <div class="card" @click="$router.push('/chatList')"></div>
    </div> -->
    <button class="addDiary" @click="$router.push('/editDiary')">Start to add your new daily</button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    goPersonal() {
      this.$router.push("/personal");
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* background-color: rgb(48, 48, 48); */
  background: url("../assets/首页1.jpg") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center;
  /* position: relative; */
}
.navBar {
  /* visibility: hidden  ; */
  position: absolute;
  left: 35.5%;
  top: 4.2%;
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

.cards {
  width: 99%;
  height: 200px;
  position: relative;
  top: 68%;
  left: -3%;
  /* border: 1px solid rgb(78, 87, 210); */
  display: flex;
  justify-content: center;
}
.cardBox {
  position: absolute;
  top: 67.5%;
  left: 5.6%;
  justify-content: space-between;
  /* border: 1px solid rgb(25, 25, 25); */
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: calc(88% - 3px);
  height: 200px;
}
.card {
  width: 295px;
  height: 72%;
  /* border: 1px solid rgb(161, 125, 102); */
}
.card:hover {
  cursor: pointer;
}
.user_avatar {
  position: absolute;
  left: calc(92% - 2px);
  top: calc(2% + 2px);
}
.avatar {
  height: 80px;
  width: 80px;
  /* border: #333 1px solid; */
  border-radius: 50%;
  cursor: pointer;
}
.textBox {
  /* border: 1px saddlebrown solid; */
  position: absolute;
  top: 30%;
  left: 8%;
  width: 600px;
  height: 300px;
  font-size: 60px;
  font-weight: bold;
}
.text {
  /* border: 1px rgb(89, 188, 82) solid; */
  height: 70px;
}
.text1 {
  /* border: 1px rgb(89, 188, 82) solid; */
  height: 70px;
  font-size: 50px;
}
.addDiary {
  position: absolute;
  top: 66.8%;
  border: 0ch;
  /* left: 12%; */
  left: 5.9%;
  background: rgb(76, 58, 142);
  height: 38px;
  width: 189px;
  color: white;
  font-size: 13px;
  font-weight: bold;
  border-radius: 5px;
}
.addDiary:hover{
  animation: bigger 1s forwards;
}
@keyframes bigger {
  to {
    height: 50px;
    width: 230px;
    font-size: 16px;
    top: 65.8%;
  }
  
}
</style>