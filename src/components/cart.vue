<template>
  <div>
  <button type="button" class="btn btn-primary" id="liveToastBtn"
  @click.prevent="cartOpen">
  <div class="cartCount" v-show="cart.carts && cart.carts.length ? cart.carts.length>0 : 0">
    <b>{{ cart.carts && cart.carts.length ? cart.carts.length : 0 }}</b>
  </div>
  <i class="fas fa-shopping-cart"></i>購物車
  </button>
<div class="position-fixed bottom-0 right-0 p-3" style="z-index: 5; right: 0; bottom: 0;">
  <div id="liveToast" class="toast hide" role="alert"
  aria-live="assertive" aria-atomic="true" data-delay="5000">
    <div class="toast-header">
      <strong class="mr-auto">您的購物車</strong>
      <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  <div v-if="cart.carts && cart.carts.length ? cart.carts.length>0 : 0" class="toast-body">
  <table class="col table">
  <thead>
    <th></th>
    <th>品名</th>
    <th>數量</th>
    <th>單價</th>
    <th>總價</th>
    <th></th>
  </thead>
  <tbody>
    <tr v-for="item in cart.carts" :key="item.id">
      <td width="25%" class="align-middle toastimage" style="border-radius:0.3rem"
      :style="{backgroundImage:`url(${item.product.imageUrl})`}">
      </td>
      <td class="align-middle">
        <router-link :to="`/product/${item.product_id}`" style="color:#fff">
        {{ item.product.title }}
        </router-link>
        <div class="text-success" v-if="item.coupon">
          已套用優惠券
        </div>
      </td>
      <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
      <td class="align-middle text-right">{{ item.product.price }}元</td>
      <td class="align-middle text-right">
        <del v-if="item.total!==item.final_total">{{ item.total }}元</del>
        <div>{{ item.final_total }}元</div>
      </td>
      <td class="align-middle">
        <button type="button" class="btn btn-outline-light btn-sm"
        @click.prevent="removeCart(item.id)">
        <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
        <i class="far fa-trash-alt" v-else></i>
        </button>
      </td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="4" style="">總計</td>
      <td v-if="cart.total!== cart.final_total" class="text-right">
        <del>{{ cart.total }}元</del>
        <div>{{ cart.final_total }}元</div>
      </td>
      <td v-if="cart.total === cart.final_total" class="text-right">
        {{ cart.total }}元
      </td>
      <td></td>
    </tr>
  </tfoot>
</table>
      <button v-if="cart.total!==0" type="button" class="btn btn-light p-0">
        <router-link class="nav-link" to="/payment">去結帳</router-link>
      </button>
    </div>
    <div v-else class="toast-body">
      <div class="p-5">
      <strong style="color:#fff">您的購物車為空</strong>
      </div>
      </div>
  </div>
</div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'Cart',
  data() {
    return {
      cart: {},
      status: {
        loadingItem: '',
      },
    };
  },
  methods: {
    cartOpen() {
      $('.toast').toast('show');
    },
    removeCart(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.status.loadingItem = id;
      this.$http.delete(url).then(() => {
        // console.log(res.data);
        vm.getCart();
        vm.status.loadingItem = '';
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      this.$http.get(url).then((res) => {
        // console.log(res.data);
        vm.cart = res.data.data;
      });
    },
    getProduct(id) {
      const vm = this;
      // console.log(id);
      this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`).then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          vm.$router.push(`/product/${res.data.product.id}`);
        }
      });
    },
  },
  created() {
    const vm = this;
    vm.getCart();
    // 自定義function名稱 'pushCart'
    vm.$bus.$on('pushCart', () => {
      vm.getCart();
    });
  },
};
</script>

<style scope>
#liveToastBtn {
  position:fixed;
  bottom:2%;
  right:2%;
}

#liveToastBtn i {
  margin:0.1rem 0.5rem 0 0;
  font-size: 1.2rem;
}

.cartCount{
  position: absolute;
  right:-10%;
  top:-20%;
  background:#fff;
  color:#444;
  border-radius: 99rem;
  width:1.4rem;
  height:1.4rem;
}

.toast {
  max-width:none;
  background:rgba(68,68,68,0.85);
}

.toast-body {
  max-height:30rem;
  overflow: auto;
}

.toast .text-success {
  color:#aaa !important;
}

.toast .table {
  color:#fff;
  border-collapse:separate;
  border-spacing:0 1rem;
  margin:0;
}

.toast table th {
  padding:0;
}

.toast tbody {
  background:none;
}

.toast tr {
  margin:1rem 0;
}

.toast tfoot {
  border-radius: 1rem;
}

.toast tfoot tr {
  background:rgba(255,255,255,0.3);
  font-weight: bold;
}

.toast tfoot td:first-child{
  border-radius:0.5rem 0 0 0.5rem;
}

.toast tfoot td:last-child{
  border-radius:0 0.5rem 0.5rem 0;
}

.toastimage {
  background-position: center;
  background-size: cover;
  opacity:0.7;
}

button .nav-link {
  padding:0.5rem 1rem;
}

button.btn-light {
  opacity:0.5;
  transition: 0.3s;
}

button.btn-light:hover {
  opacity:1;
}

.toast-body::-webkit-scrollbar {
  width: 0.5em;
}

.toast-body::-webkit-scrollbar-thumb {
  background-color: #aaa;
  border: 1px solid #444;
}
</style>
