<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info" >
                <div class="member-info-item" v-for="(item,index) in users" :key='index'>
                    <el-form-item label="乘机人类型" >
                        <el-input placeholder="姓名" class="input-with-select"  v-model='item.username'>
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    
                    <el-form-item label="证件类型" >
                        <el-input 
                        placeholder="证件号码"  class="input-with-select" v-model='item.id'>
                            <el-select 
                            
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>
                    <!-- 删除按钮 -->
                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div>
                <div class="insurance-item" v-for='(item,index) in data.insurances':key='index'>
                    <el-checkbox 
                     @change="handleChange(item)"
                    :label="`${item.type}：￥${item.price}/份×${users.length}  最高赔付${item.compensation}`" 
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名">
                        <el-input v-model='contactName'></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model='contactPhone'>
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model='captcha'></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
 
  //接收父组件传递过来的机票数据,和保险数据,以data命名
  props: {
    data:{
      type:Object,
      default:{}
    }
  },
  data(){
    return{
      users:[
        {
          username:'',
          id:''
        }
      ] , //用户列表,保存用户对象的username和id
      insurances:[], //保险id
      contactName:'',  //联系人名字
      contactPhone:'', //联系人电话
      invoice:false,   //发票
      captcha: "",
     
     
    }
  },
    methods: {
        // 点击添加乘机人
        handleAddUsers(){
       
            this.users.push({
              username:'',
              id:''
            })
            // console.log(users)
        },
        
        // 点击移除乘机人
        handleDeleteUser(index){
        //splice(index,len,[item])它也可以用来替换/删除/添加数组内某一个或者几个值（该方法会改变原始数组）
        // index:数组开始下标       
        //  len: 替换/删除的长度       
        // item:替换的值，删除操作的话 item为空
        this.users.splice(index,1)
        },
        
        //保险,要拿到保险数据要去父组件的url拿传值过来子组件
        handleChange(item){
          //拿到保险数据和自定义保险数据进行比较没有就添加,有就要删除,才不会重复
          const index=this.insurances.indexOf(item.id)
          
          //判断大于-1就证明有这个数据,我们要移除splice
          if(index>-1){
            this.insurances.splice(index,1)
          }else{
            //不存在我们要添加
            this.insurances.push(item.id)
          }
          console.log(this.insurances)
        },

        // 发送手机验证码
        handleSendCaptcha(){
        
            //1.点击手机验证码的时候手机号不能为空,为空不执行以下代码,并给予提示
            if(!this.contactPhone){
              this.$message.warning('手机号码不能为空')
              return
            }
            //有电话号码,发送axios请求获取二维码数据
            this.$axios({
              url:'/captchas',
              method:'post',
              data:{
                tel:this.contactPhone
              }
            })
            .then(res=>{
              const {code} = res.data;
              this.$alert(`模拟手机验证码为:${code}`,'提示',{type:'warning'})
            })
        },

        // 提交订单
        handleSubmit(){
            //提交接口需要的数据
            const data={
              users:this.users,
              insurances:this.insurances,
              contactName:this.contactName,
              contactPhone:this.contactPhone,
               captcha: this.captcha,
              invoice:this.invoice,
              seat_xid:this.$route.query.seat_xid,
              air:this.$route.query.id
            }
            //把this.users传给父组件
            let users=this.users
            this.$emit('setAllPrice',users)
            console.log(data)
            // 定义一个开关
            let valid=true;

            //判断乘机人的属性是不是空
            //遍历数组
            this.users.forEach(v=>{
              //没有值
              if(!v.username|| !v.id){
                //开关直接false,因为遍历return 他只是不执行这个遍历,还是会执行
                //遍历下面的代码,创建一个开关,开关为false,我们在我们return终止代码
                valid=false;
                this.$alert('乘机人信息不能为空','提示',{type:'warning'})
              }
            })

            //如果满足条件,他的valid值一定为false,return不让他执行一下代码
            if(!valid){
              return 
            }

            //验证联系人
            if(!this.contactName){
              this.$alert('联系人信息不能为空','提示',{type:'warning'})
              return;

            }

            //提交订单
            this.$axios({
              url:'airorders',
              method:'POST',
              data,
              //要传递一个token,403和401都是和状态和登录有关
              headers:{
                  Authorization: `Bearer ${ this.$store.state.user.userlnfo.token }`
              }
            })
            .then(res=>{
              console.log(res)
            })
        }
    },
    
}
</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:10px;
    }

    .member-info-item{
        
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>