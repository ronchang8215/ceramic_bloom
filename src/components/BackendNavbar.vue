<template>
  <nav class="navbar justify-content-between navbar-expand-md navbar-light bg-light p-0 sticky-top">
    <router-link class="navbar-brand navber-dashtitle col-md-3 col-lg-2 me-0 px-3" to="/">
    陶藝綻放
    </router-link>
    <ul class="navbar-nav px-4">
      <li class="nav-item text-nowrap">
        <router-link class="nav-link" :to="{name:'客戶購物'}">回商品頁</router-link>
      </li>
      <li class="nav-item text-nowrap">
        <a class="nav-link " href="#" @click.prevent="logout">登出</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    logout() {
      const vm = this;
      vm.$http.post(`${process.env.VUE_APP_APIPATH}/logout`).then((res) => {
        if (res.data.success) {
          vm.$router.push('/login');
        }
      });
    },
  },
};
</script>

<style lang="scss">
.nav-item {
  margin:5%;
}

@media (max-width: 767px) {
  .navber-dashtitle {
    margin-right: 0;
    padding:0.3rem;
  }

  .navbar-nav {
    width:100%;
    justify-content: center;
  }

  .nav-item {
    width:100%;
    margin:0;

    a {
      padding:0.2rem;
    }
  }
}
</style>
