<template>
	<view class="h-page">
		<view class="area">
			<u-divider text="路由跳转"></u-divider>
			<u--text type="primary" text="带参数" @click="redir1"></u--text>
			<u--text type="primary" text="别名方式" @click="redir2"></u--text>
		</view>
		<view class="area">
			<u-divider text="消息提示"></u-divider>
			<u--text type="primary" text="简单的Toast" @click="msg1"></u--text>
			<u-notify ref="uNotify" message="Hi uView"></u-notify>
			<u--text type="primary" text="顶部Notify方式" @click="msg2"></u--text>
			<u--text type="primary" text="消息弹出框-基本的" @click="msg3"></u--text>
		</view>
		<view class="area">
			<u-divider text="弹框"></u-divider>
			<!-- 综合表单演示 -->
			<u--text type="primary" text="弹框表单" @click="dialogFormVisible=true"></u--text>
			<demoDialogForm v-if="dialogFormVisible" :visible="dialogFormVisible" :dataId="123"
				v-on:onClose="dialogFormVisible=false" @reLoad="console.log('子组件调用父组件的方法了..');"></demoDialogForm>
			<!-- 上传演示 -->
			<u--text type="primary" text="相册上传" @click="dialogFormVisible2=true"></u--text>
			<demoDialogUpload v-if="dialogFormVisible2" :visible="dialogFormVisible2" :dataId="123"
				v-on:onClose="dialogFormVisible2=false" @reLoad="console.log('子组件调用父组件的方法了..');"></demoDialogUpload>
		</view>
		<view class="area">
			<u-divider text="表单"></u-divider>
			<u--text type="primary" text="列表页" @click="$u.func.routeTo('/pagesX/form/index')"></u--text>
			<u--text type="primary" text="详情" @click="$u.func.routeTo('/pagesX/form/show',{id:1})"></u--text>
			<u--text type="primary" text="编辑" @click="$u.func.routeTo('/pagesX/form/edit',{id:1})"></u--text>
		</view>
	</view>
</template>

<script>
	import demoDialogForm from '@/components/demo-dialog-form/demo-dialog-form.vue'
	import demoDialogUpload from '@/components/demo-dialog-upload/demo-dialog-upload.vue'
	export default {
		components:{
			demoDialogForm,
			demoDialogUpload,
		},
		data() {
			return {
				dialogFormVisible: false,
				dialogFormVisible2: false
			}
		},
		onLoad() {
			
		},
		methods: {
			msg1() {
				this.$u.toast('最简单的方式')
			},
			msg2() {
				//更多
				// https://uviewui.com/components/notify.html
				this.$refs.uNotify.warning('顶部弹出一些东西,页面需要插入u-notify标签')
			},
			msg3() {
				//使用原生的用起来还简单点，uview的还需要在html里先插入一个u-modal标签
				uni.showModal({
					title: "提示",
					content: "这里是提示内容",
					showCancel: false,
					success: (res) => {
						if (res.confirm) {
							this.$u.toast('点击了确定')
						} else if (res.cancel) {
							this.$u.toast('点击了取消')
						}
					}
				})
			},
			redir1() {
				this.$u.toast('带参数')
				this.$u.func.routeTo('/pagesX/pagelist/swiper-tab/swiper-tab', {
					aa: 123
				})
			},
			redir2() {
				this.$u.toast('不带参数')
				this.$u.func.routeTo('page-old')
			},
		}
	}
</script>

<style lang="scss">
	.area {
		background-color: #FFF;
		padding: 30rpx;
		margin-bottom: 10rpx;
	}
</style>