import Vue from 'vue';
import VueRouter from 'vue-router';
// 官方的元件

import Home from '@/views/frontend/Home.vue';
import Login from '@/views/frontend/Login.vue';
import Dashboard from '@/views/backend/Dashboard.vue';
import DashboardProducts from '@/views/backend/DashboardProducts.vue';
import DashboardOrder from '@/views/backend/DashboardOrder.vue';
import DashboardCoupon from '@/views/backend/DashboardCoupon.vue';
import DashboardCustomorder from '@/views/backend/DashboardCustom.vue';
import DashboardOrderCheckout from '@/views/backend/DashboardOrderCheckout.vue';
import HomeAbout from '@/views/frontend/HomeAbout.vue';
import HomeIntroduce from '@/views/frontend/HomeIntroduce.vue';
import HomeProduct from '@/views/frontend/HomeProduct.vue';
import HomeProductDetail from '@/views/frontend/HomeProductDetail.vue';
import Order from '@/views/frontend/Order.vue';
import OrderReady from '@/views/frontend/OrderReady.vue';
import OrderCheckout from '@/views/frontend/OrderCheckout.vue';

Vue.use(VueRouter);

export default new VueRouter({

  linkExactActiveClass: 'active',
  routes: [
    {
      path: '',
      component: Home,
      children: [
        {
          name: '介紹',
          path: '',
          component: HomeIntroduce,
          meta: { title: '陶藝綻放' },
        },
        {
          name: '關於',
          path: '/about',
          component: HomeAbout,
          meta: { title: '陶藝綻放-關於我們' },
        },
        {
          name: '客戶購物',
          path: '/customproduct',
          component: HomeProduct,
          meta: { title: '陶藝綻放-購物商店' },
        },
        {
          name: '產品詳情',
          path: 'product/:Id',
          component: HomeProductDetail,
          meta: { title: '陶藝綻放-產品詳情' },
        },
      ],
    },
    {
      path: '/payment',
      component: Order,
      children: [
        {
          name: '客戶訂單準備',
          path: '',
          component: OrderReady,
          meta: { title: '陶藝綻放-準備結帳' },
        },
        {
          name: '客戶訂單確認',
          path: 'customcheckout/:orderId',
          component: OrderCheckout,
          meta: { title: '陶藝綻放-訂單詳情' },
        },
      ],
    },
    {
      name: '登入',
      path: '/login',
      component: Login,
      meta: { title: '陶藝綻放-登入' },
    },
    {
      name: '後台',
      path: '/admin',
      component: Dashboard,
      children: [
        {
          name: '產品',
          path: 'products',
          component: DashboardProducts,
          meta: { title: '管理後台-產品列表', requiresAuth: true },
        },
        {
          name: '訂單列表',
          path: 'order',
          component: DashboardOrder,
          meta: { title: '管理後台-訂單列表', requiresAuth: true },
        },
        {
          name: '優惠券',
          path: 'coupon',
          component: DashboardCoupon,
          meta: { title: '管理後台-優惠券', requiresAuth: true },
        },
      ],
    },
    {
      name: '',
      path: '/',
      component: Dashboard,
      children: [
        {
          name: '模擬訂單',
          path: 'customorder',
          component: DashboardCustomorder,
          meta: { title: '模擬-商品訂單' },
        },
        {
          name: '訂單確認',
          path: 'ordercheckout/:orderId',
          component: DashboardOrderCheckout,
          meta: { title: '模擬-訂單確認' },
        },
      ],
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
