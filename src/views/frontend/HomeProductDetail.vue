<template>
  <div class="pt-6">
    <Loading :active.sync="isLoading" />
    <h1>{{ product.title }}</h1>
    <div class="container my-5">
      <div class="row">
        <div class="col-12 col-lg-6 px-3">
          <div class="productphoto" :style="{backgroundImage:`url(${product.imageUrl})`}"></div>
        </div>
        <div class="col-12 col-lg-6 px-3">
          <div class="product px-3">
            <h5 class="modal-title my-3">{{ product.title }}</h5>
            <div class="my-3">
              <p>{{ product.description }}</p>
            </div>
            <div class="d-flex my-3 align-items-baseline">
              <div class="h4" v-if="!product.price">NT${{ product.origin_price }} </div>
              <del class="h6" v-if="product.price"> NT${{ product.origin_price }} </del>
              <div class="h4" v-if="product.price"> NT${{ product.price }} </div>
            </div>
            <label>數量</label>
            <div class="d-flex justify-content-between align-items-baseline">
              <div>
                <select name="" class="form-control" v-model="number">
                  <option :value="num" v-for="num in 10" :key="num">
                  {{ num }}
                  </option>
                </select>
                <div class="text-muted text-nowrap mr-3">
                    共<strong>{{ number * product.price }}</strong> 元
                </div>
              </div>
              <button type="button" class="btn btn-primary" @click="addtoCart(product.id, number)"
              :disabled="product.id === status.loadingItem">
                <i class="fas fa-spinner fa-spin" v-if="product.id === status.loadingItem"></i>
                加到購物車
              </button>
            </div>
            <div class="content">
              <pre class="mb-0">產品說明<br>{{ product.content }}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="liketitle col-12">
          <span>你可能也喜歡……</span>
        </div>
        <div class="col-lg-4 col-sm-6 mb-4" v-for="(item,index) in products" :key="item.id">
          <Card v-if="index<3" :card="item" :loadingItem="status.loadingItem"
          @getCardProduct="toProduct" @addCardtoCart="addtoCart" />
        </div>
      </div>
      <router-link class="btn button__producttoshop mb-3" role="button" to="/customproduct">
      回商品頁</router-link>
    </div>
  </div>
</template>

<script>
import Card from '@/components/Card.vue';

export default {
  components: {
    Card,
  },
  data() {
    return {
      Id: '',
      number: 1,
      products: [],
      product: {},
      cart: {
      },
      coupon_code: '',
      isLoading: false,
      status: {
        loadingItem: '',
      },
      categoryName: '',
    };
  },
  watch: {
    '$route.params.Id': function productChange() {
      const vm = this;
      vm.Id = vm.$route.params.Id;
      vm.getProduct(vm.Id);
    },
  },
  methods: {
    toProduct(id) {
      const vm = this;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`).then((res) => {
        if (res.data.success) {
          vm.$router.push(`/product/${res.data.product.id}`);
        }
      });
    },
    getProduct(id) {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`).then((res) => {
        vm.product = res.data.product;
        vm.categoryName = res.data.product.category;
        vm.getProducts(() => {
          vm.isLoading = false;
        });
      });
    },
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`).then((res) => {
        vm.products = res.data.products.filter(
          (element) => element.category === vm.categoryName && element.id !== vm.Id,
        );
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
          vm.$bus.$emit('pushCart');
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
  },
  created() {
    const vm = this;
    vm.Id = vm.$route.params.Id;
    vm.getProduct(vm.Id);
  },
};
</script>

<style lang="scss" scoped>

h1 {
  color:#fff;
  font-weight: bold;
  text-shadow: 0.05em 0.05em 0.05em #333;
  background:#777;
  margin:0 auto;
  line-height: 5rem;
  text-align: left;
  padding:0 10%;
}

.productphoto {
  width:100%;
  height:20rem;
  background-size: cover;
  background-position:center;
}

.product {
  background:rgba(255,255,255,0.5);
  text-align: left;
  display: flex;
  flex-direction: column;

  label {
    margin:0.5rem;
  }

  .justify-content-between div {
    height:1.6rem;
  }

  select {
    width:10rem;
    margin:0;
    float: left;
  }

  .text-muted {
    line-height:3rem;
    text-align: left;
    float:left;
  }

  .content {
    margin:2rem 0;
  }
}

.liketitle {
  font-size:1.5rem;
  padding:1rem;
  width:100%;
  display:flex;
  justify-content:space-between;
  text-align: left;
}

.card {
  max-width: 20rem;
  margin:0 auto;
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
  .liketitle {
    font-size:1rem;
  }
}

</style>
