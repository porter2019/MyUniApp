<template>
	<view>
		<web-view v-if="url" :src="url"></web-view>
	</view>
</template>

<script>
	import config from '@/common/config.js'
	export default {
		data() {
			return {
				url: null
			}
		},
		onLoad(option) {
			const action = Number(option.t || 0)
			if (action < 1) {
				uni.showModal({
					title: "提示",
					content: "不明确的类型",
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							uni.navigateBack();
						} else if (res.cancel) {

						}
					}
				})
				return
			}
			if (action == 1) {
				const userId = this.$store.getters.user_info.UserId;
				this.url = config.baseUrl + '/weixin.html?state=' + userId;
				console.log('打开公众号授权地址', this.url);
			}else if(action == 2){
				this.url = "https://mip.chinaz.com/"
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>