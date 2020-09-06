import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const register = r => require.ensure([], () => r(require('@/page/register')), 'register');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addShop = r => require.ensure([], () => r(require('@/page/addShop')), 'addShop');
const addGoods = r => require.ensure([], () => r(require('@/page/addGoods')), 'addGoods');
const shopList = r => require.ensure([], () => r(require('@/page/shopList')), 'shopList');
const foodList = r => require.ensure([], () => r(require('@/page/foodList')), 'foodList');
const orderList = r => require.ensure([], () => r(require('@/page/orderList')), 'orderList');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const visitor = r => require.ensure([], () => r(require('@/page/visitor')), 'visitor');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const adminSet = r => require.ensure([], () => r(require('@/page/adminSet')), 'adminSet');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');
const teacherList = r => require.ensure([], () => r(require('@/page/teacherList')), 'teacherList');
const teacherAdd = r => require.ensure([], () => r(require('@/page/teacherAdd')), 'teacherAdd');
const wxUserList = r => require.ensure([], () => r(require('@/page/wxUserList')), 'wxUserList');
const wxUserMessage = r => require.ensure([], () => r(require('@/page/wxUserMessage')), 'wxUserMessage');
const messageList = r => require.ensure([], () => r(require('@/page/messageList')), 'messageList');
const messageAdd = r => require.ensure([], () => r(require('@/page/messageAdd')), 'messageAdd');
const messageEdit = r => require.ensure([], () => r(require('@/page/messageEdit')), 'messageEdit');


const routes = [
    {
        path: '/',
        component: login
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/manage',
        component: manage,
        name: '',
        children: [{
            path: '',
            component: home,
            meta: [],
        }, {
            path: '/teacherList',
            component: teacherList,
            meta: ['教师管理', '教师列表'],
        }, {
            path: '/teacherAdd',
            component: teacherAdd,
            meta: ['教师管理', '教师添加'],
        }, {
            path: '/addShop',
            component: addShop,
            meta: ['添加数据', '添加商铺'],
        }, {
            path: '/addGoods',
            component: addGoods,
            meta: ['添加数据', '添加商品'],
        }, {
            path: '/wxUserList',
            component: wxUserList,
            meta: ['公众号管理', '关注列表'],
        }, {
            path: '/wxUserMessage',
            component: wxUserMessage,
            meta: ['公众号管理', '发送消息'],
        }, {
                path: '/messageList',
                component: messageList,
                meta: ['消息管理', '消息模板'],
            }, {
                path: '/messageAdd',
                component: messageAdd,
                meta: ['消息管理', '添加消息模板'],
            },{
            path: '/messageEdit',
            component: messageEdit,
            meta: ['消息管理', '编辑消息模板'],
        }, {
            path: '/shopList',
            component: shopList,
            meta: ['数据管理', '商家列表'],
        }, {
            path: '/foodList',
            component: foodList,
            meta: ['数据管理', '食品列表'],
        }, {
            path: '/orderList',
            component: orderList,
            meta: ['数据管理', '订单列表'],
        }, {
            path: '/adminList',
            component: adminList,
            meta: ['数据管理', '管理员列表'],
        }, {
            path: '/visitor',
            component: visitor,
            meta: ['图表', '用户分布'],
        }, {
            path: '/newMember',
            component: newMember,
            meta: ['图表', '用户数据'],
        }, {
            path: '/uploadImg',
            component: uploadImg,
            meta: ['文本编辑', 'MarkDown'],
        }, {
            path: '/vueEdit',
            component: vueEdit,
            meta: ['编辑', '文本编辑'],
        }, {
            path: '/adminSet',
            component: adminSet,
            meta: ['设置', '管理员设置'],
        }, {
            path: '/wxUserMessage',
            component: wxUserMessage,
            meta: ['设置', '发送通知'],
        }, {
            path: '/explain',
            component: explain,
            meta: ['说明', '说明'],
        }]
    }
]

export default new Router({
    routes,
    strict: process.env.NODE_ENV !== 'production',
})
