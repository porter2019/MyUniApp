import Vue from "vue";
export const state = {
	token: uni.getStorageSync("AccessToken") || "",
	user_info: process.env.NODE_ENV === 'development' ? (uni.getStorageSync('userInfo') || {}) : {},
	permissions: process.env.NODE_ENV === 'development' ? (uni.getStorageSync('userPermissions') || []) : []
};

export const getters = {
	has_token: (state) => {
		return state.token ? true : false
	},
	is_login: (state) => {
		return Object.keys(state.user_info || {}).length > 0 && state.permissions.length > 0
	},
	user_info: (state) => {
		return state.user_info
	},
	has_auth: (state) => (val) => {
		// this.$store.getters.has_auth('12')
		let auth
		if (typeof val === "string") {
			auth = hasPermission(state, val)
		} else {
			auth = val.some(item => {
				return hasPermission(state, item)
			})
		}
		return auth
	}
};

function hasPermission(state, permission) {
	if (state.permissions.indexOf('ALL') != -1) {
		return true
	} else {
		return state.permissions.some(v => {
			return v.toLowerCase() === permission.toLowerCase()
		})
	}
}

export const mutations = {
	//登陆储存用户信息
	setToken(state, data) {
		if (data) {
			state.token = data
			//只把token存起来，用户信息和权限每次进来重新获取
			uni.setStorageSync('AccessToken', state.token);
		}
	},
	//登陆储存用户信息
	setUserInfo(state, data) {
		if (data) {
			data.RoleType = 1; //用户身份类别
			state.user_info = data
			// 开发环境使用，生产注释
			if (process.env.NODE_ENV === 'development') {
				uni.setStorageSync('userInfo', data);
			}
		}
	},
	//更新头像
	changeUserAvatar(state, newUrl) {
		if (newUrl) {
			state.user_info.Avatar = newUrl
		}
	},
	setPermissions(state, data) {
		if (data) {
			state.permissions = data
			if (process.env.NODE_ENV === 'development') {
				uni.setStorageSync('userPermissions', data);
			}
		}
	},
	//用户退出
	logout(state, onSuccess) {
		state.user_info = {};
		state.token = ""
		state.permissions = []
		uni.removeStorageSync("AccessToken");
		uni.removeStorageSync("userInfo");
		uni.removeStorageSync("userPermissions");
		onSuccess && onSuccess()
		// uni.showModal({
		// 	title: '提示',
		// 	content: '您确定要退出登录？',
		// 	success: function(res) {
		// 		if (res.confirm) {
		// 			// uni.switchTab({
		// 			// 	url: '/pages/index/index/index',
		// 			// 	animationType: 'pop-in',
		// 			// 	animationDuration: 300
		// 			// });
		// 			state.user_info = {};
		// 			state.token = ""
		// 			state.permissions = []
		// 			uni.removeStorageSync("AccessToken");
		// 			uni.removeStorageSync("userInfo");
		// 			uni.removeStorageSync("userPermissions");
		// 			onSuccess()
		// 		} else if (res.cancel) {
		// 			console.log("取消退出登录")
		// 		}
		// 	}
		// })
	},
};
export const actions = {};