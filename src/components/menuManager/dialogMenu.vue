<template>
    <el-dialog :title="dialogMenu.title" :visible.sync="dialogMenu.show" width="500px" :show-close="false" :close-on-click-modal="false" :append-to-body="true">
        <div class="from-item">
            <label>图标&名称：</label>
            <el-input placeholder="请输入菜单名" v-model="dialogMenu.menuName">
                <template slot="prepend">
                    <div class="zwdiv" @click="iconPopover=false"><i class="iconfont" :class="dialogMenu.menuIcon"></i></div>
                </template>
            </el-input>
            <div class="popover" :hidden="iconPopover">
                <div class="popover-title">
                    请选择图标
                    <i class="el-icon-close closepopover" @click.stop="iconPopover=true"></i>
                </div>
                <div class="popover-content">
                    <span class="iconbox" v-for="item in icons" @click.stop="dialogMenu.menuIcon=item"><i class="iconfont" :class="item"></i></span>
                </div>
            </div>
        </div>
        <div class="">
            <label>权限分配：</label>
            <el-select v-model="dialogMenu.roleIds" multiple collapse-tags style="width: 100%;" placeholder="请选择" :loading="dialogMenu.loading">
                <el-option v-for="item in roleArr" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogMenu.show = false">取 消</el-button>
            <el-button type="primary" @click="entry">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props:['dialogMenu'],
        data(){
            return{
                iconPopover:true,
                roleArr: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '子马虎'
				}],
                icons: ["icon-bianji", "icon-shuaxin", "icon-tuichu", "icon-diancan", "icon-Management", "icon-guanbi", "icon-quanbutouziren", "icon-diancan1"],
            }
        },
        methods:{
            entry(){

            }
        }
    }
</script>

<style scoped>
    .from-item {
        margin-bottom: 12px;
        position: relative;
    }
    .iconbox {
     	display: inline-block;
     	padding: 8px;
     	margin: 0 8px 8px 0;
     	font-size: 14px;
     	text-align: center;
     	border-radius: 2px;
     	box-shadow: 0 0 0 1px #e4eaec;
    }
    .popover {
        position: absolute;
        top: 70px;
        width: 230px;
        background-color: #f3f7f9;
        z-index: 2;
        border: solid 1px #e4eaec;
        border-radius: 4px;
    }
    .popover-title {
        text-align: center;
        height: 30px;
        line-height: 30px;
        border-bottom: solid 1px #e4eaec;
    }
    .popover-content {
        background-color: #fff;
        padding: 10px;
        max-height: 200px;
    }
    .closepopover {
        position: absolute;
        right: 5px;
        top: 7px;
    }

    .zwdiv {
        width: 70px;
        height: 36px;
        line-height: 36px;
        text-align: center;
    }
    .el-input-group__prepend {
        padding: 0;
    }
</style>
