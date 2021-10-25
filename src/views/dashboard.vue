<template>
<div>
  <Navbar/>
  <ErrorAlert/>
  <div class="container-fluid">
    <div class="row">
      <Sidebar/>
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</div>
</template>

<script>

import Navbar from '../components/navbar.vue';
import Sidebar from '../components/sidebar.vue';
import ErrorAlert from '../components/erroralert.vue';

export default {
  components: {
    Navbar,
    Sidebar,
    ErrorAlert,
  },
  created() {
    const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('mytoken=')).split('=')[1];
    // console.log('MYCOOKIE', cookieValue);
    this.$http.defaults.headers.common.Authorization = `${cookieValue}`;
  },
};
</script>
