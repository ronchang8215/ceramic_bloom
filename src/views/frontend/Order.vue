<template>
  <div>
    <FrontendNavbar/>
    <RouterView/>
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
