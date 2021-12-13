<template>
  <div class="body">
    <form @submit.prevent="signin" class="form-signin">
      <h1 class="h3 mb-3 fw-normal">後台管理</h1>
      <div>
        <input type="email" id="inputEmail" class="form-control"
        placeholder="Email address" required autofocus v-model="user.username">
        <input type="password" id="inputPassword" class="form-control mb-3"
        placeholder="Password" required v-model="user.password">
        <div v-show="error" class="text-danger text-left mb-3 p-0">＊帳號或密碼有誤，或無法連線，請重新再試。</div>
        <button type="submit" :disabled="disabled" class="w-100 btn btn-lg btn-primary">登入</button>
      </div>
      <p class="mt-5 mb-3 text-muted">&copy; 2021 <router-link to="/">陶藝綻放</router-link></p>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
      error: false,
      disabled: false,
    };
  },
  methods: {
    signin() {
      const vm = this;
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      vm.disabled = true;
      vm.$http.post(api, vm.user).then((res) => {
        if (res.data.success) {
          const { token } = res.data;
          const { expired } = res.data;
          document.cookie = `mytoken=${token}; expires=${new Date(expired)}`;
          vm.$router.push('/admin/products');
        } else {
          vm.error = true;
          vm.disabled = false;
        }
      });
    },
  },
};
</script>

<style lang="scss">

.body {
  height: 100%;
  display: flex;
}

.form-signin {
  width: 100%;
  max-width: 30rem;
  padding: 15px;
  margin: auto;

  div {
    padding:1.5rem;
    width:100%;
    background:#ddd;
    border-radius: 1rem;
  }

  .checkbox {
    font-weight: 400;
  }

  .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-control:focus {
    z-index: 2;
  }

  input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
}

</style>
