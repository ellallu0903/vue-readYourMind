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
                  icon="tag-heart-outline"
                  to="/backstage/home"
                  tag="router-link"
                  label="後台數據"
                >
                </b-menu-item>
                <b-menu-item icon="heart-half-full">
                  <template #label="props" id="sidebar_front">
                    前台內容管理
                    <b-icon
                      class="is-pulled-right"
                      :icon="props.expanded ? 'menu-down' : 'menu-up'"
                    ></b-icon>
                  </template>
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
      activeTab: 0,
      // data
      users: []
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
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/users/')
      .then(res => {
        if (res.data.success) {
          this.users = res.data.result
        } else {
          this.$swal({
            icon: 'error',
            title: '發生錯誤',
            text: res.data.message
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
</script>
