import routeData from '@/router/index.js'

// 全局公共方法
// 此处第二个参数vm，也就是页面使用的this
const install = (Vue, vm) => {

	/**
	 * 路由跳转
	 * @param {*} name 
	 * @param {*} params 
	 */
	const routeTo = (name, params) => {
		// console.log('跳转', name);
		// 如果指定了具体页面地址
		if (name.startsWith('/pages')) {
			vm.$u.route({
				url: name,
				params: params
			})
			return
		}
		let target = routeData.filter(x => x.alias == name)[0] // || {}
		if (!target) {
			vm.$u.toast('未找到指定页面')
			return
		}
		if (!target.alias) return;
		if (!target.auth) {
			vm.$u.route({
				url: target.path,
				params: params
			})
		} else {
			if (vm.$store.getters.has_auth(target.auth)) {
				vm.$u.route({
					url: target.path,
					params: params
				})
			} else {
				vm.$u.toast('没有权限访问')
			}
		}
	}

	/**
	 * 禁止页面滑动，用于dialog弹出时防止滑动穿透
	 */
	const disablePageSlide = () => {
		// #ifdef APP
		var wvs = plus.webview.all()
		for (var i = 0; i < wvs.length; i++) {
			wvs[i].evalJS(
				`window.document.body.style.overflow = 'hidden'`
				// `window.document.body.style.position = 'relative'`
			)
		}
		// #endif

		// #ifdef H5
		document.body.style.overflow = 'hidden' // 弹层显示时
		document.body.style.position = 'relative'
		// #endif
	}

	/**
	 * 启用页面滑动，用于dialog弹出时防止滑动穿透
	 */
	const enablePageSlide = () => {
		// #ifdef APP
		var wvs = plus.webview.all()
		for (var i = 0; i < wvs.length; i++) {
			wvs[i].evalJS(
				`window.document.body.style.overflow = 'auto'`
				// `window.document.body.style.position = null`
			)
		}
		// #endif

		// #ifdef H5
		document.body.style.overflow = 'auto' // 弹层不显示时
		document.body.style.position = null
		// #endif
	}

	/**
	 * 将文本中的\n替换为<br>
	 * @param {*} text 
	 */
	const multilineTextToHtml = (text) => {
		if (text) {
			return text.replace(/[\r\n]/g, '<br/>')
		} else {
			return ''
		}
	}

	/**
	 * 根据总条数计算页码
	 * @param {number} count 总条数
	 * @param {number} pageSize 每页条数
	 * @returns 
	 */
	const pagerCount = (count, pageSize) => {
		if (typeof(count) == "number") {
			if (count > 0) {
				try {
					var _pagerCount = count % pageSize == 0 ? count / pageSize : count / pageSize + 1;
					var c = _pagerCount.toFixed(0); //小数取整
					_pagerCount = c > _pagerCount ? c - 1 : c; //过滤四舍五入
					return Number(_pagerCount);

				} catch (error) {
					return 0;
				}

			} else {
				return 0;
			}

		} else {
			return 0;
		}

	}

	/**
	 * 移除json中空值的key
	 * @param {*} data 
	 */
	const removeJsonEmptyValueKey = (data) => {
		var y
		for (var x in data) {
			y = data[x]
			if (y instanceof Object) y = removeJsonEmptyValueKey(y)
			if (y === 'null' || y === null || y === '' || typeof y === 'undefined' || (y instanceof Object &&
					Object.keys(y).length == 0)) {
				delete data[x]
			}
		}
		return data
	}

	/**
	 * List 分组
	 * @param {*} list 
	 * @param {*} field 
	 */
	const listGroupBy = (list, field) => {
		var obj = {}
		for (var i = 0; i < list.length; i++) {
			for (let item in list[i]) {
				if (item == field) {
					obj[list[i][item]] = {
						list: obj[list[i][field]] ? obj[list[i][field]].list : []
						// type: list[i].type
					}
				}
			}
			obj[list[i][field]].list.push(list[i])
		}
		var att = []
		for (let item in obj) {
			att.push({
				list: obj[item].list
				// type: obj[item].type
			})
		}
		return att
	}

	function addDate(days) {
		const date = new Date();
		date.setDate(date.getDate() + days);

		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');

		return `${year}-${month}-${day}`;
	}

	/**
	 * 复制内容到剪贴板
	 * @param {data} 复制的内容
	 * @param {msg}  复制完后的提示语
	 */
	const copyData = (data, msg) => {
		const message = msg ? msg + '已复制！' : '内容已复制';
		uni.setClipboardData({
			data: data,
			success: function() {
				uni.showToast({
					title: message
				})
			}
		})
	}

	/**
	 * 从接口的Extras中获取某项下拉列表的options
	 * this.busTypeOptions.push(this.$u.func.getEnumOptions(res.Extras.Enums, "BusType"));
	 */
	const getEnumOptions = (data, name) => {
		let search = (data || []).filter(item => {
			if (item.Name == name) {
				return item
			}
		})
		return search.length == 0 ? [] : search[0].Options
	}

	// 将各个定义的方法，统一放进对象挂载到vm.$u.func(因为vm就是this，也即this.$u.func)下
	Vue.prototype.$u.func = {
		routeTo,
		pagerCount,
		multilineTextToHtml,
		removeJsonEmptyValueKey,
		listGroupBy,
		disablePageSlide,
		enablePageSlide,
		addDate,
		copyData,
		getEnumOptions,
	}
}

export default {
	install
}