<template>
  <div class="hello">
    <Mainbar/>
    <router-view></router-view>
    <footer class="mastfoot mt-3">
      <h2 class="mb-3">陶藝綻放</h2>
      <p>TEL：（02）2222-0000<br>新北市鶯歌區三民路123巷4號</p>
      <a href="#"><i class="fas fa-envelope"></i></a>
      <a href="#"><i class="fab fa-facebook-square"></i></a>
      <a href="#"><i class="fab fa-instagram"></i></a>
      <a href="#"><i class="fab fa-github"></i></a>
      <p class="mt-3" style="color:#aaa">個人練習作品，非商業用途<br>copyright &copy; 2021</p>
    </footer>
    <Cart/>
  </div>
</template>

<script>
import Mainbar from '../components/mainbar.vue';
import Cart from '../components/cart.vue';

export default {
  components: {
    Mainbar,
    Cart,
  },
  name: 'Home',
};
</script>

<style scoped>

footer {
  background:#252B33;
  padding:3%;
  color:#ccc;
}

footer a {
  margin:0 0.2rem;
  font-size:1.5rem;
  color:#ccc;
}

footer a:hover {
  color:#fff;
}

</style>
