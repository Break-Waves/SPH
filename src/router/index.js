import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/Home'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'

Vue.use(VueRouter)

//重写push和replace方法 ,这两种方法返回一个promise，编程式导航路由跳转到当前路由(参数不变), 多次执行会抛出NavigationDuplicated的警告错误?



//先将原本的push方法保存下来 
const originPush = VueRouter.prototype.push
//重写push方法
VueRouter.prototype.push = function(location,resolve,reject){
    if(resolve&&reject){
        originPush.call(this,location,resolve,reject)
    }else {
        originPush.call(this,location,()=>{},()=>{})
    }
}

//先将原本的replace方法保存下来 
const originReplace = VueRouter.prototype.replace
//重写replace方法
VueRouter.prototype.replace = function(location,resolve,reject){
    if(resolve&&reject){
        originReplace.replace(this,location,resolve,reject)
    }else {
        originPush.call(this,location,()=>{},()=>{})
    }
}



export default new VueRouter({
    routes:[
        {
            path:'/home',
            component:Home,
            meta: {
                show: true
            }
        },
        {
            path:'/login',
            component:Login,
            meta: {
                show: false
            }
        },        
        {
            path:'/register',
            component:Register,
            meta: {
                show: false
            }
        },        
        {
            name:"search",
            //使用params时，需要在路径上进行占位
            path:'/search/:keywords',
            component:Search,
            meta: {
                show:true
            }
        },
        //配置路由重定向
        {
            path:"*",
            redirect:"/home"
        }
    ]
})