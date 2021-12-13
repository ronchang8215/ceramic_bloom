<template>
  <div>
    <BackendNavbar/>
    <ErrorAlert/>
    <div class="container-fluid">
      <div class="row">
        <BackendSidebar/>
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          <RouterView/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>

import BackendNavbar from '@/components/BackendNavbar.vue';
import BackendSidebar from '@/components/BackendSidebar.vue';
import ErrorAlert from '@/components/ErrorAlert.vue';

export default {
  components: {
    BackendNavbar,
    BackendSidebar,
    ErrorAlert,
  },
  created() {
    const cookieValue = document.cookie.split('; ').find((row) => row.startsWith('mytoken=')).split('=')[1];
    this.$http.defaults.headers.common.Authorization = `${cookieValue}`;
  },
};
</script>
