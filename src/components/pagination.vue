<template>
 <nav aria-label="Page navigation example">
  <ul class="pagination">
    <li class="page-item" :class="{'disabled':!pages.has_pre}">
      <a class="page-link" href="#" aria-label="Previous"
      @click.prevent="getPage(pages.current_page -1)">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" v-for="page in pages.total_pages"
    :key="page" :class="{'active':pages.current_page === page}">
      <a class="page-link" href="#" @click.prevent="getPage(page)">{{page}}</a></li>
    <li class="page-item" :class="{'disabled':!pages.has_next}">
      <a class="page-link" href="#" aria-label="Next"
      @click.prevent="getPage(pages.current_page +1)">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    getPage(page) {
      this.$emit('getPage', page);
    //   console.log('分頁',page);
    },
  },
};
</script>
