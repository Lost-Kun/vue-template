<template>
  <div class="index">
    <div class="head">
      <Nav
        :userIcon="userIcon"
        @logout="logout"
        @logoClick="logoClick"
        @profileClick="profileClick"
      >
      </Nav>
    </div>
    <div class="body">
      <router-view/>
    </div>
  </div>
</template>

<script>
import iconBase64 from '@/assets/img/profile.png';
import Vue from 'vue';

export default {
  computed: {
    userIcon() {
      return this.$store.state.userInfo.icon || iconBase64;
    },
  },
  async beforeRouteEnter(to, from, next) {
    if (process.env.NODE_ENV === 'development') {
      await Vue.prototype.$http.post('/auth/login', {
        username: 'wangliangliang',
        password: 'shangjian123',
        fingerprint: 'de44392d4555354f7fe20aeea0ef0f4c',
      });
    }
    next();
  },
  async mounted() {
    await this.$http.get('/general/userinfo').then((data) => {
      this.$store.commit('SET_USERINFO', data);
    });
  },
  methods: {
    async logout() {
      await this.$http.post('/auth/logout');
      window.location.pathname = '/login';
    },
    logoClick() {
      window.location.pathname = '/product';
    },
    profileClick() {
      window.location.pathname = '/profile';
    },
  },
};
</script>

<style lang="less" scoped>
.index {
  position: relative;
  height: 100%;

  .head {
    height: 60px;
  }

  .body {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
  }
}
</style>
