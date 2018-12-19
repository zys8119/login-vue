'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

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
exports.default = function (to, from, next, store) {
    var confg = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

    var confgs = _.merge({
        //登录数据模块名
        moduleName: "login",
        //布局模块名
        layout: 'layout',
        //vuex初始数据
        layoutInitState: function layoutInitState() {
            return {};
        },
        //判断是否登录回调处理，便于自定义结果，但返回值必须是Boolean布尔类型
        isLogin: function isLogin(data) {
            if (data.code == 200) {
                return true;
            }
            return false;
        },
        //默认重定向路由，指需要登录时却没有登录状态下跳转路由
        initRouter: '/Login'
    }, confg);

    try {
        // 写入登入数据
        if (!store.state.airforce[confgs.moduleName] && localStorage[confgs.moduleName]) {
            store.commit('AIRFORCE_DO', {
                data: {
                    moduleName: confgs.moduleName,
                    goods: JSON.parse(localStorage[confgs.moduleName])
                }
            });
        }
    } catch (e) {}
    //设置布局数据
    store.commit("AIRFORCE_DO", {
        data: {
            moduleName: confgs.layout,
            goods: _.merge({
                $$rootUrl: false
            }, confgs.layoutInitState(to, from, next), to.meta)
        }
    });
    if (store.state.airforce[confgs.layout].$$rootUrl) {
        //设置自定义接口地址
        store.commit('AIRFORCE_DO', {
            data: {
                moduleName: "$$rootUrl",
                goods: store.state.airforce[confgs.layout].$$rootUrl
            }
        });
    } else {
        store.commit('AIRFORCE_DO', {
            data: {
                moduleName: "$$rootUrl",
                goods: null
            }
        });
    }

    if (store.state.airforce[confgs.layout].title) {
        //设置页面标题
        document.title = store.state.airforce[confgs.layout].title;
    }
    if (store.state.airforce[confgs.layout].bodyBaColor) {
        //设置body背景颜色
        document.body.style.backgroundColor = store.state.airforce[confgs.layout].bodyBaColor;
    }
    try {
        //重置位置
        if (window.scrollTo) {
            window.scrollTo({
                y: 0
            });
            if (document.querySelector) {
                var html = document.querySelector("html");
                html.scrollTop = 0;
            }
        }
        if (document.body.scrollTop) {
            document.body.scrollTop = 0;
        }
    } catch (e) {}
    //登录权限判断
    if (store.state.airforce[confgs.moduleName] && confgs.isLogin(store.state.airforce[confgs.moduleName])) {
        //判断本地有无登陆数据或登陆code是否为20000
        //已登录，直接进
        next();
    } else {
        //查询是否有需要登录的父路由，默认是指不需要登录
        var isLogin = false;
        to.matched.forEach(function (e) {
            if (e.meta.isLogin === true) {
                isLogin = true;
            }
        });
        //父路由需要登录
        if (isLogin) {
            //如果当前路由不需要登录就直接进
            if (to.meta.isLogin === false) {
                next();
                return;
            }
            //重定向到指定页面
            //重定向页面配置重写
            store.commit('AIRFORCE_DO', {
                data: {
                    moduleName: confgs.layout,
                    goods: from.meta
                }
            });
            next(confgs.initRouter);
            return;
        }
        //父路由不需要登录且当前路由需要登录
        if (to.meta.isLogin === true) {
            //重定向到指定页面
            //重定向页面配置重写
            store.commit('AIRFORCE_DO', {
                data: {
                    moduleName: confgs.layout,
                    goods: from.meta
                }
            });
            next(confgs.initRouter);
            return;
        }
    }
    //都不需要登录
    next();
};