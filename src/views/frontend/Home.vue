<template>
  <div class="hello">
    <FrontendNavbar/>
    <div class="content">
      <RouterView/>
    </div>
    <footer class="mastfoot mt-3">
      <h2 class="mb-3">陶藝綻放</h2>
      <p>TEL：（02）2222-0000<br>新北市鶯歌區三民路123巷4號</p>
      <a href="#" @click.prevent><i class="fas fa-envelope"></i></a>
      <a href="#" @click.prevent><i class="fab fa-facebook-square"></i></a>
      <a href="#" @click.prevent><i class="fab fa-instagram"></i></a>
      <a href="#" @click.prevent><i class="fab fa-github"></i></a>
      <p class="mt-3" style="color:#aaa">個人練習作品，非商業用途<br>copyright &copy; 2021</p>
    </footer>
    <Cart/>
  </div>
</template>

<script>
import FrontendNavbar from '@/components/FrontendNavbar.vue';
import Cart from '@/components/Cart.vue';

export default {
  components: {
    FrontendNavbar,
    Cart,
  },
  name: 'Home',
};
</script>

<style lang="scss">

.hello {
  height: 100%;
}

.content {
  min-height: calc(100% - 25rem - 56px);
  margin:1rem auto;
}

footer {
  background:#252B33;
  padding:3%;
  color:#ccc;
  height:23rem;

  a {
    margin:0 0.2rem;
    font-size:1.5rem;
    color:#ccc;

    &:hover {
      color:#fff;
    }
  }
}

.banner {
  color:#fff;
  width:100%;
  height:15rem;
  background-size: cover;
  background-position: center;
  border-width: 1rem 5rem 1rem 5rem;
  border-color:rgba(255,255,255,0.5);
  border-style: solid;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    width:100%;
    font-size:3rem;
    text-shadow: 0.1em 0.1em 0.05em #333
  }

  p {
    position:relative;
    font-size: 0.875rem;
  }
}
</style>
