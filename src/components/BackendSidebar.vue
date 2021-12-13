<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-dark sidebar">
    <div class="position-sticky pt-3">
      <h6 class="
      sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted
      ">
        <span>管理員</span>
      </h6>
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/products">
          產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/order">
          客戶訂單</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/coupon">
          優惠券</router-link>
        </li>
      </ul>
      <h6 class="
      sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted
      ">
        <span>模擬功能</span>
      </h6>
      <ul class="nav flex-column mb-2">
        <li class="nav-item">
          <router-link class="nav-link" to="/customorder">
          模擬訂單</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
.sidebar{
  margin:4rem 0;
  border-radius: 0 1.5rem 1.5rem 0;
  opacity:0.8;
}

.nav-item {
  margin:0.5rem 0;
}

.nav-link{
  color:#fff;

  &:hover {
    text-decoration: underline;
  }
}

.active, .sidebar .nav-link.active{
  color:#fff;
  text-decoration: underline;
}

@media (max-width:767px){
  .sidebar {
    padding:1rem 0.5rem;
    position:fixed;
    left:-9.2rem;
    width:10rem;
    transition: 0.3s;

    &:hover {
      left:0;
    }
  }
}

</style>
