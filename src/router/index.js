import Vue from 'vue';
import VueRouter from 'vue-router';
// 官方的元件

import Home from '@/views/home.vue';
import Login from '@/views/login.vue';
import Dashboard from '@/views/dashboard.vue';
import Products from '@/views/products.vue';
import Order from '@/views/order.vue';
import Coupon from '@/views/coupon.vue';
import Customorder from '@/views/customorder.vue';
import OrderCheckout from '@/views/ordercheckout.vue';
import About from '@/views/about.vue';
import Introduce from '@/views/introduce.vue';
import Customproduct from '@/views/customproduct.vue';
import Productdetail from '@/views/productdetail.vue';
import Payment from '@/views/payment.vue';
import Prepareorder from '@/views/prepareorder.vue';
import CustomCheckout from '@/views/customcheckout.vue';

Vue.use(VueRouter);

export default new VueRouter({

  // linkActiveClass:'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '',
      component: Home,
      children: [
        {
          name: '介紹',
          path: '',
          component: Introduce,
          meta: { title: '陶藝綻放' },
        },
        {
          name: '關於',
          path: '/about',
          component: About,
          meta: { title: '陶藝綻放-關於我們' },
        },
        {
          name: '客戶購物',
          path: '/customproduct',
          component: Customproduct,
          meta: { title: '陶藝綻放-購物商店' },
        },
        {
          name: '產品詳情',
          path: 'product/:Id',
          component: Productdetail,
          meta: { title: '陶藝綻放-產品詳情' },
        },
      ],
    },
    {
      path: '/payment',
      component: Payment,
      children: [
        {
          name: '客戶訂單準備',
          path: '',
          component: Prepareorder,
          meta: { title: '陶藝綻放-準備結帳' },
        },
        {
          name: '客戶訂單確認',
          path: 'customcheckout/:orderId',
          component: CustomCheckout,
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
          component: Products,
          meta: { title: '管理後台-產品列表', requiresAuth: true },
        },
        {
          name: '訂單列表',
          path: 'order',
          component: Order,
          meta: { title: '管理後台-訂單列表', requiresAuth: true },
        },
        {
          name: '優惠券',
          path: 'coupon',
          component: Coupon,
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
          component: Customorder,
          meta: { title: '模擬-商品訂單' },
        },
        {
          name: '訂單確認',
          path: 'ordercheckout/:orderId',
          component: OrderCheckout,
          meta: { title: '模擬-訂單確認' },
        },
      ],
    },
  ],
});