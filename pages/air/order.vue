<template>
    <div class="container">
        <el-row type="flex" justify="space-between">
            <!-- 订单表单 -->

            <div class="main" >
                <OrderForm :data='infoData' @setAllPrice='setAllPrice'/>
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
              <OrderAside :data='infoData' :price='price'/> 
              <!-- 调用allPrice,让他执行,但是是隐藏的input -->
               <input type="hidden" :value="allPrice">         
            </div>
        </el-row>
    </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm';
import OrderAside from '@/components/air/orderAside';
export default {
  data(){
    return{
      infoData:{
        seat_infos: {}
      },
      users:'',
      price:0
    }
  },
    components:{
      OrderForm,
      OrderAside
    },
    mounted () {
          // 获取机票信息,包括保险数据
        
        // 1拿到参数
        const {id,seat_xid} =this.$route.query

        //拿到参数,发送axios请求
        this.$axios({
          url:`airs/`+id,
          params:{
            seat_xid
          }
        })
        .then(res=>{
          console.log(res)
          this.infoData=res.data
        })
       
       
    },
    //计算属性
    computed: {
     allPrice(){
        //总数
        let price=0;
        
        //成人机票
         price+=this.infoData.seat_infos.org_settle_price

        //燃油
         price+=this.infoData.airport_tax_audlet
        //保险
         price+=this.users.length * 30
        //人数
         price*=this.users.length
        //赋值 
         this.price=price
       
      },
    },
    methods: {
       
      //接收子组件的数据users计算多少个人
      setAllPrice(data){
        console.log(33333333)
         console.log(data)
        this.users=data
       
      }
    }
}
</script>

<style lang="less" scoped>
    .container{
        width:1000px;
        margin:20px auto;
    }
    
    /*aside*/
    .aside{
        width: 350px;
        height: fit-content;
        border:1px #ddd solid;
    }
</style>