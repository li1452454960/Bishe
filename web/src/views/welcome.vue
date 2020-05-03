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
              <el-button type="primary" plain icon="el-icon-s-custom" @click="$router.push('/members')">会员入会</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain icon="el-icon-s-order" v-if="user.identity == '管理员'"
                @click="$router.push('/sales')">销售订单</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" plain icon="el-icon-user" v-if="user.identity == '管理员'"
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
              待添加库存 / <span>10</span>
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
    data() {
      return {
        allitems: [],
        salesItems: [],
        typeCount: [],
        nameList: []
      }
    },
    mounted() {

      //       // 基于准备好的dom，初始化echarts
      //       var myChartColumn = echarts.init(document.getElementById('column'));
      //       var myChartPie = echarts.init(document.getElementById('pie'));
      //       // 绘制图表
      //       myChartColumn.setOption({
      //         title: {
      //           text: '每月新增统计'
      //         },
      //         tooltip: {},
      //         xAxis: {
      //           data: ['新增用户', '新增会员', '新增玩具', '新增订单', '会员退会']
      //         },
      //         yAxis: {},
      //         series: [{
      //           name: '数量',
      //           type: 'bar',
      //           itemStyle: {
      //             normal: {
      //               //，定义一个list，然后根据所以取得不同的值，这样就实现了，
      //               color: function (params) {
      //                 // build a color map as your need.
      //                 var colorList = [
      //                   '#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#ffeaa7',
      //                 ];
      //                 return colorList[params.dataIndex]
      //               },
      //               //以下为是否显示，显示位置和显示格式的设置了
      //               label: {
      //                 show: true,
      //                 position: 'top',
      //                 //                             formatter: '{c}'
      //                 formatter: '{b}\n{c}'
      //               }
      //             }
      //           },
      //           data: [5, 20, 36, 10, 10]
      //         }]
      //       });
      // const nList = this.nameList;
      // console.log(this.nameList+"----------1")
      // let v=JSON.stringify(nList);
      // console.log(v+"----------2")
      //       myChartPie.setOption({
      //         title: {
      //           text: '每月销售玩具分类',
      //           left: 'center'
      //         },
      //         tooltip: {
      //           trigger: 'item',
      //           formatter: '{a} <br/>{b} : {c} ({d}%)'
      //         },
      //         legend: {
      //           orient: 'vertical',
      //           left: 'left',
      //           data: JSON.stringify(nList)
      //         },
      //         series: [{
      //           name: '销售数量',
      //           type: 'pie',
      //           radius: '55%',
      //           center: ['50%', '60%'],
      //           itemStyle: {
      //             normal: {
      //               //，定义一个list，然后根据所以取得不同的值，这样就实现了，
      //               color: function (params) {
      //                 // build a color map as your need.
      //                 var colorList = [
      //                   '#55efc4', '#81ecec', '#74b9ff', '#a29bfe', '#ffeaa7',
      //                 ];
      //                 return colorList[params.dataIndex]
      //               },
      //               //以下为是否显示，显示位置和显示格式的设置了
      //               label: {
      //                 show: true,
      //                 position: 'top',
      //                 //                             formatter: '{c}'
      //                 formatter: '{b}\n{c}'
      //               }
      //             }
      //           },
      //           data: [{value: 1,
      // name: "辆"},{value: 6,
      // name: "件"},{value: 5,
      // name: "个"},{value: 2,
      // name: "2"}],
      //           emphasis: {
      //             itemStyle: {
      //               shadowBlur: 10,
      //               shadowOffsetX: 0,
      //               shadowColor: 'rgba(0, 0, 0, 0.5)'
      //             }
      //           }
      //         }]
      //       });


    },

    computed: {
      user() {
        return this.$store.getters.user
      }
    },
    created() {
      this.ngOnInit();
      this.fetchMembers()
      this.fetchToys()
      this.fetchStocks()
    },
    methods: {
// 获取列表
      async fetchMembers() {
        const res = await this.$http.get('rest/members')
        this.membersItems = res.data
      },
      async fetchToys() {
        const res = await this.$http.get('rest/toys')
        this.toysItems = res.data
      },
       async fetchStocks() {
        const res = await this.$http.get('rest/stocks')
        this.stocksItems = res.data
      },
      test() {
        // 基于准备好的dom，初始化echarts
        var myChartColumn = echarts.init(document.getElementById('column'));
        var myChartPie = echarts.init(document.getElementById('pie'));
        // 绘制图表
        myChartColumn.setOption({
          title: {
            text: '每月新增统计'
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
        const nList = this.nameList;
        const tList = this.typeCount;
       /*  console.log(this.nameList + "----------1") */
        /* let v = JSON.stringify(nList); */
       /*  console.log(v + "----------2")
        console.log(this.typeCount + "----------3") */
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
            data: nList
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
            data: tList,
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
      //统计
      async ngOnInit() {
        const res = await this.$http.get('rest/sale')
        this.allitems = res.data
        const sorted = this.groupBy(this.allitems, function (item) {
          return [item.parent.st_tyName];
        });
      /*   console.log(this.allitems) */
        //console.log(sorted);
        var _this = this;
        _this.typeCount = [],
          _this.nameList = [],
          sorted.forEach(function (item) {
            _this.typeCount.push({
              value: item.length,
              name: item[0].parent.st_tyName
            })
            _this.nameList.push(item[0].parent.st_tyName);
          })
        /* console.log(_this.nameList)
        console.log(_this.typeCount) */
        this.test();
      },

      groupBy(array, f) {
        /*  debugger */
        if (!array) {
          return;
        }
        const groups = {};
        array.forEach(function (o) {
          const group = JSON.stringify(f(o));
          groups[group] = groups[group] || [];
          groups[group].push(o);
        });
        return Object.keys(groups).map(function (group) {
          return groups[group];
        });
      },
    },


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