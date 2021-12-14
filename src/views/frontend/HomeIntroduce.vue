<template>
  <div>
    <Loading :active.sync="isLoading" />
    <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
      <main role="main" class="inner cover animate__fadeIn">
        <h1 class="cover-heading">陶藝綻放</h1>
        <div>
          <p class="lead">找到你心中的陶藝</p>
        </div>
      </main>
      <div class="jumbotron introduce1 row">
        <div class="col-md-4"><h2>關於陶瓷</h2></div>
        <div class="col-md-8">
          <p class="lead">製作陶瓷的原料是取自大自然的土石礦物，屬於一種無機材料，燒成後的
          陶瓷品具有堅硬、不燃燒、不生鏽、可任意成形等四大優點，適用於日常生活中的各種用途。</p>
        </div>
      </div>
      <div class="display-3"><span>任何步驟不容馬虎</span></div>
      <div class="jumbotron introduce2">
        <h2 class="p-3 mx-3">如何製作好的陶瓷？</h2>
        <div class="jumbotron row area1">
          <div class="col">
            <div style="margin-bottom:2rem">
              <div class="m-2 p-2"><h3 class="m-0">Step1 原料</h3></div>
              <p class="lead">黏土原料來自天然礦石，經過採礦業者採集之後，必須挑除雜物、砂礫並
              加以粉碎處理，再經過成分的調整才能成為可用的陶瓷黏土，一般有專門從事陶瓷原料的生產。</p>
            </div>
            <div>
              <div class="m-2 p-2"><h3 class="m-0">Step2 成形與裝飾</h3></div>
              <p class="lead">經過精製的陶瓷黏土依照成形加工的需要，可分別調製成手工成形、
              機械成形、注漿成形等方式。黏土經成形後可在坯體表面施加裝飾處理，以增加作品的美觀。</p>
            </div>
          </div>
          <div class="col" style="padding-bottom:2rem">
            <div class="method1"></div>
          </div>
        </div>
        <div class="jumbotron area2">
          <div class="col row">
            <div class="col">
              <div class="m-2 p-2"><h3 class="m-0">Step3 乾燥與素燒</h3></div>
              <p class="lead">經過不同成形方式製作出來的土坯，要充分乾燥後才能入窯燒成。乾燥的
                  土坯為了方便施釉，可以先行素燒，素燒溫度以800∼950℃為宜。</p>
            </div>
            <div class="col">
              <div class="m-2 p-2"><h3 class="m-0">Step4 施釉與釉燒</h3></div>
              <p class="lead">彩繪或施釉完成的坯體，更可直接放入窯中，依照不同的釉色進行燒成作業。
              歷經窯爐高溫燒成的作品，待降溫到100℃以下便可取出。作品表面還可以用較低溫的釉彩描繪圖案，
              再加以燒烤附著便可完成。</p>
            </div>
          </div>
          <div style="display:flex">
            <div class="method2"></div>
          </div>
        </div>
      </div>
      <div class="display-3"><span>來這選出你的陶瓷</span></div>
      <div class="jumbotron benefit px-0">
        <h2 class="my-3 p-3">我們的服務</h2>
        <div class="row">
          <div class="col-md-4">
            <div class="benefit__block">
              <i class="far fa-handshake"></i>
              <div class="m-4">與台灣資深陶藝師傅合作，打造絕佳的陶藝品質。</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="benefit__block">
              <i class="fas fa-dolly-flatbed"></i>
              <div class="m-4">安全有保障的運送，讓您的陶藝品完美送到您面前。</div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="benefit__block">
              <i class="fas fa-child"></i>
              <div class="m-4">想要獨一無二的陶藝品嗎？歡迎聯絡我們，即可幫您客製化。</div>
            </div>
          </div>
        </div>
      </div>
      <div class="jumbotron buyit">
        <h2 class="mb-3">最新商品</h2>
        <div class="card-group">
          <div class="card" v-for="(item, index) in products" :key="item.id"
          v-show="index<6" :style="{backgroundImage:`url(${item.imageUrl})`}">
            <router-link :to="`/product/${item.id}`" class="card__mask">
              {{ item.title }}
            </router-link>
          </div>
        </div>
        <router-link class="btn buyit__buttonshop mt-4" role="button" to="/customproduct">
        購物商店
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false,
      products: [],
    };
  },
  methods: {
    getProducts() {
      const vm = this;
      vm.isLoading = true;
      vm.$http.get(`${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products/all`).then((res) => {
        vm.products = res.data.products;
        vm.isLoading = false;
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scoped>
@import"@/assets/scss/all";

div {
  color:white;
}

h2 {
  font-size:2.5rem;
}

p{
  text-align: left;
}

main {
  margin-top:1rem;
  padding:10%;
  position: relative;
  background-size: cover;
  background-image: url(../../assets/img/juliet-furst-MISKObMT6TA-unsplash.jpg);
  animation-duration: 1.5s;

  &::before {
    content:"";
    width:50%;
    height:80%;
    position:absolute;
    top:-1rem;
    left:5%;
    border:2px solid #fff;
  }

  div {
    color:$primary;
    position: absolute;
    width:63%;
    height:65%;
    top:40%;
    left:35%;
    background:rgba(255,255,255,0.5);

    p {
      text-align: right;
      padding: 10%;
      padding-top:30%;
      font-size: 2rem;
    }
  }

  h1{
    font-size:3rem;
    writing-mode:vertical-lr;
    margin:10%;
  }
}

.introduce1 {
  background:rgba(255,255,255,0.5);
  position:relative;
  width:90%;
  height:600px;
  margin:3rem auto;

  .col-md-8 {
    background-image: url(../../assets/img/tom-crew-U9gXnSGSB3w-unsplash.jpg);
    background-size: cover;
    background-position: center;
  }

  .col-md-4 {
    margin-left:-2rem;
  }

  h2 {
    color:$primary;
    writing-mode: vertical-lr;
    margin:2rem auto;
  }

  p {
    position:absolute;
    z-index:0;
    width:60%;
    top:10%;
    right:10%;
    color:#AAADB3;
  }
}

.display-3 {
  font-size:3.5rem;
  height:20rem;
  border: 3px solid #fff;
  padding:2rem 0;

  span {
    display:inline-block;
    writing-mode: vertical-lr;
    height:16rem;
    line-height:10rem;
  }
}

.introduce2 {
  margin:3rem auto;
  width:90%;
  background:rgba(255,255,255,0.5);

  h2 {
    background:$primary;
  }

  .jumbotron {
    background:none;
    padding:0;
  }

  .area2 {
    margin:0;
  }

  .row {
    margin:0;
  }

  .col {
    padding:0;
    margin:0;

    div{
      background:rgba(255,255,255,0.5);
      color:grey;
      margin:1rem;
      padding:1rem;
    }

    .method1 {
      height:100%;
      background-image: url(../../assets/img/lloyd-blunk-81qzRJYOrPw-unsplash.jpg);
      background-size: cover;
      background-position: center;
    }
  }

  .method2 {
    width:100%;
    height:20rem;
    background-image: url(../../assets/img/jessica-ruscello-G8vPQ-XVxxY-unsplash.jpg);
    background-size: cover;
    background-position: center;
    margin:1rem 1rem 0 1rem;
  }
}

.benefit {
  background:none;
  width:90%;
  margin:0 auto;

  h2 {
    background:rgba(255,255,255,0.5);
    color:$primary;
  }

  &__block {
    min-height:20rem;
    background:$primary;
    padding:1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;

    i {
      font-size:5rem;
      display:block;
      margin:1rem;
    }
  }
}

.buyit {
  h2 {
    color:$primary;
  }

  &__buttonshop {
    font-size: 1.2rem;
    background:#fff;
    width:100%;
    transition: 0.3s;
    border-color:#777;
    border-width: 0.5rem;
    box-sizing:border-box;

    &:hover {
      border-width: 0.5rem 2rem;
    }
  }
}

.card {
  height:10rem;
  background-size: cover;
  background-position: center;
  min-width:10rem;
  border:none;

  &__mask {
    width:100%;
    height:100%;
    background:rgba(255,255,255,0.5);
    font-size:0;
    display:flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    box-shadow: none;
  }

  &:hover > &__mask {
    background:rgba(0,0,0,0.5);
    font-size:1.2rem;
    color:#fff;
    text-decoration: none;
  }
}

@media (max-width: 767px) {

  h2 {
    font-size:2rem;
  }

  main {
    &::before {
      width:90%;
      height:50%;
      top:-1rem;
      left:5%;
    }

    div {
      width:90%;
      height:40%;
      top:50%;
      left:5%;
      line-height:4rem;

      p {
        text-align: center;
        padding: 0%;
        font-size: 1.5rem;
      }
    }

    h1{
      font-size:2.5rem;
      writing-mode:horizontal-tb;
      margin:-10% 0 30% 0;
    }
  }

  .introduce1 {
    width:100%;

    .col-md-8 {
      height:80%;
    }

    .col-md-4 {
      margin-left:auto;
      height:20%;
    }

    h2 {
      writing-mode:initial;
      margin:1rem;
    }

    p {
      left:0;
      right:0;
      margin:auto;
      width:90%;
      font-size: 1rem;
    }
  }

  .display-3 {
    height:15rem;

    span {
      height:10rem;
      line-height:5rem;
      font-size:2.5rem;
      margin-left:-2%;
    }
  }

  .introduce2 {
    width:100%;

    .row {
      flex-direction: column;
    }

    .col .method1 {
      height:25rem;
    }

    .area2 .row .col {
      width:auto;
    }

    .lead {
      font-size:1rem;
    }
  }

  .benefit {
    width:100%;
    padding:2rem 0;

    &__block {
      min-height:15rem;
    }
  }
}
</style>
