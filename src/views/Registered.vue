<template>
  <div id="registered" class="bg_registered one_page_min_h p-5 is-flex is-justify-content-center is-align-items-center">
    <form @submit.prevent="onSubmit">
      <div id="registered_content" class="box_registered p-6">
          <div class="has-text-centered">
            <div class="is-size-3 mb-2">Sign up</div>
          </div>
          <section>
              <b-field label="信箱：">
                <b-input v-model="email"
                type="email"
                icon="account"
                placeholder="Please enter valid email address . . ."
                required
                rounded
                >
                </b-input>
              </b-field>

              <b-field label="密碼：">
                <b-input type="password"
                  icon="lock"
                  placeholder="Password length must be between 6 and 30 characters . . ."
                  required
                  password-reveal
                  rounded
                  class="icon_gray"
                  v-model="password"
                  minlength="6"
                  maxlength="30"
                  >
                </b-input>
              </b-field>

                <b-field label="暱稱：">
                  <b-input v-model="name"
                  type="text"
                  icon="face-shimmer"
                  placeholder="Your name length must be between 2 and 10 characters . . ."
                  required
                  rounded
                  minlength="2"
                  maxlength="10"
                  >
                  </b-input>
                </b-field>

              <div class="is-size-5 has-text-centered mb-3">▸ Choose your character ◂</div>
              <div class="block columns">
                <b-radio v-model="avator"
                    name="avator"
                    native-value="bear"
                    class="column is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                  <figure class="image is-96x96 mt-2">
                    <img class="is-rounded" src="../assets/images/avator/bear.png">
                  </figure>
                </b-radio>
                  <b-radio v-model="avator"
                      name="avator"
                      native-value="fox"
                      class="column is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                  <figure class="image is-96x96 mt-2">
                    <img class="is-rounded" src="../assets/images/avator/fox.png">
                  </figure>
                </b-radio>
                <b-radio v-model="avator"
                      name="avator"
                      native-value="deer"
                      class="column is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                  <figure class="image is-96x96 mt-2">
                    <img class="is-rounded" src="../assets/images/avator/deer.png">
                  </figure>
                </b-radio>
                <b-radio v-model="avator"
                      name="avator"
                      native-value="owl"
                      class="column is-flex is-justify-content-center is-align-items-center is-flex-direction-column">
                  <figure class="image is-96x96 mt-2">
                    <img class="is-rounded" src="../assets/images/avator/owl.png">
                  </figure>
                  </b-radio>
              </div>
              <b-field class="w-100 has-text-centered">
                <button type="submit" class="btn_login">註冊</button>
              </b-field>
              <hr>
              <div class="has-text-centered mt-4">
                <small>
                  <a
                  href="#/login"
                  >Log in</a>
                  </small>
              </div>
          </section>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Registered',
  data () {
    return {
      email: '',
      password: '',
      name: '',
      avator: 'Bear'
    }
  },
  methods: {
    // 提交表單，post 到後台資料庫
    onSubmit () {
      this.axios.post(process.env.VUE_APP_API + '/users/', this.$data)
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '註冊成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.$router.push('/')
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
            icon: 'heart-circle'
          })
        })
    }
  }
}
</script>
