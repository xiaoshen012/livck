<template>
  <div>
    <ul class="ul">
      <li v-for="(itme,key) in this.list" :key="key">
        <img :src="itme.img" alt />
        <p class="p1">{{itme.title}}</p>
        <p class="p1">{{itme.num}}</p>
        <div>
          <p class="p2">￥{{itme.number}}</p>
          <van-icon @click="del(key)" name="delete" />
        </div>
        
      </li>
    </ul>
  </div>
</template>

<script>
// import { Dialog } from "vant";
export default {
  name: "Godo",
  data() {
    return {
      list: JSON.parse(localStorage.getItem("seek")) || []
    };
  },
  methods: {
    del(k) {
      this.$dialog.confirm({
        message: "确认要删除该商品吗"
      })
        .then(() => {
            this.list.splice(k, 1);
            localStorage.setItem("seek", JSON.stringify(this.list));
        })
        .catch(() => {
          return false
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.ul {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  li {
    width: 50%;
    box-shadow: 0px 0px 0px 1px gainsboro;
    height: 5rem;
    position: relative;
    box-sizing: border-box;
    padding: 1px 1px 1px 1px ;
    img {
      width: 90%;
      height: 2.8rem;
      margin-left: 0.15rem;
      margin-top: 0.3rem;
    }
    div {
      position: absolute;
      bottom: 0;
      left: 0.2rem;
      width: 90%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .van-icon {
        font-size: 0.4rem;
      }
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