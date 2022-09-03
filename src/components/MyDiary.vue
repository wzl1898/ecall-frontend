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
    <div class="navBar">
      <div class="navigation" @click="$router.push('/home')">
        <div style="font-size: 18px">Home</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Diary</div> -->
      </div>
      <div class="navigation" @click="$router.push('/editDiary')">
        <div style="font-size: 17px">
          Anything&nbsp;to&nbsp;talk&nbsp;to&nbsp;us?
        </div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Diary</div> -->
      </div>
      <div class="navigation" @click="$router.push('/myDiary')">
        <div style="font-size: 17px">My&nbsp;daily&nbsp;journeys</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Diary</div> -->
      </div>

      <div class="navigation" @click="$router.push('/analysisCenter')">
        <div style="font-size: 17px">Analysis&nbsp;for&nbsp;me</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Analyze</div> -->
      </div>
      <div class="navigation" @click="$router.push('/chatList/{}/{}')">
        <div style="font-size: 17px">Let's&nbsp;Chat</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Chat</div> -->
      </div>
    </div>
    <div class="diaryBox">
      <div class="diary" v-for="item in diaryList" :key="item.id" >
        <div class="header" @click="goDiary(item)">
          <div class="dateBox">
            <div class="date">
              {{ item.createTime.split(" ")[0].split("-")[2] }}
            </div>
            <div class="date">
              {{
                dateList[Number(item.createTime.split(" ")[0].split("-")[1])]
              }}
            </div>
          </div>
          <div class="split"></div>
          <div class="title" >
            <router-link :to="`/diary/${JSON.stringify(item)}`">{{
              item.title
            }}</router-link>
          </div>
        </div>
        <div class="content">
          {{ item.content }}
        </div>
      </div>
    </div>
    <div class="addDiary" @click="$router.push('/editDiary')">
      <div class="addText">+add&nbsp;new</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "MyDiary",
  data() {
    return {
      diaryList: [],
      dateList: [
        "Jan.",
        "Feb.",
        "Mar.",
        "Apr.",
        "May.",
        "Jun.",
        "Jul.",
        "Aug.",
        "Sept.",
        "Oct.",
        "Nov.",
        "Dec.",
      ],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {},
  created() {
    this.$http({
      method: "get",
      url: "/diary/" + this.user.id + "/1/100",
    }).then((res) => {
      if (res.data.code === 1) {
        this.diaryList = res.data.data.records;
      } else {
        alert("获取日记列表失败");
      }
    });
  },
};
</script>

<style scoped>
.container {
  position:relative;
  overflow: hidden;
  width: 100%;
  height: 100%;
  background-color: rgb(255, 255, 255);
  background: url("../assets/diaryDetail.jpg") no-repeat;
  background-size: 100% 100%;
  /* display: flex; */
  /* justify-content: center; */
  /* position: relative; */
}
.navBar {
  /* visibility: hidden  ; */
  position: absolute;
  left: 34%;
  top: 4.2%;
  height: 30px;
  /* width: 500px; */
  display: flex;
  font-weight: bold;
  color: rgb(79, 73, 121);
  /* border: 1px solid saddlebrown; */
}
.navigation {
  background: rgb(255, 255, 255, 0);
  /* border: 1px solid rgb(55, 47, 42); */
  /* width: 150px; */
  margin-left: 10px;
}
.navigation:hover {
  cursor: pointer;
}
.user_avatar {
  position: absolute;
  left: calc(94% - 2px);
  top: calc(2% + 2px);
}
.avatar {
  height: 80px;
  width: 80px;
  /* border: #333 1px solid; */
  border-radius: 50%;
  cursor: pointer;
}
.diaryBox {
  overflow-y: scroll;
  /* border: 1px solid saddlebrown; */
  height: 500px;
  width: 840px;
  position: absolute;
  top: 18%;
  left: 21%;
  /* overflow: scroll; */
  /* background: rgba(178, 178, 178, 0.462); */
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
  color: #464646;
  padding-right: 110px;
}

a {
  text-decoration: none;
  color: #464646;
}
.diaryBox::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #b5b1b1;
}
.diaryBox::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(181, 181, 181, 0.3);   */
  border-radius: 10px;
  background-color: rgb(165, 165, 165);
}

.diaryBox::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);   */
  background-color: #b5b1b1;
}

.diary {
  border: 1.1px solid rgba(80, 80, 80, 0.234);
  height: 85px;
  width: 360px;
  overflow: hidden;
  box-shadow: 0px;
  /* padding-top: 5px; */
  /* padding-bottom: 10px; */
  margin-bottom: 25px;
  /* margin-left: 5px; */
  /* border-right: 5px rgb(178, 178, 178) solid; */
  /* border-bottom: 2px solid slategrey; */
  cursor: pointer;
  background: rgb(255, 255, 255);
  border-radius: 5px;
}

.header {
  display: flex;
  height: 40px;
  border-bottom: 1.1px solid rgba(66, 66, 66, 0.234);
  /* border: 1px saddlebrown solid; */
}
.dateBox{
  display: flex;
  flex-direction: column;
  /* border: salmon 1px solid; */
  margin-top: 2px;
}
.date {
  width: 50px;
  /* border: 1px saddlebrown solid; */
  /* border: salmon 1px solid; */
  font-size: 12px;
  font-weight: bold;
  font-family: 'Microsoft YaHei';
  text-align: center;
  color: #a0a0a0;
}
.split {
  width: 1.1px;
  background: rgba(169, 169, 169, 0.234);
}
.title {
  margin-top: 5px;
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
  outline: none;
}

.content {
  padding: 8px;
  font-size: 10px;
  font-weight: 600;
  color: rgb(144, 144, 144);
  font-family: "Microsoft YaHei";
  overflow: hidden;
}
.addDiary {
  position: absolute;
  top: 94%;
  left: 41%;
  font-size: 33px;
  font-weight: bolder;
  height: 140px;
  color: rgb(50, 47, 63);
  /* opacity: 0.5; */
  width: 270px;
  background: rgb(97, 91, 121);
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
  border-radius: 5px;
  transition: all 0.3s;
}
.addDiary:hover {
  transform: translateY(-30px);
}

.addText {
  margin-top: 0px;
}
</style>