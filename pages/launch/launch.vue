<template>
	<view>
		<!-- 启动页，已弃用，用户信息拉取在app.vue中进行 -->
		<u-loading-page :loading="true"></u-loading-page>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				redirect: ''
			};
		},
		async onLoad(option) {
			console.log('进入Launch页面...');
			this.redirect = decodeURIComponent(option.redirect || '') || '/pages/index/index'
			await this.checkRedirect()
		},
		methods: {
			async checkRedirect() {
				if (this.$store.getters.has_token) {
					//1. 拉取用户基本信息
					await this.loadUserInfo().then(res => {
						this.$store.commit('setUserInfo', res)
					}).catch((error) => {
						this.$u.toast(error)
						throw error
					});
					//2. 拉取权限列表
					await this.loadPermissions().then(res => {
						this.$store.commit('setPermissions', res)
					}).catch((error) => {
						this.$u.toast(error)
						throw error
					});
					uni.reLaunch({
						url: this.redirect
					})
				} else {
					uni.reLaunch({
						url: "/pages/account/login?redirect=" + this.redirect
					})
				}
			},
			//加载用户信息
			loadUserInfo() {
				return new Promise((resolve, reject) => {
					uni.$u.http.post('/api/Current/get/user/info').then(res => {
						if (res.Data) {
							resolve(res.Data)
						} else {
							reject(new Error('远程返回的用户信息有误'))
						}
					})
				})
			
			},
			//加载用户权限
			loadPermissions() {
				return new Promise((resolve) => {
					uni.$u.http.get('/api/Current/get/permission/list').then(res => {
						if (res.Data) {
							resolve(res.Data)
						} else {
							reject(new Error('权限信息获取失败'))
						}
					})
				})
			},
		}
	}
</script>

<style lang="scss">

</style>
