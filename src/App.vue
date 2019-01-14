<template>
  <div id="app">
    <Login></Login>
  </div>
</template>

<style lang="scss">
h1 {
    color: red;
}
</style>

<script>
import Login from './components/Login.vue';
export default {
    components: {
       Login 
    }
}
</script>