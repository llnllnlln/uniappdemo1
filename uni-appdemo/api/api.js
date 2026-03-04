import http from './http.js'
export const getBanner = () =>{
	console.log('getBanner')
	return http('/user/getBanner')
}
export const getHomeList = () =>{
	console.log('getHomeList')
	return http('/user/getHomeList')
}
export const login = (code) =>{
	console.log('login', code)
	return http('/login', {code}, 'POST')
}
export const getUserInfo = () =>{
	console.log('getUserInfo')
	return http('/getUserInfo')
}
	
export const detailProject = () =>{
	console.log('detailProject')
	return http('/detail/project')
}