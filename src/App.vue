<template>
  <div id="app">
    <h2>app</h2>
    <router-view/>
  </div>
</template>

<style lang="scss">
h1 {
    color: red;
}
</style>

<script>
import Dashboard from './components/Dashboard.vue';
import router from './router';
export default {
    components: {
       Dashboard 
    },
    mounted() {
        console.log('ere');
        // if there is no user in vuex store pass over to /login
        router.push("/login")
    }
}
</script>