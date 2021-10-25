<template>
<div class="animate__fadeIn">
    <h1 class="titleone">我們是誰</h1>
    <p class="paraone animate__fadeIn">我們是志於發展台灣陶藝文化的一群人，隨著時代的演變，傳統維護不易，而讓更多人接觸到他的浪漫是我們的使命。</p>
    <h1 class="titletwo">關於未來</h1>
    <p class="paratwo animate__fadeIn">作為一個專於陶藝的通路，我們希望與更多店家及廠商合作，使商品更加多元化，也更能吸引大眾來注意到陶藝的美。</p>
    <div class="aboutPicture"></div>
    <h2>歡迎用以下方式連絡我們<br>&darr;</h2>
</div>
</template>

<style scoped>
div {
    color:#fff;
    animation-duration:1.5s;
}
h1 {
    font-size:3.5rem;
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
    left:15%;
    margin:0;
}
.paraone {
    width:35%;
    left:25%;
}
.titletwo {
    top:27rem;
    left:15%;
}
.paratwo {
    top:32rem;
    left:15%;
    width:36%;
}
.aboutPicture {
    background-image: url(../assets/jocelyn-morales-85u5oGSBJ1s-unsplash.jpg);
    background-size: cover;
    background-position: center;
    width:35%;
    height:35rem;
    margin:5rem 0 5rem 55%;
    position: relative;
}
.aboutPicture::before {
    position:absolute;
    top:-2rem;
    right:50%;
    content:"";
    width:180%;
    height:18rem;
    background:#444444;
    opacity: 0.5;
    z-index: -1;
}
.aboutPicture::after{
    position:absolute;
    top:80%;
    left:80%;
    content:"";
    width:8rem;
    height:8rem;
    border:2px solid #FFF;
}
h2 {
    padding-top:3rem;
}

@media (max-width:992px) {
    .paraone {
        left:30%;
        width:50%;
    }
    .paratwo {
        width:50%;
    }
    .aboutPicture::after {
        top:85%;
        left:60%;
    }
}

@media (max-width:768px) {
    h1{
        font-size:2.5rem;
    }
    p {
        font-size:1.5rem;
    }
    .titleone,.titletwo,.paraone,.paratwo{
        left:0;
        right:0;
        margin:auto;
    }
    .titleone{
        writing-mode: initial;
        top:8rem;
    }
    .paraone,.paratwo{
        width:75%;
    }
    .paraone {
        top:13rem;
    }
    .aboutPicture {
        width:70%;
        height:35rem;
        margin:8rem 0 5rem 20%;
    }
    .aboutPicture::before {
        top:-5rem;
        width:100%;
        right:20%;
    }
    .aboutPicture::after {
        height:7rem;
        width:7rem;
        top:90%;
        left:75%;
    }
    h2 {
        font-size:1.7rem;
    }
}

@media (max-width: 576px){
    .aboutPicture::after {
        height:6rem;
        width:6rem;
        left:60%;
    }
}
</style>
