// 全局公共方法
// 此处第二个参数vm，也就是页面使用的this
const install = (Vue, vm) => {

	/**
	 * 数字保留指定位数，浮点型数字运算精度丢失修复
	 * @param {*} n 
	 * @param {*} d 
	 */
	const toFixed = (n, d) => {
		// 判断是小数
		var isFloat = parseInt(n) < parseFloat(n)

		if (typeof(d) == 'undefined') {
			// 获取浮点型数值的小数位数
			d = (n != Math.floor(n)) ? (n.toString()).split('.')[1].length : 0
		}

		if (isFloat) {
			n = Number(n)
			d = Number(d)
			n = n * Math.pow(10, d)
			n = Math.round(n)
			n = Number(n)
			n = n / Math.pow(10, d)
			n = n.toFixed(d)
			n = Number(n)
		} else {
			n = Number(n)
		}

		return n
	}

	/**
	 * 格式化金额 
	 * @param {*} number 要格式化的数字
	 * @param {*} decimals 保留几位小数，默认4位
	 * @param {*} dec_point 小数点符号，默认.
	 * @param {*} thousands_sep 千分位符号，默认,
	 * @param {*} roundtag 舍入参数("ceil" 向上取,"floor"向下取,"round" 四舍五入)，默认:round
	 */
	const formatMoney = (number, decimals, dec_point, thousands_sep, roundtag) => {
		if (!number) {
			number = 0
		}
		if (!decimals) {
			decimals = 4 // 默认保留4位小数
		}
		if (!dec_point) {
			dec_point = '.'
		}
		if (!thousands_sep) {
			thousands_sep = ','
		}
		if (!roundtag) {
			roundtag = 'round'
		}
		number = (number + '').replace(/[^0-9+-Ee.]/g, '')
		roundtag = roundtag || 'ceil' // "ceil","floor","round"
		var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function(n, prec) {

				var k = Math.pow(10, prec)

				return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec *
					2)) / k
			}
		s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
		var re = /(-?\d+)(\d{3})/
		while (re.test(s[0])) {
			s[0] = s[0].replace(re, '$1' + sep + '$2')
		}

		if ((s[1] || '').length < prec) {
			s[1] = s[1] || ''
			s[1] += new Array(prec - s[1].length + 1).join('0')
		}
		var result = s.join(dec)
		var resultArray = result.split('.')
		var lastNumber = Number(resultArray[1])
		if (lastNumber > 0) {
			return resultArray[0] + '.' + lastNumber.toString().replace(/(0+)$/g, '') // 去掉末尾的0
		} else {
			return resultArray[0]
		}
		// return s.join(dec)
	}
	
	/**
	 * 格式化时间，默认不带秒 
	 * @param {*} dateTime 
	 * @param {*} template 
	 * 前端直接调用内置的：this.$u.timeFormat('时间')
	 * 过滤器写法 
	 *          {{'22-06-23 17:26:27' | date}}
	 *          {{'22-06-23 17:26:27' | date('yyyy-mm-dd hh:MM')}}
	 */
	const formatDateTime = (dateTime,template) =>{
		template = template || 'yyyy-mm-dd hh:MM'
		return vm.$u.timeFormat(dateTime,template)
	}
	
	// 将各个定义的方法，统一放进对象挂载到vm.$u.format(因为vm就是this，也即this.$u.format)下
	Vue.prototype.$u.format = {
		toFixed,
		formatMoney,
		formatDateTime,
	}
}

export default {
	install
}
