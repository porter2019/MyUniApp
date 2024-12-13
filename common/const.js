import config from '@/common/config.js'
// 全局公共方法
// 此处第二个参数vm，也就是页面使用的this
const install = (Vue, vm) => {
	//首页地址
	const IndexPageUrl = "/pages/index/index";
	
	//文件上传地址
	const UploadAction = config.baseUrl + '/api/file/upload'
	
	// 是不是有效的手机号
	const RegEx_CellPhone = /^[1][3,4,5,7,8,9][0-9]{9}$/
	// 是不是有效的金额，不允许为负，支持小数点两位
	const RegEx_Money = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/
	// 是不是有效的金额，不允许为负，支持小数点三位
	const RegEx_Money3 = /((^[1-9]\d*)|^0)(\.\d{0,3}){0,1}$/
	// 是不是有效的金额，不允许为负，支持小数点四位
	const RegEx_Money4 = /((^[1-9]\d*)|^0)(\.\d{0,4}){0,1}$/
	// 是否为网址
	const RegEX_WebUrl = /^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/
	// 发票税率
	const TaxRateOptions = [
	    { Label: '0', Value: 0 },
	    { Label: '1', Value: 1 },
	]
	
	// 租期单位
	const LeaseTermUnitOptions = [
	    { Label: '年', Value: 1 },
	]
	// 将各个定义的方法，统一放进对象挂载到vm.$u.const(因为vm就是this，也即this.$u.const)下
	Vue.prototype.$u.const = {
		IndexPageUrl,
		UploadAction,
		RegEx_CellPhone,
		RegEx_Money,
		RegEx_Money3,
		RegEx_Money4,
		RegEX_WebUrl,
		TaxRateOptions,
		LeaseTermUnitOptions,
	}
}

export default {
	install
}