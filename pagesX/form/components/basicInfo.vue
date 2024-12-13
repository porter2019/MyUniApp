<template>
	<view class="h-page">
		<view class="form-show">
			<view class="form-item">
				<view class="title">
					<view class="line"></view>
					<text>基本信息</text>
				</view>
				<u-row align="top">
					<u-col span="4">
						车牌号
					</u-col>
					<u-col span="8" textAlign="right">
						{{ formData.PlantNum }}
					</u-col>
				</u-row>
				<u-row align="top">
					<u-col span="4">
						车辆编号
					</u-col>
					<u-col span="8" textAlign="right">
						{{ formData.Code }}
					</u-col>
				</u-row>
				<u-row align="top">
					<u-col span="4">
						司机信息
					</u-col>
					<u-col span="8" textAlign="right">
						{{ formData.SysUserName }}/{{ formData.SysUserPhone }}
					</u-col>
				</u-row>
				<u-row align="top">
					<u-col span="4">
						皮重
					</u-col>
					<u-col span="8" textAlign="right" customStyle="color:#FD4722">
						￥{{ $u.format.formatMoney(formData.Tare) }}
					</u-col>
				</u-row>
				<u-row align="top">
					<u-col span="4">
						多行文本
					</u-col>
					<u-col span="8" textAlign="right">
						<view class="multiline-text">
							<u-parse :content="formData.Remark || '暂无'"></u-parse>
						</view>
					</u-col>
				</u-row>
				<u-row align="top">
					<u-col span="4">
						创建时间
					</u-col>
					<u-col span="8" textAlign="right">
						{{ formData.CreatedTime | date('yyyy-mm-dd hh:MM') }} <!-- 只要日期可以使用date -->
					</u-col>
				</u-row>
			</view>
			<view class="form-item">
				<view class="title">
					<view class="line"></view>
					<text>相册</text>
				</view>
				<u-row align="top">
					<u-col span="12">
						<template v-if="(formData.AttachList || []).length > 0">
							<u-album :urls="formData.AttachList"></u-album>
						</template>
						<template v-else>
							暂无
						</template>
					</u-col>
				</u-row>
			</view>
			<view class="form-item">
				<view class="title">
					<view class="line"></view>
					<text>附件</text>
				</view>
				<u-row align="top">
					<u-col span="4">
						附件
					</u-col>
					<u-col span="8" textAlign="right">
						<view class="attach-list">
							<template v-if="(formData.AttachList || []).length > 0">
								<u-link v-for="(item,index) in (formData.AttachList || [])" :href="item.FileWebPath"
									:text="item.FileName" :under-line="true" color="#0084FF" line-color="#0084FF"
									:key="index">
								</u-link>
							</template>
							<template v-else>
								暂无
							</template>
						</view>
					</u-col>
				</u-row>
			</view>

			<view class="btn-row">
				<u-button type="primary" shape="circle" hairline text="编辑" @click="goEdit">
				</u-button>
				<u-button type="info" shape="circle" hairline text="返回" @click="goBack">
				</u-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "comBasicInfo",
		props: {
			dataId: {
				type: Number,
				required: true
			},
		},
		data() {
			return {
				formData: {}
			}
		},
		mounted() {
			this.getDataInfo()
		},
		methods: {
			getDataInfo() {
				uni.$u.http.get('/api/CarInfo/get/info', {
					params: {
						id: this.dataId
					}
				}).then(res => {
					this.formData = res.Data || {}
					this.formData.Remark =
						'此组件一般需要搭配Form组件使用，也可以单独搭配Input等组件使用，由于此组件参数较多，这里只对其中参数最简要介绍，其余请见底部的API说明：';
					this.formData.AttachList = [{
						"FilePath": "/uploads/bridge1/352fe9de6b12495f97be0b7d0940c556.jpg",
						"FileWebPath": "http://localhost:6100/uploads/bridge1/352fe9de6b12495f97be0b7d0940c556.jpg",
						"src": "http://localhost:6100/uploads/bridge1/352fe9de6b12495f97be0b7d0940c556.jpg",
						"FileName": "文件名BBBBB.jpg",
					}, {
						"FilePath": "/uploads/bridge1/95d1417ae8174e1ab58adf209528d1b9.jpg",
						"FileWebPath": "http://localhost:6100/uploads/bridge1/95d1417ae8174e1ab58adf209528d1b9.jpg",
						"src": "http://localhost:6100/uploads/bridge1/95d1417ae8174e1ab58adf209528d1b9.jpg",
						"FileName": "文件名AAAAA.jpg",
					}]
				})
			},
			goEdit(){
				this.$u.func.routeTo('/pagesX/form/edit',{id:this.dataId})
			},
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	
</style>