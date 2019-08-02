<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row class="search-tab" type="flex">
      <span
        :class="{active: index === currentTab}"
        :key="index"
        @click="handleSearchTab(item, index)"
        v-for="(item, index) in tabs"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>

    <el-form class="search-form-content" label-width="80px" ref="form" v-if="currentTab==0">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          class="el-autocomplete"
          placeholder="请搜索出发城市"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
          class="el-autocomplete"
          placeholder="请搜索到达城市"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          @change="handleDate"
          placeholder="请选择日期"
          style="width: 100%;"
          type="date"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-radio label="1" style=" margin-bottom:10px ;" v-model="radio">带儿童</el-radio>
      <el-radio label="2" v-model="radio">带巨婴</el-radio>
      <el-form-item label>
        <el-button @click="handleSubmit" icon="el-icon-search" style="width:100%;" type="primary">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
    <el-form class="search-form-content" label-width="80px" ref="form" v-if="currentTab==1">
      <el-form-item label="出发城市">
        <!-- fetch-suggestions 返回输入建议的方法 -->
        <!-- select 点击选中建议项时触发 -->
        <el-autocomplete
          :fetch-suggestions="queryDepartSearch"
          @select="handleDepartSelect"
          class="el-autocomplete"
          placeholder="请搜索出发城市"
          v-model="form.departCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          :fetch-suggestions="queryDestSearch"
          @select="handleDestSelect"
          class="el-autocomplete"
          placeholder="请搜索到达城市"
          v-model="form.destCity"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- change 用户确认选择日期时触发 -->
        <el-date-picker
          @change="handleDate"
          placeholder="请选择日期"
          style="width: 100%;"
          type="date"
          v-model="form.departDate"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button @click="handleSubmit" icon="el-icon-search" style="width:100%;" type="primary">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>

<script>
//引入时间
import moment from 'moment'
export default {
  data() {
    return {
      //带巨婴
      radio: '0',
      tabs: [
        { icon: 'iconfont icondancheng', name: '单程' },
        { icon: 'iconfont iconshuangxiang', name: '往返' }
      ],
      currentTab: 0,
      //表单数据
      form: {
        departCity: '', //出发城市
        departCode: '', //出发城市代码
        destCity: '', //目标城市
        destCode: '', //目标城市代码
        departDate: '' //日期
      }
    }
  },
  methods: {
    // tab切换时触发
    handleSearchTab(item, index) {
      // if (index == 1) {
      //   this.$alert('暂时不支持往返', '提示', { type: 'warning' })
      // }
      this.currentTab = index
    },

    // 出发城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDepartSearch(value, cb) {
      //如果没有数据展示的列表应该为空
      if (!value) {
        cd([])
      }

      //获取城市数据
      this.$axios({
        url: '/airs/city',
        //是git请求默认不用设置method
        //git的请求参数value是我们输入框里面的值可以当做参数就是departCity
        params: {
          name: value
        }
      }).then(res => {
        console.log(res)

        //赋值
        const { data } = res.data
        //循环遍历每一项数据添加一个value属性,map写法
        //我们输入一个字他会返回数据库里面匹配的数组模式返回
        // 我们要遍历每一项拿到name添加value属性就是我们cd里面的参数
        const newData = data.map(v => {
          //replace替代,就是移除市
          v.value = v.name.replace('市', '')
          // console.log(v)

          return v
        })

        //如果用户没有点击 设置第一个为选中默认值进行展示
        this.form.departCity = newData[0].value
        //保存出发城市编码
        this.form.departCode = newData[0].sort

        //进行展示
        cb(newData)
      })
      // cb([{ value: 1 }, { value: 2 }, { value: 3 }])
    },

    // 目标城市输入框获得焦点时触发
    // value 是选中的值，cb是回调函数，接收要展示的列表
    queryDestSearch(value, cb) {
      //如果没有数据展示的列表应该为空
      if (!value) {
        cd([])
      }

      //获取城市数据
      this.$axios({
        url: '/airs/city',
        //是git请求默认不用设置method
        //git的请求参数value是我们输入框里面的值可以当做参数就是departCity
        params: {
          name: value
        }
      }).then(res => {
        console.log(res)

        //赋值
        const { data } = res.data
        //循环遍历每一项数据添加一个value属性,map写法
        //我们输入一个字他会返回数据库里面匹配的数组模式返回
        // 我们要遍历每一项拿到name添加value属性就是我们cd里面的参数
        const newData = data.map(v => {
          //replace替代,就是移除市
          v.value = v.name.replace('市', '')
          // console.log(v)

          return v
        })

        //如果用户没有点击 设置第一个为选中默认值进行展示
        this.form.destCity = newData[0].value
        //保存出发城市编码
        this.form.destCode = newData[0].sort

        //进行展示
        cb(newData)
      })
    },

    // 出发城市下拉选择时触发
    handleDepartSelect(item) {
      this.form.departCity = item.value
      this.form.departCode = item.sort
    },

    // 目标城市下拉选择时触发
    handleDestSelect(item) {
      this.form.destCity = item.value
      this.form.destCode = item.sort
    },

    // 确认选择日期时触发
    handleDate(value) {
      this.form.departDate = moment(value).format('YYYY-MM-DD')
    },

    // 触发和目标城市切换时触发
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form
      //点击切换把出发点和目的地切换
      this.form.departCity = destCity
      //切换,出发点编码和目的地编码
      this.form.departCode = destCode
      //切换目的地和出发地
      this.form.destCity = departCity
      //切换目的地编码和出发地编码
      this.form.destCode = departCode
    },

    // 提交表单是触发
    handleSubmit() {
      //点击搜索按钮触发提交

      //点击搜索的时候出发地不能为空
      if (!this.form.departCity) {
        this.$alert('出发地不能为空', '提示', { type: 'warning' })
        return
      }

      //点击搜索的时候目的地不能为空
      if (!this.form.destCity) {
        this.$alert('目的地不能为空', '提示', { type: 'warning' })
        return
      }

      //点击搜索时间不能为空
      if (!this.form.departDate) {
        this.$alert('出发时间不能为空', '提示', { type: 'warning' })
        return
      }

      //跳转
      this.$router.push({
        path: '/air/flights',
        //五个参数
        query: this.form
      })
    }
  },
  mounted() {}
}
</script>

<style scoped lang="less">
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: '';
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: '';
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>
