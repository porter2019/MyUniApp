<template>
	<view class="h-page">
		<z-paging ref="pagePaging" refresher-only @onRefresh="onRefresh" @scrolltolower="scrolltolower">
			<view class="search-box">
				<view class="search">
					<u-search placeholder="请输入搜索内容" :height="32" shape="square" search-icon-color="rgb(0, 122, 255)"
						:showAction="true" action-text="搜索" :animation="true" v-model="searchWord"
						@search="onSearchWord" @custom="onSearchWord" @clear="onSearchWord"></u-search>
				</view>
			</view>
			<view>
				<!-- 小程序中直接修改组件style为position: sticky;无效，需要在组件外层套一层view -->
				<view style="z-index: 100;position: sticky;top :0;">
					<z-tabs ref="tabs" :current="current" :list="tabList"
						@change="tabsChange" />
				</view>
				<swiper class="swiper" :style="[{height:swiperHeight+'px'}]" :current="current"
					@transition="swiperTransition" @animationfinish="swiperAnimationfinish">
					<swiper-item class="swiper-item" v-for="(item, index) in tabList" :key="index">
						<!-- 每个tab都提到组件里，代码精简一些 -->
						<comItemInfo ref="swiperList" :tabIndex="index" :currentIndex="current" :searchWord="searchWord"
							@heightChanged="heightChanged">
						</comItemInfo>
					</swiper-item>
				</swiper>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import comItemInfo from './components/itemInfo.vue'
	export default {
		components: {
			comItemInfo,
		},
		data() {
			return {
				swiperHeight: 0,
				tabList: ['待接单', '已接单'],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				searchWord: '',
			}
		},
		methods: {
			onSearchWord() {
				this.$refs.swiperList[this.current].reload();
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this._setCurrent(index);
			},
			// 下拉刷新时，通知当前显示的列表进行reload操作
			onRefresh() {
				this.$refs.swiperList[this.current].reload(() => {
					//当当前显示的列表刷新结束，结束当前页面的刷新状态
					this.$refs.pagePaging.endRefresh();
				});
			},
			// 当滚动到底部时，通知当前显示的列表加载更多
			scrolltolower() {
				this.$refs.swiperList[this.current].doLoadMore();
			},
			// swiper滑动中
			swiperTransition(e) {
				this.$refs.tabs.setDx(e.detail.dx);
			},
			// swiper滑动结束
			swiperAnimationfinish(e) {
				this._setCurrent(e.detail.current);
				this.$refs.tabs.unlockDx();
			},
			// 设置swiper的高度
			heightChanged(height) {
				if (height === 0) {
					// 默认swiper高度为屏幕可用高度-tabsView高度-slot="top"内view的高度
					// 注意：this.rpx2px(80)不是固定的，它等于slot="top"内view的高度，如果slot="top"内view的高度不为80rpx，则需要修改这个值
					height = uni.getSystemInfoSync().windowHeight - this.rpx2px(80);
				}
				this.swiperHeight = height;
			},
			_setCurrent(current) {
				if (current !== this.current) {
					//切换tab时，将上一个tab的数据清空
					this.$refs.swiperList[this.current].clear();
				}
				this.current = current;
			},

			// rpx => px，兼容鸿蒙
			rpx2px(rpx) {
				// #ifdef APP-HARMONY
				const screenWidth = uni.getSystemInfoSync().screenWidth;
				return (screenWidth * Number.parseFloat(rpx)) / 750;
				// #endif
				// #ifndef APP-HARMONY
				return uni.upx2px(rpx);
				// #endif
			}
		}
	}
</script>

<style lang="scss">
	.banner-view {
		background-color: #007AFF;
		color: white;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.paging-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.swiper {
		height: 1000px;
	}

	.search-box {
		padding: 15rpx 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #FFF;

		.search {
			width: 100%;
		}

		.filter {
			// width: 10%;
			display: flex;
			align-items: center;
			justify-content: end;

			image {
				width: 22px;
				height: 22px;
			}
		}
	}
</style>