<template>
  <div class="container">
    <div class="navBar">

      <div class="navigation" @click="$router.push('/editDiary')">
        <div style="font-size: 17px">Anything&nbsp;to&nbsp;talk&nbsp;to&nbsp;us?</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Diary</div> -->
      </div>
      <div class="navigation" @click="$router.push('/myDiary')">
        <div style="font-size: 17px">My&nbsp;daily&nbsp;journeys</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Diary</div> -->
      </div>

      
      <div class="navigation" @click="$router.push('/analysisCenter')">
        <div style="font-size: 17px">Analysis&nabla;for&nbsp;me</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Analyze</div> -->
      </div>
      <div class="navigation" @click="$router.push('/chatList/{}/{}')">
        <div style="font-size: 17px">Let's&nbsp;Chat</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Chat</div> -->
      </div>
    </div>
    <div class="editBox">
        <input id="title" type="text" v-model="title" placeholder="TITLE...">
        <textarea id="text" v-model="text" placeholder="add more..."></textarea>
    </div>
    <button class="back" @click="back">返回</button>
    <button class="submit" @click="submit">submit</button>
    
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: "EditDiary",
    data(){
        return {
            text: "",
            title: "",
        }
    },
    computed:{
        ...mapState(['user']),
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
        submit(){
            this.$http({
                method: "post",
                url: "/diary/add",
                data: {
                    content: this.text,
                    userId: this.user.id,
                    title: this.title,
                },
                
            }).then(
                res => {
                    if (res.data.code === 1){
                        console.log("上传成功", res.data);
                        this.$router.push("/home");
                    }else{
                        alert("上传失败");
                    }
                }
            )
        }
    }
};
</script>

<style scoped>
.container {
  height: 100%;
  width: 100%;
  background: url("../assets/editDiary (2).jpg") no-repeat;
  background-size: 100% 100%;
}
.navBar {
  /* visibility: hidden  ; */
  position: absolute;
  left: 34%;
  top: 4.5%;
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
#title{
    position: absolute;
    top: 19%;
    left:31%;
    height: 40px;
    width: 500px;
    background: rgba(0, 0, 0, 0);
    outline: none;
    border: 0ch;
    /* border: 1px solid rgb(253, 24, 24);s */
    color:rgb(129, 129, 129);
    font-size: 30px;
}
#text{
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    position: absolute;
    top: 29%;
    left: 25%;
    height: 400px;
    width: 770px;
    font-size: 40px;
    background: rgba(0, 0, 0, 0);
    color:rgb(129, 129, 129);
    resize:none;
    outline: none;
    /* border: 1px solid rgb(151, 25, 25); */
    border: 0ch;
}
.submit{
    position: absolute;
    top: 87%;
    left: calc(50% + 10px);
    height: 70px;
    width: 150px;
    font-size: 30px;
    font-weight: lighter;
    background: rgba(127, 234, 145, 0.447);
    outline: none;
    border: 0ch;
    border-radius: 10px;
    color: white;
}
.submit:hover{
  animation: green 0.5s forwards;
}
@keyframes green {
  to {
    background: rgb(127, 234, 145);
  }
}
.back{
    position: absolute;
    top: 87%;
    left: calc(50% - 160px);
    height: 70px;
    width: 150px;
    font-size: 30px;
    font-weight: lighter;
    background: rgba(255, 255, 255, 0.447);
    outline: none;
    border: 0ch;
    border-radius: 10px;
    color: white;
}
</style>