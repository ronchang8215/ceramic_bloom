<template>
  <nav class="navbar navbar-expand-md navbar-light bg-light p-0 sticky-top">
    <router-link class="navbar-brand" to="/">陶藝綻放</router-link>
    <button type="button" class="navbar-toggler" data-toggle="collapse"
    data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02"
    aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
      <ul class="navbar-nav navbar-direction mr-auto mt-2 mt-md-0">
        <li class="text-nowrap">
          <router-link class="nav-link" to="/">回首頁</router-link>
        </li>
        <li class="text-nowrap">
          <router-link class="nav-link" to="/about">關於我們</router-link>
        </li>
        <li class="text-nowrap">
          <router-link class="nav-link" :to="{name:'客戶購物'}">陶藝商店</router-link>
        </li>
      </ul>
      <ul class="navbar-nav form-inline">
        <li class="text-nowrap">
          <router-link class="nav-link" to="/admin/products">登入</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="scss">
.bg-light {
  background:#DFE3EB;
  opacity:0.6;
  transition: 0.5s;

  &:hover {
    opacity: 0.9;
  }
}

.navbar-brand{
  font-weight:bold;
  padding:1rem 2rem;
  background:#AAADB3;
}

.navbar-nav {
  flex-direction: row;
}

@media (min-width: 768px){
  .navbar-expand-lg .navbar-toggler {
      display: none;
  }
}
@media (max-width: 767px){
  .navbar-direction {
    flex-direction: column;
  }
}
</style>
