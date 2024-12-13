<template>
	<view class="h-page">
		<view class="user">
			<view class="avatar">
				<u--image :showLoading="true" src="https://cdn.uviewui.com/uview/album/1.jpg" width="80px" height="80px"
					radius="10"></u--image>
			</view>
			<view class="userinfo">
				<view class="username">{{ userName }}</view>
				<view class="cellphone">{{ cellPhone }}</view>
			</view>
			<view class="userright">
				<u-icon name="arrow-right"></u-icon>
			</view>
		</view>
		<u-gap height="20"></u-gap>
		<view class="func">
			<u-cell-group>
				<u-cell size="large" icon="list-dot" title="个人资料修改" :isLink="true"></u-cell>
				<u-cell size="large" icon="car" title="车辆管理" :isLink="true" url="/pages/demo/pageList"></u-cell>
				<u-cell size="large" icon="grid" title="用户管理" :isLink="true" url="/pages/demo/uni"></u-cell>
				<u-cell size="large" icon="setting" title="系统设置" :isLink="true"></u-cell>
				<u-cell size="large" icon="more-dot-fill" title="更多设置" :isLink="true"></u-cell>
			</u-cell-group>
		</view>
		<u-gap height="40"></u-gap>
		<view class="logout">
			<view>
				<u-button type="info" plain hairline @click="logout" text="退出登录">
				</u-button>
			</view>
		</view>

		<tab-bar name="mine"></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userName: this.$store.getters.user_info.UserName,
				cellPhone: this.$store.getters.user_info.CellPhone
			}
		},
		onLoad() {
			// 影藏原生的tabbar,有自定义tabbar的页面都要写一遍
			uni.hideTabBar()
			console.log('当前用户信息', this.$store.getters.user_info.UserName);
		},
		methods: {
			logout() {
				uni.showModal({
					title: "提示",
					content: "确定退出登录吗?",
					success: (res) => {
						if (res.confirm) {
							this.$store.commit('logout', () => {
								this.$u.func.routeTo('login')
							})
						} else if (res.cancel) {
							// console.log('取消');
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.user {
		background-color: #FFF;
		padding: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.userinfo {
			width: 65%;

			.username {
				font-size: 16px;
			}

			.cellphone {
				font-size: 14px;
				margin-top: 10rpx;
			}
		}
	}

	.func {
		background-color: #FFF;
	}
</style>