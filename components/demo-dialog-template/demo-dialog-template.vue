<template>
	<view>
		<!-- 空白表单弹窗，可以赋值这个，然后添加列 -->
		<u-popup :show="visible" :round="10" mode="center" @close="onClose">
			<view class="h-dialog">
				<!-- <text class="title-dialog">确认</text> -->
				<view class="form-edit-dialog">
					<u--form :model="formData" labelWidth="140rpx" ref="mainForm">
						<u-form-item label="上传" prop="AttachList" borderBottom>
							<u--input v-model="formData.AttachList" maxlength="11" prefixIcon="phone-fill"
								placeholder="请输入手机号码"></u--input>
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
	export default {
		name: "demo-dialog-template",
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