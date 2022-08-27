<template>
  <div class="container">
    <div class="loginBox">
      <div class="signupBox" @click="goLogin">
          Log in
        </div>
      <div class="inputContainer">
        <div class="usernameContainer">
          Username:<input type="text" v-model="username"/>
        </div>
        <div class="pwdContainer">
          Password:<input type="password" v-model="password"/>
        </div>
        <div class="error" v-show="errorFlag === 1">
          注册失败
        </div>
        <button @click="register">Sign up</button>
      </div>
      
    </div>
  </div>
</template>

<script>

export default {
  name: "register",
  data(){
    return {
      username: "",
      password: "",
      errorFlag: 0,
    }
  },
  methods:{
    goLogin(){
      this.$router.push("/login");
    },
    register(){
      if (this.username === "" || this.pwd === "") {
        this.errorFlag = 1;
      }else{
        this.$http({
          method: "post",
          url: "/user/register",
          data: {
            username: this.username,
            password: this.password,
          },
        }).then(
          res => {
            if (res.data.code === 1){
              this.$router.push("/login");
            }else{
              this.errorFlag = 1;
            }
          }
        )
      }
    }
  }
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