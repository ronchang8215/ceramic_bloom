<template>
<div>
  <loading :active.sync="isLoading"></loading>
  <div class="banner"><h1>還沒找到你想要的嗎？</h1></div>
  <h4 class="coupon text-left p-3">
    <i class="fas fa-bullhorn mr-3"></i>結帳時輸入優惠碼discount70，即可享7折優惠
  </h4>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block sidebar collapse">
      <div>
        <h6 class="sidebar-heading d-flex justify-content-between
        align-items-center px-3 mt-4 mb-1 text-muted">
          <a href="#" :class="{'active':categoryName===''}" @click.prevent="categoryName=''">
            <span>全部商品</span>
          </a>
        </h6>
        <ul class="nav flex-column">
          <li class="nav-item">
            <a class="nav-link" :class="{'active':categoryName==='陶瓷碗具'}" href="#"
            @click.prevent="categoryName='陶瓷碗具'">
            陶瓷碗具</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{'active':categoryName==='陶瓷茶具'}" href="#"
            @click.prevent="categoryName='陶瓷茶具'">
              <span data-feather="file"></span>
              陶瓷茶具
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" :class="{'active':categoryName==='陶瓷商品'}" href="#"
            @click.prevent="categoryName='陶瓷商品'">
              <span data-feather="file"></span>
              其他
            </a>
          </li>
          </ul>
      </div>
  </nav>
  <div class="container">
    <div class="row">
      <div class="col-md-6 col-lg-4 mb-4" v-for="item in filterProducts" :key="item.id">
        <Card :card="item" :loadingItem="status.loadingItem"
        @getCardProduct="getProduct" @addCardtoCart="addtoCart"></Card>
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
      products: [],
      isLoading: false,
      status: {
        loadingItem: '',
      },
      categoryName: '',
    };
  },
  computed: {
    filterProducts() {
      const vm = this;
      let filterData = [];
      // console.log(vm.filter);
      filterData = vm.products.filter((ele) => {
        if (vm.categoryName) {
          return ele.category === vm.categoryName;
        }
        if (!vm.categoryName) {
          return ele;
        }
        return true;
      });
      return filterData;
      // console.log(vm.filterData);
    },
  },
  methods: {
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`).then((res) => {
        // console.log(res.data);
        vm.products = res.data.products;
        vm.isLoading = false;
      });
    },
    getProduct(id) {
      const vm = this;
      this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`).then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          vm.$router.push(`/product/${res.data.product.id}`);
        }
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
        this.$bus.$emit('pushCart');
        vm.status.loadingItem = '';
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style scoped>
.h5 {
  margin:0;
}

.banner {
  color:#fff;
  margin:1rem auto;
  width:100%;
  height:15rem;
  background-image: url(../assets/jade-scarlato-Yftfw3yTAOE-unsplash.jpg);
  background-size: cover;
  background-position: center;
  border-width: 1rem 5rem 1rem 5rem;
  border-color:rgba(255,255,255,0.5);
  border-style: solid;
  display: flex;
  align-items: center;
}

.banner h1 {
  width:100%;
  font-size:3rem;
  text-shadow: 0.1em 0.1em 0.05em #333
}

.coupon {
  border:3px solid #555;
  border-style:none none solid none;
  background:#fff;
}

.sidebar {
  margin-top:5rem;
  position:relative;
  padding:0px;
}

.nav-link:hover {
  text-decoration: underline;
}

.active, .sidebar .nav-link.active {
  color:#333;
  text-decoration: underline;
}

.container {
  margin-top:-12rem;
}

.row {
  margin-left:12rem;
}

@media (max-width: 767px) {

  .coupon {
    color:#fff;
    border:3px solid #555;
    border-style:none none solid none;
    background:none;
    font-size: 1rem;
  }

  .sidebar {
    width:100%;
    display:block;
    margin-top:-3rem;
    padding:0.5rem;
    background:rgba(255,255,255,0.5);
    z-index: 0;
  }

  .flex-column {
    flex-direction:row !important;
  }

  .nav-item {
    margin:0;
    width:auto;
  }

  .nav-link{
    padding: 0.5rem 1rem;
  }

  .container {
    margin-top: 8rem;
  }

  .row {
    margin-left: 0;
  }

  .card {
    max-width:20rem;
    margin:0 auto;
  }

}

</style>
