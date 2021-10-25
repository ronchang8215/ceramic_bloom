<template>
<div>
  <div class="progress" style="height: 5px;">
    <div class="progress-bar progressbar" role="progressbar"
    style="width: 50%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
  </div>
  <div class="container">
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
                  {{item.product.price}}元/{{ item.product.unit }}
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
<!-- 付款完成Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header text-white">
          <h5 class="modal-title" id="exampleModalLabel">付款完成</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <i class="fas fa-check-circle text-success display-4"></i><br>
          😊&emsp;謝謝您的支持！您還可以選擇選購。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">關閉</button>
          <button type="button" class="btn btn-primary" @click.prevent="continueShop">
            繼續逛逛
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
  data() {
    return {
      orderId: '',
      order: {
        user: {}, // 為了不要跨第二層的object跳錯
      },
      ispaid: false,
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      this.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/order/${vm.orderId}`).then((res) => {
        // console.log(res.data);
        vm.order = res.data.order;
        vm.ispaid = res.data.order.is_paid;
      });
    },
    payOrder() {
      const vm = this;
      this.$http.post(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/pay/${vm.orderId}`).then(() => {
        // console.log(res.data);
        vm.getOrder();
      });
    },
    isPaid() {
      const vm = this;
      if (vm.order.is_paid) {
        $('.progressbar').removeClass('progressbar').addClass('bar');
        $('.progress-bar').width('100%');
        $('#exampleModal').modal('show');
      }
    },
    continueShop() {
      const vm = this;
      $('#exampleModal').modal('hide');
      vm.$router.push('/customproduct');
    },
  },
  watch: {
    ispaid() {
      this.isPaid();
    },
  },
  created() {
    const vm = this;
    vm.orderId = this.$route.params.orderId;
    // console.log(vm.orderId);
    this.getOrder();
  },
};
</script>

<style lang="scss" scoped>
@import"../assets/all";

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

.progressbar::after {
  width:1.5rem;
  height:1.5rem;
  font-size:1rem;
  position:absolute;
  content: "準備付款";
  color:$primary;
  transform: translate(-150%,-50%);
  left:50.5%;
}

.bar::after {
  width:1.5rem;
  height:1.5rem;
  font-size:1rem;
  position:absolute;
  content: "付款完成";
  color:$primary;
  transform: translate(-90%,-50%);
  right:8rem;
}

.table {
  background:rgba(255, 255, 255, 0.5);
  border-radius: 1rem;
}

.table th , .table td {
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

// .cartlist:hover {
//   background:rgba(255, 255, 255, 0.7);
//   opacity:1;
// }

.tableimage {
  background-size: cover;
  background-position: center;
  height:150px;
}

tfoot tr {
  background:$primary;
  color:#fff;
  font-weight: bold;
}

tfoot tr td:first-child{
  border-radius:0 0 0 1rem;
}

tfoot tr td:last-child{
  border-radius:0 0 1rem 0;
}

.modal-header {
  background:#444;
}

@media (max-width: 767px) {
  .progress {
    margin:5rem;

    &::after {
      right:5rem;
    }
  }
}

</style>
