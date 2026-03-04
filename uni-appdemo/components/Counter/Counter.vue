<template>
	<view style="text-align: center;">{{ store.title1 }}-{{title}}</view>
	<view class="flex-box">
		<button @click="add">+</button>
		<view>{{ counter }}</view>
		<button @click="minus">-</button>
	</view>
</template>

<script setup>
	import { ref, defineProps, defineEmits } from 'vue'
	defineProps({
		title: String
	})
	import { useCounterStore } from '@/stores/counter'
	
	const store = useCounterStore()
	// let title1 =  ref('')
	// title1 = counter.title1;
	const emit = defineEmits(['total'])
	const counter = ref(0)
		
	const add = () =>{
		counter.value += 1;
		emit('total', {
			type: 'add',
			counter
		})
	}
	const minus = () =>{
		counter.value -= 1;
		emit('total', {
			type: 'minus',
			counter
		})
	}
</script>

<style>
.flex-box{
	display: flex;
	justify-content: center;
}
</style>