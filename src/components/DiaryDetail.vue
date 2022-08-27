<template>
  <div class="container">
    <svg width="100%" height="100%">
      <defs>
        <linearGradient id="write" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style="stop-color: #74fefb"
            stop-opacity="0.8"
          ></stop>
          <stop
            offset="100%"
            style="stop-color: #a6bbf4"
            stop-opacity="1"
          ></stop>
        </linearGradient>
      </defs>
    </svg>
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
        <div style="font-size: 18px">Analysis&nabla;for&nbsp;me</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Analyze</div> -->
      </div>
      <div class="navigation" @click="$router.push('/chatList/{}/{}')">
        <div style="font-size: 18px">Let's&nbsp;Chat</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Chat</div> -->
      </div>
    </div>
    <div
      class="textBox"
      :class="{ textBox: !analysisOpen, textBox2: analysisOpen }"
    >
      <div class="headerBox">
        <div class="date">
          {{ diary.createTime }}
        </div>
        <div class="splitBox"></div>
        <div class="title">
          <div class="titleBox">
            <!-- {{ diary.title }} -->
            1111111111111111111111
          </div>
        </div>
      </div>
      <div class="lineBox"></div>
      <textarea class="content" readonly v-model="diary.content"> </textarea>
      <!-- <div class="content">
        {{ diary.positive }}
      </div>
      <div class="content">
        {{ diary.negative }}
      </div> -->
    </div>
    <div
      class="analysisOpen"
      :class="{ analysisOpen2: analysisOpen }"
      @click="analysisOpen = true"
    >
      <div class="text">view</div>
      <div class="text">analysis</div>
      
    </div>
    <div
      class="goChat"
      :class="{ analysisOpen2: analysisOpen }"
      @click="goChat"
    >
      <div class="text">GO</div>
      <div class="text">Chat</div>
    </div>
    <div
      class="block"
      :class="{ block2: isActive }"
      @click="isActive = true"
    ></div>
    <div class="analysisBox" :class="{ analysisBox2: analysisOpen }">
      <div class="barBox">
        <div class="bar" :style="{ height: (diary.mood / 10) * 300 + 'px' }">
          <div class="num">{{ diary.mood * 10 }}%</div>
        </div>
        <div class="bar" :style="{ height: ((10 - diary.mood) / 10) * 300 + 'px' }">
          <div class="num">{{ (10 - diary.mood) * 10 }}%</div>
        </div>
      </div>
      <div class="tagBox">
        <div class="tag">positive</div>
        <div class="tag">negative</div>
      </div>
      <div class="percentNum">{{ percentNum }}%</div>
      <el-progress
        id="progress"
        type="circle"
        :percentage="diary.mood * 10"
        stroke-width="20"
        text-inside="false"
        show-text="false"
        width="150"
      ></el-progress>
      <textarea class="adviceBox" readonly v-model="advice">
        asdasdawdawdsadawdsadawdsadaswda
      </textarea>
    </div>
    <div class="addDiary">
      <div class="addText">+add&nbsp;new</div>
    </div>
  </div>
</template>

<script>
// import axios from "axios";
export default {
  name: "DiaryDetail",
  data() {
    return {
      diary: {},
      analysisOpen: false,
      show2: true,
      isActive: false,
      positiveVal: 75,
      negativeVal: 25,
      // advice:
        // "",
    };
  },
  methods:{
    goChat(){
      //get the other diary and userid, send a empty message and jump to the chatList
      this.$http({
        method: "get",
        url: "/diary/similar/" + this.diary.id,
      }).then(
        res => {
          if (res.data.code === 1){
            this.$router.push(`/chatList/${JSON.stringify(res.data.data)}/${JSON.stringify(this.diary)}`);
          }
        }
      )
    },
  },
  computed: {
    percentNum() {
      return Math.floor(
        (this.diary.mood * 100) / (10)
      );
    },
    advice(){
      if (this.diary.mood / 10 > 0.66){
        return "you are in a great mood! Generally speaking, people's body will be in a benign and excited state when they are happy. The heartbeat and breathing rhythm are accelerated, the blood oxygen content is increased, the complexion is ruddy, the eyes are bright, the mood is happy, and the spirit is excited;";
      }else if (this.diary.mood / 10 > 0.33){
        return "your emotional state is not so bad, Exercise is a good way to improve one's mood. Scientific research shows that after exercise, the pressure value of the human body can be reduced by 15%, and the dopamine can be released more. At the same time, one can exercise his body and relieve stress.";
      }else{
        return "you are not happy recently, We need to find out the reasons for our bad mood and not allow it to develop. Do some exercise, go for a walk or do physical exercise, write down ten things you can do, and then follow the list to overcome your body's inertia. Record your thoughts and feelings. In case you realize the cause of depression and annoyance, you can record it and turn it over from time.";
      }
    }
  },
  created() {
    this.diary = JSON.parse(this.$route.params.diaryStr);
  },
  // beforeMount() {
  //   if (!("positive" in this.diary)) {
  //     let content = this.diary.content;
  //     let contentArr = content.split("。");
  //     console.log("contentArr:", contentArr);
  //     console.log("fetch emotion rate...");
  //     //   this.diary.positive = 0;
  //     //   this.diary.negative = 0;
  //     this.$set(this.diary, "positive", 0);
  //     this.$set(this.diary, "negative", 0);
  //     let that = this;
  //     let string;
  //     for (string in contentArr) {
  //       axios({
  //         method: "post",
  //         url: "http://localhost:8888/ai/tasks",
  //         data: {
  //           text: contentArr[string],
  //         },
  //       }).then((res) => {
  //         console.log(res.data.data);
  //         if (res.data.message === "OK") {
  //           if (res.data.data.return === 1) {
  //             console.log("111111", this.diary.positive);
  //             that.diary.positive += 1;
  //           } else {
  //             that.diary.negative++;
  //           }
  //         }
  //       });
  //     }
  //   }
  // },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  /* background: url("../assets/diaryDetail.png") no-repeat; */
  background: url("../assets/diaryDetail.jpg") no-repeat;
  background-size: 100% 100%;
}
textarea {
  outline: none;
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
.textBox {
  width: 740px;
  height: 400px;
  border-radius: 10px;
  position: absolute;
  top: 21%;
  left: 13%;
  background: rgb(255, 255, 255);
  border: rgba(136, 136, 136, 0.31) 1.1px solid;
}
.textBox2 {
  animation: small 0.5s forwards;
}
@keyframes small {
  100% {
    top: 28%;
    width: 380px;
    height: 300px;
  }
}

.headerBox {
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* border: 1px saddlebrown solid; */
  height: 100px;
  overflow: hidden;
}
.textBox2 .headerBox {
  animation: ysmall 0.5s forwards;
}
@keyframes ysmall {
  to {
    height: 60px;
  }
}
.title {
  width: 620px;
  /* text-align: center; */
  /* border: 1px saddlebrown solid; */
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.titleBox {
  /* border: 1px saddlebrown solid; */
  margin-left: 20px;
  font-size: 30px;
  /* padding-top: 5px; */
  /* width: 300px; */
}
.textBox2 .titleBox {
  /* font-size: 20px; */
  animation: font-small 0.5s forwards;
}
@keyframes font-small {
  100% {
    font-size: 20px;
  }
}
.date {
  width: 120px;
  color: rgb(155, 155, 155);
  padding: 10px;
  /* border-right: 1px saddlebrown solid; */
}
.textBox2 .date {
  font-size: 15px;
}
.splitBox {
  width: 1.2px;
  /* width: 30px !important; */
  height: 70px;
  background: rgb(194, 194, 194);
}
.lineBox {
  height: 1.1px;
  background: rgba(194, 194, 194, 0.562);
  margin: 0px;
}

.content {
  resize: none;
  font-size: 17px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  padding: 10px;
  color: rgb(142, 142, 142);
  outline: none;
  border: 0ch;
  height: 260px;
  width: 720px;
  /* overflow: scroll; */
}
.textBox2 .content {
  font-size: 15px;
  font-weight: bolder;
  overflow: hidden;
  height: 200px;
  width: 350px;
  /* border: 1px saddlebrown solid; */
}
.analysisOpen {
  height: 190px;
  width: 200px;
  /* border: 1px saddlebrown solid;  */
  position: absolute;
  left: 65%;
  top: 21%;
  border-radius: 10px;
  background: rgb(126, 149, 224);
  /* opacity: 0.9; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: width 0.5s, opacity 0.5s;
  box-shadow: rgb(143, 143, 143) 7px 7px 6px;
  box-sizing: border-box;
}

.analysisOpen2 {
  animation: fadeout 1s;
  animation-fill-mode: forwards;
}

@keyframes fadeout {
  0% {
    /* background: red; */
  }
  100% {
    opacity: 0;
  }
}

.analysisOpen:hover {
  width: 300px;
}

.text {
  font-size: 30px;
  color: white;
  /* border: 1px saddlebrown solid; */
  text-align: center;
}

.analysisBox {
  opacity: 0;
  visibility: hidden;
  width: 740px;
  height: 380px;
  background: rgb(211, 246, 250);
  position: absolute;
  left: 41%;
  top: 27%;
  /* top: 50%; */
  border-radius: 15px;
  box-shadow: 5px 5px 20px rgb(157, 157, 157);
}
.analysisBox2 {
  animation: fadein 0.5s forwards;
}
@keyframes fadein {
  to {
    opacity: 1;
    visibility: visible;
  }
}
.barBox {
  height: 300px;
  width: 140px;
  /* background: rgba(169, 70, 70, 0.551); */
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  position: relative;
  top: 30px;
  left: 60px;
}
.bar {
  width: 30px;
  background: linear-gradient(
    rgb(74, 209, 182),
    rgb(82, 152, 233),
    rgba(149, 173, 245, 0)
  );
  border-radius: 20px 20px 0px 0px;
  /* margin-right: 40px; */
}
.tagBox {
  height: 50px;
  width: 140px;
  /* background: rgba(53, 154, 110, 0.566); */
  position: relative;
  top: 35px;
  left: 60px;
  display: flex;
  font-size: 13px;
  justify-content: space-evenly;
}
.num {
  margin-top: -25px;
  margin-left: 5px;
  font-size: 12px;
  font-weight: 900;
}
#progress {
  /* border: 1ch saddlebrown solid;  */
  position: absolute;
  top: 24%;
  left: 30%;
  font-size: large;
  /* color: #000; */
}
.el-progress /deep/ svg > path:nth-child(2) {
  stroke: url(#write);
  font-size: 30px;
}
.percentNum {
  position: absolute;
  left: 36%;
  top: 38%;
  font-size: 30px;
}
.adviceBox {
  height: 300px;
  width: 300px;
  position: absolute;
  top: 80px;
  left: 390px;
  background: rgba(0, 0, 0, 0);
  border: 0ch;
  resize: none;
  font-size: 18px;
  font-family: "Microsoft YaHei";
  font-weight: lighter;
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
}
.addDiary:hover {
  animation: pullup 0.5s forwards;
}
@keyframes pullup {
  to {
    transform: translateY(-30px);
  }
}
.addText {
  margin-top: 0px;
}
.goChat{
  height: 190px;
  width: 200px;
  background: #000;
  position: absolute;
  top: calc(21% + 20px + 190px);
  left: 65%;
  border-radius: 10px;
  background: rgb(146, 114, 197);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: width 0.5s, opacity 0.5s;
}
.goChat:hover {
  width: 300px;
}
</style>