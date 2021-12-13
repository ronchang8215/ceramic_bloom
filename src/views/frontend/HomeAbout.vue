<template>
  <div class="animate__fadeIn">
    <div class="banner mb-3">
      <h1>關於我們</h1>
      <p>與你說說我們的事。</p>
    </div>
    <div class="about__content py-3">
      <h2 class="titleone">我們是誰</h2>
      <p class="paraone animate__fadeIn">我們是志於發展台灣陶藝文化的一群人，隨著時代的演變，傳統維護不易，而讓更多人接觸到他的浪漫是我們的使命。</p>
      <h2 class="titletwo">關於未來</h2>
      <p class="paratwo animate__fadeIn">作為一個專於陶藝的通路，我們希望與更多店家及廠商合作，使商品更加多元化，也更能吸引大眾來注意到陶藝的美。</p>
      <div class="aboutPicture"></div>
    </div>
    <div class="jumbotron p-3">
      <h4>若有任何建議、疑問或合作事宜，歡迎連絡我們</h4>
      <div class="row">
        <div class="col p-0 m-3">
          <a href="tel:02-22220000" class="p-3">
          <h3><i class="fas fa-phone"></i></h3><span>（02）2222-0000</span>
          </a>
        </div>
        <div class="col p-0 m-3">
          <a href="mailto:ceraBloom@gmali.com" class="p-3">
          <h3><i class="fas fa-envelope"></i></h3><span>ceraBloom@gmali.com</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
div {
  color:#fff;
  animation-duration:1.5s;
}

.banner {
  background-image: url(../../assets/img/geraldine-lewa-N_Z91Evs_oM-unsplash.jpg);
}

.about__content {
  margin:0;
  display:flex;
  position: relative;

  h2 {
    font-size:3rem;
    position: absolute;
    z-index:1;
  }

  p {
    font-size:1.7rem;
    position: absolute;
    text-align: left;
    z-index: 1;
    animation-duration:2s;
  }

  .titleone{
    writing-mode:vertical-lr;
    line-height: 3rem;
    top:3rem;
    left:15%;
    margin:0;
  }

  .paraone {
    top:5rem;
    width:35%;
    left:25%;
  }

  .titletwo {
    top:23rem;
    left:15%;
  }

  .paratwo {
    top:28rem;
    left:15%;
    width:36%;
  }

  .aboutPicture {
    background-image: url(../../assets/img/jocelyn-morales-85u5oGSBJ1s-unsplash.jpg);
    background-size: cover;
    background-position: center;
    width:35%;
    height:35rem;
    margin:5rem 0 5rem 58%;
    position: relative;

    &::before {
      position:absolute;
      top:-2rem;
      right:65%;
      content:"";
      width:180%;
      height:18rem;
      background:#444444;
      opacity: 0.5;
      z-index: -1;
    }

    &::after {
      position:absolute;
      top:80%;
      left:75%;
      content:"";
      width:8rem;
      height:8rem;
      border:2px solid #FFF;
    }
  }
}

.jumbotron {
  width:85%;
  margin:0 auto;
  color:#575757;

  .col {
    background:rgba(0,0,0,0.5);

    a {
      color:#fff;
      display:block;

      &:hover {
        text-decoration:none;
      }
    }
  }
}

@media (max-width:992px) {

  .about__content{
    .paraone {
      left:30%;
      width:50%;
    }

    .paratwo {
      width:50%;
    }

    .aboutPicture::after {
      top:85%;
      left:55%;
    }
  }
}

@media (max-width:768px) {
  .about__content {

    h2 {
      font-size:2.5rem;
    }

    p {
      font-size:1.3rem;
    }
    .titleone,.titletwo,.paraone,.paratwo{
      left:0;
      right:0;
      margin:auto;
    }

    .titleone{
      writing-mode: initial;
      top:5rem;
    }

    .paraone,.paratwo{
        width:75%;
    }

    .paraone {
      top:10rem;
    }

    .aboutPicture {
      width:70%;
      height:35rem;
      margin:8rem 0 5rem 20%;

      &::before {
        top:-5rem;
        width:100%;
        right:20%;
      }

      &::after {
        height:7rem;
        width:7rem;
        top:90%;
        left:75%;
      }
    }
  }
}

@media (max-width: 576px){
  .about__content {
    .aboutPicture::after {
      height:6rem;
      width:6rem;
      left:68%;
    }
  }
  .col {
    min-width:50%;
  }
}
</style>
