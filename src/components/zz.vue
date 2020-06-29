<template>
  <div class="mt">
    <!-- 添加购物车的组件 -->
    <van-icon @click="add(list1)" name="shopping-cart-o" />
    
    <van-sku @add-cart="nadd(sku.list)" v-model="sukshow" :sku="sku" :goods="goods" />
  </div>
</template>

<script>
export default {
  name: "Zz",
  props: ["list1"],
  data() {
    return {
      sukshow: false,
      num: 1,
      sku: {
        tree: [],
        // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
        list: [
          {
            id: 2259, // skuId，下单时后端需要
            price: 100, // 价格（单位分）
            title: "",
            img: "",
            num: ""
          }
        ],
        price: "100.00", // 默认价格（单位元）
        stock_num: 100, // 商品总库存
        none_sku: true, // 是否无规格商品
        hide_stock: true // 是否隐藏剩余库存
      },
      goods: {
        // 默认商品 sku 缩略图
        picture: "https://img.yzcdn.cn/1.jpg"
      }
    };
  },
  methods: {
    //添加购物车的方法
    add(itme) {
      console.log(itme);
      this.sukshow = true;
      this.goods.picture = itme.pic;
      this.sku.price = itme.old_price;
      this.sku.list.id = itme._id;
      this.sku.list.price = itme.old_price;
      this.sku.list.title = itme.title;
      this.sku.list.img = itme.pic;
    },
    nadd(itme) {
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
    //关闭模态框
    onClickQX() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.mt {
  .pimg {
    width: 2rem;
    height: 2rem;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .top {
    position: relative;
    display: flex;
    margin: 10px auto;
    .rigth {
      margin-top: 0.4rem;
      width: 3rem;
      margin-left: 10%;
    }
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
.botton {
  position: fixed;
  bottom: 2rem;
  right: 0;
}
.van-icon {
  font-size: 0.4rem;
}
</style>