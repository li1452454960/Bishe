<template>
    <div >
    <h1>添加会员</h1>
        <el-form  @submit.native.prevent="save">
        <el-form-item label="姓名" label-width="100px">
        <el-input v-model="model.mb_name"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" label-width="100px">
          <el-input v-model="model.mb_email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" label-width="100px">
          <el-input v-model="model.mb_mobile" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
        </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return{
            model: {
                //  mb_name: '',
                //  mb_email: '',
                //  mb_mobile: '',
            }
        }
    },
    methods: {
       async save() {
        
        await this.$http.post('members', this.model)
        this.$router.push('/members')
        this.$message({
            type: 'success',
            message: '保存成功'
        })
        }
    }
}
</script>