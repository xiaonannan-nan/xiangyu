<template>
  <el-form :model="form" :rules="rules" class="form" ref="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="form.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button @click="handleLoginSubmit" class="submit" type="primary">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: '',
        password: ''
      },
      // 表单规则
      rules: {
        // username: [
        //   { required: true, message: '用户名不能为空', trigger: 'blur' }
        // ],
        // password: [{ required: true, message: '密码不能为空', trigger: 'blur' }]
        username: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        password: [{ required: true, message: '密码不能为空', tigger: 'blur' }]
      }
    }
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      //   console.log(this.form)
      this.$refs.form.validate(valid => {
        // console.log(valid) 有数据为true
        //判断有没有数据
        if (valid) {
          // 提交登录接口
          this.$axios({
            url: '/accounts/login',
            method: 'post',
            data: this.form
          }).then(res => {
            // console.log(res)
            // 请求成功要把数据保存到store,要使用mutations的方法
            // mutations下面的方法必须使用commit来调用
            // 第一个参数的方法名,第二个是参数的数据
            this.$store.commit('user/setUserInfo', res.data)
            //跳转到首页
            this.$router.push('/')
          })
        } else {
          this.$message({
            message: '输入的数据有误,请重新输入',
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
