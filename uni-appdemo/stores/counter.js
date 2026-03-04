// 引入
import { defineStore } from 'pinia';
// 暴露出去
export const useCounterStore = defineStore('counter', {
	state: ()=>{
		return { 
			count:0,
			title1: '标题标题'
		}
	},
	actions: {
		increment(){
			this.count++;
		}
	}
})