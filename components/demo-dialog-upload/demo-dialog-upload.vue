<template>
	<view>
		<u-popup :show="visible" :round="10" mode="center" @close="onClose">
			<view class="h-dialog">
				<!-- <text class="title-dialog">确认</text> -->
				<view class="form-edit-dialog">
					<u--form :model="formData" labelWidth="140rpx" ref="mainForm">
						<u-form-item label="手机号" prop="CellPhone">
							<u--input v-model="formData.CellPhone" maxlength="11" prefixIcon="phone-fill"
								placeholder="请输入手机号码"></u--input>
						</u-form-item>
						<u-form-item label="相册" prop="AttachList">
						</u-form-item>
						<u-form-item label="" labelWidth="0" prop="AttachList">
							<uploadBatch :attachList="formData.AttachList" :maxCount="2" tag="mp"></uploadBatch>
						</u-form-item>
					</u--form>
				</view>
				<view class="foot-dialog">
					<u-button @click="onClose">取消</u-button>
					<u-button type="primary" @click="onSave">确定</u-button>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import uploadBatch from '@/components/upload-batch/upload-batch.vue'
	export default {
		name: "demo-dialog-upload",
		components:{
			uploadBatch,
		},
		props: {
			visible: {
				type: Boolean,
				default: false
			},
			dataId: {
				type: Number,
				required: true
			}
		},
		data() {
			var validCellPhone = (rule, value, callback) => {
				return uni.$u.test.mobile(value);
			};
			return {
				formData: {
					Id: 0,
					CellPhone: '',
					AttachList: [{
						"FilePath": "/uploads/bridge1/352fe9de6b12495f97be0b7d0940c556.jpg",
						"FileWebPath": "http://localhost:6100/uploads/bridge1/352fe9de6b12495f97be0b7d0940c556.jpg",
						"url": "http://localhost:6100/uploads/bridge1/352fe9de6b12495f97be0b7d0940c556.jpg",
						"FileName": "%E8%B1%ABA11111-202410311440219217.jpg",
						"FileSourceName": "%E8%B1%ABA11111-202410311440219217.jpg",
						"FileSize": 39303,
						"FileType": "image/jpeg",
						"FileExt": ".jpg"
					}]
				},
				rules: {
					CellPhone: [{
						type: 'string',
						required: true,
						message: '请输入手机号码',
						trigger: ['blur', 'change']
					}, {
						validator: validCellPhone,
						message: '手机号码不正确',
					}],
				},
			};
		},
		onReady() {
			
		},
		mounted() {
			this.$refs.mainForm.setRules(this.rules) // 这是组件形式，如果是页面形式的form，将这行代码放到onReady中
		},
		methods: {
			onSave() {
				this.$refs.mainForm.validate().then(vald => {
					// if (!this.formData.IsOK && !this.formData.CancelDesc) {
					// 	this.$u.toast('取消时说明必填');
					// 	return
					// }
					console.log('内容', this.formData);
					return
					this.formData.Id = this.dataId
					uni.showLoading({
						title: "操作中...",
					})
					setTimeout(() => {
						console.log('发送请求...', this.formData);
						uni.hideLoading()
						this.$u.toast('操作成功')
						this.$emit('reLoad')
						this.onClose()
					}, 2000)
					// uni.$u.http.post('/api/om/buyplancontent/set/confirmflag', this.formData).then(res => {
					// 	uni.hideLoading()
					// 	this.$u.toast('操作成功')
					// 	this.$emit('reLoad')
					// 	this.onClose()
					// })
				}).catch(errors => {
					uni.$u.toast('内容校验不通过')
				})

			},
			
			onClose() {
				this.$emit('onClose')
			}
		}
	}
</script>
