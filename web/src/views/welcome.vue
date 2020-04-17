<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <strong>快捷入口</strong>
          </div>
          <el-row :gutter="20" class="kjrk">
            <el-col :span="8">
              <el-button type="primary" plain icon="el-icon-s-goods" v-if="user.identity == '管理员'"
                @click="$router.push('/toysCreate')">上架玩具</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain icon="el-icon-s-home" @click="$router.push('/stocks')">玩具入库</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain icon="el-icon-user" @click="$router.push('/members')">会员入会</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain icon="el-icon-s-order" v-if="user.identity == '管理员'"
                @click="$router.push('/sales')">销售订单</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain icon="el-icon-user-solid" v-if="user.identity == '管理员'"
                @click="$router.push('/usersCreate')">添加用户</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain icon="el-icon-star-on" v-if="user.identity == '管理员'"
                @click="$router.push('/membersPoint')">会员积分</el-button>
            </el-col>
          </el-row>
        </el-card>

      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <strong>待办事项</strong>
          </div>
          <el-row :gutter="20" class="dbsx">
            <el-col class="item" :span="12">
              待确认订单 / <span>15</span>
            </el-col>
            <el-col class="item" :span="12">
              待审商品 / <span>10</span>
            </el-col>
            <el-col class="item" :span="12">
              待发货订单 / <span>20</span>
            </el-col>
            <el-col class="item" :span="12">
              待处理会员 / <span>15</span>
            </el-col>
          </el-row>


        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <strong>天气</strong>
          </div>
          <iframe allowtransparency="true" frameborder="0" width="385" height="96" scrolling="no"
            src="//tianqi.2345.com/plugin/widget/index.htm?s=1&z=1&t=0&v=0&d=3&bd=0&k=&f=&ltf=009944&htf=cc0000&q=1&e=1&a=1&c=54511&w=385&h=96&align=center"></iframe>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="kjrk">
      <el-col :span="12">
        <el-card style=" margin-top:20px">
          <div id="column" style=" width:700px; height:500px;"></div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card style=" margin-top:20px">

          <div id="pie" style=" width:700px; height:500px;"> </div>
        </el-card>
      </el-col>

    </el-row>


  </div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    mounted() {


      // 基于准备好的dom，初始化echarts实例
      var myChartColumn = echarts.init(document.getElementById('column'));
      var myChartPie = echarts.init(document.getElementById('pie'));
      // 绘制图表
      myChartColumn.setOption({
        title: {
          text: '上周统计'
        },
        tooltip: {},
        xAxis: {
          data: ['新增用户', '新增会员', '新增玩具', '新增订单', '会员退会']
        },
        yAxis: {},
        series: [{
          name: '数量',
          type: 'bar',
          itemStyle: {
            normal: {
              //，定义一个list，然后根据所以取得不同的值，这样就实现了，
              color: function (params) {
                // build a color map as your need.
                var colorList = [
                  '#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#ffeaa7',
                  ];
                return colorList[params.dataIndex]
              },
              //以下为是否显示，显示位置和显示格式的设置了
              label: {
                show: true,
                position: 'top',
                //                             formatter: '{c}'
                formatter: '{b}\n{c}'
              }
            }
          },
          data: [5, 20, 36, 10, 10]
        }]
      });

      myChartPie.setOption({
        title: {
          text: '每月销售玩具分类',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['体育玩具', '智力玩具', '科教玩具', '军事玩具', '装饰玩具']
        },
        series: [{
          name: '销售数量',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
           itemStyle: {
            normal: {
              //，定义一个list，然后根据所以取得不同的值，这样就实现了，
              color: function (params) {
                // build a color map as your need.
                var colorList = [
                  '#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#ffeaa7',
                  ];
                return colorList[params.dataIndex]
              },
              //以下为是否显示，显示位置和显示格式的设置了
              label: {
                show: true,
                position: 'top',
                //                             formatter: '{c}'
                formatter: '{b}\n{c}'
              }
            }
          },
          data: [{
              value: 35,
              name: '体育玩具'
            },
            {
              value: 31,
              name: '智力玩具'
            },
            {
              value: 23,
              name: '科教玩具'
            },
            {
              value: 13,
              name: '军事玩具'
            },
            {
              value: 154,
              name: '装饰玩具'
            }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      });


    },

    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    methods: {
      
      //  async dataCount() {
      //   const res = await this.$http.get("rest/count")
      //   this.model = res.data
      // },
    },
     created() {
            // this.dataCount();

        }
  }
</script>

<style scoped>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .box-card {
    height: 250px;
  }

  .kjrk button {
    margin: 15px 0;
  }

  .dbsx .item {
    padding: 10px;
    font-size: 20px;
    display: flex;
    align-items: center;

  }

  .dbsx .item span {
    color: orangered;
    font-size: 32px;

  }
</style>