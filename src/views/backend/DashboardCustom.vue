<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="row mt-4">
      <div class="col-sm-6 col-lg-4 mb-4" v-for="item in products" :key="item.id">
        <Card :card="item" :loadingItem="status.loadingItem"
        @getCardProduct="getProduct" @addCardtoCart="addtoCart" />
      </div>
    </div>
    <table class="table">
      <thead>
        <th colspan="5">購買清單</th>
      </thead>
      <tbody>
        <tr class="cartlist" v-for="item in cart.carts" :key="item.id">
          <td width="40%" class="align-middle tableimage"
          :style="{backgroundImage:`url(${item.product.imageUrl})`}">
          </td>
          <td class="align-middle">
            {{ item.product.title }}
            <div class="text-success" v-if="item.coupon">
              已套用優惠券
            </div>
          </td>
          <td class="align-middle">{{ item.qty }}{{ item.product.unit }}</td>
          <td class="align-middle text-right">
            <del v-if="item.total!==item.final_total">{{ item.total }}</del>
            {{ item.final_total }}元
            <div v-if="item.qty!==1" style="font-size:0.5rem">
              {{ item.product.price }}元/{{ item.product.unit }}
            </div>
          </td>
          <td width="5%" class="align-middle">
            <button type="button" class="btn btn-outline-primary btn-sm"
            @click="removeCart(item.id)">
              <i class="far fa-trash-alt"></i>
            </button>
          </td>
        </tr>
        <tr>
          <td colspan="5">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="addCoupon">
                  套用優惠碼
                </button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr style="color:#777">
          <td colspan="3" class="text-right">總計</td>
          <td v-if="cart.total == cart.final_total" class="text-right">{{ cart.total }}元</td>
          <td v-if="cart.total!== cart.final_total" class="text-right">
            <del>{{ cart.total }}元</del>
          </td>
          <td></td>
        </tr>
        <tr v-if="cart.total!== cart.final_total">
          <td colspan="3" class="text-right">折扣價</td>
          <td class="text-right">{{ cart.final_total }}元</td>
          <td></td>
        </tr>
      </tfoot>
    </table>
    <div class="my-3">
      <validation-observer class="col-md-6" v-slot="{ invalid }">
        <form @submit.prevent="createOrder">
          <h3 class="formtitle">請填寫表單</h3>
          <validation-provider class="form-group" rules="required|email" v-slot="{errors,classes}">
            <!-- 輸入框 -->
            <label for="email">Email</label>
            <input id="email" type="email" name="Email" placeholder="請輸入 Email"
            v-model="form.user.email" class="form-control" :class="classes">
            <!-- 錯誤訊息 -->
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider class="form-group" rules="required" v-slot="{errors,classes}">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="姓名" id="username"
              v-model="form.user.name" placeholder="輸入姓名" :class="classes">
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider class="form-group" rules="required" v-slot="{errors,classes}">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" name="電話"
            v-model="form.user.tel" placeholder="請輸入電話" :class="classes">
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider class="form-group" rules="required" v-slot="{errors,classes}">
            <label for="useraddress">收件人地址</label>
            <input type="text" class="form-control" name="地址"
            id="useraddress" v-model="form.user.address"
            placeholder="請輸入地址" :class="classes">
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control"
            cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button type="submit" class="btn btn-primary"
            :disabled="invalid||cartLength<1">送出訂單</button>
          </div>
          <div class="text-right mt-3">
          <span class="text-danger" v-show="cartLength<1">＊購物車不得為空</span>
          </div>
        </form>
      </validation-observer>
    </div>
  <!-- Model -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ product.title }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" :alt="product.title">
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{ product.description }}</p>
              <footer class="blockquote-footer text-right">{{ product.content }}</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <div class="h4" v-if="!product.price">{{ product.origin_price }} 元</div>
              <del class="h6" v-if="product.price">原價 {{ product.origin_price }} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{ product.price }} 元</div>
            </div>
            <select name="" class="form-control mt-3" v-model="number">
              <option :value="num" v-for="num in 10" :key="num">
                選購 {{ num }} {{ product.unit }}
              </option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計 <strong>{{ number * product.price }}</strong> 元
            </div>
            <button type="button" class="btn btn-primary"
              @click="addtoCart(product.id, number)">
              <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Card from '@/components/Card.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      products: [],
      product: {},
      cart: {
      },
      coupon_code: '',
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      isLoading: false,
      status: {
        loadingItem: '',
      },
      number: 1,
    };
  },
  computed: {
    cartLength() {
      if (this.cart.carts) {
        return this.cart.carts.length;
      }
      return '';
    },
  },
  methods: {
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`).then((res) => {
        if (res.data.success) {
          vm.products = res.data.products;
          vm.isLoading = false;
        }
      });
    },
    getProduct(id) {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`).then((res) => {
        vm.product = res.data.product;
        $('#productModal').modal('show');
        vm.isLoading = false;
      });
    },
    addtoCart(id, cardqty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      let qty = cardqty;
      let delurl = '';
      function addCart() {
        const cart = {
          product_id: id,
          qty,
        };
        vm.$http.post(url, { data: cart }).then(() => {
          vm.getCart();
          $('#productModal').modal('hide');
          vm.status.loadingItem = '';
        });
      }
      vm.status.loadingItem = id;
      vm.$http.get(url).then((res) => {
        const { carts } = res.data.data;
        carts.forEach((item) => {
          if (id === item.product_id) {
            qty += item.qty;
            delurl = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${item.id}`;
          }
        });
        if (delurl) {
          vm.$http.delete(delurl).then(() => { addCart(); });
        } else {
          addCart();
        }
      });
    },
    removeCart(id) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart/${id}`;
      vm.isLoading = true;
      vm.$http.delete(url).then(() => {
        vm.isLoading = false;
        vm.getCart();
      });
    },
    getCart() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.isLoading = true;
      vm.$http.get(url).then((res) => {
        vm.cart = res.data.data;
        vm.isLoading = false;
      });
    },
    addCoupon() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/coupon`;
      const coupon = {
        code: vm.coupon_code,
      };
      vm.isLoading = true;
      vm.$http.post(url, { data: coupon }).then(() => {
        vm.isLoading = false;
        vm.getCart();
      });
    },
    createOrder() {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order`;
      vm.isLoading = true;
      vm.$http.post(url, { data: vm.form }).then((res) => {
        if (res.data.success) {
          vm.$router.push(`/ordercheckout/${res.data.orderId}`);
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>

.table {
  background:rgba(255, 255, 255, 0.5);
  border-radius: 1rem;

  thead th , td {
    border:none;
  }

  .cartlist {
    opacity:0.7;
    transition: 0.3s;

    &:hover {
      background:rgba(255, 255, 255, 0.7);
      opacity:1;
    }
  }

  .tableimage {
    background-size: cover;
    background-position: center;
    height:150px;
  }

  tfoot tr {
    font-weight: bold;
  }
}

form {
  border:2px solid #444;
  border-radius: 1rem;
  padding:0 1rem 1rem 1rem;
  margin-right: 4rem;
  text-align: left;
  width:100%;

  .formtitle {
    background:#575757;
    color:#fff;
    padding:0.5rem;
    text-align: left;
  }

  label {
    font-size:1rem;
    margin:1.2rem 0 0.2rem 0;
    padding:0.1rem 0 0 0.5rem;
    background:rgba(255, 255, 255, 0.7);
    width:100%;
    border-radius: 0.2rem;
  }
}
</style>
