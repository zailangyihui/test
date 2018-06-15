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
                            <i class="iconfont icon-bianji" @click.stop="editorMenu(item)"></i>&nbsp;<i class="el-icon-close" @click.stop="delMenu"></i>
                        </span>
                    </li>
                </ul>
            </div>
            <div class="line"></div>
            <div class="btn-add-menu" @click="addMenu"><i class="el-icon-plus"></i>&nbsp;&nbsp;添加新菜单</div>
        </div>
        <span class="btnToggle" @click="toggleAside">
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
                isopen:true,
                menuList: []
            }
        },
        computed: {
            ...mapGetters(['topMenus'])
        },
        watch: {
            'topMenus': function(arr){
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
                        this.$emit('show-menu-tree',item.id);
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
            addMenu(){
                this.$emit('add-menu');
            },
            toggleAside(){
                this.isopen = !this.isopen
                if(this.isopen){
                    this.$emit('toggle-aside', 'open')
                }else{
                    this.$emit('toggle-aside', 'close')
                }
            },
            editorMenu(){

            },
            delMenu(){

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
        .btn-add-menu {.h(50px);.lh(50px);.mt(15px);text-indent: 10px;color: #76838f;cursor: pointer;
            i {.fs(15px);.fb;}
        }
        .left-content {.p(0 20px);
            .left-content-list {.p(0);
                .litem{list-style: none;.h(44px);.lh(44px);
                    .menuname {color: @gray; cursor: pointer;}
                    .operate{.abs;right: 20px;.dn;
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
    .btnToggle {.abs; .hide; .fs(20px); z-index: 1000; .p(15px 8px;); right: -36px;top: calc(50% - 10px);border-radius: 0 100px 100px 0;box-shadow: 1px 0 3px rgba(0,0,0,.2);background-color: #fff; cursor: pointer;}
    @media (max-width: 767px){
		.btnToggle {display: block; }
	}
}
</style>