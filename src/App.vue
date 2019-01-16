<template>
  <div id="app">
    <button @click="logout" class="btn btn-link" v-if="isAuthenticated">Logout</button>
    <router-view/>
  </div>
</template>

<style lang="scss">
h1 {
    color: red;
}
</style>

<script>
import Home from './components/Home.vue';
import router from './router';
export default {
    components: {
       Home
    },
    mounted() {
    },
    methods: {
      logout() {
        localStorage.removeItem('jwt')
        router.push('/login')
      }
    },
    computed: {
      isAuthenticated() {
        return localStorage.getItem('jwt') !== null;
      }
    }
}
</script>