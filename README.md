# router-login-vue
vue路由登录权限

```javascript
/**
 * @router-login-vue router-login-vue插件，用于vue路由权限登录控制
 * @param to vue-router等beforeEach钩子的 to
 * @param from vue-router等beforeEach钩子的 from
 * @param next vue-router等beforeEach钩子的 next
 * @param store vuex的store数据
 * @param confg router-login-vue的配置，默认数据如下
 * {
        //登录数据模块名
        moduleName:"login",
        //布局模块名
        layout:'layout',
        //vuex初始数据
        layoutInitState:()=>{
            return {}
        },
        //判断是否登录回调处理，便于自定义结果，但返回值必须是Boolean布尔类型
        isLogin:(data)=>{
            if(data.code == 200){
                return true;
            }
            return false;
        },
        //默认重定向路由，指需要登录时却没有登录状态下跳转路由
        initRouter:'/Login'
    }
 * */
//todo 潜规则，备注：权限限制，请在对应的路由上配置的meta字段的【isLogin】字段，
//todo 值为 true or false，
//todo 【true】:当前路由或布局组路由需要登录，
//todo 【false】：当前路由或布局组路由不需要登录
//todo 本插件依赖于，store-vue，import-vue

```

### 本插件依赖于，store-vue，import-vue
