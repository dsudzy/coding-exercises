<template>
   <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card card-signin my-5">
          <div class="card-body">
            <h5 class="card-title text-center">Sign In</h5>
            <form class="form-signin">
              <div class="form-label-group">
                <label for="input-username">Username</label>
                <input type="text" id="username" class="form-control" placeholder="Username" v-model="username" autofocus>
                <span class="error" v-if="errors.username">*You must enter a valid username address</span>
              </div>
              <div class="form-label-group">
                <label for="input-password">Password</label>
                <input type="password" id="input-password" class="form-control" placeholder="Password" v-model="password">
                <span class="error" v-if="errors.password">*You must enter a valid password</span>
              </div>
              <div>
                <span class="error" v-if="errors.login">*The username and password combination do not match our records</span>
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
                username: null,
                password: null,
                errors: {
                  username: false,
                  password: false,
                  login: false
                }
            };
        },
        mounted() {
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
              // @TODO I think I need to bcrypt before sending it over
              axios.post('/api/login', {
                user: {
                  username: this.username,
                  password: this.password  
                }
              })
              .then((response) => {
                console.log('good response');
                localStorage.setItem('jwt', response.data.user.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                this.errors.login = false;
                window.location = '/';
              })
              .catch((error) => {
                console.log('bad response');
                // @TODO response should come from backend
                this.errors.login = true;
              });
            },
            validateForm() {
              if(!this.password || this.password.length < 6) {
                this.errors.password = true;
              } else {
                this.errors.password = false;
              }
              if(!this.username || this.username.length < 4) {
                this.errors.username = true;
              } else {
                this.errors.username = false;
              }
              if(!this.errors.username && !this.errors.password) {
                return true;
              }
              return false;
            }
        }
    }
</script>