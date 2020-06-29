<template>
  <div id="app">
 
    <div class="box">
        <router-view/>
    </div>
    <footer v-if="!show">
      <van-tabbar v-model="active">
        <van-tabbar-item route="true" to="/home" icon="wap-home-o">首页</van-tabbar-item>
        <van-tabbar-item route="true"  to="/fenlei" icon="wap-nav">分类</van-tabbar-item>
        <van-tabbar-item route="true"  to="/godo" icon="cart-o">购物车</van-tabbar-item>
        <van-tabbar-item  route="true" to="/my" icon="user-o">个人</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      active:0,
      tabbar:["","fenlei","godo","my"],
      show:false
    }
  },
  methods:{
     tabbarActive(){
      const href = window.location.href.split("#/")[1];
      console.log(href)
      for(let i=0;i<4;i++){
        if(href==this.tabbar[i]){
          this.active=i;
        }
      }
    },
  },
  mounted(){
      this.tabbarActive();
  },
  watch: {
    '$route' (to, from) {// 对路由变化作出响应
      this.tabbarActive();
      // console.log(to.path)
      if(to.path== "/details"){
        this.show=true
      }else{
        this.show=false
      }
      
    }
  },
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  list-style: none;
}
html ,body ,#app{
  font-size: .3rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: white;
}
footer {
    width: 100%;
    height: .88rem;
    position: fixed;
    bottom: 0;
}
.box{
  width: 100%;
  flex: 1;
  overflow: scroll;
  background-color: #f0f0f0;
  margin-bottom: 1.4rem;
}
</style>
