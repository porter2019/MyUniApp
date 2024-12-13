<template>
	<view class="h-page">
		<view class="my-search">
			<u-search placeholder="输入搜索的关键字" shape="square" :showAction="false" v-model="keyword"></u-search>
		</view>
		<u-gap height="10"></u-gap>
		<view class="demo1">
			<u-grid :border="true">
				<!-- <u-grid-item @click="$u.func.routeTo('page-old')">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" name="map" :size="26"></u-icon>
					<text>旧分页列表</text>
				</u-grid-item> -->
				<u-grid-item @click="$u.func.routeTo('/pagesX/pagelist/simple')">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" name="map" :size="26"></u-icon>
					<text>无tab的</text>
				</u-grid-item>
				<u-grid-item @click="$u.func.routeTo('/pagesX/pagelist/more-tab')">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" name="volume" :size="26"></u-icon>
					<text>多tab</text>
				</u-grid-item>
				<u-grid-item @click="$u.func.routeTo('/pagesX/pagelist/swiper-tab/swiper-tab')">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" name="star" :size="26"></u-icon>
					<text>多tab-滑动</text>
				</u-grid-item>
				<u-grid-item @click="switchSys()">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" name="list" :size="26"></u-icon>
					<text>切换tabbar</text>
				</u-grid-item>
				<u-grid-item @click="chanBadge">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" name="info-circle" :size="26"></u-icon>
					<text>修改底部数字</text>
				</u-grid-item>
				<u-grid-item @click="$u.route({url:'/pagesX/index/index'})">
					<u-icon :customStyle="{paddingTop:20+'rpx'}" name="photo" :size="26"></u-icon>
					<text>功能示例</text>
				</u-grid-item>
			</u-grid>
		</view>


		<tab-bar name="home"></tab-bar>
	</view>
</template>

<script>
	import tabbarData from '@/common/tabbar'
	export default {
		data() {
			return {
				keyword: ''
			}
		},
		onShow() {
			const jump = uni.getStorageSync('jump');
			if (jump) {
				console.log('跳转参数：', jump);
			}
		},
		onLoad() {
			// 影藏原生的tabbar,有自定义tabbar的页面都要写一遍
			uni.hideTabBar()
		},
		methods: {
			switchSys() {
				//demo/uni这个在tabbar中定义了，只能通过switchTab的方式打开
				uni.switchTab({
					url: "/pages/sys/sys"
				})
			},
			chanBadge() {
				tabbarData.admin[1].badge = tabbarData.admin[1].badge + 1
				tabbarData.admin[2].dot = true
			}
		},
		//分享给朋友
		onShareAppMessage(res) {
			if (res.from === 'button') { // 来自页面内分享按钮
				// console.log(res.target)
			}
			return {
				title: '分享的标题',
				path: '/pages/index/index'
			}
		},
		//分享到朋友圈
		onShareTimeline(res) {
			return {
				title: '分享的标题',
				path: '/pages/index/index'
			}
		},
	}
</script>

<style lang="scss">
	.my-search {
		background-color: #FFF;
		padding: 20rpx;
	}

	.demo1 {
		padding: 30rpx;
		background-color: #FFF;

		.u-grid-item {
			padding: 42rpx 0;

			text {
				margin-top: 20rpx;
				font-size: 26rpx;
			}
		}
	}
</style>