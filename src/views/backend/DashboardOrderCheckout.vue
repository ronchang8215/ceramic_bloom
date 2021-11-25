<template>
<div>
  <div class="my-5 row justify-content-center">
    <form class="col-md-10" @submit.prevent="payOrder">
      <table class="table">
        <thead>
          <th></th>
          <th>品名</th>
          <th>數量</th>
          <th>總價</th>
        </thead>
        <tbody>
          <tr class="cartlist" v-for="item in order.products" :key="item.id">
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
            <td class="align-middle">
              <del v-if="item.total!==item.final_total">{{ item.total }}</del>
              {{ item.final_total }}元
              <div v-if="item.qty!==1" style="font-size:0.5rem">
                {{ item.product.price }}元/{{ item.product.unit }}
              </div>
            </td>
            </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3">總計</td>
            <td>{{ order.total }}元</td>
          </tr>
        </tfoot>
      </table>
      <table class="table">
        <tbody>
          <tr>
            <th width="100">Email</th>
            <td>{{ order.user.email }}</td>
          </tr>
          <tr>
            <th>姓名</th>
            <td>{{ order.user.name }}</td>
          </tr>
          <tr>
            <th>收件人電話</th>
            <td>{{ order.user.tel }}</td>
          </tr>
          <tr>
            <th>收件人地址</th>
            <td>{{ order.user.address }}</td>
          </tr>
          <tr>
            <th>付款狀態</th>
            <td>
              <span v-if="!order.is_paid" class="text-danger">尚未付款</span>
              <span v-else class="text-success">付款完成</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="text-right" v-if="order.is_paid === false">
        <button class="btn btn-primary mb-3">確認付款去</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      orderId: '',
      order: {
        user: {}, // 為了不要跨第二層的object跳錯
      },
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`).then((res) => {
        vm.order = res.data.order;
      });
    },
    payOrder() {
      const vm = this;
      vm.$http.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`).then(() => {
        vm.getOrder();
      });
    },
  },
  created() {
    const vm = this;
    vm.orderId = vm.$route.params.orderId;
    vm.getOrder();
  },
};
</script>

<style lang="scss" scoped>
@import"@/assets/scss/all";

.table {
  background:rgba(255, 255, 255, 0.5);
  border-radius: 1rem;

  th , td {
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
    background:#575757;
    color:#fff;
    font-weight: bold;

    td:first-child{
      border-radius:0 0 0 1rem;
    }

    td:last-child{
      border-radius:0 0 1rem 0;
    }
  }
}
</style>
