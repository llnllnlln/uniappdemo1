<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<!-- <view class="text-area">
			<text class="title">{{title}}</text>
			<button @click="toOther">按钮</button>
		</view>
		<navigator url="/pages/my/my" open-type="switchTab">
			<button>跳转tab</button>
		</navigator> -->
<!--    <up-button text="渐变色按钮" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))"></up-button> -->
		<up-search placeholder="搜索经典" bg-color="#e3e3e3" v-model="keyword"></up-search>
		<up-swiper :list="bannerList" keyName="image" showTitle radius="8" height="160"></up-swiper>
		<up-notice-bar text="注意注意！！"></up-notice-bar>
		<view class="list">
			<up-waterfall v-model="flowList" ref="uWaterfallRef">
				<template v-slot:left="{ leftList }">
					<view class="demo-warter" v-for="(item,index) in leftList" :key="index" @click="goDetail(item)">
						<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
						<view class="demo-title">{{item.title}}</view>
						<view class="demo-price">{{item.items}}</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">{{item.tag[0]}}</view>
							<view class="demo-tag-text">{{item.tag[1]}}</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{rightList}">
					<view class="demo-warter" v-for="(item,index) in rightList" :key="index" @click="goDetail(item)">
						<up-lazy-load threshold="-450" border-radius="10" :image="item.img" :index="index"></up-lazy-load>
						<view class="demo-title">{{item.title}}</view>
						<view class="demo-price">{{item.items}}</view>
						<view class="demo-tag">
							<view class="demo-tag-owner">{{item.tag[0]}}</view>
							<view class="demo-tag-text">{{item.tag[1]}}</view>
						</view>
					</view>
				</template>
			</up-waterfall>
		</view>
		<view v-if="showTopBtn" @click="toTop" class="top">
			<up-icon name="arrow-upward" size="28" color="#fff"></up-icon>
		</view>
	</view>
</template>

<script setup>
	import { ref, reactive } from 'vue'
	import { onLoad, onReachBottom, onPageScroll } from '@dcloudio/uni-app'
	import { getBanner, getHomeList } from '@/api/api.js'
	let title = ref('Hello1234')
	const toOther = () => {
		uni.switchTab({
			url: '/pages/my/my?id=1221',
		})
	}
	// 轮播图
	const keyword = ref('')
	const bannerList = ref([])
	const flowList = ref([])
	const showTopBtn = ref(0)
	onLoad(()=>{
		console.log(111)
		getBanner().then(res=>{
			bannerList.value = res.bannerList
		})
		getHomeList().then(res=>{
			console.log(res)
			flowList.value = res
		})
	})
	onReachBottom(() => {
		console.log('触底加载')
		setTimeout(()=>{
			addData()
		},1000)
	})
	onPageScroll((e) => {
		if(e.scrollTop >600){
			showTopBtn.value = 1
		}else showTopBtn.value = 0
	})
	const toTop = () =>{
		uni.pageScrollTo({
			scrollTop:0,
			duration: 300
		})
	}
	const addData = () =>{
		for(let i=0; i<5; i++){
			let index= uni.$u.random(0,flowList.value.length-1)
			console.log(index)
			let item = JSON.parse(JSON.stringify(flowList.value[index]))  
			item.id = uni.$u.guid()
			flowList.value.push(item)
		}
	}
	const goDetail = (item) =>{
		console.log('goDetail')
		const can =JSON.stringify(item)
		uni.navigateTo({
			url: `/pagesA/detail/detail?item=${encodeURIComponent(can)}`
		})
	}
</script>

<style lang="scss">
.list {
	margin: 30rpx 0;
	.demo-warter{
		margin:10rpx 10rpx 10rpx 0;
		background-color:#fff;
		border-radius:16rpx;
		padding: 16rpx;
	}
	.demo-title {
		font-size: 30rpx;
		margin-top:10rpx;
		color:#303133;
	}
	.demo-price {
		font-size:24rpx;
		color:#777;
		margin-top: 10rpx;
	}
	.demo-tag{
		display : flex;
		margin-top: 10rpx;
		.demo-tag-owner{
			border: 1px solid rgb(252,163,129);
			color: #ffaa00;
			font-size: 20rpx;
			display:flex;
			align-items: center;
			padding:4rpx 14rpx;
			border-radius:50rpx;
		}
		.demo-tag-text{
			border: 1px solid #00aaff;
			color: #00aaff;
			margin-left: 20rpx;
			border-radius:50rpx;
			padding:4rpx 14rpx;
			font-size: 20rpx;
			display: flex;
			align-items:center;
		}
	}
}
.top{
	position: fixed;
	bottom:120rpx;
	right: 30rpx;
	background-color:rgba(0,0,0,0.5);
	padding: 20rpx;
	width: 44rpx;
	height: 44rpx;
	border-radius: 40rpx;
	display:flex;
	justify-content: center;
	align-items: center;
}
</style>
