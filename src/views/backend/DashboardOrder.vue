<template>
  <div>
    <Loading :active.sync="isLoading" />
    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col" width="10%">購買日期</th>
          <th scope="col" width="10%">客戶資訊</th>
          <th scope="col">購買商品</th>
          <th scope="col" width="10%">應付金額</th>
          <th scope="col" width="10%">是否附款</th>
          <th scope="col" width="10%">客戶留言</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <td>{{ item.create_at | date }}</td>
          <td>{{ item.user.name }}</td>
          <td>
            <span v-for="(product, i) in item.products" :key="i">
              {{ product.product.title }} 數量：{{ product.qty }}{{ product.product.unit }}
            </span>
          </td>
          <td>{{ item.total }}</td>
          <td>
            <span v-if="item.is_paid">已付款</span>
            <span v-else>未付款</span>
          </td>
          <td>{{ item.message }}</td>
        </tr>
      </tbody>
    </table>
    <Pagination :pages="pagination" @getPage="getOrder" />
  </div>
</template>

<script>
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      orders: [],
      isLoading: false,
      pagination: {},
    };
  },
  methods: {
    getOrder(page = 1) {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/orders?page=${page}`).then((res) => {
        vm.orders = res.data.orders;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
