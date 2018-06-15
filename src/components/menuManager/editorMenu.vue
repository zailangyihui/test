<template>
    <el-dialog title="Dialog" :visible.sync="editorRoleVisible" :close-on-click-modal="true" :modal="false" width="500px">
        <div class="from-item">
            <label>图标&名称：</label>
            <el-input placeholder="请输入菜单名" v-model="menuname">
                <template slot="prepend">
                    <div class="zwdiv" @click="iconpopover=false"><i class="iconfont" :class="selecticon"></i></div>
                </template>
            </el-input>
            <div class="popover" :hidden="iconpopover">
                <div class="popover-title">
                    请选择图标
                    <i class="el-icon-close closepopover" @click.stop="iconpopover=true"></i>
                </div>
                <div class="popover-content">
                    <span class="iconbox" v-for="item in icons" @click.stop="selecticon=item"><i class="iconfont" :class="item"></i></span>
                </div>
            </div>
        </div>
        <div class="">
            <label>权限分配：</label>
            <el-select v-model="valueqx" multiple collapse-tags style="width: 100%;" placeholder="请选择">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
            </el-select>
        </div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editorRoleVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveMenu2">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        data(){
            return{
                iconpopover:true,
                editorRoleVisible:false,
                menuname:'',
                selecticon: 'icon-diancan1',
                valueqx: '',
                options: [{
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
            saveMenu2(){

            }
        }
    }
</script>

<style lang="less" scoped>

</style>
