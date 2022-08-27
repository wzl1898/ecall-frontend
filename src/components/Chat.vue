<template>
  <div class="container">
    <div class="iconWrap">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
    </div>
    <div class="header">
      <div class="textBox">{{ toUser.userName }}</div>
    </div>

    <div class="recordContainer">
      <div class="records">
      
        <div class="record_wrapper" v-for="item in messages" :key="item.sendTime">
          <div class="record" :class="item.origin == user.id ? 'msg_right': 'msg_left'">
            <img :src="item.origin == user.id ? `http://localhost:8080/common/download?name=` + user.avatar : `http://localhost:8080/common/download?name=` + toUser.avatar " alt="" />
            <div class="text">{{item.msg}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="inputBox">
      <div class="inputContainer">
        <textarea v-model="inputText"></textarea>
        <button @click="sendMessage">发送</button>
      </div>
    </div>
  </div>
</template>

<script>
//:class="item.origin === user.id ? 'msg_right': 'msg_left'"
import { mapState } from "vuex";
export default {
  name: "Chat",
  data() {
    return {
      inputText: "",
      toUser: {
        id: "",
        userName: "",
      },
      websock: {},
      messages: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
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
      let data = {
        origin: this.user.id,
        target: this.toUser.id,
        sendTime: Date.now().toString(),
        isRead: "0",
        msg: this.inputText,
      };
      this.messages.push(data)
      this.inputText = "";
      this.websock.send(JSON.stringify(data));
    },
    websocketonopen: function () {
      console.log("WebSocket连接成功");
      let data = {
        origin: this.user.id,
        target: this.toUser.id,
        sendTime: Date.now().toString(),
        isRead: "0",
        msg: this.inputText,
      };
      console.log("data:", data);
      this.inputText = "";
      this.websock.send(JSON.stringify(data));
    },
    websocketonerror: function (e) {
      console.log("WebSocket连接发生错误", e);
    },
    websocketonmessage: function (e) {
      let data = JSON.parse(e.data);
      this.messages = data.dataList;
      console.log(data);
    },
    websocketclose: function (e) {
      console.log("connection closed", e);
      console.log(e);
    },
  },
  beforeMount() {
    this.toUser.id = this.$route.params.userId;
    this.$http({
      method: "get",
      url: "/user/" + this.toUser.id,
    }).then(
      (res) => {
        console.log("/user/", res.data)
        this.toUser = res.data.data
      }
    )
    this.initSocket();
  },
};
</script>

<style scoped>
.container {
  /* display: flex; */
  width: 100%;
  height: 100%;
  /* background: url("../assets/chat box.png") no-repeat; */
  background-size: 100% 100%;
  /* border: 1px solid saddlebrown; */
  /* max-height: 3000px; */
  /* overflow-y:scroll; */
  /* background-size: 100%; */
}
.iconWrap {
  height: 100px;
  width: 100px;
  /* border: 1px saddlebrown solid; */
  /* margin-left: 3%; */
  position: absolute;
  top: 0%;
  left: 3%;
  font-size: 50px;
  color: rgb(111, 111, 111);
  text-align: center;
  line-height: 100px;
}
.header {
  /* border: 1px salmon solid; */
  width: 100%;
  height: 10%;
  text-align: center;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  margin-bottom: 30px;
}
.textBox {
  /* border: 1px salmon solid; */
  align-self: center;
  font-size: 30px;
  /* font-weight: 500; */
}
.recordContainer {
  display: flex;
  /* justify-self: center; */
  /* align-self: center; */
  justify-content: center;
  margin-top: 30px;
  height: 500px;
  /* width: 300px; */
  /* background: rgba(255, 255, 255, 0.638); */
}
.records {
  width: 70%;
  /* border: 1px salmon solid; */
  padding: 1%;
  font-size: 30px;
  /* font-weight: medium; */
  color: rgb(87, 87, 87);
  background: rgba(240, 240, 240, 0.789);
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.record {
  display: flex;
  background: rgb(255, 255, 255);
  padding: 10px;
  border-radius: 30px;
  /* display: block; */
}
.msg_left {
  float: left;
}
.msg_right {
  float: right;
}
.record img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}
.record .text {
  margin-left: 30px;
  /* border: 1px saddlebrown solid; */
  margin-top: 5px;
  margin-right: 20px;
}
.msg_right {
  flex-direction: row-reverse;
}

.inputBox {
  display: flex;
  justify-content: center;
}
.inputContainer {
  position: fixed;
  top: calc(100% - 120px);
  margin-top: 30px;
  background: rgba(91, 91, 91, 0.638);
  height: 60px;
  padding: 10px;
  width: calc(70% + 30px);
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.inputContainer textarea {
  width: 70%;
  height: 70%;
  font-size: 30px;
  resize: none;
  border-radius: 15px;
  padding: 5px;
  padding-top: 8px;
}
.inputContainer button {
  background: rgb(8, 230, 156);
  color: rgb(255, 255, 255);
  border: 0px;
  height: 50px;
  width: 80px;
  font: 25px sans-serif;
  margin-bottom: 1px;
  margin-left: 30px;
  border-radius: 15px;
  outline: 0ch;
}
textarea:focus {
  outline: none;
}
.record_wrapper {
  margin-top: 15px;
}
</style>