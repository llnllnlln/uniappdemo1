// let baseUrl ='https://apifoxmock.com/m1/4728220-0-default/api'

// let baseUrl =' https://m1.apifoxmock.com/m1/4728220-0-default/api'
// 通过环境来判断
let baseUrl =''
if(process.env.NODE_ENV === 'development'){
	baseUrl ='http://localhost:5173/api'
}else{
	baseUrl ='https://m1.apifoxmock.com/m1/4728220-0-default/api'
}
export default function http(url, data={}, method='GET'){
	return new Promise((resolve, reject)=>{
		console.log(111)
		uni.request({
			url: baseUrl + url,
			data,
			method,
			header:{
				'token': uni.getStorageSync('token') || ''
			},
			success: res =>{
				if(res.statusCode == 200){
					if(res.data.code == 1){
						resolve(res.data.data)
					}else{
						console.log('请求失败', res.data.msg)
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				}
			}
		})
	})
}