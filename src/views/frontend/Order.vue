<template>
  <div>
    <FrontendNavbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import FrontendNavbar from '@/components/FrontendNavbar.vue';

export default {
  components: {
    FrontendNavbar,
  },
};
</script>
