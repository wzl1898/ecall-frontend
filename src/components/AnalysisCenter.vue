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

      
      <div class="navigation">
        <div style="font-size: 17px">Analysis&nbsp;for&nbsp;me</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Analyze</div> -->
      </div>
      <div class="navigation" @click="$router.push('/chatList/{}/{}')">
        <div style="font-size: 18px">Let's&nbsp;Chat</div>
        <!-- <div style="font-size: 25px; margin-top: -10px">Chat</div> -->
      </div>
    </div>
    <div id="piechart"></div>
    <textarea class="summaryBox" v-model="summary" spellcheck="false" readonly>
        outline: none;
    </textarea>
    <div id="linechart"></div>
    <div class="suggestionBox">
      <div class="suggestionHeader">The Suggestion&nbsp;:</div>
      <textarea class="suggestion" v-model="suggestion" readonly></textarea>
    </div>
  </div>
</template>

<script>
export default {
  name: "AnalysisCenter",
  data() {
    return {
      summary: "12312312jkhdvclkshfnasd",
      suggestion: "This is a suggestion",
      pieChart: {},
      circleChart: {},
    };
  },
  methods: {
    drawChart(p, n) {
      this.pieChart = this.$echarts.init(document.getElementById("piechart"));
      // 指定图表的配置项和数据
      let opt = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "情绪值",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              // label: {
              //   show: true,
              //   fontSize: "20",
              //   fontWeight: "bold",
              // },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: p, name: "positive" },
              { value: n, name: "negative" },
            ],
          },
        ],
      };
      // 使用刚指定的配置项和数据显示图表。
      this.pieChart.setOption(opt);
    },
    drawChart2(data1) {
      let myChart = this.$echarts.init(document.getElementById("linechart"));
      let option = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: data1,
            type: "line",
            smooth: true,
          },
        ],
      };
      myChart.setOption(option);
    },
  },
  mounted() {
    // this.drawChart();
    // this.drawChart2();

    this.$http({
      method: "get",
      url: "/diary/getWekInfo",
    }).then(
      res => {
        if (res.data.code === 1){
          // console.log(res.data);
          let rate = Number(res.data.data[7]) / 70;
          if (rate > 0.66){
            this.summary = "you are in a great mood! Keep your happiness and live a happy life!";
            this.suggestion = "you are in a great mood! Generally speaking, people's body will be in a benign and excited state when they are happy. The heartbeat and breathing rhythm are accelerated, the blood oxygen content is increased, the complexion is ruddy, the eyes are bright, the mood is happy, and the spirit is excited;";
          }else if (rate > 0.33){
            this.summary = "your emotional state is not so bad. You can try to do some outdoor acitivities to cheer yourself up~"
            this.suggestion = "your emotional state is not so bad, Exercise is a good way to improve one's mood. Scientific research shows that after exercise, the pressure value of the human body can be reduced by 15%, and the dopamine can be released more. At the same time, one can exercise his body and relieve stress.";
          }else{
            this.summary = "you are not happy recently. We need to find out the things causing this situation."
            this.suggestion = "you are not happy recently, We need to find out the reasons for our bad mood and not allow it to develop. Do some exercise, go for a walk or do physical exercise, write down ten things you can do, and then follow the list to overcome your body's inertia. Record your thoughts and feelings. In case you realize the cause of depression and annoyance, you can record it and turn it over from time";
          }
          this.drawChart(Number(res.data.data[7]), 70 - Number(res.data.data[7]));
          this.drawChart2(res.data.data.slice(0, 7));
          
        }
      }
    )

  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  background: url("../assets/analysis center.jpg") no-repeat;
  /* background: url("../assets/AnalysisCenter.jpg") no-repeat; */
  background-size: 100% 100%;
}
.navBar {
  /* visibility: hidden  ; */
  position: absolute;
  left: 34%;
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
#piechart {
  width: 350px;
  height: 250px;
  position: absolute;
  left: 3%;
  top: 10%;
}
textarea {
  outline: none;
  /* border: 1px solid saddlebrown; */
  border: 0px;
  resize: none;
  background: rgba(0, 0, 0, 0);
}
.summaryBox {
  height: 100px;
  width: 370px;
  font-size: 15px;
  font-weight: lighter;
  font-family: "Microsoft YaHei";
  position: absolute;
  left: 22%;
  top: 24%;
  text-decoration: none;
}
#linechart{
  height: 300px;
  width: 750px;
  border-radius: 10px;
  border: 1px;
  position: absolute;
  left: 5.1%;
  top: 48%;
  box-shadow: 0px 0px 5px black;
}
.suggestionBox{
  height: 400px;
  width: 510px;
  /* background: rgba(133, 106, 106, 0.481); */
  position:absolute;
  top: 30%;
  left: 57%;
  /* border-radius: 10px; */
  /* border: 1px solid;s */
  /* box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.563); */
}
.suggestionHeader{
  font-size: 27px;
  margin-left: 5px;
  margin-top: 17px;
  font-weight: bold;
  /* border: saddlebrown 1px solid; */
}
.suggestion{
  height: 280px;
  width: 450px;
  /* border: 1px saddlebrown solid; */
  margin-left: 60px;
  font-size: 23px;
  font-family: 'Microsoft YaHei';
  font-weight: normal;
}
</style>