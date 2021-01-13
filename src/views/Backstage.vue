<template>
  <div id="backStage" class="one_page_min_h">
    <div class="sidebar-page">
      <section class="sidebar-layout">
        <b-sidebar
          position="static"
          :mobile="mobile"
          :expand-on-hover="expandOnHover"
          :reduce="reduce"
          type="h-100"
          open
        >
          <div class="p-3">
            <b-menu class="is-custom-mobile">
              <b-menu-list label="Menu">
                <b-menu-item
                  active
                  expanded
                  icon="heart-half-full"
                  label="前台內容管理"
                >
                  <!-- <b-menu-item
                    icon="information"
                    label="使用說明"
                    to="/backstage/about"
                    tag="router-link"
                  ></b-menu-item> -->
                  <b-menu-item
                    icon="notebook"
                    to="/backstage/test"
                    tag="router-link"
                    label="心理測驗"
                  >
                  </b-menu-item>
                  <b-menu-item
                    icon="lightbulb"
                    to="/backstage/knowledge"
                    tag="router-link"
                    label="小知識"
                  ></b-menu-item>
                </b-menu-item>
                <b-menu-item
                  icon="account"
                  to="/backstage/member"
                  tag="router-link"
                  label="會員管理"
                >
                </b-menu-item>
              </b-menu-list>
              <br />
              <br />
              <b-menu-list label="Actions">
                <b-menu-item
                  icon="logout"
                  label="Logout"
                  @click="logout"
                ></b-menu-item>
              </b-menu-list>
            </b-menu>
          </div>
        </b-sidebar>
        <div class="bg_back">
          <router-view />
        </div>
        <!-- <div id="go_top_page" class="btn_to_top_bg is-flex is-justify-content-center is-align-items-center">
              <a href="#">
                <b-icon icon="arrow-up-drop-circle"
                size="is-large"
                class="animate__animated animate__fadeIn animate__infinite animate__slower"></b-icon>
              </a>
            </div> -->
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // sidebar
      expandOnHover: false,
      mobile: 'reduce',
      reduce: false,
      activeTab: 0
    }
  },
  methods: {
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
    }
  }
}
</script>
