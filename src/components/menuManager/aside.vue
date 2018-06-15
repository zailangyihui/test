<template>
    <div class="aside">
        <div class="aside_content">
            <div class="left-header">
                <span>顶部菜单</span>
            </div>
            <div class="line"></div>
            <div class="left-content">
                <ul class="left-content-list">
                    <li class="litem" v-for="(item,index) in menuList" :class="item.selected === 1 ? 'active' : ''"  @click="changeMenuTree(item.id)">
                        <i class="iconfont" :class="item.icon"></i>&nbsp;&nbsp;
                        <span class="menuname">{{item.text}}</span>
                        <span class="operate">
                            <i class="iconfont icon-bianji" @click.stop="editorMenu(item)"></i>&nbsp;<i class="el-icon-close" @click.stop="deleteMenu"></i>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="addrolebtn" @click="addmenu"><i class="el-icon-plus"></i>&nbsp;&nbsp;添加新菜单</div>
        </div>
        <span class="aside_open_close" @click="changeisopen">
            <i :class="isopen ? 'el-icon-arrow-left' : 'el-icon-arrow-right'"></i>
        </span>
    </div>
</template>
<script>
    import { mapGetters } from 'vuex';  
    export default {
        name:'MenuManagerAside',
        data(){
            return {
                currentNavId:0,
                isopen:true,
                menuList: []
            }
        },
        computed: {
            ...mapGetters(['topMenus','leftMenus'])
        },
        watch: {
            'topMenus': function(arr){
                console.log(arr,"[[[[]]]]]]]]]]]]]]")
                this.initMenuData(arr);
            }
        },
        methods:{
            changeMenuTree(menuid){
                console.log("43",menuid)
                this.menuList.forEach((item) => {
                    item.selected = 0
                    if(item.id == menuid){
                        item.selected = 1
                    }
                })
            },
            initMenuData(arr){
                this.menuList = arr.map((item, index)=>{
                    return {
                        id: item.id,
                        text: item.text,
                        selected: index === 0 ? 1 : 0,
                    }
                })
            },
            addmenu(){
                
            },
            changeisopen(){

            },
            editorMenu(){

            },
            deleteMenu(){

            }
        },
        created(){
            if(this.topMenus.length) {
                this.menuList = this.topMenus;
                this.initMenuData(this.menuList);
            }
        }
    }
</script>
<style lang="less" scoped>
@import '../../assets/css/base.less';
@bdcolor: #e4eaec;
.aside {.abs;top: 0;bottom: 0;left: 0;.w(220px);.pt(20px);border-right: 1px solid @bdcolor;background: @white;.fs(14px);z-index: 10;
    .aside_content{.abs;bottom: 0;top: 0;left: 0;.w(220px);overflow-y: auto;overflow-x: hidden;
        .left-header {.p(25px 20px 35px 20px);}
        .line {border-bottom: 1px solid @bdcolor;.m(0px 12px);}
        .left-content {.p(0 20px);
            .left-content-list {.p(0);
                .litem{list-style: none;.h(44px);.lh(44px);
                    .menuname {color: @gray; cursor: pointer;}
                    .operate{.abs;right: 0;.dn;
                        i {.fs(18px);.fb; color: @gray + 50;
							&:hover {color: @blue; cursor: pointer;}; 
						}
                    }
                    &.active {
                        .menuname{color: #62a8ea};
                    }
                    &:hover{
                        .operate{display: initial;}
                    }
                }
            }
        }
    }
}

</style>