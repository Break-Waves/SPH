import requests from './request.js'
import mockRequest from './mockAjax'

//使其为箭头函数可以在引入时立即执行，获取数据
export const getCategoryList = ()=>{
    return requests({
        url:'/product/getBaseCategoryList',
        method:'GET'
    })
}
export const getBannerList = ()=>{
    return mockRequest.get('/banner')
}