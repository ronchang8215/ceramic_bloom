<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="mt-3 text-right">
      <button type="button"
      class="btn btn-primary" @click="openModal(true)">建立新產品</button>
    </div>
    <table class="table mt-3">
      <thead>
        <tr>
          <th scope="col" width="10%">分類</th>
          <th scope="col">產品名稱</th>
          <th scope="col" width="10%">售價</th>
          <th scope="col" width="10%">原價</th>
          <th scope="col" width="10%">是否啟用</th>
          <th scope="col" width="10%">編輯</th>
          <th scope="col" width="10%">刪除</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in products" :key="item.id">
          <td>{{ item.category }}</td>
          <td>{{ item.title }}</td>
          <td class="text-right">{{ item.price | currency }}</td>
          <td class="text-right">{{ item.origin_price | currency }}</td>
          <td>
            <span v-if="item.is_enabled">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button type="button" class="btn btn-outline-primary btn-sm"
            @click="openModal(false,item)">編輯</button>
          </td>
          <td>
            <button type="button" class="btn btn-outline-secondary btn-sm"
            @click="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- pages傳的pagination是此元件的data:pagination -->
    <Pagination :pages="pagination" @getPage="getProduct" />
    <!-- Modal -->
    <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>新增產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="form-group">
                  <label for="image">輸入圖片網址</label>
                  <input type="text" class="form-control" id="image"
                    placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl">
                </div>
                <div class="form-group">
                  <label for="customFile">或 上傳圖片
                    <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                  </label>
                  <input type="file" id="customFile" class="form-control"
                    ref="files" @change="uploadFile">
                </div>
                <img class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.title">
              </div>
              <div class="col-sm-8">
                <div class="form-group">
                  <label for="title">標題</label>
                  <input type="text" class="form-control" id="title"
                    placeholder="請輸入標題" v-model="tempProduct.title">
                </div>
                <div class="form-group">
                  <label for="category">分類</label>
                  <input type="text" class="form-control" id="category"
                    placeholder="請輸入標題" v-model="tempProduct.category">
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                    <label for="num">數量</label>
                    <input type="number" class="form-control" id="num"
                      placeholder="請輸入數量" v-model.number="tempProduct.num">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">單位</label>
                    <input type="unit" class="form-control" id="unit"
                      placeholder="請輸入單位" v-model="tempProduct.unit">
                  </div>
                </div>
                <div class="form-row">
                  <div class="form-group col-md-6">
                  <label for="origin_price">原價</label>
                    <input type="number" class="form-control" id="origin_price"
                      placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                  </div>
                  <div class="form-group col-md-6">
                    <label for="price">售價</label>
                    <input type="number" class="form-control" id="price"
                      placeholder="請輸入售價" v-model.number="tempProduct.price">
                  </div>
                </div>
                <hr>
                <div class="form-group">
                  <label for="description">產品描述</label>
                  <textarea type="text" class="form-control" id="description"
                    placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                </div>
                <div class="form-group">
                  <label for="content">說明內容</label>
                  <textarea type="text" class="form-control" id="content"
                    placeholder="請輸入產品說明內容" v-model="tempProduct.content"></textarea>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox"
                      id="is_enabled" v-model="tempProduct.is_enabled"
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
            <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delModal -->
    <div class="modal fade" id="delProductModal" tabindex="-1" role="dialog"
      aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除 <strong class="text-danger">{{ tempProduct.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteProduct"
              >確認刪除</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    Pagination,
  },
  data() {
    return {
      products: [],
      tempProduct: {},
      pagination: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
    };
  },
  methods: {
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      $('#productModal').modal('show');
    },
    deleteModal(item) {
      this.tempProduct = { ...item };
      $('#delProductModal').modal('show');
    },
    getProduct(page = 1) {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/products/?page=${page}`).then((res) => {
        vm.products = res.data.products;
        vm.pagination = res.data.pagination;
        vm.isLoading = false;
      });
    },
    updateProduct() {
      const vm = this;
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`;
      let httpMethod = 'post';
      if (!vm.isNew) {
        api = `
        ${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`;
        httpMethod = 'put';
      }
      vm.$http[httpMethod](api, { data: vm.tempProduct }).then((res) => {
        if (res.data.success) {
          $('#productModal').modal('hide');
          vm.getProduct();
        } else {
          $('#productModal').modal('hide');
          vm.getProduct();
        }
      });
    },
    deleteProduct() {
      const vm = this;
      vm.$http.delete(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`).then((res) => {
        if (res.data.success) {
          $('#delProductModal').modal('hide');
          vm.getProduct();
        } else {
          $('#delProductModal').modal('hide');
          vm.getProduct();
        }
      });
    },
    uploadFile() {
      const vm = this;
      const uploadedFile = vm.$refs.files.files[0];
      vm.status.fileUploading = true;
      const formdata = new FormData();
      formdata.append('file-to-upload', uploadedFile);
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`;
      vm.$http.post(url, formdata, {
        Headers: {
          'Content-type': 'multipart/form-data',
        },
      }).then((res) => {
        if (res.data.success) {
          vm.$set(vm.tempProduct, 'imageUrl', res.data.imageUrl);
        } else {
          vm.$bus.$emit('message:push', res.data.message, 'danger');
        }
        vm.status.fileUploading = false;
      });
    },
  },
  created() {
    this.getProduct();
  },
};
</script>
