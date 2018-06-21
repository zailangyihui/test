<template>
    <el-dialog :title="dialogMenu.title" :visible.sync="dialogMenu.show" :close-on-click-modal="true" :modal="false" width="500px">
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
        <div class="from-item">
            <label>菜单路径：</label>
			<el-input v-model="dialogMenu.menuUrl" auto-complete="off" placeholder="请输入菜单路径"></el-input>
        </div>  
        <div class="from-item">
            <label>权限分配：</label>
            <el-select v-model="dialogMenu.roleIds" multiple collapse-tags style="width: 100%;" placeholder="请选择" :loading="dialogMenu.loading">
                <el-option v-for="item in dialogMenu.roleArr" :key="item.roleName" :label="item.roleName" :value="item.id">
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
    import { mapGetters } from 'vuex'
    import { editorMenu, addMenu, getMenus } from '@/api/menuManager.js'
    export default {
        props:['dialogMenu'],
        computed: {
            ...mapGetters(['user']),
        },
        data(){
            return{
                iconPopover:true,
                roleIds: [],
                icons: ["icon-bianji", "icon-shuaxin", "icon-tuichu", "icon-diancan", "icon-Management", "icon-guanbi", "icon-quanbutouziren", "icon-diancan1"],
            }
        },
        methods:{
            async entry(){
                if(!this.dialogMenu.menuName){
                    this.$message.error('请输入菜单名！');
				    return;
                }
                if(!this.dialogMenu.roleIds.length){
                    this.$message.error('请选择权限！');
				    return;
                }
                if(this.dialogMenu.type == "add"){
                    let data = await addMenu({'menuName':this.dialogMenu.menuName,'roleIds':this.dialogMenu.roleIds,'menuIcon':this.dialogMenu.menuIcon,'parentId':this.dialogMenu.parentId});
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                    this.updateMenu();
                } else if(this.dialogMenu.type == "editor"){
                    let data = await editorMenu({'menuId': this.dialogMenu.menuId,'menuIcon':this.dialogMenu.menuIcon, 'menuName': this.dialogMenu.menuName, 'roleIds': this.dialogMenu.roleIds});
                    this.$message({
                        message: data.message,
                        type: 'success'
                    });
                    this.updateMenu();
                }
                this.dialogMenu.show = false;
            },
            async updateMenu(){
                let data = await getMenus({uid: this.user.id});
                this.$store.commit('UPDATA_MENUS', data.data.treeMenu);
                this.$emit('update-current-menu');
            }
        },
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
