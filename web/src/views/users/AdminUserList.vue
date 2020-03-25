<template>
    <el-card>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-row class="searchRow">
            <el-col>
                <el-input @input="handlChange()"  clearable placeholder="请输入用户名" v-model="query"
                    class="inputSearch">
                    <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
                </el-input>
                <el-button @click="$router.push('/usersCreate')" type="success">添加用户</el-button>
            </el-col>
        </el-row>


        <el-table :data="items">
            <el-table-column type="index" label="ID" width="80"></el-table-column>
            <el-table-column prop="icon" label="头像" width="100">
                <template slot-scope="scope">
                    <img :src="scope.row.icon" style="height:3rem;">
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名"></el-table-column>


            <el-table-column prop="parent.ust_name" label="用户类型" width="100">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="180">
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
        created() {
            this.fetch();

        }
    };
</script>

<style>
    .box-card {
        height: 100%;
    }

    .inputSearch {
        width: 300px;
    }

    .searchRow {
        margin-top: 20px;
    }
</style>