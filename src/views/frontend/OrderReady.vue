<template>
<div>
  <loading :active.sync="isLoading"></loading>
  <div class="progress" style="height: 5px;">
    <div class="progress-bar" role="progressbar" style="width: 0%;"
    aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-5 justify-content-center">
        <validation-observer v-slot="{ invalid }">
        <form @submit.prevent="createOrder">
          <h3 class="formtitle">請填寫表單</h3>
          <validation-provider class="form-group" rules="required|email" v-slot="{errors,classes}">
            <!-- 輸入框 -->
            <label for="email">Email</label>
            <input id="email" type="email" name="Email" v-model="form.user.email"
            class="form-control" :class="classes">
            <!-- 錯誤訊息 -->
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider class="form-group" rules="required" v-slot="{errors,classes}">
            <label for="username">收件人姓名</label>
            <input type="text" class="form-control" name="姓名" id="username"
              v-model="form.user.name" :class="classes">
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider class="form-group" rules="required" v-slot="{errors,classes}">
            <label for="usertel">收件人電話</label>
            <input type="tel" class="form-control" id="usertel" name="電話"
            v-model="form.user.tel" :class="classes">
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>

          <validation-provider class="form-group" rules="required" v-slot="{errors,classes}">
            <label for="useraddress">收件人地址</label>
            <input type="text" class="form-control" name="地址"
            id="useraddress" v-model="form.user.address" :class="classes">
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </validation-provider>

          <div class="form-group">
            <label for="comment">留言</label>
            <textarea name="" id="comment" class="form-control"
            cols="30" rows="10" v-model="form.message"></textarea>
          </div>
          <div class="text-right">
            <button  type="submit" class="btn btn-primary"
            :disabled="invalid||cartLength<1">送出訂單</button>
          </div>
        </form>
        </validation-observer>
      </div>
      <div  class="col-md-7">
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
                <router-link :to="`/product/${item.product_id}`">
                {{ item.product.title }}
                </router-link>
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
                  <input type="text" class="form-control" placeholder="請輸入優惠碼"
                  v-model="coupon_code">
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button"
                    @click="addCoupon">
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
        <span class="text-danger" v-show="cartLength<1">
        ＊購物車不得為空，<router-link class="text-danger" to="/customproduct">點此繼續購物</router-link>
        </span>
      </div>
    </div>
  </div>
</div>
</template>

<script>

export default {
  data() {
    return {
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
          vm.$router.push(`/payment/customcheckout/${res.data.orderId}`);
        }
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>

<style lang="scss" scoped>
@import"@/assets/scss/all";

.progress {
  margin:5rem 8rem;

  &::before {
    transform: translate(0,-35%);
    content: "1";
  }

  &::after {
    right:8rem;
    transform: translate(0,-35%);
    content: "3";
  }

}

.progress::before, .progress::after , .progress-bar::before {
  width:1.5rem;
  height:1.5rem;
  border-radius: 99rem;
  color:#fff;
  font-size:0.8rem;
  line-height: 1.5rem;
  background:$primary;
  position:absolute;
}

.progress-bar::before {
  left:50%;
  transform: translate(-50%,0);
  content: "2";
}

.progress-bar::after {
  width:1.5rem;
  height:1.5rem;
  font-size:1rem;
  position:absolute;
  content: "輸入訂單內容";
  color:$primary;
  transform: translate(-150%,-50%);
}

.col {
  box-sizing: border-box;
}

.formtitle {
  background:$primary;
  color:#fff;
  margin:-0.2rem -5rem 0 -1.5rem;
  padding:0.5rem;
  text-align: left;
}

form {
  border:2px solid #444;
  border-radius: 1rem;
  padding:0 1rem 1rem 1rem;
  margin-right: 4rem;
  text-align: left;

  label {
    font-size:1rem;
    margin:1.2rem 0 0.2rem 0;
    padding:0.1rem 0 0 0.5rem;
    background:rgba(255, 255, 255, 0.7);
    width:100%;
    border-radius: 0.2rem;
  }
}

.table {
  background:rgba(255, 255, 255, 0.5);
  border-radius: 1rem;

  thead th, td {
    border:none;
  }
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

.button__producttoshop {
  font-size: 1.2rem;
  background:rgba(255,255,255,0.5);
  width:100%;
  transition: 0.3s;
  border-color:#fff;
  border-width: 0.5rem;
  box-sizing:border-box;

  &:hover {
    border-width: 0.5rem 2rem;
  }
}

@media (max-width: 767px) {
  .row {
    flex-direction: column-reverse;
  }

  .progress {
    margin:5rem;

    &::after {
      right:5rem;
    }
  }

  form {
  margin:1rem;
  }

  .formtitle {
    margin:1rem;
    padding:0.5rem;
    text-align:center;
  }
}

</style>
