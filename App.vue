<script>
	export default {
		onLaunch:async function(option) {
			const updateManager = uni.getUpdateManager() // 小程序版本更新管理器
			updateManager.onCheckForUpdate(res => { // 检测新版本后的回调
				if (res.hasUpdate) { // 如果有新版本提醒并进行强制升级
					uni.showModal({
						content: '新版本已经准备好，是否重启应用？',
						showCancel: false,
						confirmText: '确定',
						success: res => {
							if (res.confirm) {
								updateManager.onUpdateReady(res => { // 新版本下载完成的回调
									updateManager.applyUpdate() // 强制当前小程序应用上新版本并重启
								})

								updateManager.onUpdateFailed(res => { // 新版本下载失败的回调
									// 新版本下载失败，提示用户删除后通过冷启动重新打开
									uni.showModal({
										content: '下载失败，请删除当前小程序后重新打开',
										showCancel: false,
										confirmText: '知道了'
									})
								})
							}
						}
					})
				}
			})
			console.log('App Launch')
			//检查登录状态
			await this.checkState(option.redirect)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods: {
			async checkState(redirect) {
				if (this.$store.getters.has_token) {
					//1. 拉取用户基本信息
					await this.loadUserInfo().then(res => {
						this.$store.commit('setUserInfo', res)
						console.log('app.vue中拉取完用户信息了');
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
				} else {
					const loginPage = redirect ? "/pages/account/login?redirect=" + redirect : "/pages/account/login"
					uni.reLaunch({
						url: loginPage
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
	/*每个页面公共css */
	@import "@/uni_modules/uview-ui/index.scss";

	page {
		background-color: #F2F2F2;
	}

	.u-sticky {
		width: 100%;
	}

	.u-row-link-text {
		color: #198BFF;
		text-decoration: underline;
	}

	.h-page {
		// width: 100%;
		// height: 100vh;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		// align-items: center;
		justify-content: center;
		// padding-bottom: constant(safe-area-inset-bottom);
		// padding-bottom: env(safe-area-inset-bottom);
		// box-sizing: content-box;
	}

	// 表单详情公共样式,必须全局,不然无法覆盖uview组件的样式
	.form-show {
		margin: 20rpx 30rpx;
		margin-bottom: 80px;

		.form-item {
			border-radius: 16rpx;
			background-color: #FFF;
			padding-bottom: 40rpx;
			margin-bottom: 20rpx;

			.title {
				padding: 28rpx 0;
				color: #1296DB;
				font-size: 32rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid rgb(214, 215, 217);

				.line {
					width: 6rpx;
					height: 28rpx;
					background-color: #1296DB;
					margin-right: 20rpx;
				}

			}

			.u-row {
				margin: 20rpx 0;
				padding: 20rpx 32rpx;
				border-bottom: 1rpx solid #F2F2F2;
			}

			.attach-list {
				uni-text {
					margin-bottom: 20rpx;
					float: right;
				}
			}

		}

		.btn-row {
			width: 100%;
			margin-top: 60rpx;

			.u-button {
				margin-top: 30rpx;
			}
		}
	}

	// 编辑表单的样式
	.form-edit {
		margin: 20rpx 30rpx;
		margin-bottom: 80px;

		.u-form {
			background-color: #FFF;
			border-radius: 16rpx;
			padding: 20rpx 40rpx;

			.form-item-title {
				padding: 28rpx 0;
				color: #1296DB;
				font-size: 36rpx;
				display: flex;
				align-items: center;
				border-bottom: 1rpx solid rgb(214, 215, 217);

				.line {
					width: 6rpx;
					height: 28rpx;
					background-color: #1296DB;
					margin: 8rpx 10rpx 0 0;
				}

			}

		}

		::v-deep input,
		::v-deep textarea,
		::v-deep span {
			font-size: 28rpx;
		}

		.btns {
			width: 100%;
			margin-top: 60rpx;

			.u-button {
				margin-top: 30rpx;
			}
		}

	}

	// 弹框的样式
	.h-dialog {
		// margin: 80rpx 20rpx 20rpx 20rpx;
		margin: 20rpx;
		padding: 20rpx;
		display: flex;
		flex-direction: column;

		.title-dialog {
			font-size: 16px;
			color: #111111;
		}

		.form-edit-dialog {
			margin: 40rpx 0;
			width: 100%;
			display: flex;
			justify-form-edit-dialog: center;

			.u-form {
				width: 100%;
			}
		}

		.foot-dialog {
			margin-top: 20rpx;
			display: flex;
			flex-direction: row;

			.u-button {
				width: 40%;
			}
		}
	}
</style>