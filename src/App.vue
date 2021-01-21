<template>
  <div id="app">
    <b-navbar centered spaced shadow>
      <template slot="brand">
        <b-navbar-item tag="router-link" :to="{ path: '/' }" class="py-0">
          <img src="./assets/ryd.svg" alt="" />
        </b-navbar-item>
      </template>
      <template slot="start">
        <b-navbar-item class="mx-5" tag="router-link" to="/">
          首頁
        </b-navbar-item>
        <b-navbar-item tag="router-link" class="mx-5" to="/about">
          關於讀心
        </b-navbar-item>
        <b-navbar-item tag="router-link" class="mx-5" to="/testList">
          心理測驗
        </b-navbar-item>
        <b-navbar-item tag="router-link" class="mx-5" to="/knowledge">
          小知識
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          class="mx-5 nav_backStage"
          v-if="user.authority === '管理者'"
          to="/backstage"
        >
          後台管理
        </b-navbar-item>
      </template>
      <template slot="end">
        <b-tooltip label="查看個人資料" position="is-bottom" type="is-light">
          <div
            id="avator_block"
            v-if="user.id.length > 0"
            class="mx-3 nav_avator"
            @click="toPersonalPage()"
          >
            <img
              v-if="user.avator === 'bear'"
              class="image is-55x55"
              src="./assets/images/avator/bear.png"
              alt="Your avator."
            />
            <img
              v-else-if="user.avator === 'fox'"
              class="image is-55x55"
              src="./assets/images/avator/fox.png"
              alt="Your avator."
            />
            <img
              v-else-if="user.avator === 'deer'"
              class="image is-55x55"
              src="./assets/images/avator/deer.png"
              alt="Your avator."
            />
            <img
              v-else
              class="image is-55x55"
              src="./assets/images/avator/owl.png"
              alt="Your avator."
            />
          </div>
        </b-tooltip>
        <b-navbar-item tag="div">
          <div class="buttons">
            <b-button
              tag="router-link"
              to="/registered"
              type="nav_signUp"
              v-if="user.id.length === 0"
            >
              <strong>Sign up</strong>
            </b-button>
            <b-button
              tag="router-link"
              to="/login"
              type="nav_logIn"
              v-if="user.id.length === 0"
            >
              <strong>Log in</strong>
            </b-button>
            <!-- <b-button
              tag="router-link"
              to="/personal"
              type="nav_signUp"
              v-if="user.id.length > 0"
            >
              <strong>會員專區</strong>
            </b-button> -->
            <b-button
              type="nav_logIn"
              @click="logout"
              v-if="user.id.length > 0"
            >
              <strong>Log out</strong>
            </b-button>
          </div>
        </b-navbar-item>
      </template>
    </b-navbar>
    <router-view />
    <!-- footer -->
    <footer>
      <div class="content has-text-centered footer p-0">
        <p>
          <strong class="has-text-primary"
            >&copy; 2020 Read your mind ❤
          </strong>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      users: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    toPersonalPage() {
      if (this.$route.path !== '/personal') {
        this.$router.push('/personal')
      }
    },
    logout() {
      this.axios
        .delete(process.env.VUE_APP_API + '/users/logout')
        .then(res => {
          // 如果登出成功
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '登出成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle-outline'
            })

            // 清除 vuex
            this.$store.commit('logout')

            // 導回首頁
            if (this.$route.path !== '/') {
              this.$router.push('/')
            }
          } else {
            this.$buefy.dialog.alert({
              title: 'Error!',
              message: res.data.message,
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-broken'
            })
          }
        })
        .catch(error => {
          // 如果回來的狀態碼不是 200，直接 alert 錯誤訊息
          this.$buefy.dialog.alert({
            title: 'Error!',
            message: error.response.data.message,
            type: 'is-danger',
            hasIcon: true,
            icon: 'heart-broken'
          })
        })
    },
    heartbeat() {
      this.axios
        .get(process.env.VUE_APP_API + '/users/heartbeat')
        .then(res => {
          // 如果 vuex 是登入中
          if (this.user.id.length > 0) {
            // 但是後端沒登入
            if (!res.data) {
              this.$buefy.dialog.alert({
                title: 'Error!',
                message: '登入時效已過，請重新登入。',
                type: 'is-danger',
                hasIcon: true,
                icon: 'heart-broken'
              })
              // 登出
              this.$store.commit('logout')
              // 導回首頁
              if (this.$route.path !== '/') {
                this.$router.push('/')
              }
            }
          }
        })
        .catch(() => {
          this.$buefy.dialog.alert({
            title: 'Error!',
            message: '發生錯誤！',
            type: 'is-danger',
            hasIcon: true,
            icon: 'heart-broken'
          })
          // 登出
          this.$store.commit('logout')
          // 導回首頁
          if (this.$route.path !== '/') {
            this.$router.push('/')
          }
        })
    }
  },
  mounted() {
    this.heartbeat()
    setInterval(() => {
      this.heartbeat()
    }, 5000)
  }
}
</script>
