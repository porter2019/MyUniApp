<template>
	<view class="h-page">
		<comBasicInfo ref="comBasicInfo" :dataId="id"></comBasicInfo>
	</view>
</template>

<script>
	import comBasicInfo from './components/basicInfo.vue'
	export default {
		components: {
			comBasicInfo,
		},
		data() {
			return {
				id: 0,
			}
		},
		onLoad(option) {
			console.log('1');
			this.id = Number(option.id || 0)
		},
		mounted() {
			console.log('2');
		},
		methods: {

		}
	}
</script>

<style lang="scss">

</style>