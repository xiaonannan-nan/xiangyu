<template>
  <div class="header">
    <div class="main">
      <el-row justify="space-between" type="flex">
        <div class="logo">
          <img alt src="http://157.122.54.189:9093/images/logo.jpg" />
        </div>
        <!-- 菜单 -->
        <el-row class="navs" type="flex">
          <nuxt-link to="/">首页</nuxt-link>
          <nuxt-link to="/post">旅游攻略</nuxt-link>
          <nuxt-link to="/hotel">酒店</nuxt-link>
          <nuxt-link to="/air">国内机票</nuxt-link>
        </el-row>

        <!-- 登录注册 -->
        <div v-if="!$store.state.user.userlnfo.token">
          <nuxt-link to="/user/logo_index">登录/注册</nuxt-link>
        </div>
        <!-- 登录之后的 -->
        <div v-else>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img alt src="http://157.122.54.189:9095/assets/images/avatar.jpg" />
              {{$store.state.user.userlnfo.user.nickname}}
              <i
                class="el-icon-arrow-down el-icon--right"
              ></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="eliMinate">退出</el-dropdown-item>
            </el-dropdown-menu>
            
            
          </el-dropdown>
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  methods: {
    //点击退出
    eliMinate() {
      this.$store.commit('user/clearUserInfo')
    }
  },
  mounted() {
    console.log(this.$store.state.user)
  }
}
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px #ccc solid;
  box-shadow: 0 3px 3px #eee;
}
.main {
  margin: 0 auto;
  width: 1000px;
}

.logo {
  margin-top: 9px;
  img {
    width: 156px;
    height: 42px;
    display: block;
  }
}
.navs {
  flex: 1;
  margin-left: 20px;
  a {
    display: block;
    padding: 0 20px;
    height: 60px;
    line-height: 60px;
    box-sizing: border-box;

    &:hover {
      color: #409eff;
      border-bottom: 5px solid #409eff;
    }
  }

  //  nuxt会通过url匹配每个nuxt-link标签的链接，如果匹配上默认会加上nuxt-link-exact-active样式
  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}

.el-dropdown-link {
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 5px;
    &:hover {
      border: 3px #409eff solid;
    }
  }
}
</style>

