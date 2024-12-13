<template>
	<view class="h-page">
		<myPaging ref="paging" v-model="dataList" @query="getDataList">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<template #top>
				<view class="search-box">
					<view class="search">
						<u-search placeholder="请输入搜索内容" :height="32" :showAction="true" action-text="搜索"
							:animation="true" v-model="pageQuery.KeyWord" @search="onSearchWord" @custom="onSearchWord"
							@clear="onSearchWord"></u-search>
					</view>
				</view>
			</template>
			<u-gap height="10"></u-gap>
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view class="list-data">
				<view class="item" v-for="(item,index) in dataList" :key="index" @click="onItemClick(item)">
					<view class="item-title">{{item.SysUserName}}</view>
					<view class="item-title">{{item.SysUserPhone}}</view>
					<view class="item-detail">{{item.PlantNum}}</view>
					<view class="item-line"></view>
				</view>
			</view>
		</myPaging>
	</view>
</template>

<script>
	import myPaging from '@/components/my-paging/my-paging.vue'
	export default {
		components: {
			myPaging
		},
		data() {
			return {
				pageQuery: {
					PageInfo: {
						PageIndex: 1,
						PageSize: 6,
						OrderBy: ''
					},
					KeyWord: '',
				},
				dataList: [], // v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				flagOptions: []
			}
		},
		methods: {
			getDataList(pageNo, pageSize) {
				// 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				// 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				// 模拟请求服务器获取分页数据，请替换成自己的网络请求
				this.$u.func.removeJsonEmptyValueKey(this.pageQuery)
				this.pageQuery.PageInfo.PageSize = pageSize
				this.pageQuery.PageInfo.PageIndex = pageNo
				uni.$u.http.post('/api/CarInfo/get/pagelist', this.pageQuery).then(res => {
					this.$refs.paging.complete(res.Data.Items);

					this.flagOptions = res.Extras.Enums.filter(item => {
						if (item.Name == 'Flag') {
							return item
						}
					})[0].Options
				}).catch(res => {
					// 如果请求失败写this.$refs.paging.complete(false);
					// 注意，每次都需要在catch中写这句话很麻烦，z-paging提供了方案可以全局统一处理
					// 在底层的网络请求抛出异常时，写uni.$emit('z-paging-error-emit');即可
					this.$refs.paging.complete(false);
				})
			},
			onItemClick(item) {
				console.log('点击了', item.PlantNum);
				this.$u.func.routeTo('/pagesX/form/show', {
					id: item.Id
				})
			},
			onSearchWord() {
				this.$refs.paging.reload(true);
			}
		}
	}
</script>

<style lang="scss">
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

	.notice {
		background-color: red;
		color: white;
		display: flex;
		flex-direction: column;
		padding: 12rpx 20rpx;
		font-size: 24rpx;
	}
	
	.list-data{
		margin-top: 20rpx;
		background-color: #FFF;
	}
	.item {
		background-color: #FFF;
		position: relative;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0rpx 30rpx;
	}

	.item-detail {
		padding: 5rpx 15rpx;
		border-radius: 10rpx;
		font-size: 28rpx;
		color: white;
		background-color: #007AFF;
	}

	.item-line {
		position: absolute;
		bottom: 0rpx;
		left: 0rpx;
		height: 1px;
		width: 100%;
		background-color: #eeeeee;
	}
</style>