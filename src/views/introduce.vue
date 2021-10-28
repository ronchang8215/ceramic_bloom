<template>
<div>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <main role="main" class="inner cover animate__fadeIn">
      <h1 class="cover-heading">陶藝綻放</h1>
      <div>
        <p class="lead">找到你心中的陶藝</p>
      </div>
    </main>
    <div class="jumbotron introduce1 row">
      <div class="col-md-4"><h1 class="display-4">關於陶瓷</h1></div>
      <div class="col-md-8">
        <p class="lead">製作陶瓷的原料是取自大自然的土石礦物，屬於一種無機材料，燒成後的
        陶瓷品具有堅硬、不燃燒、不生鏽、可任意成形等四大優點，適用於日常生活中的各種用途。</p>
      </div>
    </div>
    <div class="display-3"><span>如何製作好的陶瓷</span></div>
    <div class="jumbotron introduce2">
      <div class="jumbotron row area1">
        <div class="col">
          <div style="margin-bottom:2rem">
            <h1>原料</h1>
            <p class="lead">黏土原料來自天然礦石，經過採礦業者採集之後，必須挑除雜物、砂礫並
            加以粉碎處理，再經過成分的調整才能成為可用的陶瓷黏土，一般有專門從事陶瓷原料的生產。</p>
          </div>
          <div>
            <h1>成形與裝飾</h1>
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
            <h1>乾燥與素燒</h1>
            <p class="lead">經過不同成形方式製作出來的土坯，要充分乾燥後才能入窯燒成。乾燥的
                土坯為了方便施釉，可以先行素燒，素燒溫度以800∼950℃為宜。</p>
          </div>
          <div class="col">
            <h1>施釉與釉燒</h1>
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
    <div class="jumbotron buyit">
      <h1 class="display-4">想選出心中的陶瓷？</h1>
      <hr class="my-4">
      <router-link class="btn btn-primary btn-lg" role="button" to="/customproduct">
      看更多商品</router-link>
      <!-- <a class="btn btn-primary btn-lg" href="#" role="button">看更多商品</a> -->
    </div>
  </div>
</div>
</template>

<style scoped>
div {
  color:white;
}

main {
  margin-top:1rem;
  padding:10%;
  position: relative;
  background-size: cover;
  background-image: url(../assets/juliet-furst-MISKObMT6TA-unsplash.jpg);
  animation-duration: 1.5s;
}

main::before {
  content:"";
  width:50%;
  height:80%;
  position:absolute;
  top:-1rem;
  left:5%;
  border:2px solid #fff;
}

main div {
  color:#575757;
  position: absolute;
  width:63%;
  height:65%;
  top:40%;
  left:35%;
  background:rgba(255,255,255,0.5);
}

main div p {
  text-align: right;
  padding: 10%;
  padding-top:30%;
  font-size: 2rem;
}

main h1{
  font-size:3rem;
  writing-mode:vertical-lr;
  margin:10%;
}

p{
    text-align: left;
}

.introduce1 {
  background:rgba(255,255,255,0.5);
  position:relative;
  width:100%;
  height:600px;
  margin:3rem 0;
}

.introduce1 .col-md-8 {
    background-image: url(../assets/tom-crew-U9gXnSGSB3w-unsplash.jpg);
    background-size: cover;
    background-position: center;
}

.introduce1 .col-md-4 {
  margin-left:-2rem;
}

.introduce1 h1 {
    color:#575757;
    writing-mode: vertical-lr;
    margin:2rem auto;
}

.introduce1 p {
    position:absolute;
    z-index:1020;
    width:60%;
    top:10%;
    right:10%;
    color:#AAADB3;
}

.display-3 {
  height:25rem;
  border: 3px solid #fff;
  padding:2rem 0;
}

.display-3 span {
  display:inline-block;
  writing-mode: vertical-lr;
  height:20rem;
  line-height:10rem;
}

.introduce2 {
    margin-top:3rem;
    width:100%;
    background:rgba(255,255,255,0.5);
}

.introduce2 .jumbotron {
    background:none;
    padding:0;
}

.introduce2 .row {
  margin:0;
}

.introduce2 .col {
  padding:0;
  margin:0;
}

.introduce2 .col div {
    background:rgba(255,255,255,0.5);
    color:grey;
    margin:1rem;
    padding:1rem;
}

.introduce2 .col .method1 {
    height:100%;
    background-image: url(../assets/lloyd-blunk-81qzRJYOrPw-unsplash.jpg);
    background-size: cover;
    background-position: center;
}

.introduce2 .method2 {
  width:100%;
  height:25rem;
  background-image: url(../assets/jessica-ruscello-G8vPQ-XVxxY-unsplash.jpg);
  background-size: cover;
  background-position: center;
  margin:1rem;
}

.buyit {
    background-image: url(../assets/tom-crew-bgIO-u4GEfI-unsplash.jpg);
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}

@media (max-width: 767px) {

  main::before {
    width:90%;
    height:50%;
    top:-1rem;
    left:5%;
  }

  main div {
    width:90%;
    height:40%;
    top:50%;
    left:5%;
    line-height:4rem;
  }

  main div p {
    text-align: center;
    padding: 0%;
    font-size: 1.5rem;
  }

  main h1{
    font-size:2.5rem;
    writing-mode:horizontal-tb;
    margin:-10% 0 30% 0;
  }

  .introduce1 .col-md-8 {
    height:80%;
  }

  .introduce1 .col-md-4 {
    margin-left:auto;
    height:20%;
  }

  .introduce1 h1 {
    writing-mode:initial;
    margin:1rem;
    font-size:2.5rem;
  }

  .introduce1 p {
    left:0;
    right:0;
    margin:auto;
    width:90%;
    font-size: 1rem;
  }

  .display-3 {
    height:15rem;
  }

  .display-3 span {
    height:10rem;
    line-height:5rem;
    font-size:2.5rem;
    margin-left:-2%;
  }

  .introduce2 .row {
    flex-direction: column;
  }

  .introduce2 .col .method1 {
    height:25rem;
  }

  .area2 .row .col {
    width:auto;
  }

}
</style>
