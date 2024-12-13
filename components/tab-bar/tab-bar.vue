<template>
	<view>
		<u-tabbar :value="current" @change="change" :fixed="true" :inactiveColor="inactiveColor"
			:activeColor="activeColor" :placeholder="true" :safeAreaInsetBottom="true">
			<u-tabbar-item v-for="(item, index) in tabBarList" :key="index" :text="item.text" :badge="item.badge" :dot="item.dot">
				<image class="u-page__item__slot-icon" slot="inactive-icon" :src="item.iconPath"></image>
				<image class="u-page__item__slot-icon" slot="active-icon" :src="item.selectedIconPath"></image>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script>
	import tabbarData from '@/common/tabbar'
	export default {
		props: ['name'],
		name: "dyTabBar",
		data() {
			return {
				current: 0,
				tabBarList: [],
				borderTop: true,
				inactiveColor: '#8a8a8a',
				activeColor: '#177AD2'
			};
		},
		created() {
			const roleType = this.$store.getters.user_info.RoleType
			switch (roleType) {
				case 0:
					this.tabBarList = tabbarData.basic
					console.log('用户身份：基本>' + roleType + '>'+this.name)
					break;
				case 1:
					this.tabBarList = tabbarData.admin
					console.log('用户身份：管理员>' + roleType + '>'+this.name)
					break;
			}
			this.current = this.tabBarList.findIndex(item => item.name === this.name);
		},
		methods: {
			change(name) {
				uni.switchTab({
					url: this.tabBarList[name].pagePath,
				})
			}
		}
	}
</script>

<style lang="scss">
	image {
		width: 20px;
		height: 20px;
	}
</style>