<template>
  <div class="container">
    <div class="loginBox">
      <div class="signupBox" @click="goRegister">Sign up</div>
      <div class="inputContainer">
        <div class="usernameContainer">
          Username:<input type="text" v-model="username" />
        </div>
        <div class="pwdContainer">
          Password:<input type="password" v-model="password" />
        </div>
        <button @click="login">Log in</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      errorFlag: 0,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions([
      "saveUser",
      "saveSse",
      "addUnreadMsgCount",
      "saveSseMessage",
    ]),
    goRegister() {
      this.$router.push("/register");
    },
    login() {
      if (this.username === "" || this.pwd === "") {
        this.errorFlag = 1;
      } else {
        this.$http({
          method: "post",
          url: "/user/login",
          data: {
            username: this.username,
            password: this.password,
          },
        }).then(
          (res) => {
            // console.log(res.data);
            if (res.data.code == 1) {
              // let user = {
              //   name: this.username,
              //   id: res.data.data,
              // }
              this.$store.state.access_token = res.data.data;
              this.$http({
                method: "get",
                url: "/user/info",
              }).then((res) => {
                this.saveUser(res.data.data);
                if ("EventSource" in window) {
                  var sse = new EventSource(
                    "/api/sse/" + this.user.id + "/connect/"
                  );
                  sse.onopen = (e) => {
                    console.log("SSE connected!!!!!");
                    this.saveSse(sse);
                  };
                  sse.onerror = (e) => {
                    console.log("SSE error!!!!!");
                  };
                  sse.onmessage = (e) => {
                    // console.log("message from sse!!!!!2222");
                    console.log("message from sse!!!!!", JSON.parse(e.data));
                    this.saveSseMessage(JSON.parse(e.data).data);
                    //vuex中的未读消息加1
                    this.addUnreadMsgCount();
                  };
                }
              });

              this.$router.push("/home");
            } else {
              this.errorFlag = 3;
              this.errMsg = res.data.msg;
            }
          },
          (err) => {
            console.log(err.message);
          }
        );
      }
    },
  },
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background: url("../assets/login.jpg") no-repeat;
  background-size: 100% 100%;
}
.loginBox {
  position: absolute;
  width: 770px;
  height: 372px;
  /* border: 1px solid saddlebrown; */
  left: 30.1%;
  top: 23%;
  padding-left: 3px;
}
.inputContainer {
  /* border: 1px solid seagreen; */
  position: absolute;
  top: 33%;
  left: 12%;
  width: 600px;
  height: 200px;
  font-size: 25px;
  font-weight: lighter;
}
.usernameContainer {
  /* border: 1px solid rgb(50, 60, 54); */
  width: 90%;
  /* margin-left: 40px; */
  margin-bottom: 30px;
}

input {
  width: 400px;
  position: absolute;
  left: 23%;
  background: rgb(211, 211, 211);
  border: 0px;
  outline: none;
  height: 30px;
  margin-top: 2px;
  font-size: 25px;
  border-radius: 3px;
}
button {
  position: absolute;
  left: calc(53% - 90px);
  top: 80%;
  border: 0px;
  outline: none;
  background: rgb(54, 54, 54);
  color: white;
  width: 160px;
  height: 54px;
  font-size: 25px;
  border-radius: 30px;
  font-weight: lighter;
}
.signupBox {
  position: absolute;
  left: 80%;
  top: 5%;
  font-size: 23px;
  /* border: 1px solid saddlebrown; */
  width: 100px;
  font-weight: 300;
  cursor: pointer;
  font-weight: normal;
  color: rgb(107, 107, 107);
}
.signupBox:hover {
  text-decoration: underline;
}
</style>