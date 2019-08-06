<template>
  <section class="contianer">
    <el-row justify="space-between" type="flex">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <!-- 传值 -->
        <FlightsFilters :data="cacheFlightsData" @getDataList="getDataList" />

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <div>
          <FlightsItem :data="item" :key="index" v-for="(item,index) in dataList" />

          <!-- 分页 -->
          <el-pagination
            :current-page="pageIndex"
            :page-size="pageSize"
            :page-sizes="[2, 4, 6, 8]"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            layout="total, sizes, prev, pager, next, jumper"
          ></el-pagination>
        </div>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <FlightsAside />
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsListHead from '@/components/air/flightsListHead.vue'
import FlightsItem from '@/components/air/flightsItem.vue'
import FlightsFilters from '@/components/air/flightsFilters.vue'
import FlightsAside from '@/components/air/flightsAside.vue'

export default {
  data() {
    return {
      //总数据
      flightsData: {},

      //获取总数据传值给flightsFilters.vue组件,本来可以传^上的总数据,但是我们筛选的时候会改变里面的数据,当你不要的筛选的时候要全部数据就没有了
      cacheFlightsData: {
        //本来我们不用直接拿里面的数据但是我们在下面保存数据的时候他是异步的我们要先建立一个空的对象,不要让他报错
        options: {},
        info: {}
      },

      //总数据数量
      total: 0,

      // 当前页数
      pageIndex: 1,

      // 显示的条数
      pageSize: 2,

      // 保存当前显示的列表数据
      dataList: []
    }
  },
  //注册
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters,
    FlightsAside
  },
  watch: {
    // 监听路由信息的变化
    $route() {
      // console.log(this.$route)
      // 请求新的数据
      this.pageIndex = 1
      this.getData()
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      this.getDataList()
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pageIndex = val
      this.getDataList()
    },
    // 获取分页的数据
    getDataList(arr) {
      //拿到子组件传递过来的数据arr,判断有没有用户点击的数据arr,如果有我们就可以执行下一步设置给总数据,总数据设置给显示数据dataList
      if (arr) {
        this.flightsData.flights = arr
        this.total = arr.length
      }
      // 修改dataList的数据 //0 | 2 //2 | 4
      this.dataList = this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        (this.pageIndex - 1) * this.pageSize + this.pageSize
      )
    },
    getData() {
      //mounted钩子函数:一打开页面就自动获取,只执行一次,缓存数据

      //发送请求获取数据
      this.$axios({
        url: 'airs',
        method: 'GET',
        params: this.$route.query
      }).then(res => {
        console.log(res)

        //保存总的数据
        this.flightsData = res.data

        //在次保存总数据,给筛选用,注意我们要拷贝,不要我们一改变就改变他们原有的数据
        this.cacheFlightsData = { ...res.data }

        this.total = res.data.total

        // 切割出当前页面要显示的数据
        this.dataList = this.flightsData.flights.slice(0, 3)
      })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>