<template>
  <div class="container">
    <!-- 轮播图 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item :key="index" v-for="(item,index) in banners">
        <div
          :style="`background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
         background-size:contain contain;`"
          class="banner-image"
        ></div>
      </el-carousel-item>


    </el-carousel>
    <!-- tab栏 -->
    <div class="banner-content">
      <div class="search-bar">
        <el-row class="search-tab" type="flex">
          <span
            :class="{ active: current == index  }"
            :key="index"
            @click="handleClick(index)"
            v-for="(item, index) in options"
          >
            <i>{{ item.title }}</i>
          </span>
        </el-row>
        <!-- 输入框 -->
        <el-row align="middle" class="search-input" type="flex">
          <input :placeholder=" options[current].placeholder " />
          <i class="el-icon-search"></i>
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      banners: [],
      options: [
        { title: '攻略', placeholder: '请输入城市' },
        { title: '酒店', placeholder: '请输入城市搜索酒店' },
        { title: '机票', placeholder: '' }
      ],
      // 记录当前的状态下标
      current: 0
    }
  },
  methods: {
    handleClick(index) {
      if (index === 2) {
        this.$router.push('/air')
      }
      this.current = index
    }
  },
  mounted() {
    //获取轮播图,url
    this.$axios({
      url: '/scenics/banners'
    }).then(res => {
      this.banners = res.data.data
    })
  }
}
</script>
<style lang="less" scoped>
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }

  .banner-content {
    z-index: 9;
    width: 1000px;
    position: absolute;
    left: 50%;
    top: 45%;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }

      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative;
        margin-right: 8px;
        cursor: pointer;

        i {
          position: absolute;
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }

        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: '';
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid;
          border-bottom: none;
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box;
        }
      }
    }

    .search-input {
      width: 550px;
      height: 46px;
      background: #fff;
      border-radius: 0 4px 4px 4px;
      border: 1px rgba(255, 255, 255, 0.2) solid;
      border-top: none;
      box-sizing: unset;

      input {
        flex: 1;
        height: 20px;
        padding: 13px 15px;
        outline: none;
        border: 0;
        font-size: 16px;
      }

      .el-icon-search {
        cursor: pointer;
        font-size: 22px;
        padding: 0 10px;
        font-weight: bold;
      }
    }
  }
}
</style>
