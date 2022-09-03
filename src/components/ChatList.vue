<!-- <template>
  <div class="container">
    <div class="chatList">
        <div class="chat" v-for="chat in chatList" :key="chat.id">
            <div class="name" @click="goChat(chat.id)">{{chat.name}}</div>
        </div>
        
    </div>
  </div>
</template>

<script>
export default {
    name: "ChatList",
    data(){
        return {
            chatList: [
                {
                    name: "Leo",
                    id: "1554754967574978561"
                }
            ]
        }
    },
    methods: {
        goChat(userId){
            this.$router.push("/chat/" + userId.toString())
        }
    }
}
</script>

<style scoped>
.chatList{
    height: 400px;
    width: 60%;
    position: absolute;
    left: 20%;
    top: 20%;
    overflow: scroll;
    border: 1px solid saddlebrown;
}
.chat{
    position: relative;
    left: 10%;
    height: 90px;
    width: 80%;
    font-size: 30px;
    border: 1px solid seagreen;
}
.name:hover{
    text-decoration: underline;
}
</style> -->

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
    <div class="recordContainer">
      <div class="records">
        <!-- <div class="recordsHeader">
          <div class="textBox">交易记录</div>
        </div> -->
        <div
          class="record"
          @click="changeChat(item.id)"
          v-for="item in toUserList"
          :key="item.id"
        >
          <div class="imgBox">
            <!-- <img class="productPic" src="../assets/1980.jpg" alt="pic" /> -->
            <img class="productPic" :src="`http://localhost:8080/common/download?name=` + item.avatar" alt="pic" />
          </div>
          <div class="infoBox">
            <div class="productName">{{ item.username }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="chatContainer" v-show="showFlag === true">
      <div class="chatHeader">
        <div class="iconWrap">
          <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
        </div>
        <div class="headerText">
          <div>{{ toUser.username }}</div>
        </div>
      </div>
      <div class="chats">
        <div class="chat_wrapper" v-for="item in messages" :key="item.sendTime">
          <div
            class="chat"
            :class="item.origin == user.id ? 'msg_right' : 'msg_left'"
          >
            <img
              class="userAvatar"
              :src="
                item.origin == user.id
                  ? `http://localhost:8080/common/download?name=` + user.avatar
                  : `http://localhost:8080/common/download?name=` +
                    toUser.avatar
              "
              alt=""
            />
            <div class="text">{{ item.msg }}</div>
          </div>
        </div>
      </div>
      <div class="inputBox">
        <input
          type="text"
          v-model="inputText"
          placeholder="Write a messasge here"
        />
        <div class="sendBox" @click="sendMessage">
          <i class="el-icon-s-promotion"></i>
        </div>
      </div>
    </div>

    <div class="diaryContainer" v-show="showFlag === true">
      <div class="anaHeader">
        <div class="anaHeaderText">{{ toUser.username }}</div>
      </div>
      <div class="anaBox">
        <div class="anaBoxHeader">{{ toUser.username }}'s analysis</div>
        <div class="lineBox"></div>
        <div class="barBox">
          <div class="bar" :style="{ width: (toUserDiary.mood / (10)) * 250 + 'px' }"></div>
          <!-- <div class="bar" :style="{ width: (7 / (10)) * 250 + 'px' }"></div> -->
          <div class="dataBox">
            <div class="typeBox">positive</div>
            <div class="numBox">{{ toUserDiary.mood*10 }}%</div>
          </div>
        </div>
        <div class="barBox">
          <div class="bar" :style="{ width: (10 - toUserDiary.mood) / (10) * 250 + 'px' }"></div>
          <!-- <div class="bar" :style="{ width: (10 - 7) / (10) * 250 + 'px' }"></div> -->
          <div class="dataBox">
            <div class="typeBox">negative</div>
            <div class="numBox">{{ (10 - toUserDiary.mood)*10 }}%</div>
          </div>
        </div>
        <div class="diaryBox">
          <div class="diary">
            <div class="header">
              <div class="dateBox">
                <div class="date">
                  {{ toUserDiary.createTime.split(" ")[0].split("-")[2] }}
                </div>
                <div class="date">
                  {{
                    dateList[
                      Number(toUserDiary.createTime.split(" ")[0].split("-")[1])
                    ]
                  }}
                </div>
              </div>
              <div class="split"></div>
              <div class="title" @click="goDiary(toUserDiary)">
                {{ toUserDiary.title }}
              </div>
            </div>
            <div class="content">
              {{ toUserDiary.content }}
            </div>
          </div>
          <div class="diary">
            <div class="header">
              <div class="dateBox">
                <div class="date">
                  {{ myDiary.createTime.split(" ")[0].split("-")[2] }}
                </div>
                <div class="date">
                  {{
                    dateList[
                      Number(myDiary.createTime.split(" ")[0].split("-")[1])
                    ]
                  }}
                </div>
              </div>
              <div class="split"></div>
              <div class="title" @click="goDiary(toUserDiary)">
                {{ myDiary.title }}
              </div>
            </div>
            <div class="content">
              {{ myDiary.content }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="showIfNotJump" v-show="showFlag === false">
      <div>no one here to chat&nbsp;...</div>
      <div>select one on the right</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ChatList",
  data() {
    return {
      showFlag: true,
      toUserList: [],
      toUserNum: 0,
      inputText: "",
      toUser: {
        id: "",
        userName: "",
      },
      websock: {},
      messages: [],
      toUserDiary: {
        title: "This is a title",
        createTime: "2011-09-21 18:30:11",
        content: "This is the content.",
      },
      myDiary: {
        title: "This is a title",
        createTime: "2011-09-21 18:30:11",
        content: "This is the content.",
      },
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
  methods: {
    initUserList() {},
    initSocket() {
      this.websock = new WebSocket(
        `ws://localhost:8080/websocket/${this.user.id}`
      );
      // this.websock = new WebSocket(`ws://ego.vipgz4.91tunnel.com/websocket/${this.user.id}`);
      this.websock.onopen = this.websocketonopen;
      this.websock.onerror = this.websocketonerror;
      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
    },
    sendMessage() {
      if (this.inputText === "" || this.toUser.id === "") {
        console.log("empty input");
      } else {
        let data = {
          origin: this.user.id,
          target: this.toUser.id,
          sendTime: Date.now().toString(),
          isRead: "0",
          msg: this.inputText,
        };
        this.messages.push(data);
        this.inputText = "";
        this.websock.send(JSON.stringify(data));
      }
    },
    websocketonopen: function () {
      console.log("WebSocket连接成功");

      let data = {
        origin: this.user.id,
        target: this.toUser.id,
        sendTime: Date.now().toString(),
        isRead: "0",
        msg: this.inputText,
        // msg: this.inputText,
      };
      // console.log("data:", data);
      this.inputText = "";
      this.websock.send(JSON.stringify(data));
    },
    websocketonerror: function (e) {
      console.log("WebSocket连接发生错误", e);
    },
    websocketonmessage: function (e) {
      let data = JSON.parse(e.data);
      this.messages = data.dataList;
      // console.log(data);
    },
    websocketclose: function (e) {
      console.log("connection closed", e);
      console.log(e);
    },
    changeChat(id) {
      this.toUser.id = id;
      this.showFlag = true;
      this.$http({
        method: "get",
        url: "/user/" + this.toUser.id,
      }).then((res) => {
        console.log("changeChat: /user/", res.data);
        this.toUser = res.data.data;
      });
      this.initSocket();
      //get the two diaries
      this.$http({
        method: "get",
        url: "/match/find/" + this.user.id,
      }).then(
        res => {
          if (res.data.code === 1){
            console.log("find match: ", res.data.data);
            for (let idx in res.data.data){
              console.log(res.data.data[idx])
              console.log("this.user.id:", this.user.id, "/item.userId:", res.data.data[idx].userId, "/this.toUser.id", this.toUser.id, "/item.matchUser", res.data.data[idx].matchUser);
              if (res.data.data[idx].userId === this.user.id && res.data.data[idx].matchUser === this.toUser.id){
                console.log("match found")
                this.$http({
                  method: "get",
                  url: "/diary/" + res.data.data[idx].diaryId,
                }).then(
                  res => {
                    if (res.data.code === 1){
                      this.myDiary = res.data.data;
                    }
                  }
                )
                this.$http({
                  method: "get",
                  url: "/diary/" + res.data.data[idx].matchDiary,
                }).then(
                  res => {
                    if (res.data.code === 1){
                      this.toUserDiary = res.data.data;
                    }
                  }
                )
                break;
              }
            }
          }
        }
      )
      // this.$http({
      //   method: "get",
      //   url: "/diary/getUserMatch/" + this.toUser.id,
      // }).then((res) => {
      //   if (res.data.code === 1){
      //     for (let item in res.data.data){
      //       if (item.matchUserId == this.user.id){
      //         this.toUserDiary = item;
      //         break;
      //       }
      //     }
      //   }
      // });
      // getUserMatch完善后。。。
      // this.$http({
      //   method: "get",
      //   url: "/diary/getUserMatch/" + this.user.id,
      // }).then((res) => {
      //   if (res.data.code === 1){
      //     for (let item in res.data.data){
      //       if (item.matchUserId == this.user.id){
      //         this.myDiary = item;
      //         break;
      //       }
      //     }
      //   }
      // });

    },
  },
  computed: {
    ...mapState(["user", "sseMessage"]),
  },
  created() {
    this.$http({
      method: "get",
      url: "/sse/" + this.user.id + "/target",
    }).then((res) => {
      // console.log(res);
      this.initUserList();
    });
    // console.log("has this.$route.params.dataStr");

    // this.toUserDiary.title = this.toUser.title;
    // this.toUserDiary.content = this.toUser.content;
    // this.toUserDiary.createTime = this.toUser.createTime;
  },
  beforeMount() {},
  updated() {
    // if (this.toUserNum === 0){
    //   this.toUserNum = 1;
    //   for (let i = 0; i < this.sseMessage.length; i++){
    //       this.$http({
    //         method: "get",
    //         url: "/user/info/" + this.sseMessage[i],
    //       }).then(
    //         res => {
    //           console.log("/user/ssemessage", res.data)
    //           this.toUserList.push(res.data.data)
    //         }
    //       )
    //     }
    // }
  },
  mounted() {
    for (let i = 0; i < this.sseMessage.length; i++) {
      this.$http({
        method: "get",
        url: "/user/" + this.sseMessage[i],
      }).then((res) => {
        console.log("mounted: query user toUserList:", res.data);
        this.toUserList.push(res.data.data);
      });
    }
    let data = JSON.parse(this.$route.params.dataStr);
    if (Number(data.id) > 0) {
      console.log("has dataStr:", JSON.parse(this.$route.params.diaryStr));
      // setInterval(()=>{ this.myDiary = JSON.parse(this.$route.params.diaryStr); }, 3000);
      this.myDiary = JSON.parse(this.$route.params.diaryStr);

      // this.$http({
      //   method: "get",
      //   url: "/diary/" + data.matchUserId,
      // }).then((res) => {
      //   console.log("query user:", res.data);
      //   this.toUserList.push(res.data.data);
      // });

      // this.toUser = {};
      // this.toUser.id = data.matchUserId;
      console.log("data.matchUserId: ", data.matchUserId);

      this.$http({
        method: "get",
        url: "/user/" + data.matchUserId,
      }).then((res) => {
        console.log("get matchUser query user:", res.data);
        let flag = false;
        for(let idx in this.toUserList){
          if(this.toUserList[idx].id === res.data.data.id){
            flag = true;
            break;
          }
        }
        if (!flag){
          console.log("push matchUser into toUserList")
          this.toUserList.push(res.data.data);
        }
          
      });
      this.changeChat(data.matchUserId);
      this.myDiary = JSON.parse(this.$route.params.diaryStr);

      this.$http({
        method: "get",
        url: "/diary/" + data.matchDiaryId,
      }).then((res) => {
        if (res.data.code === 1){
          this.toUserDiary = res.data.data;
          // this.$set(this.toUserDiary, 'title', res.data.data.title);
          // this.$set(this.toUserDiary, 'content', res.data.data.content);
          // this.$set(this.toUserDiary, 'mood', res.data.data.mood);
          // this.$set(this.toUserDiary, 'createTime', res.data.data.createTime);
          this.$forceUpdate();
        }
      });


    }
    if (this.toUser.id === null || this.toUser.id === ""){
      this.showFlag = false;
    }
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: rgb(111, 111, 111);
}
.container {
  /* display: flex; */
  width: 100%;
  height: 100%;
  background: url("../assets/chat box (2).jpg");
  background-size: 100% 100%;
}
.navBar {
  /* visibility: hidden  ; */
  position: absolute;
  left: 30%;
  top: 4.4%;
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
  left: calc(93% - 2px);
  top: calc(2% + 2px);
}
.avatar {
  height:80px;
  width: 80px;
  /* border: #333 1px solid; */
  border-radius: 50%;
  cursor: pointer;
}
.textBox {
  /* border: 1px salmon solid; */
  align-self: center;
  font-size: 30px;
  /* font-weight: 500; */
}
.iconWrap {
  height: 20px;
  width: 25px;
  /* border: 1px saddlebrown solid; */
  /* margin-left: 3%; */
  position: absolute;
  top: 2.7%;
  left: 2.5%;
  font-size: 20px;
  color: rgb(111, 111, 111);
  text-align: center;
  line-height: 20px;
  background: rgb(32, 60, 81);
  border-radius: 3px;
}
.avatarBox {
  margin-top: -1%;
  display: flex;
  /* justify-content: center; */
  /* border: rgb(73, 79, 61) 2px solid; */
}

.recordContainer {
  display: flex;
  justify-content: center;
  /* border: 20px saddlebrown solid; */
  width: 330px;
  height: 545px;
  border-radius: 8px;
  position: absolute;
  top: 16%;
  left: 68.5%;
  box-shadow: 3px 3px 10px rgba(65, 65, 65, 0.393);
}
.records {
  width: 270px;
  height: 380px;
  /* border: 1px salmon solid !important; */
  padding: 1%;
  font-size: 20px;
  /* font-weight: medium; */
  color: rgb(37, 37, 37);
  background: rgb(240, 240, 240);
  border-radius: 8px;
  background: rgba(145, 145, 145, 0);
  position: absolute;
  top: 11%;
  left: 6%;
}
.recordsHeader {
  display: flex;
  justify-content: space-between;
}
.username {
  margin-left: 50px;
  margin-bottom: 20px;
}
.address {
  margin-left: 20px;
}
.textBox {
  margin-left: 30px;
}
.productPic {
  height: 30px;
  width: 30px;
  border-radius: 50%;

  /* box-shadow:whitesmoke 10px; */
}
.record {
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  height: 100px;
  /* border: 1px saddlebrown solid; */
  background-color: rgba(241, 241, 241, 0.814);
  height: 45px;
  border-radius: 3px;
  transition: background-color 0.5s;
}
.record:hover {
  background-color: rgba(33, 61, 75, 0.566);
}
.imgBox,
.infoBox,
.priceBox {
  position: relative;
}
.imgBox {
  left: 2.5%;
  top: 3.5%;
  /* border: 1px saddlebrown solid; */
}
.infoBox {
  left: -66%;
  top: -15%;
  /* border: 1px saddlebrown solid; */
  display: flex;
  align-items: center;
  font-size: 18px;
  color: rgb(58, 58, 58);
}
.priceBox {
  font-size: 50px;
  left: -3%;
  color: rgb(64, 170, 157);
}

.chatContainer {
  position: absolute;
  top: 17%;
  left: 3.3%;
  height: 548px;
  width: 580px;
  /* background: rgba(0, 0, 0, 0.289);s */
}
.headerText {
  width: 300px;
  height: 50px;
  /* background: rgba(158, 95, 95, 0.447); */
  font-size: 20px;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  position: relative;
  left: 9%;
}
.chats {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 30px;
  height: 300px;
  overflow-y: scroll;
  /* border: 1px saddlebrown solid; */
}
.chats::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  border-radius: 10px;
  background-color: #b5b1b1;
}
.chats::-webkit-scrollbar-track {
  /* -webkit-box-shadow: inset 0 0 6px rgba(181, 181, 181, 0.3);   */
  border-radius: 10px;
  background-color: rgb(165, 165, 165);
}

.chats::-webkit-scrollbar-thumb {
  border-radius: 10px;
  /* -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);   */
  background-color: #b5b1b1;
}
.chat_wrapper {
  /* border: 1px saddlebrown solid; */
  height: 50px;
  width: 90%;
  margin-left: 25px;
  margin-bottom: 10px;
}
.chat {
  display: flex;
}
.userAvatar {
  height: 30px;
  width: 30px;
  border-radius: 50%;
}
.text {
  background: rgb(49, 61, 71);
  margin-top: 12px;
  margin-left: 8px;
  padding: 5px;
  height: 25px;
  color: rgba(255, 255, 255, 0.752);
  border-radius: 3px;
  font-size: 15px;
}
.msg_right .text {
  margin-left: 0px;
  margin-right: 8px;
}
.msg_left {
  float: left;
}
.msg_right {
  float: right;
  flex-direction: row-reverse;
}
.inputBox {
  height: 35px;
  width: 370px;
  position: absolute;
  left: 12.4%;
  top: 83%;
  display: flex;
  background: rgb(24, 47, 65);
  border-radius: 5px;
}
.inputBox input {
  height: 20px;
  position: absolute;
  top: 10%;
  left: 14%;
  background: rgba(0, 0, 0, 0);
  border: 0ch;
  color: white;
  outline: none;
  font-size: 15px;
}
.sendBox {
  font-size: 20px;
  background: rgba(255, 255, 255, 0.695);
  height: 25px;
  width: 25px;
  padding-left: 5px;
  border-radius: 4px;
  position: absolute;
  right: 2%;
  margin-top: 3px;
}
.sendBox:hover {
  animation: green 0.5s forwards;
}
@keyframes green {
  to {
    background: rgb(174, 249, 165);
  }
}
.diaryContainer {
  height: 525px;
  width: 376px;
  /* background: rgba(0, 0, 0, 0.392); */
  position: absolute;
  top: 17%;
  left: 42%;
  padding-left: 15px;
  padding-top: 23px;
}
.anaHeader {
  height: 30px;
  width: 125px;
  background: rgb(52, 67, 79);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  font-weight: normal;
  color: white;
  border-radius: 5px;
  /* position: absolute; */
}
.anaBox {
  height: 105px;
  width: 277px;
  border-radius: 5px;
  background: rgb(52, 67, 79);
  margin-top: 11px;
}
.anaBoxHeader {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.882);
  position: relative;
  left: 5%;
  top: 3%;
}
.lineBox {
  margin-top: 8px;
  width: 100%;
  height: 0.1px;
  background: rgba(255, 255, 255, 0.329);
}
.barBox {
  height: 40px;
  width: calc(100% - 13px);
  padding-left: 13px;
  /* background: rgba(138, 62, 62, 0.593); */
  display: flex;
  flex-wrap: wrap;
}

.bar {
  width: 250px;
  height: 3px;
  border-radius: 1.5px;
  background: white;
  margin-top: 10px;
}
.dataBox {
  width: 250px;
  display: flex;
  justify-content: space-between;
  color: white;
  font-size: 4px;
}
.diary {
  border: 1.1px solid rgba(80, 80, 80, 0.547);
  height: 100px;
  width: 360px;
  overflow: hidden;
  box-shadow: 0px;
  /* padding-top: 5px; */
  /* padding-bottom: 10px; */
  margin-bottom: 15px;
  margin-top: 15px;
  /* margin-left: 5px; */
  /* border-right: 5px rgb(178, 178, 178) solid; */
  /* border-bottom: 2px solid slategrey; */
  /* cursor: pointer; */
  background: rgb(255, 255, 255);
  border-radius: 5px;
}

.header {
  display: flex;
  height: 40px;
  border-bottom: 1.1px solid rgba(66, 66, 66, 0.379);
  /* border: 1px saddlebrown solid; */
}
.dateBox {
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
  font-family: "Microsoft YaHei";
  text-align: center;
  color: #a0a0a0;
}
.split {
  width: 1.1px;
  background: rgba(93, 93, 93, 0.512);
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
}
.showIfNotJump{
  font-size: 30px;
  font-weight: normal;
  font-family: 'Microsoft YaHei';
  position:absolute;
  top: 40%;
  left: 20%;
  color: white;
}
</style>