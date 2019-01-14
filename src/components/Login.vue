<template>
   <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <label for="inputEmail">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" v-model="email" autofocus>
                <span class="error" v-if="errors.email">*You must enter a valid email address</span>
              </div>
              <div class="form-label-group">
                <label for="inputPassword">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" v-model="password">
                <span class="error" v-if="errors.password">*You must enter a valid password</span>
              </div>
              <div class="custom-control custom-checkbox mb-3">
                <input type="checkbox" class="custom-control-input" id="customCheck1">
                <label class="custom-control-label" for="customCheck1">Remember password</label>
              </div>
              <button class="btn btn-lg btn-primary btn-block text-uppercase" @click="login">Sign in</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.error {
  color: red;
  font-size: .7rem;
}
</style>

<script>
    export default {
        data() {
            return {
                email: null,
                password: null,
                errors: {
                  email: false,
                  password: false
                }
            };
        },
        methods: {
            login(e) {
              e.preventDefault();
              if(!this.validateForm()) {
                return false;
              }
              this.submitForm();
            },
            submitForm() {

            },
            validateForm() {
              let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if(!this.password || this.password.length < 6) {
                this.errors.password = true;
              } else {
                this.errors.password = false;
              }
              if(!this.email || !re.test(this.email)) {
                this.errors.email = true;
              } else {
                this.errors.email = false;
              }
              if(!this.errors.email && !this.errors.password) {
                return true;
              }
              return false;
            }
        }
    }
</script>