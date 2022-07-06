//引入我们封装的接口
import  {getCategoryList,getBannerList}  from '@/api/index'
const state = {
    //此处保存的初始数据结构应与mutations中对应修改的数据结构保持一致，防止渲染结构时报错
    categoryList:[],
    bannerList:[]
}
const getters = {

}
const actions= {
        //写async&await风格的异步请求,请求三级联动数据
        async categoryList(context,value){
          let result =  await getCategoryList()
          console.log(result);
          //如果请求成功，去三级联动组件中的静态数据
          if(result.code==200){
            context.commit('CATEGORYLIST',result.data)
          }  
        },
        //mock请求轮播图
        async bannerList(context,value){
          let result = await getBannerList()
          if(result.code ==200){
            console.log(result);
            context.commit('BANNERLIST',result.data)
          }
        }
}
const mutations = {
    //真正修改state数据的地方
    CATEGORYLIST(state,value){
        state.categoryList = value
    },
    BANNERLIST(state,value){
      state.bannerList = value
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }