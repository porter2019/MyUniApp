<template>
	<view class="h-page">
		<view class="form-edit">
			<u--form :model="formData" labelWidth="140rpx" ref="mainForm">
				<view class="form-item-title">
					<view class="line"></view>
					<text>基本信息</text>
				</view>
				<u-form-item label="所属机构" prop="OrgName" borderBottom>
					<!-- #ifndef APP-NVUE -->
					<u-input v-model="formData.OrgName" readonly placeholder="请选择">
					<!-- #endif -->
						<!-- #ifdef APP-NVUE -->
						<u--input v-model="formData.OrgName" readonly placeholder="请选择">
						<!-- #endif -->
							<template slot="suffix"><u-button @tap="orgPickerShow=true" size="mini"
									type="primary">选择组织</u-button>
							</template>
					<!-- #ifndef APP-NVUE -->
					</u-input>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					</u--input>
					<!-- #endif -->
				</u-form-item>
				<u-form-item label="手机号" prop="CellPhone" borderBottom>
					<u--input v-model="formData.CellPhone" fontSize="13" maxlength="11" prefixIcon="phone-fill"
						placeholder="请输入手机号码"></u--input>
				</u-form-item>
				<u-form-item label="是否" borderBottom>
					<u-switch v-model="formData.IsOK" size="16"></u-switch>
				</u-form-item>
				<u-form-item label="水果" prop="TempRadiovalue1" borderBottom>
					<u-radio-group v-model="formData.TempRadiovalue1" size="16">
						<u-radio :customStyle="{marginRight: '16px'}" v-for="(item, index) in radiolist1" :key="index"
							:label="item.name" :name="item.name" :disabled="item.disabled">
						</u-radio>
					</u-radio-group>
				</u-form-item>
				<u-form-item label="兴趣爱好" prop="TempCheckboxValue1" borderBottom>
					<u-checkbox-group v-model="formData.TempCheckboxValue1" size="16" shape="square"
						@change="checkBoxChange">
						<u-checkbox :customStyle="{marginRight: '16px'}" v-for="(item, index) in checkboxList1"
							:key="index" :label="item.name" :name="item.name" :disabled="item.disabled">
						</u-checkbox>
					</u-checkbox-group>
				</u-form-item>
				<u-form-item label="日期" prop="LiveTime" borderBottom @click="showLiveTimePicker = true; hideKeyboard()">
					<u--input v-model="formData.LiveTime" disabled Color="#ffffff" fontSize="13" placeholder="请选择"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>

				</u-form-item>
				<u-form-item label="备注">
					<u-textarea v-model="formData.CancelDesc" maxlength="500" placeholder="取消时必填"></u-textarea>
				</u-form-item>
			</u--form>

			<view class="btns">
				<u-button type="primary" shape="circle" hairline @click="onSave">保存</u-button>
				<u-button shape="circle" hairline @click="goBack()">取消</u-button>
			</view>
		</view>

		<u-picker :show="orgPickerShow" :columns="orgOptions" keyName="Name" @close="orgPickerShow=false"
			@cancel="orgPickerShow=false" @confirm="onOrgPick"></u-picker>

		<u-datetime-picker :show="showLiveTimePicker" :value="tempLiveTime" mode="datetime" closeOnClickOverlay
			@confirm="tempLiveTimeConfirm" @cancel="tempLiveTimeClose" @close="tempLiveTimeClose"></u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			var validCellPhone = (rule, value, callback) => {
				return uni.$u.test.mobile(value);
			};
			var validDateTime = (rule, value, callback) => {
				return uni.$u.test.date(value);
			};
			return {
				id: 0,
				showLiveTimePicker: false,
				tempLiveTime: Number(new Date()),
				formData: {
					Id: 0,
					CellPhone: '',
					IsOK: true,
					CancelDesc: '',
					TempRadiovalue1: '香蕉',
					TempCheckboxValue1: []
				},
				rules: {
					OrgName: [{
						type: 'string',
						required: true,
						message: '请选择',
						trigger: ['blur', 'change']
					}],
					CellPhone: [{
						type: 'string',
						required: true,
						message: '请输入手机号码',
						trigger: ['blur', 'change']
					}, {
						validator: validCellPhone,
						message: '手机号码不正确',
						// trigger: ['blur', 'change']
					}],
					LiveTime: [{
							type: 'date',
							require: true,
							message: '请选择时间',
							trigger: ['change']
						},
						{
							validator: validDateTime,
							message: '时间不正确',
						}
					],
					TempRadiovalue1: {
						type: 'string',
						require: true,
						message: '请选择',
						trigger: ['change']
					},
					TempCheckboxValue1: {
						type: 'array',
						min: 2,
						required: true,
						message: '至少选择两项',
						trigger: ['change']
					},
				},
				radiolist1: [{
						name: '苹果',
						disabled: false //不设置此字段就标识不禁用
					},
					{
						name: '香蕉',
						disabled: false
					},
					{
						name: '毒橙子',
						disabled: false
					}
				],
				checkboxList1: [{
						name: '羽毛球',
						disabled: false
					},
					{
						name: '跑步',
						disabled: false
					},
					{
						name: '爬山',
						disabled: false
					}
				],				
				// 组织机构
				orgPickerShow: false,
				orgOptions: [
					[{
						Id: 1,
						Name: "组织1"
					}, {
						Id: 2,
						Name: "组织2"
					}, {
						Id: 3,
						Name: "组织3"
					}]
				],
			}
		},
		onLoad(option) {
			console.log(1);
			this.id = Number(option.id || 0)
		},
		onReady() {
			console.log(2);
			this.$refs.mainForm.setRules(this.rules)
		},
		mounted() {
			console.log(3);
		},
		methods: {
			getDataInfo() {
				console.log('进入');
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
			onSave() {
				this.$refs.mainForm.validate().then(vald => {
					if (!this.formData.IsOK && !this.formData.CancelDesc) {
						this.$u.toast('取消时说明必填');
						return
					}
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
			tempLiveTimeClose() {
				this.showLiveTimePicker = false
				this.$refs.mainForm.validateField('LiveTime')
			},
			tempLiveTimeConfirm(e) {
				this.showLiveTimePicker = false
				this.formData.LiveTime = uni.$u.timeFormat(e.value, 'yyyy-mm-dd hh:MM')
				this.$refs.mainForm.validateField('LiveTime')
			},
			onOrgPick(val) {
				if (val.value.length > 0) {
					if (val.value[0].Id != this.formData.OrgId) {
						this.formData.OrgName = val.value[0].Name
						this.formData.OrgId = val.value[0].Id
					} else {
						this.orgPickerShow = false
					}
				}
			},
			checkBoxChange(e) {
				console.log(e);
				// this.$refs.mainForm.validateField('TempCheckboxValue1')
				// this.$refs.mainForm.clearValidate('TempCheckboxValue1')
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			goBack() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">

</style>