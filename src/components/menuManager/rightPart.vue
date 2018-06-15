<template>
    <div class="shownavdetail" v-show="MenuDetail.show">
        <h5>{{MenuDetail.menuName}}</h5>
        <hr />
        <div class="from-item">
            <label>菜单名称：</label>
            <el-input v-model="MenuDetail.menuName" auto-complete="off" size="small"></el-input>
        </div>
        <div class="from-item">
            <label>菜单链接：</label>
            <el-input v-model="MenuDetail.menuUrl" auto-complete="off" size="small"></el-input>
        </div>
        <div class="from-item">
            <label>权限分配：</label>
            <el-select v-model="MenuDetail.roleArr" multiple collapse-tags style="width: 100%;" placeholder="请选择" size="small">
                <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div class="from-item">
            <el-button type="primary" class="btn-save-menu" size="small">保存</el-button>
        </div>
    </div>
</template>
<script>
    export default {
        props:['MenuDetail'],
        data(){
            return {
                roleList:[]
            }
        },
        methods:{

        }
    }
</script>
<style>
    .from-item {
        margin-bottom: 12px;
        position: relative;
    }
    .btn-save-menu {
        float: right;
    }
</style>
