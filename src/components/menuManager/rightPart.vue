<template>
    <div class="shownavdetail" v-show="MenuDetail.show">
        <h5>菜单信息</h5>
        <hr />
        <div class="from-item">
            <label>菜单名称：</label>
            <el-input v-model="MenuDetail.menuName" auto-complete="off" size="small" disabled="disabled"></el-input>
        </div>
        <!-- <div class="from-item">
            <label>菜单链接：</label>
            <el-input v-model="MenuDetail.menuUrl" auto-complete="off" size="small"></el-input>
        </div> -->
        <div class="from-item">
            <label>权限分配：</label>
            <el-select v-model="MenuDetail.roleArr" multiple placeholder="" style="width: 100%;" size="small" disabled="disabled">
                <el-option
                v-for="item in MenuDetail.roleList"
                :key="item.id"
                :label="item.roleName"
                :value="item.id">
                </el-option>
            </el-select>
        </div>
        <div class="from-item">
            <label>功能介绍：</label>
            <el-input
            type="textarea"
            :rows="3"
            v-model="MenuDetail.menuRem">
            </el-input>
        </div>
    </div>
</template>
<script>
    export default {
        props:['MenuDetail'],
        data(){
            return {}
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
