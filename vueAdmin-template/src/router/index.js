import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '../views/layout/Layout'

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/index',
    component: Layout,
    redirect: '/index/banner',
    name: 'Example',
    meta: { title: '首页管理', icon: 'example' },
    children: [
      {
        path: 'banner',
        name: 'Banner',
        component: () => import('@/views/index/banner/index'),
        meta: { title: '广告管理', icon: 'table' }
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import('@/views/index/info/index'),
        meta: { title: '信息管理', icon: 'table' }
      },
      {
        path: 'infoedit/:infoid/:flag',
        name: 'infoedit',
        component: () => import('@/views/index/infoedit/index'),
        meta: { title: '信息编辑', icon: 'table' },
        hidden:true
      },
      {
        path: 'problem',
        name: 'Problem',
        component: () => import('@/views/index/problem/index'),
        meta: { title: '常见问题', icon: 'table' }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/index/category/index'),
        meta: { title: '问题分类', icon: 'table' }
      }
    ]
  },
  {
    path: '/vegetable',
    component: Layout,
    redirect: '/vegetable/index',
    name: 'Vegetable',
    meta: { title: '菜地管理', icon: 'tree' },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/vegetable/index/index'),
        meta: { title: '菜地管理', icon: 'table' }
      },
      {
        path: 'area',
        name: 'vegetableArea',
        component: () => import('@/views/vegetable/area/index'),
        meta: { title: '菜地分区', icon: 'table' }
      },
      {
        path: 'info',
        name: 'vegetableInfo',
        component: () => import('@/views/vegetable/info/index'),
        meta: { title: '菜地信息管理', icon: 'table' }
      },
      {
        path: 'sale',
        name: 'sale',
        component: () => import('@/views/vegetable/sale/index'),
        meta: { title: '已售菜地管理', icon: 'table' }
      },
      {
        path: 'report/:billid',
        name: 'report',
        component: () => import('@/views/vegetable/report/index'),
        meta: { title: '汇报管理', icon: 'table' },
        hidden:true
      }
    ]
  },
  {
    path: '/chosenvegetable',
    component: Layout,
    redirect: '/chosenvegetable/onsale',
    name: 'chosenvegetable',
    meta: { title: '选鸡管理', icon: 'tree' },
    children: [
      {
        path: 'onsale',
        name: 'Onsale',
        component: () => import('@/views/chosenvegetable/onsale/index'),
        meta: { title: '已售鸡管理', icon: 'table' }
      },
      {
        path: 'chosensetting',
        name: 'Chosensetting',
        component: () => import('@/views/chosenvegetable/chosensetting/index'),
        meta: { title: '选鸡信息设置', icon: 'table' }
      }
    ]
  },
  {
    path: '/card',
    component: Layout,
    redirect: '/card/cardsetting',
    name: 'card',
    meta: { title: '礼品卡管理', icon: 'tree' },
    children: [
      {
        path: 'cardsetting',
        name: 'Cardsetting',
        component: () => import('@/views/card/cardsetting\/index'),
        meta: { title: '礼品卡设置', icon: 'table' }
      },
      {
        path: 'cardlist',
        name: 'Cardlist',
        component: () => import('@/views/card/cardlist/index'),
        meta: { title: '礼品卡列表', icon: 'table' }
      },
      {
        path: 'cardedit/:id/:flag',
        name: 'cardedit',
        component: () => import('@/views/card/cardedit/index'),
        meta: { title: '礼品卡编辑', icon: 'table' },
        hidden:true
      },
    ]
  },
  {
    path: '/coupon',
    component: Layout,
    redirect: '/coupon/couponlist',
    name: 'coupon',
    meta: { title: '优惠券管理', icon: 'tree' },
    children: [
      {
        path: 'couponlist',
        name: 'Couponlist',
        component: () => import('@/views/coupon/couponlist/index'),
        meta: { title: '优惠券列表', icon: 'table' }
      }
    ]
  },
  {
    path: '/record',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/record/index'),
        meta: { title: '订单记录', icon: 'form' }
      }
    ]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      {
        path: 'admin',
        name: 'Admin',
        component: () => import('@/views/admin/index'),
        meta: { title: '管理员管理', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
