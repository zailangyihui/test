import { mapGetters } from 'vuex'
import { getCookie } from '@/utils/Cookie'
import store from 'vuex'
const initPage = {
    data() {
        return {
            isOpenAside: true,
            pagenavi: {
                isUnfold: true,
                total: 0,
                count: 0,
                current: 1,
                sizes: [10, 20, 30, 40],
                size: 10,
                layout: this.$store.state.asideState == 'unfold' ? 'total, sizes, prev, pager, next, jumper' : 'prev, pager, next'
            },
            tableheight: 530
        }
    },
    computed: {
        ...mapGetters(['user', 'theme', 'asideState']),
    },
    methods: {
        initLayout() {
            var width = document.body.clientWidth;
            if (width <= 767) {
                this.isOpenAside = false;
            } else {
                this.isOpenAside = true;
            }
        },
        initUser() {
            if (this.user.id === undefined) {
                let userStr = getCookie('userinfo')
                if (userStr != 'undefined') {
                    let userinfo = JSON.parse(userStr);
                    console.log('[cookie:user]', userinfo)
                    this.$store.commit('UPDATA_USER', userinfo)
                } else {
                    this.$router.push({ path: '/' })
                }
            }
        },
        initTheme() {
            let themeName = localStorage.getItem('ADMIN-THEME')
            if (themeName !== null && themeName !== '') {
                this.$store.commit('UPDATA_THEME', themeName);
                if (this.themeList) {
                    this.themeList.forEach((item) => {
                        item.selected = false
                        if (item.bgclass === themeName) {
                            item.selected = true
                        }
                    })
                }
            }
        },
        onChangePageSize(val) {
            this.pagenavi.size = val;
            if (Math.ceil(this.pagenavi.total / this.pagenavi.size) >= this.pagenavi.current) {
                this.getTableData({
                    'pageCount': (this.pagenavi.current - 1) * this.pagenavi.size,
                    'pageSize': this.pagenavi.size,
                });
            }
        },
        onGotoPage(val) {
            this.pagenavi.current = val;
            this.getTableData({
                'pageCount': (val - 1) * this.pagenavi.size,
                'pageSize': this.pagenavi.size,
            })
        },
    },
    created() {
        console.log('[vuex:user]', this.user.id)
        this.initUser();
        this.initTheme();
        this.$nextTick(function() {
            var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.initLayout();
            var self = this;
            window.onresize = function() {
                self.initLayout()
            }
            this.tableheight = height - 280;
        })
    }
}
export { initPage }