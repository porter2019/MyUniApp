<template>
	<view>
		
		<u-button type="primary" @click="go" text="前往">
		</u-button>
		
		<tab-bar name="admin"></tab-bar>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			// 影藏原生的tabbar,有自定义tabbar的页面都要写一遍
			uni.hideTabBar()
		},
		methods: {
			go(){
				this.$u.func.routeTo('/pagesX/index/index')
			}
		}
	}
</script>

<style>

</style>