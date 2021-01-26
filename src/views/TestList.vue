<template>
  <div id="test" class="bg_color one_page_min_h p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li class="is-active"><a href="#">心理測驗</a></li>
      </ul>
    </nav>
    <div id="test_list" class="w-100">
      <div class="title is-3 has-text-centered">心理測驗</div>
      <div class="is-flex is-flex-direction-column is-align-items-center pb-4">
        <!-- 說明 -->
        <div class="box_about">
          以下為本平台的心理測驗目錄，
          <a href="#/login">登入</a>
          後點選「START」按鈕後，就可以開始測驗囉～
        </div>
      </div>
      <section class="is-flex is-flex-direction-column is-align-items-center">
        <div class="box_testList">
          <b-message type="msg_shadow" v-for="test in tests" :key="test._id">
            <div
              class="columns is-justify-content-center is-align-items-center"
            >
              <div class="column is-10">
                <div class="title is-size-5 mb-3">
                  {{ test.title }}
                </div>
                <div class="is-size-6">{{ test.reference }}</div>
              </div>
              <div class="column is-2 has-text-centered">
                <b-tooltip
                  v-if="user.id.length === 0"
                  label="請先登入"
                  type="is-dark"
                  position="is-bottom"
                >
                  <b-button disabled><b>START</b></b-button>
                </b-tooltip>
                <b-button
                  v-else
                  tag="router-link"
                  type="btn_enter"
                  :to="'test/' + test._id"
                  ><b>START</b></b-button
                >
              </div>
            </div>
          </b-message>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tests: [],
      testId: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/tests/')
      .then(res => {
        if (res.data.success) {
          this.tests = res.data.result
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
