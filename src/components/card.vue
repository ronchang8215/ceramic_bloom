<template>
  <div class="card border-0" @click.prevent="getCardProduct(card.id)">
    <div style="height: 150px; background-size: cover; background-position: center"
      :style="{backgroundImage:`url(${card.imageUrl})`}">
    </div>
    <div class="card-body">
      <span class="badge badge-secondary">{{card.category}}</span>
      <h5 class="card-title">
        {{card.title}}
      </h5>
      <div class="d-flex justify-content-between align-items-end my-3">
        <div>
        <div class="h5" v-if="!card.price">NT${{card.origin_price}}</div>
        <del class="h6" v-if="card.price">NT${{card.origin_price}}</del>
        <div class="h5" v-if="card.price">NT${{card.price}}</div>
        </div>
        <button type="button" class="btn btn-outline-primary btn-sm ml-auto"
        @click.stop="addCardtoCart(card.id)">
        <i class="fas fa-spinner fa-spin" v-if="card.id === loadingItem"></i>
        <i class="fas fa-shopping-cart" v-else></i>
        </button>
      </div>
    </div>
  </div>
  <!-- 原本 -->
    <!-- <div class="card border-0" @click.prevent="getProduct(item.id)">
    <div style="height: 150px; background-size: cover; background-position: center"
      :style="{backgroundImage:`url(${item.imageUrl})`}">
    </div>
    <div class="card-body">
      <span class="badge badge-secondary">{{item.category}}</span>
      <h5 class="card-title">
        {{item.title}}
      </h5>
      <div class="d-flex justify-content-between align-items-end my-3">
        <div>
        <div class="h5" v-if="!item.price">NT${{item.origin_price}}</div>
        <del class="h6" v-if="item.price">NT${{item.origin_price}}</del>
        <div class="h5" v-if="item.price">NT${{item.price}}</div>
        </div>
        <button type="button" class="btn btn-outline-primary btn-sm ml-auto"
       @click.stop="addtoCart(item.id)">
        <i class="fas fa-spinner fa-spin" v-if="item.id === status.loadingItem"></i>
        <i class="fas fa-shopping-cart" v-else></i>
      </button>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  props: ['card', 'loadingItem'],
  methods: {
    getCardProduct(product) {
      this.$emit('getCardProduct', product);
    },
    addCardtoCart(product) {
      this.$emit('addCardtoCart', product);
    },
  },
};
</script>

<style scoped>
.card {
  cursor: pointer;
  text-align: left;
}

.card:hover {
  box-shadow: 10px 10px 0px 0px rgba(255,255,255,0.5);
}
</style>
