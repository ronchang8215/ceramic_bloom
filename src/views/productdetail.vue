<template>
<div>
  <loading :active.sync="isLoading"></loading>
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
                {{num}}
                </option>
              </select>
              <div class="text-muted text-nowrap mr-3">
                  共<strong>{{ number * product.price }}</strong> 元
              </div>
            </div>
            <button type="button" class="btn btn-primary" @click="addtoCart(product.id, number)">
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
  <div class="liketitle">
    <span>你可能也喜歡這些……</span>
    <span>或是<router-link to="/customproduct">回商品頁</router-link></span>
  </div>
  <div class="container">
  <div class="row">
    <div class="col-lg-4 col-sm-6 mb-4" v-for="(item,index) in products" :key="item.id">
      <Card v-if="index<3" :card="item" :loadingItem="status.loadingItem"
      @getCardProduct="toProduct" @addCardtoCart="addtoCart"></Card>
    </div>
  </div>
  </div>
</div>
</template>

<script>
import Card from '../components/card.vue';

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
    '$route.params.Id': function () {
      const vm = this;
      vm.Id = this.$route.params.Id;
      this.getProduct(vm.Id);
    },
  },
  methods: {
    toProduct(id) {
      const vm = this;
      this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`).then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          vm.$router.push(`/product/${res.data.product.id}`);
        }
      });
    },
    getProduct(id) {
      const vm = this;
      vm.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`).then((res) => {
        // console.log(res.data);
        vm.product = res.data.product;
        vm.categoryName = res.data.product.category;
        this.getProducts();
        vm.isLoading = false;
      });
    },
    getProducts() {
      const vm = this;
      this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`).then((res) => {
        // console.log(res.data);
        vm.products = res.data.products.filter(
          (element) => element.category === vm.categoryName && element.id !== vm.Id,
        );
        // console.log(vm.categoryName);
      });
    },
    addtoCart(id, qty = 1) {
      const vm = this;
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty,
      };
      this.$http.post(url, { data: cart }).then(() => {
        // console.log(res.data);
        // console.log(cart);
        vm.status.loadingItem = '';
        this.$bus.$emit('pushCart');
      });
    },
  },
  created() {
    const vm = this;
    vm.Id = this.$route.params.Id;
    this.getProduct(vm.Id);
  },
};
</script>

<style scoped>
h1 {
    color:#fff;
    font-weight: bold;
    text-shadow: 0.05em 0.05em 0.05em #333;
    background:#777;
    margin:3rem auto;
    line-height: 5rem;
    text-align: left;
    padding:0 10%;;
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
}

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

@media (max-width: 767px) {

  .liketitle {
    font-size:1rem;
  }

}

</style>
