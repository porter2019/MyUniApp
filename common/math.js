// 全局公共方法
// 此处第二个参数vm，也就是页面使用的this
const install = (Vue, vm) => {

	/**
	 * 判断是否为一个整数
	 * @param {*} obj 
	 */
	const isInteger = (obj) => {
		return Math.floor(obj) === obj
	}

	/**
	 * 加法 
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	const add = (arg1, arg2) => {
		var r1, r2, m
		try {
			r1 = arg1.toString().split('.')[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split('.')[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2))
		return (multiply(arg1, m) + multiply(arg2, m)) / m
	}

	/**
	 * 减法
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	const subtract = (arg1, arg2) => {
		var r1, r2, m
		try {
			r1 = arg1.toString().split('.')[1].length
		} catch (e) {
			r1 = 0
		}
		try {
			r2 = arg2.toString().split('.')[1].length
		} catch (e) {
			r2 = 0
		}
		m = Math.pow(10, Math.max(r1, r2))
		return (multiply(arg1, m) - multiply(arg2, m)) / m
	}

	/**
	 * 乘法
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	const multiply = (arg1, arg2) => {
		var m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString()
		try {
			m += s1.split('.')[1].length
		} catch (e) {}
		try {
			m += s2.split('.')[1].length
		} catch (e) {}
		return (
			(Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) /
			Math.pow(10, m)
		)
	}

	/**
	 * 除法
	 * @param {*} arg1 
	 * @param {*} arg2 
	 */
	const divide = (arg1, arg2) => {
		var t1 = 0,
			t2 = 0,
			r1,
			r2
		try {
			t1 = arg1.toString().split('.')[1].length
		} catch (e) {}
		try {
			t2 = arg2.toString().split('.')[1].length
		} catch (e) {}
		r1 = Number(arg1.toString().replace('.', ''))
		r2 = Number(arg2.toString().replace('.', ''))
		return (r1 / r2) * Math.pow(10, t2 - t1)
	}

	// 将各个定义的方法，统一放进对象挂载到vm.$u.math(因为vm就是this，也即this.$u.math)下
	Vue.prototype.$u.math = {
		isInteger,
		add,
		subtract,
		multiply,
		divide,
	}
}

export default {
	install
}
