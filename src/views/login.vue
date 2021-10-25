<template>
<div class="body">
  <form @submit.prevent="signin" class="form-signin">
    <h1 class="h3 mb-3 fw-normal">後台管理</h1>
    <div>
    <input type="email" id="inputEmail" class="form-control"
    placeholder="Email address" required autofocus v-model="user.username">
    <input type="password" id="inputPassword" class="form-control mb-3"
    placeholder="Password" required v-model="user.password">
    <button class="w-100 btn btn-lg btn-primary" type="submit">登入</button>
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
    };
  },
  methods: {
    signin() {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`;
      const vm = this;
      this.$http.post(api, vm.user).then((res) => {
        // console.log(res.data);
        if (res.data.success) {
          vm.$router.push('/admin/products');
          const { token } = res.data;
          const { expired } = res.data;
          // console.log(token, expired);
          document.cookie = `mytoken=${token}; expires=${new Date(expired)}`;
        } else {
          alert('登入失敗！請重新輸入電子郵件與密碼。');
        }
      });
    },
  },
};
</script>

<style scoped>

.body {
  height: 100%;
  display: flex;
}

form div {
  padding:1.5rem;
  width:100%;
  background:#ddd;
  border-radius: 1rem;
}

.form-signin {
  width: 100%;
  max-width: 30rem;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

</style>
