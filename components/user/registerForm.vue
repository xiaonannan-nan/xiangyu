<template>

  <el-form :model="form" :rules="rules" class="form" ref="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input placeholder="验证码" v-model="form.captcha">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input placeholder="你的名字" v-model="form.nickname"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkPassword">
      <el-input placeholder="确认密码" type="password" v-model="form.checkPassword"></el-input>
    </el-form-item>

    <el-button @click="handleRegSubmit" class="submit" type="primary">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    //验证再次输入确认密码
    //rule :当前的规则
    //value: 输入的值
    //callback:回调函数,必须调用不调用不会验证
    const validatePass = (rule, value, callback) => {
      //判断输入的值是不是空
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        //判断是不是与输入的密码一样
        callback(new Error('再次输入的密码不一致!!!请重新输入'))
      } else {
        callback()
      }
    }
    return {
      // 表单数据
      form: {
        username: '', //手机号码
        captcha: '', //验证码
        nickname: '', //你的名字
        password: '', //密码
        checkPassword: '' //确认密码
      },
      // 表单规则
      rules: {
        username: [
          { required: true, message: '用户名不能为空', tigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码不能为空', tigger: 'blur' }
        ],
        nickname: [{ required: true, message: '昵称不能为空', tigger: 'blur' }],
        password: [{ required: true, message: '密码不能为空', tigger: 'blur' }],
        checkPassword: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 发送验证码
    handleSendCaptcha() {
      //判断用户有没有输入手机号
      if (!this.form.username) {
        this.$message.warning('请输入手机号码')
        return
      }
      this.$axios({
        url: '/captchas',
        method: 'post',
        data: {
          tel: this.form.username
        }
      }).then(res => {
        console.log(res)
        const { code } = res.data
        this.$alert(`模拟手机验证码为:${code}`, '提示', { type: 'warning' })
      })
    },

    // 注册
    handleRegSubmit() {
      // console.log(this.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          //判断没有数据,有会返回一个true,
          //展开运算符,把确认密码的数据不要,然后存在props里面
          // ES6的标准语法，解构出特定的属性后，剩余的属性可以用... +变量名访问
          const { checkPassword, ...props } = this.form
          this.$axios({
            url: '/accounts/register',
            method: 'post',
            data: props
          }).then(res => {
            console.log(res)
            //成功保存数据到store,使用mutations的方法
            //必须是呀commit来调用,第一个参数为方法名.第二个参数是数据
            this.$store.commit('user/setUserInfo', res.data)
            //跳转
            this.$router.push('/')
          })
        } else {
          this.$message({
            message: '输入的数据格式不合法',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>