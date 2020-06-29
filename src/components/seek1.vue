<template>
  <div class="seek">
    <div class="top">
            <i @click="fh" class="el-icon-arrow-left"></i>
            <div class="count">
                <i class="el-icon-search"></i>
                <input @keyup.down="down()"  @keyup.up="up()" @input="seek"  @keyup.enter="add()" v-model="title" type="text" placeholder="输入商家，商家名称">
            </div>
            <h2>搜索</h2>
        </div>
    <ul>
      <li v-for="(itme,key) in lent" :key="key">{{itme.title}}</li>
    </ul>
    <div class="ls">
      <div class="top">
        <p>历史记录</p>
        <i @click="del" class="el-icon-delete"></i>
      </div>
    </div>
    <ol>
      <li @click="adde(itme.title)" v-for="(itme,key) in arr" :key="key">{{itme.title}}</li>
    </ol>
  </div>
</template>

<script>
export default {
  name: "Seek",
  data() {
    return {
      title: "",
      list: [],
      lent: [],
      now: -1,
      arr: JSON.parse(localStorage.getItem("seek1")) || []
    };
  },
  mounted() {
    this.$axios("/static/fenlei.json").then(res => {
      this.list = res.data.result;
      console.log(res)
    });
  },
  methods: {
    fh() {
      this.$router.go(-1);
    },
    add() {
      var obj = {
        title: this.title
      };
      var arr = JSON.parse(localStorage.getItem("seek1")) || [];
      var index = arr.findIndex(itme => {
        return console.log(itme);
        itme.title == obj.title;
      });
      if (index == -1) {
        arr.push(obj);
      }
      if (arr.length > 5) {
        arr.splice(1,1);
      }
      localStorage.setItem("seek1", JSON.stringify(arr));
      // this.$router.push("/details?title=" + obj.title);
      this.$router.push("/details?title=" + obj.title)
    },
    adde(i) {
      this.$router.push("/details?title=" + i);
    },
    seek() {
      this.lent = [];
      if (this.title == "") {
        return false;
      }
      for (var i in this.list) {
        // console.log(i)
        if (this.list[i].title.indexOf(this.title) >= 0) {
          this.lent.push(this.list[i]);
        }
      }
    },
    up() {
      this.now--;
      if (this.now < 0) {
        this.now = this.lent.length - 1;
      }
      this.title = this.lent[this.now].title;
      console.log(this.now);
      localStorage.setItem("seek1", JSON.stringify(this.arr));
    },
    down() {
      this.now++;
      if (this.now == this.lent.length) {
        this.now = 0;
      }
      this.title = this.lent[this.now].title;
      console.log(this.now);
      localStorage.setItem("seek1", JSON.stringify(this.arr));
    },
    del() {
      this.arr = [];
      localStorage.setItem("seek1", JSON.stringify(this.arr));
    }
  }
};
</script>

<style lang="scss" scoped>
.top {
  width: 100%;
  height: 1rem;
  // background: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  i {
    width: 15%;
    font-size: 0.4rem;
    text-align: center;
    border-bottom: 1
  }
  .count {
    width: 70%;
    height: 0.5rem;
    background: gainsboro;
    display: flex;
    justify-content: space-between;
    align-items: center;
    input {
      width: 90%;
      background: gainsboro;
      border: none;
      outline: none;
    }
    i {
      font-size: 0.3rem;
    }
  }
  h2 {
    width: 15%;
    text-align: center;
    // border: 1px solid blue;
  }
}
.ls {
  width: 100%;
  // height: 20%;
  background-color: #fff;
  .top {
    width: 90%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
  }
}
ol {
  margin-right: -0.4rem;
  margin-bottom: -0.42667rem;
  zoom: 1;
  li {
    float: left;
    padding: 0 0.2rem;
    margin-right: 0.42667rem;
    margin-bottom: 0.42667rem;
    line-height: 0.61333rem;
    border: 1px solid #999;
    border-radius: 4px;
    color: #333;
  }
}
.seek{
    width: 100%;
    height: 100%;
}
</style>