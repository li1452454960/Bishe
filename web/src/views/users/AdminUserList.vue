<template>
    <el-card>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome'}">数据中心</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="searchRow">
            <el-col>
                用户名: <el-input @input="handlChange()" clearable placeholder="请输入用户名" v-model="query"
                    class="inputSearch">
                    <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
                </el-input>

                <el-button v-if="user.identity == '管理员'" @click="$router.push('/usersCreate')" type="primary" style="margin-left:10px;">添加用户
                </el-button>
            </el-col>
        </el-row>


        <el-table :data="items">
            <el-table-column type="index" label="#" width="80"></el-table-column>
            <el-table-column prop="icon" label="头像" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" style="height:3rem;">
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>
            <el-table-column prop="identity" label="用户类型"></el-table-column>
            <el-table-column prop="date" label="创建时间">
                <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
            </el-table-column>
            <el-table-column v-if="user.identity == '管理员'"  prop="state" label="用户状态">
                <template slot-scope="scope">
                    <el-switch @change="changeState(scope.row)" v-model="scope.row.state" active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column v-if="user.identity == '管理员'" fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button size="mini" plain type="primary" icon="el-icon-edit" circle
                        @click="$router.push(`/usersEdit/${scope.row._id}`)"></el-button>
                    <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="remove(scope.row)">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="paginations.page_index" :page-sizes="paginations.page_sizes"
            :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
        </el-pagination>
    </el-card>
</template>

<script>
    export default {
        data() {
            return {
                paginations: {
                    page_index: 1, //当前位于多少页
                    total: 0, //总数
                    page_size: 5, //一页显示多少条
                    page_sizes: [5, 10, 15], //每页显示多少条
                    layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
                },
                query: '',
                queryData: [],
                items: [],
                allitems: [],
            };
        },
        methods: {
            //修改用户状态
      async changeState(user) {

        await this.$http.put(`rest/admin_users/${user._id}/${user.state} `)

      },

            //搜索用户
            searchUser() {
                if (this.query === '') {
                    this.$message({
                        type: "warning",
                        message: "请输入搜索用户名"
                    })
                    this.fetch();
                    return
                }

                this.allitems = this.queryData.filter(item => {

                    let username = item.username

                    return this.query === username

                })
                this.setPaginations()

            },
            handlChange() {
                if (this.query === "") {
                    this.fetch();
                }
            },

            async fetch() {
                const res = await this.$http.get('rest/admin_users')
                this.allitems = res.data
                this.queryData = res.data
                this.setPaginations()
            },
            //分页
            setPaginations() {
                this.paginations.total = this.allitems.length
                this.paginations.page_index = 1
                this.paginations.page_size = 5
                //设置默认分页数据
                this.items = this.allitems.filter((item, index) => {
                    return index < this.paginations.page_size
                })
            },
            handleSizeChange(page_size) {
                this.paginations.page_index = 1
                this.paginations.page_size = page_size
                this.items = this.allitems.filter((item, index) => {
                    return index < page_size
                })
            },
            handleCurrentChange(page) {
                //获取当前页
                let index = this.paginations.page_size * (page - 1)
                //数据总数
                let nums = this.paginations.page_size * page
                let tables = []
                for (let i = index; i < nums; i++) {
                    if (this.allitems[i]) {
                        tables.push(this.allitems[i])
                    }
                    this.items = tables
                }
            },
            remove(row) {
                this.$confirm(`是否确定要删除 "${row.username}"`, "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                }).then(async () => {
                    await this.$http.delete(`rest/admin_users/${row._id}`);
                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    this.fetch();
                });
            }
        },
        computed: {
            user() {
                return this.$store.getters.user
            }
        },
        created() {
            this.fetch();

        }
    };
</script>

<style scoped>
    .body {
        background: url(../../assets/login.jpg) no-repeat;
        background-size: 100% 100%;
    }

    .box-card {
        height: 100%;
    }

    .inputSearch {
        width: 200px;
    }

    .searchRow {
        margin-top: 20px;
    }
</style>