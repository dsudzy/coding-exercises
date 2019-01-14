<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: 'dashboard',
    mounted() {
        console.log('dashboard');
        // this.getUserData();
    },
    methods: {
      // getUserData() {
      //   axios.get("/api/user")
      //   .then((response) => {
      //     console.log(response)
      //     // set in vuex
      //     // self.$set(this, "user", response.data.user)
      //   })
      //   .catch((errors) => {
      //     console.log(errors)
      //     router.push("/login")
      //   })
      // },
    }
}
</script>