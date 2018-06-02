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
    redirect: '/user/stuednt',
    name: 'User',
    meta: { title: '用户管理', icon: 'people' },
    children: [
      {
        path: 'stuednt',
        name: 'Stuednt',
        component: () => import('@/views/user/student/index'),
        meta: { title: '学生列表', icon: 'table2' }
      },
      {
        path: 'teacher',
        name: 'Teacher',
        component: () => import('@/views/user/teacher/index'),
        meta: { title: '老师列表', icon: 'table2' }
      },
      {
        path: 'userinfo/:uid/:type',
        name: 'userInfo',
        component: () => import('@/views/user/userinfo/index'),
        meta: { title: '信息详情', icon: 'table2' },
        hidden:true
      }
    ]
  },
  {
    path: '/activity',
    component: Layout,
    redirect: '/activity/index',
    name: 'Activity',
    meta: { title: '活动管理', icon: 'component' },
    children: [
      {
        path: 'index',
        name: 'activityIndex',
        component: () => import('@/views/activity/activity/index'),
        meta: { title: '活动', icon: 'table2' }
      },
      {
        path: 'game',
        name: 'activityGame',
        component: () => import('@/views/activity/game/index'),
        meta: { title: '特训', icon: 'table2' }
      },
      {
        path: 'activityedit/:editid/:flag/:type',
        name: 'activityedit',
        component: () => import('@/views/activity/activityedit/index'),
        meta: { title: '信息编辑', icon: 'table' },
        hidden:true
      },
    ]
  },
  {
    path: '/banner',
    component: Layout,
    redirect: '/banner/index',
    name: 'Banner',
    meta: { title: 'banner管理', icon: 'component' },
    children: [
      {
        path: 'bannerhome',
        name: 'bannerhome',
        component: () => import('@/views/banner/home/index'),
        meta: { title: '首页banner', icon: 'table2' }
      },
      {
        path: 'bannercategory',
        name: 'bannercategory',
        component: () => import('@/views/banner/category/index'),
        meta: { title: '分类banner', icon: 'table2' }
      }
    ]
  },
  {
    path: '/ads',
    component: Layout,
    children: [
      {
        path: 'ads',
        name: 'Ads',
        component: () => import('@/views/ads/edit'),
        meta: { title: '广告编辑', icon: 'table' }
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    children: [
      {
        path: 'category',
        name: 'Category',
        component: () => import('@/views/category/index'),
        meta: { title: '舞蹈分类', icon: 'tree' }
      }
    ]
  },
  {
    path: '/room',
    component: Layout,
    children: [
      {
        path: 'room',
        name: 'Room',
        component: () => import('@/views/room/index'),
        meta: { title: '舞蹈室', icon: 'example' }
      },
      {
        path: 'roomedit/:editid',
        name: 'roomedit',
        component: () => import('@/views/room/edit'),
        meta: { title: '添加舞蹈室', icon: 'table' },
        hidden:true
      },
    ]
  },
  {
    path: '/message',
    component: Layout,
    children: [
      {
        path: 'message',
        name: 'Message',
        component: () => import('@/views/message/index'),
        meta: { title: '消息发送', icon: 'message' }
      }
    ]
  },
  {
    path: '/feedback',
    component: Layout,
    children: [
      {
        path: 'feedback',
        name: 'Feedback',
        component: () => import('@/views/feedback/index'),
        meta: { title: '反馈列表', icon: 'form' }
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
