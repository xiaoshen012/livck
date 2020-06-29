<template>
  <div class="seek">
    <!-- 头部区域 -->
    <header>
      <router-link to="/home" ><van-icon name="arrow-left" size="20" /></router-link>
      <div class="left">
        <!-- <input @keyup.down="down()"  @keyup.up="up()" type="text" class="inp" v-model="keytitle" @keyup.enter="addhistory()" placeholder="输入搜索内容" /> -->
         <van-search @keyup.down="down()"  @keyup.up="up()"   v-model="keytitle" @search="addhistory()"  background="#fff" shape="round" placeholder="输入搜索内容" />
      </div>
      <div class="rigth">搜索</div>
    </header>
    <ul v-show="show">
      <li v-for="(itme,key) in search" :key="key">{{itme.title}}</li>
    </ul>
    <!-- 历史记录 -->
    <div id="history">
      <div class="history-head">
        <span>历史记录</span>
        <van-icon @click="removehistory" name="delete" size="18" />
      </div>
      <div class="history-list">
        <div v-for="(itme,key) in historyList" class="itme">{{itme.title}}</div>
      </div>
    </div>
    <!-- <div id="box" v-box>

    </div>-->
  </div>
</template>

<script>
export default {
  name: "Seek",
  data() {
    return {
      keytitle: "",
      historyList: JSON.parse(localStorage.getItem("seek1")) || [],
      godoList: [],
      show: false,
      now: -1
    };
  },
  // directives: {
  //     box:{
  //       inserted(el,binding){
  //         function todo(n){
  //           if(n<10){
  //             return '0'+n
  //           }else{
  //             return n
  //           }
  //         }
  //         var P = document.querySelector("#box")
  //          var timer=null
  //           clearInterval(timer);
  //           function itme(){
  //               var a=new Date()
  //               // var nian =a.getFullYear() //年
  //               // var yue = a.getMonth()+1;  //月
  //               // var ri = a.getDate()        //日
  //               // var xq = a.getDay()           //星期
  //               var xj = a.getHours()           //小时
  //               var fz = a.getMinutes()         //分钟
  //               var m = a.getSeconds()      //秒
  //               // document.write()
  //               P.innerHTML=todo(xj)+':'+todo(fz)+':'+todo(m)
  //           }
  //           itme();
  //           timer=setInterval(itme,1000)
  //       }
  //     }
  // },
  mounted() {
    this.getlist();
  },
  computed: {
    search() {
      if (this.keytitle == "") {
        return [];
      }
      this.show = true;
      return this.godoList.filter(itme => {
        return itme.title.indexOf(this.keytitle) > -1;
      });
    }
  },
  methods: {
    up() {
      this.now--;
      if (this.now < 0) {
        this.now = this.search.length - 1;
      }
      this.keytitle = this.search[this.now].title;
      console.log(this.now);
      localStorage.setItem("seek1", JSON.stringify(this.historyList));
    },
    down() {
      this.now++;
      if (this.now == this.search.length) {
        this.now = 0;
      }
      this.keytitle = this.search[this.now].title;
      console.log(this.now);
      localStorage.setItem("seek1", JSON.stringify(this.historyList));
    },
    getlist() {
      this.$axios("/static/fenlei.json").then(res => {
        console.log(res.data.result);
        this.godoList = res.data.result;
      });
    },
    //获取历史记录列表
    gethistory() {},
    //添加历史记录
    addhistory() {
      
      var obj = {
        title: this.keytitle
      };
      this.historyList.push(obj);
      localStorage.setItem("seek1", JSON.stringify(this.historyList));
      this.$router.push("/details?title=" + obj.title);
    },
    //删除历史记录
    removehistory() {
      this.historyList = [];
      localStorage.setItem("seek1", JSON.stringify(this.historyList));
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  width: 100%;
  height: 0.88rem;
  // background-color: #fafafa;
  // border-bottom: #dddddd 1px solid;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    flex: 1;
    .inp {
      width: 90%;
      background-color: #f0f0f0;
      text-indent: 0.2rem;
      height: 0.7rem;
      margin-left: 2%;
      border-radius: 0.15rem;
      border: none;
    }
  }
  .rigth {
    width: 1rem;
    text-align: center;
  }
}
#history {
  width: 100%;
  .history-head {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5% 5%;
    box-sizing: border-box;
    span {
      font-size: 0.25rem;
      font-weight: bold;
    }
  }
  .history-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    .itme {
      width: 23%;
      margin: 1%;
      background-color: #f0f0f0;
      border-radius: 0.1rem;
      padding: 2% 1%;
      box-sizing: border-box;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
ul {
  width: 100%;
  position: absolute;
  top: 0.88rem;
  background-color: white;
  z-index: 1;
  li {
    width: 100%;
    text-indent: 0.2rem;
    line-height: 0.88rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: #dddddd 1px solid;
  }
}
.seek{
  width: 100%;
  height: 100%;
  background-color: white
}
</style>