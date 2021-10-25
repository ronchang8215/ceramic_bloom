<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Home/> -->
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'App',
  methods: {
    ScrollAnimate() {
      $(window).scroll(() => {
        /* Check the location of each desired element */
        $('.jumbotron').each(function () {
          const bottomofobject = $(this).offset().top;
          //  + $(this).outerHeight()
          const bottomofwindow = $(window).scrollTop() + $(window).height();
          /* If the object is completely visible in the window, fade it it */
          if (bottomofwindow > bottomofobject) {
            $(this).animate({ opacity: '1' }, 1000);
          }
        });
      });
    },
    scroll() {
      let temp = 0;
      $(window).scroll(function () {
        const scrolltop = $(this).scrollTop();
        if (scrolltop > temp) {
          $('.navbar').stop().animate({ top: '-60px' }, 0.3);
        } else {
          $('.navbar').stop().animate({ top: '0px' }, 0.3);
        }
        temp = scrolltop;
      });
    },
  },
  created() {
    this.ScrollAnimate();
    this.scroll();
  },
};
</script>

<style lang="scss">
@import"./assets/all";

html, body, #app{
  height:100%;
}
body{
  background:#BBBEC4;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color:$primary;
}
.table {
  color:$primary;
  border-collapse:separate;

  thead th ,td{
    border:none;
  }

  tbody {
    background:rgba(255,255,255,0.5);
  }
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.animate__fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
.jumbotron {
  opacity:0;
}
</style>
