<template>
  <div class="flight-item">
    <div @click="isShow=!isShow">
      <!-- 显示的机票信息 -->
      <el-row align="middle" class="flight-info" type="flex">
        <el-col :span="6">
          <span>{{data.airline_name}}</span>
          {{data.flight_no}}
        </el-col>
        <el-col :span="12">
          <el-row class="flight-info-center" justify="space-between" type="flex">
            <el-col :span="8" class="flight-airport">
              <strong>{{data.dep_time}}</strong>
              <span>{{data.org_airport_name}}{{data.org_airport_quay}}</span>
            </el-col>
            <el-col :span="8" class="flight-time">
              <span>{{rankTime}}</span>
            </el-col>
            <el-col :span="8" class="flight-airport">
              <strong>{{data.arr_time}}</strong>
              <span>{{data.dst_airport_name}}{{data.dst_airport_quay}}</span>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" class="flight-info-right">
          ￥
          <span class="sell-price">{{data.seat_infos[0].org_settle_price}}</span>起
        </el-col>
      </el-row>
    </div>
    <div class="flight-recommend">
      <!-- 隐藏的座位信息列表 -->
      <el-row align="middle" justify="space-between" type="flex" v-if="isShow">
        <el-col :span="4">低价推荐</el-col>
        <el-col :span="20">
          <el-row
            :key="index"
            align="middle"
            class="flight-sell"
            justify="space-between"
            type="flex"
            v-for="(item,index) in data.seat_infos"
          >
            <el-col :span="16" class="flight-sell-left">
              <span>{{item.name}}</span>
              | {{item.supplierName}}
            </el-col>
            <el-col :span="5" class="price">￥{{item.org_settle_price}}</el-col>
            <el-col :span="3" class="choose-button">
              <el-button
                @click="handleToLink( data.id,  item.seat_xid)"
                size="mini"
                type="warning"
              >选定</el-button>
              <p>剩余：{{item.discount}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false
    }
  },
  props: {
    // 数据
    data: {
      type: Object,
      // 默认是空数组
      default: {}
    }
  },
  //计算属性:它能监听计算属性中的依赖项的变化,如果发现依赖项有变化,那么就会自动的触发计算属性,实现相应的业务,依赖项就是计算属性中使用到的vm实例中定义的成员比如:this
  computed: {
    //计算相隔时间
    //坐飞机时间,到达时间-开始时间要转化成分钟
    rankTime() {
      //获取到达时间和用:劈开成两个字符串
      const arr = this.data.arr_time.split(':')
      //获取到开始时间
      const dep = this.data.dep_time.split(':')

      //如果到达时间小于开始时间我们加上24小时 (00:30<20:30)--->(到达时间:24:30)
      if (arr[0] < dep[0]) {
        arr[0] += 24
      }

      //把小时装换成分钟
      // 这里的+号是类型装换,字符串装换成数值 (arr[0]是小时,arr[1]是分钟)
      const end = arr[0] * 60 + +arr[1]
      const start = dep[0] * 60 + +dep[1]

      //获取到分钟相减得到,相隔的分钟
      const dis = end - start

      //得到小时(向下取整)  Math.ceil(向上取整)
      const hours = Math.floor(dis / 60)

      //得到分钟
      const min = dis % 60

      return `${hours}时${min}分钟`
    }
  },
  methods: {
    handleToLink(id, seat_xid) {
      this.$router.push({
        path: '/air/order',
        query: {
          /**
           * /:id	number	机票id
              seat_xid	String	座位id
           * 
           */
          id,
          seat_xid
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.flight-item {
  border: 1px #ddd solid;
  margin-bottom: 10px;

  .flight-info {
    padding: 15px;
    cursor: pointer;

    > div {
      &:first-child,
      &:last-child {
        text-align: center;
      }
    }
  }

  .flight-info-center {
    padding: 0 30px;
    text-align: center;

    .flight-airport {
      strong {
        display: block;
        font-size: 24px;
        font-weight: normal;
      }
      span {
        font-size: 12px;
        color: #999;
      }
    }

    .flight-time {
      span {
        display: inline-block;
        padding: 10px 0;
        border-bottom: 1px #eee solid;
        color: #999;
      }
    }
  }

  .flight-info-right {
    .sell-price {
      font-size: 24px;
      color: orange;
      margin: 0 2px;
    }
  }
}

.flight-recommend {
  background: #f6f6f6;
  border-top: 1px #eee solid;
  padding: 0 20px;

  .flight-sell {
    border-bottom: 1px #eee solid;
    padding: 10px 0;

    &:last-child {
      border-bottom: none;
    }

    .flight-sell-left {
      font-size: 12px;
      span {
        color: green;
      }
    }

    .price {
      font-size: 20px;
      color: orange;
    }

    .choose-button {
      text-align: center;
      color: #666;
      button {
        display: block;
        width: 100%;
        margin-bottom: 5px;
      }
    }
  }
}
</style>