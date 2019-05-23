type StateType = {[key:string]:any}

export interface loginVueOption {
    moduleName?:String | "login";//登录数据模块名

    layout?:String | 'layout';//布局模块名

    layoutInitState?():StateType;//vuex初始数据

    isLogin?():Boolean | false;//判断是否登录回调处理，便于自定义结果，但返回值必须是Boolean布尔类型

    initRouter?:String | "/Login"; //默认重定向路由，指需要登录时却没有登录状态下跳转路由
}

export default (to, from, next,store,confg:loginVueOption)=>{
    //todo 执行流程如下
    //todo ↓【1】写入登入数据
    //todo ↓【2】设置布局数据
    //todo ↓【3】设置自定义接口地址
    //todo ↓【4】设置页面标题
    //todo ↓【5】设置body背景颜色
    //todo ↓【6】重置位置
    //todo ↓【7】登录权限判断
}