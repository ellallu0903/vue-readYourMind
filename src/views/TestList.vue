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
          念位是仍理，料四方前。眼作那活業眾施自減天我何手眼獨成這不預哥研細，智主社成引院天高事此衣其房人物期投好？期的裝那，此進中笑支法見動，的會指出園灣力識白印年現病反自票特旅展人主管現生記人的開落北等子關動腦望當大要他連！
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
                <b-button
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
