<template>
  <div class="filters">
    <el-row align="middle" class="filters-top" justify="space-between" type="flex">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select @change="handleAirport" placeholder="起飞机场" size="mini" v-model="airport">
          <el-option
            :key="index"
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select @change="handleFlightTimes" placeholder="起飞时间" size="mini" v-model="flightTimes">
          <el-option
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
            v-for="(item,index) in data.options.flightTimes"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select @change="handleCompany" placeholder="航空公司" size="mini" v-model="company">
          <el-option
            :key="index"
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select @change="handleAirSize" placeholder="机型" size="mini" v-model="airSize">
          <el-option
            :key="index"
            :label="item.label"
            :value="item.value"
            v-for="(item,index) in airSizeList"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button @click="handleFiltersCancel" plain round size="mini" type="primary">撤销</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小
      //机型
      airSizeList: [
        { label: '大', value: 'L' },
        { label: '中', value: 'M' },
        { label: '小', value: 'S' }
      ]
    }
  },
  //接收传值的组件可以接收那些类型
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  methods: {
    // 选择机场时候触发
    handleAirport(value) {
      console.log(value)
      //1.绑定页面后台数据完成,2.点击的时候,保存用户的数据做修改和筛选
      //拿到用户点击的数据和原来的总数据里面的出发机场数据对比相等就留下筛选不相等就不要,进行传值给父组件显示
      //filter:过滤器
      const arr = this.data.flights.filter(valid => {
        //和总数据里面的相等我们就返回给总数据
        return valid.org_airport_name === value
      })

      //拿到和用户点击的数据相等的数据传值给父组件,我们要让父组件传一个方法过来
      /**
       * 1、父组件可以使用 props 把数据传给子组件。
         2、子组件可以使用 $emit 触发父组件的自定义事件。
       */
      this.$emit('getDataList', arr)
      //把数据传递给父组件,我们可以去设置父组件
    },

    // 选择出发时间时候触发
    handleFlightTimes(value) {
      //绑定页面后台数据,点击的时候,保存用户的数据做修改
      // console.log(value)
      // console.log(this.data.flights.dep_time)
      const [from, to] = value.split(',')
      // console.log([from, to])
      const arr = this.data.flights.filter(valid => {
        //拿到总数据里面的起飞时间.-->(20:35),要小时所以要劈开split':',把:给劈掉就变成('20','35'),我们要第一个[0],拿到小时('20')
        const start = +valid.dep_time.split(':')[0]
        // console.log(start)
        return start >= from && start < to
      })
      this.$emit('getDataList', arr)
    },

    // 选择航空公司时候触发
    handleCompany(value) {
      //绑定页面后台数据,点击的时候,保存用户的数据做修改
      const arr = this.data.flights.filter(valid => {
        return valid.airline_name === value
      })

      //拿到用户数据和总数据对比出来相等的就是用户筛选的数据,我们要显示在页面要传递给父组件
      this.$emit('getDataList', arr)
      //传递过去要去父组件设置getDataList方法进行设置
    },

    // 选择机型时候触发
    handleAirSize(value) {
      console.log(value)
      //绑定页面后台数据,点击的时候,保存用户的数据做修改
      const arr = this.data.flights.filter(valid => {
        return valid.plane_size === value
      })
      //拿到用户点击的数据和总数据对比相等的数据就是用户筛选的数据,传递给父组件
      this.$emit('getDataList', arr)
    },

    // 撤销条件时候触发
    handleFiltersCancel() {
      //绑定页面后台数据,点击的时候,保存用户的数据做修改

      this.airport = '' // 机场
      this.flightTimes = '' // 出发时间
      this.company = '' // 航空公司
      this.airSize = '' // 机型大小
      //把总数据传递给父组件
      this.$emit('getDataList', this.data.flights)
    }
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>