<template>
  <div class="header">
    <div class="main">
      <el-row justify="space-between" type="flex">
        <!-- logo -->
        <div class="logo">
          <img alt src="http://157.122.54.189:9093/images/logo.jpg" />
        </div>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
.header {
  height: 60px;
  line-height: 60px;
  border-bottom: 1px solid #ccc;
  box-shadow: 0 3px 3px #eee;
}
.main {
  width: 1000px;
  margin: 0 auto;
}
.logo {
  margin-top: 9px;
  img {
    width: 156px;
    height: 42px;
    display: block;
  }
}
</style>
