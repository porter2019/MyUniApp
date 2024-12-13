<template>
	<view>
		<u-upload :fileList="attachList" @afterRead="afterRead" @delete="deletePic" name="eleUpload" multiple
			:maxCount="maxCount" :previewFullImage="true"></u-upload>
	</view>
</template>

<script>
	import apiConfig from '@/common/config'
	export default {
		name: "upload-batch",
		props: {
			attachList: {
				type: Array,
				require: true
			},
			dataId: {
				type: Number,
				default: function() {
					return 0;
				}
			},
			maxCount: {
				type: Number,
				required: true
			},
			tag: {
				type: String,
				default: function() {
					return 'attach';
				}
			}
		},
		data() {
			return {

			};
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this.attachList.splice(event.index, 1)
			},
			// 新增图片
			async afterRead(event) {
				// 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file)
				let fileListLen = this.attachList.length
				lists.map((item) => {
					this.attachList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					})
				})
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					let item = this.attachList[fileListLen]
					this.attachList.splice(fileListLen, 1, Object.assign(item, {
						...result,
						status: 'success',
						message: '',
						url: result.FileWebPath
					}))
					fileListLen++
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: apiConfig.baseUrl + '/api/File/Upload',
						filePath: url,
						name: 'file',
						formData: {
							tag: this.tag
						},
						success: (res) => {
							if (res.statusCode === 200) {
								var jsonData = JSON.parse(res.data)
								if (jsonData.Succeeded && (jsonData.Data || []).length > 0) {
									console.log('上传成功，result', jsonData.Data[0]);
									resolve(jsonData.Data[0])
								}
							}
						}
					});
				})
			},
		}
	}
</script>

<style>

</style>