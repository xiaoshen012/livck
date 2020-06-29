<template>
  <div class="home">
    <header>
      <!-- 头部img -->
      <div class="top-img">
        <img src="../../static/1.gif" alt />
      </div>
      <!-- 头部搜索框 -->
      <van-search @click="scarch" background="#fff" shape="round" placeholder="搜索商品" />
      <!-- 头部tab -->
      <van-tabs @click="changetab" v-model="id" color="#808080" line-height="1px">
        <van-tab :name="itme._id" v-for="(itme,key) in fenlist" :key="key" :title="itme.title" />
      </van-tabs>
      <ul>
        <li>综合</li>
        <li>销量</li>
        <li>新品</li>
        <li class="li" @click="changesort">
          价格
          <van-icon name="arrow-up" v-show="sort==1" />
          <van-icon name="arrow-down" v-show="sort==2" />
        </li>
      </ul>
    </header>
    <!-- 商品列表 -->
    <div class="container">
      <div v-for="(itme,key) in getgodo" class="itme">
        <p class="img">
          <img :src="itme.pic" alt />
        </p>
        <h6>{{itme.title}}</h6>
        <div class="div1">
          <p>￥{{itme.old_price}}</p>
          <Zz :list1="itme"></Zz>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -->
    <el-backtop style="bottom:120px" target=".container"></el-backtop>
  </div>
</template>

<script>
import Zz from "@/components/zz";
export default {
  components: { Zz },
  name: "Home",
  data() {
    return {
      id: 0,
      num: 1,
      fenlist: [], //tab列表
      list: [], //数据列表,
      sort: 0,
      sukshow: false,
    };
  },
  mounted() {
    this.getfenlist();
    this.getgodolist();
  },
  computed: {
    getgodo() {
      let godos = [];
      godos = this.list.filter((itme, key) => {
        return itme.cid == this.id;
      });
      if (this.sort > 0) {
        godos.sort((a, b) => {
          return this.sort == 1
            ? a.old_price - b.old_price
            : b.old_price - a.old_price;
        });
      }
      return godos;
    }
  },
  methods: {
    scarch() {
      this.$router.push("/seek");
    },
    add(itme) {
      console.log(itme);
      var arr = JSON.parse(localStorage.getItem("seek")) || [];
      var index = arr.findIndex(v => {
        return v.id == itme.id;
      });
      var obj = {
        id: itme.id,
        img: itme.img,
        title: itme.title,
        number: itme.price,
        num: this.num
      };
      if (index == -1) {
        arr.push(obj);
      } else {
        arr[index].num = arr[index].num + 1;
      }
      localStorage.setItem("seek", JSON.stringify(arr));
      this.$router.push("/godo");
      // console.log("商品名称"+itme.title+",价格"+itme.old_price+",数量"+itme.num)
      this.$toast.success("加入购物车成功");
    },
    //排序
    changesort() {
      if (this.sort == 0 || this.sort == 2) {
        this.sort = 1;
      } else {
        this.sort = 2;
      }
    },
    //切换头部tab事件
    changetab(name, title) {
      console.log(name, title);
      this.id = name;
    },
    //获取分类列表
    getfenlist() {
      this.$axios("/static/fenlei.json").then(res => {
        //   console.log(res.data.result)
        this.fenlist = res.data.result;
      });
    },
    //获取商品列表
    getgodolist() {
      this.$axios({
        url: "/static/list.json"
      }).then(res => {
        //   console.log(res.data.result)
        this.list = res.data.result;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  margin-bottom: 2.4rem;
  header {
    width: 100%;
    .top-img {
      width: 100%;
      height: 1.4rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .van-icon van-icon-search {
      text-indent: 0.3rem;
      font-size: 20px;
    }
    ul {
      width: 100%;
      display: flex;
      align-items: center;
      height: 0.8rem;
      background-color: white;
      li {
        padding: 0 0.2rem;
      }
      .li {
        color: red;
      }
    }
  }
  .container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    height: 80vh;
    overflow-x: hidden;
    .itme {
      width: 48%;
      margin: 1%;
      background-color: #fff;
      height: 5rem;
      font-size: 0.3rem;
      box-sizing: border-box;
      .img {
        width: 100%;
        height: 3rem;
        img {
          width: 90%;
          height: 100%;
          margin: 0.3rem auto;
          display: block;
        }
      }
      h6 {
        padding: 0.2rem 0.4rem;
        text-indent: 0.3rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .div1 {
        // padding: .2rem .2rem;
        text-indent: 0.3rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.2rem;
        box-sizing: border-box;
        p {
          color: red;
        }
      }
    }
  }
  footer {
    width: 100%;
  }
  #to-top {
    width: 1rem;
    height: 1rem;
    background-color: #fff;
    position: fixed;
    right: 0.2rem;
    bottom: 1.3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    box-shadow: 0px 5px 7px rgba($color: #000000, $alpha: 0.4);
  }
}
</style>