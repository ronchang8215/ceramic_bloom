<template>
  <div>
    <Loading :active.sync="isLoading" />
    <button type="button" class="btn btn-primary" id="liveToastBtn"
    @click="cartOpen">
      <div class="cartCount" v-show="totalQty>0">
        <b>{{ totalQty }}</b>
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
                  @click="removeCart(item.id)" :disabled="item.id === status.loadingItem">
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
          <div class="p-5" style="color:#fff">
            <strong>您的購物車為空</strong>
            <br>&darr;&darr;<br>
            <button type="button" class="btn btn-light p-0 m-3">
              <router-link class="nav-link" to="/customproduct">購物去</router-link>
            </button>
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
      isLoading: false,
      status: {
        loadingItem: '',
      },
    };
  },
  computed: {
    totalQty() {
      const cartList = this.cart.carts;
      let talQty = 0;
      if (cartList) {
        cartList.forEach((ele) => {
          talQty += ele.qty;
        });
      }
      return talQty;
    },
  },
  methods: {
    cartOpen() {
      $('.toast').toast('show');
    },
    removeCart(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.status.loadingItem = id;
      vm.$http.delete(url).then(() => {
        vm.getCart();
        vm.status.loadingItem = '';
      });
    },
    getCart() {
      const vm = this;
      vm.isLoading = true;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.$http.get(url).then((res) => {
        vm.cart = res.data.data;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`).then((res) => {
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

<style lang="scss">
#liveToastBtn {
  position:fixed;
  bottom:2%;
  right:2%;
  z-index:3;

  i {
    margin:0.1rem 0.5rem 0 0;
    font-size: 1.2rem;
  }
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

  &-body{
    max-height:30rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.5em;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #aaa;
      border: 1px solid #444;
    }
  }

  .text-success {
    color:#aaa !important;
  }

  .table {
    color:#fff;
    border-collapse:separate;
    border-spacing:0 1rem;
    margin:0;
  }

  table th {
    padding:0;
  }

  tbody {
    background:none;
  }

  tr {
    margin:1rem 0;

    td {
      padding:0.5rem;
    }

    td:last-child{
      padding-right:0rem;
    }
  }

  tfoot {
    border-radius: 1rem;

    tr{
      background:rgba(255,255,255,0.3);
      font-weight: bold;
    }

    td:first-child{
      border-radius:0.5rem 0 0 0.5rem;
    }

    td:last-child{
      border-radius:0 0.5rem 0.5rem 0;
    }
  }

  .toastimage {
    background-position: center;
    background-size: cover;
    opacity:0.7;
  }

  button.btn-light {
    opacity:0.5;
    transition: 0.3s;

    &:hover {
      opacity:1;
    }

    .nav-link {
      padding:0.5rem 1rem;
    }
  }
}

@media (max-width:767px) {
  .toast {
    .col {
      padding:0;
    }
  }
}
</style>
