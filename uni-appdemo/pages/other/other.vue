<template>
	<view class="content">
		<view>
			<view class="title"><text class="uni-form-item__title">带清除按钮的输入框{{inputClearValue}}</text></view>
			<view class="uni-input-wrapper">
				<input class="uni-input" placeholder="带清除按钮的输入框" :value="inputClearValue" @input="clearInput" />
				<text class="uni-icon" v-if="showClearIcon" @click="clearIcon">&#xe434;</text>
			</view>
		</view>
		<view class="uni-title uni-common-pl">日期选择器</view>
		<view class="uni-list">
			<view class="uni-list-cell">
				<view class="uni-list-cell-left">
					当前选择
				</view>
				<view class="uni-list-cell-db">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange">
						<view class="uni-input">{{date}}</view>
					</picker>
				</view>
			</view>
		</view>
		<Counter :title="父传参数111" @total="total" />
		<Counter @total="total" />
		<Counter @total="total" />
		总数是: {{totalNum}}
		<view>
			<text>地图</text>
			<map
				style="width: 100%;height: 400rpx;" 
				:latitude="detailInfo.location[0]"
				:longitude="detailInfo.location[1]"
				:show-scale="true"
				:markers="detailInfo.markers"
			></map>
		</view>
	</view>
</template>

<script setup>
	import {computed, ref} from 'vue'
	import { onPullDownRefresh, onReachBottom, onLoad } from '@dcloudio/uni-app'
	onLoad((options) =>{	
		console.log('onLoad11', options);
	})
	onPullDownRefresh(()=>{
		console.log('下拉刷新');
		setTimeout(()=>{
			uni.stopPullDownRefresh();
		},1000)
	})
	onReachBottom(()=>{
		console.log('上拉加载');
	})
	// 地图信息
	const detailInfo = ref({
		id:1,
		location: [34.214892, 108.964646],
		markers: [{height: 45, id: 1, latitude: 34.214892, longitude: 108.964646, width: 30}]
	})
	// 基础组件信息
	let showClearIcon = ref(false)
	let inputClearValue = ref('')
	const clearInput=(event)=> {
		inputClearValue.value = event.detail.value;
		if (event.detail.value.length > 0) {
			showClearIcon.value = true;
		} else {
			showClearIcon.value = false;
		}
	};
	const clearIcon = ()=>{
		inputClearValue.value = '';
		showClearIcon .value = false;
	}
	
	// 日期
	const getDate = (type)=>{
		const date = new Date();
		let year = date.getFullYear();//年
		let month = date.getMonth() + 1;//月
		let day = date.getDate();//日
		if(type === 'start') {
			year = year - 10
		}else if(type === 'start') {
			year = year + 10
		}
		month = month > 9 ? month : '0' + month;
		day = day > 9 ? day : '0' + day;
		return `${year}-${month}-${day}`;
	}
	
	const currentDate = getDate();
	console.log(11, currentDate)
	let date = ref(currentDate);
	
	const startDate = computed(()=>{
		return getDate('start');
	})
	const endDate = computed(()=>{
		return getDate('end');
	})
	const bindDateChange = (e)=>{
		console.log(12121, e.detail)
		date.value = e.detail.value
		console.log(date, e.detail)
	}
	// 总数
	const totalNum = ref(0)
	const total = (e) =>{
		console.log('传值：', e.counter.value)
		e.type == 'add' ? totalNum.value++ : totalNum.value--;
	}
</script>

<style lang="scss">
	.content{
		padding-top: 50px;
	}       
</style>
