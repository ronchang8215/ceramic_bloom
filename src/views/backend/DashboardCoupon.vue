<template>
<div>
  <loading :active.sync="isLoading"></loading>
  <div class="mt-3 text-right">
    <button type="button" class="btn btn-primary"
    @click="openModal(true)">建立新優惠券</button>
  </div>
  <table class="table mt-3">
    <thead>
      <tr>
        <th scope="col" width="15%">標題</th>
        <th scope="col" width="10%">折扣</th>
        <th scope="col" width="15%">到期日</th>
        <th scope="col">優惠碼</th>
        <th scope="col" width="10%">是否啟用</th>
        <th scope="col" width="10%">編輯</th>
        <th scope="col" width="10%">刪除</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in coupons" :key="item.id">
        <td>{{ item.title }}</td>
        <td>{{ item.percent }}</td>
        <td>{{ item.due_date | date }}</td>
        <td>{{ item.code }}</td>
        <td>
          <span v-if="item.is_enabled">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <button class="btn btn-outline-primary btn-sm"
          @click.prevent="openModal(false,item)">編輯</button>
        </td>
        <td>
          <button class="btn btn-outline-secondary btn-sm"
          @click.prevent="deleteModal(item)">刪除</button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- modal -->
  <div class="modal fade" id="couponModal" tabindex="-1" role="dialog"
  aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>新增/編輯優惠券</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-lg-8">
              <div class="form-group">
                <label for="title">標題</label>
                <input type="text" class="form-control" id="title"
                  placeholder="請輸入標題" v-model="tempCoupon.title">
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="percent">折扣</label>
                  <input type="number" class="form-control" id="percent"
                    placeholder="請輸入折扣" v-model="tempCoupon.percent">
                </div>
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                <label for="duedate">到期日</label>
                  <input type="date" class="form-control" id="duedate"
                  v-model="due_date">
                </div>
                <div class="form-group col-md-6">
                  <label for="code">優惠碼</label>
                  <input type="text" class="form-control" id="code"
                    placeholder="請輸入優惠碼" v-model="tempCoupon.code">
                </div>
              </div>
              <hr>
              <div class="form-group">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                    id="is_enabled" v-model="tempCoupon.is_enabled"
                    :true-value="1" :false-value="0">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-primary" @click.prevent="updateCoupon">確認</button>
        </div>
      </div>
    </div>
  </div>
<!-- delModal -->
  <div class="modal fade" id="delCouponModal" tabindex="-1" role="dialog"
    aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>刪除優惠券</span>
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          是否刪除 <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
          <button type="button" class="btn btn-danger" @click.prevent="deleteCoupon">
          確認刪除</button>
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
      coupons: [],
      tempCoupon: {},
      isNew: false,
      isLoading: false,
      due_date: new Date(),
    };
  },
  watch: {
    due_date() {
      const vm = this;
      const timestamp = Math.floor(new Date(vm.due_date) / 1000);
      vm.tempCoupon.due_date = timestamp;
    },
  },
  methods: {
    openModal(isNew, item) {
      const vm = this;
      vm.isNew = isNew;
      if (vm.isNew) {
        vm.tempCoupon = {};
      } else {
        vm.tempCoupon = { ...item };
        const dateAndTime = new Date(vm.tempCoupon.due_date * 1000).toISOString().split('T');
        const tempcode = dateAndTime[0];
        vm.due_date = tempcode;
      }
      $('#couponModal').modal('show');
    },
    deleteModal(item) {
      this.tempCoupon = { ...item };
      $('#delCouponModal').modal('show');
    },
    getCoupon(page = 1) {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupons?page=${page}`).then((res) => {
        vm.coupons = res.data.coupons;
        vm.isLoading = false;
      });
    },
    updateCoupon() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempCoupon }).then((res) => {
        if (res.data.success) {
          $('#couponModal').modal('hide');
          vm.getCoupon();
        } else {
          $('#couponModal').modal('hide');
          vm.getCoupon();
          vm.$bus.$emit('message:push', '新增優惠券失敗', 'danger');
        }
      });
    },
    deleteCoupon() {
      const vm = this;
      vm.$http.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/coupon/${vm.tempCoupon.id}`).then((res) => {
        if (res.data.success) {
          $('#delCouponModal').modal('hide');
          vm.getCoupon();
        } else {
          $('#delCouponModal').modal('hide');
          vm.getCoupon();
          vm.$bus.$emit('message:push', '刪除優惠券失敗', 'danger');
        }
      });
    },
  },
  created() {
    this.getCoupon();
  },
};
</script>
