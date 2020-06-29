<template>
  <div>
    <ul class="ul">
      <li v-for="(itme,key) in this.list" :key="key">
        <img :src="itme.pic" alt />
        <p class="p1">{{itme.title}}</p>
        <div class="div1">
          <p class="p2">￥{{itme.old_price}}</p>
          <Zz :list1="itme"></Zz>
        </div>
      </li>
    </ul>
    <el-backtop style="bottom:120px" target=".ul"></el-backtop>
  </div>
</template>

<script>
import Zz from "@/components/zz";
export default {
  name: "Details",
  components: { Zz },
  data() {
    return {
      list: [],
      name: this.$route.query.title
    };
  },
  mounted() {
    this.$axios("/static/list.json").then(res => {
      var arr = res.data.result;
      arr.forEach(itme => {
        if (this.name == itme.name) {
          this.list.push(itme);
        }
      });
    });
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.ul {
    // margin: 0;
    // padding: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    height: 90vh; /*height可以根据你要创建的页面进行修改*/
    overflow-x: hidden;
    overflow-y: scroll;
  li {
    width: 50%;
    box-shadow: 0px 0px 0px 1px gainsboro;
    height: 5rem;
    position: relative;
    img {
      width: 90%;
      height: 2.8rem;
      margin-left: 0.15rem;
      margin-top: 0.3rem;
    }
    .div1 {
      position: absolute;
      bottom: 0;
      left: 0.2rem;
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      .p2 {
        color: red;
      }
    }
    .p1 {
      width: 90%;
      text-align: center;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}
</style>