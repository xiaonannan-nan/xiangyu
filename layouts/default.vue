<template>
  <div>
    <Header />
<<<<<<< HEAD
    <!-- 组件占位符，相当于router-view -->
    <nuxt />
    <Footer />
  </div>
</template>
<script>
// 导入公共组件，.vue文件拓展名可以忽略
import Header from '@/components/header'
import Footer from '@/components/footer'
export default {
  // 注册组件
=======

    <nuxt />
    <Footer />>
  </div>
</template>
<script>
import Header from '@/components/header'
import Footer from '@/components/footer'

export default {
  //注册组件
>>>>>>> 57f94a562f4db958f3f4cc411e2516e4e461832d
  components: {
    Header,
    Footer
  }
}
</script>
<<<<<<< HEAD

<style>
/* 公共样式，不要加scoped */
/*项目css初始化文件*/
/*清除内外边距  */
=======
<style>
>>>>>>> 57f94a562f4db958f3f4cc411e2516e4e461832d
* {
  margin: 0;
  padding: 0;
}
<<<<<<< HEAD
/*让所有斜体 不倾斜*/
em,
i {
  font-style: normal;
}
/*去掉列表前面的小点*/
li {
  list-style: none;
}
/*图片没有边框   去掉图片底侧的空白缝隙*/
img {
  border: 0; /*ie6*/
  vertical-align: middle;
}
/*让button 按钮 变成小手*/
button {
  cursor: pointer;
  border: none;
  outline: none;
}
/*取消链接的下划线*/
a {
  color: #666;
  text-decoration: none;
}
a:hover {
  color: #e33333;
}
input,
img,
textarea {
  border: none;
  outline: none;
}
button,
input {
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    \\5b8b\4f53, sans-serif;
  vertical-align: top;
}
body {
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  font: 12px Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB,
    \\5b8b\4f53, sans-serif;
  color: #666;
}
.hide,
.none {
  display: none;
}
/*清除浮动*/
.clearfix::after {
  visibility: hidden;
  clear: both;
  display: block;
  content: '.';
  height: 0;
}
.clearfix {
  *zoom: 1;
}
/* 设置左浮 */
.fl {
  float: left;
}
/* 设置右浮 */
.fr {
  float: right;
}
/* 设置相对定位 */
.pr {
  position: relative;
=======
ul,
li,
ol {
  list-style: none;
}
a {
  color: inherit;
  text-decoration: none;
}
em,
i {
  font-stretch: normal;
>>>>>>> 57f94a562f4db958f3f4cc411e2516e4e461832d
}
</style>
