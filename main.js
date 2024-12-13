import Vue from 'vue'
import App from './App'

// vuex
import store from './store'

// 引入全局uView
import uView from '@/uni_modules/uview-ui'

import mixin from './common/mixin'

Vue.prototype.$store = store

Vue.config.productionTip = false

// 公共方法之类的
import publicConst from '@/common/const.js'
import publicFunc from '@/common/func.js'
import publicMath from '@/common/math.js'
import publicFormat from '@/common/format.js'

App.mpType = 'app'
Vue.use(uView)

// #ifdef MP
// 引入uView对小程序分享的mixin封装
const mpShare = require('@/uni_modules/uview-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)
// #endif

Vue.mixin(mixin)

const app = new Vue({
	store,
	...App
})

// 公共常量
Vue.use(publicConst, app)

//公共方法
Vue.use(publicFunc, app)

//数字运算等
Vue.use(publicMath, app)

//格式化
Vue.use(publicFormat, app)

// 引入请求封装
require('./util/request/index')(app)

app.$mount()