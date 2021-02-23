<template>
  <div
    id="login"
    class="bg_login one_page_h p-5 is-flex is-justify-content-center is-align-items-center"
  >
    <div class="box_login p-6">
      <div class="has-text-centered">
        <div class="is-size-3 mb-2">Log in</div>
      </div>
      <section>
        <form @submit.prevent="onSubmit">
          <b-field label="信箱：">
            <b-input
              v-model="email"
              type="email"
              icon="account"
              placeholder="Please enter email . . ."
              required
              rounded
            >
            </b-input>
          </b-field>

          <b-field label="密碼：" class="mb-5">
            <b-input
              type="password"
              icon="lock"
              placeholder="Please enter password . . ."
              required
              password-reveal
              rounded
              class="icon_gray"
              v-model="password"
            >
            </b-input>
          </b-field>

          <b-field>
              <b-checkbox v-model="rememberEmail">
                  記住信箱
              </b-checkbox>
          </b-field>

          <b-field class="w-100 has-text-centered">
            <button type="submit" class="btn_login">登入</button>
          </b-field>
        </form>
      </section>
      <hr />
      <div class="has-text-centered mt-4">
        <small>
          <a href="#/registered">Create account</a>
        </small>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: this.$store.state.sign.email,
      password: '',
      rememberEmail: true
    }
  },
  methods: {
    // 提交表單，post 到後台資料庫
    onSubmit() {
      this.axios
        .post(process.env.VUE_APP_API + '/users/login', this.$data)
        .then(res => {
          if (res.data.success) {
            this.$store.commit('login', res.data.result)
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '登入成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.$router.push('/')
            if (this.rememberEmail === false) {
              this.$store.commit('cleanEmail')
              this.rememberEmail = false
            } else {
              this.$store.state.sign.email = this.email
            }
          } else {
            this.$buefy.dialog.alert({
              title: 'Error!',
              message: '發生錯誤！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-broken'
            })
          }
        })
        .catch(err => {
          this.$buefy.dialog.alert({
            title: 'Error!',
            message: err.response.data.message,
            type: 'is-danger',
            hasIcon: true,
            icon: 'heart-broken'
          })
        })
    }
  }
}
</script>
