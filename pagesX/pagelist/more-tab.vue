<template>
	<view class="h-page">
		<myPaging ref="paging" v-model="dataList" @query="getDataList">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<template #top>
				<view class="search-box">
					<view class="search">
						<u-search placeholder="请输入搜索内容" :height="32" search-icon-color="#177AD2" :showAction="true"
							action-text="搜索" :animation="true" v-model="searchWord" @search="onSearchWord"
							@custom="onSearchWord" @clear="onSearchWord"></u-search>
					</view>
					<view class="filter" @click="onOpenSearchPopup">
						<image src="@/static/filter.png"></image>
					</view>
				</view>
				<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
				<z-tabs :list="tabList" @change="onTabsChange" />
			</template>
			<u-gap height="10"></u-gap>
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view class="item" v-for="(item,index) in dataList" :key="index" @click="onItemClick(item)">
				<view class="item-title">{{item.SysUserName}}</view>
				<view class="item-title">{{item.SysUserPhone}}</view>
				<view class="item-detail">{{item.PlantNum}}</view>
				<view class="item-line"></view>
			</view>
		</myPaging>

		<!-- 搜索弹框 -->
		<u-popup :show="searchPopupVisible" mode="right" @close="onCloseSearchPopup">
			<scroll-view class="search-popup-scroll" scroll-y="true">
				<u-collapse :value="['0','1','2','3']" :border="false">
					<!-- <u-collapse-item title="发布时间" name="0">
						<u-tag text="请选择" :show="!pageQuery.ReleaseDate" @click="searchDateVisible=true" size="large" plain color="#D3D6DC" borderColor="#dadbde"></u-tag>
						<u-tag :text="pageQuery.ReleaseDate" :show="pageQuery.ReleaseDate" @click="searchDateVisible=true" @close="delete pageQuery.ReleaseDate" closable size="large" plain color="#D3D6DC" borderColor="#dadbde"></u-tag>
					</u-collapse-item> -->
					<u-collapse-item title="车牌号" name="0">
						<u-input v-model="pageQuery.PlantNum" placeholder="请输入"></u-input>
					</u-collapse-item>
					<u-collapse-item title="司机名称" name="1">
						<u-input v-model="pageQuery.SysUserName" placeholder="请输入"></u-input>
					</u-collapse-item>
					<u-collapse-item title="司机手机号" name="2">
						<u-input v-model="pageQuery.SysUserPhone" placeholder="请输入"></u-input>
					</u-collapse-item>
					<u-collapse-item title="状态" name="3">
						<u-radio-group v-model="pageQuery.Flag" @change="pageQuery.Flag=$event" placement="column"
							iconPlacement="right" :borderBottom="true">
							<u-radio v-for="(item, index) in flagOptions" :key="index" :label="item.Label"
								:name="item.Value" activeColor="#177AD2" :customStyle="{marginBottom: '16px'}">
							</u-radio>
						</u-radio-group>
					</u-collapse-item>
				</u-collapse>


			</scroll-view>
			<view class="search-popup-foot">
				<u-button shape="circle" @click="onResetSearch">重置</u-button>
				<u-button type="primary" shape="circle" @click="onSearchMore">搜索</u-button>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import myPaging from '@/components/my-paging/my-paging.vue'	
	export default {
		components: {
			myPaging,
		},
		data() {
			return {
				searchWord: '',
				pageQuery: {
					PageInfo: {
						PageIndex: 1,
						PageSize: 6,
						OrderBy: ''
					}
				},
				dataList: [], // v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				tabList: ['测试1', '测试2'],
				tabIndex: 0,
				flagOptions: [],
				searchPopupVisible: false,
			}
		},
		methods: {
			onTabsChange(index) {
				this.tabIndex = index;
				// 当切换tab或搜索时请调用组件的reload方法，请勿直接调用：getDataList方法！！
				this.$refs.paging.reload(true);
			},
			getDataList(pageNo, pageSize) {
				// 组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				// 这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				// 模拟请求服务器获取分页数据，请替换成自己的网络请求
				this.$u.func.removeJsonEmptyValueKey(this.pageQuery)
				this.pageQuery.PageSize = pageSize
				this.pageQuery.PageIndex = pageNo
				this.pageQuery.tab = this.tabIndex
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
			},
			onSearchWord() {
				this.$refs.paging.reload(true);
			},
			onSearchMore() {
				this.$refs.paging.reload(true);
				this.onCloseSearchPopup()
			},
			onResetSearch() {
				this.pageQuery = {
					PageInfo: {
						PageIndex: 1,
						PageSize: 6,
						OrderBy: ''
					}
				}
				this.$refs.paging.reload(true);
			},
			onOpenSearchPopup() {
				this.searchPopupVisible = true;
				this.$u.func.disablePageSlide();
			},
			onCloseSearchPopup() {
				this.searchPopupVisible = false;
				this.$u.func.enablePageSlide();
			},
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
			width: 90%;
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