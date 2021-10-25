<template>
  <div>
    <Mainbar/>
    <router-view></router-view>
  </div>
</template>

<script>
import Mainbar from '../components/mainbar.vue';

export default {
  components: {
    Mainbar,
  },
};
</script>
