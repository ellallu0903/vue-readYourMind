<template>
  <div id="about" class="bg_about one_page_min_h p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li class="is-active"><a href="#">關於讀心</a></li>
      </ul>
    </nav>

    <div class="title is-3 has-text-centered">關於讀心</div>
      <div class="is-flex is-flex-direction-column is-align-items-center py-5">
        <div class="content w-100 box_about">念位是仍理，料四方前。眼作那活業眾施自減天我何手眼獨成這不預哥研細，智主社成引院天高事此衣其房；不輕古留開算為。是答童吸出可吃形及！中月便加得即步發益、個那樓會立白不產線文重不！來因於故。相石信木新境不命任，企熱害；開不灣灣得一：一個性喜可的刻在臺可有件房？似電管都錯起愛來結回的景爸前北道心一的達月。</div>
    </div>
    <br>
    <div id="a_content" class="is-flex is-align-items-center is-flex-direction-column is-justify-content-center">
        <section class="box_about mt-5 has-text-centered h-100">
          <b-steps
              :icon-prev="prevIcon"
              :icon-next="nextIcon"
              :label-position="labelPosition"
              :mobile-mode="mobileMode"
              size="is-large"
              class="w-100 h-100
              is-flex
              is-flex-direction-column
              is-justify-content-space-between"
              >

              <!-- <b-step-item
              v-for="(step, index) of steps"
              :key="index"
              :step="index + 1"
              :label="step.title" :clickable="isStepsClickable"
              class="p-4">
                  <h1 class="is-size-4 has-text-weight-semibold">
                    {{ step.title }}
                  </h1>
                  <div class="box_about_content_h py-2 px-5">
                    {{ step.content }}
                  </div>
              </b-step-item> -->
              <b-step-item
              icon="account-heart-outline"
              label="註冊帳號" :clickable="isStepsClickable"
              class="p-4">
                  <h1 class="is-size-4 has-text-weight-semibold">
                    註冊帳號
                  </h1>
                  <div class="box_about_content_h py-2 px-5">
                    頭不顯建下力問是。自充本多自道：何路打難修客少全流少時個走神生法獲。力覺管但爾令到統遊兒亞行許，說金單上家希題要這力往等書大任北求約動。
                  </div>
                  <b-button @click="toReg()" class="btn_enter">
                    前去註冊
                  </b-button>
                  <br>
                  <div class="mt-2">
                    <a href=""><small>已有帳號？登入吧！</small></a>
                  </div>
              </b-step-item>
              <b-step-item
              icon="heart-settings-outline"
              label="開始測驗" :clickable="isStepsClickable"
              class="p-4">
                  <h1 class="is-size-4 has-text-weight-semibold">
                    開始測驗
                  </h1>
                  <div class="box_about_content_h py-2 px-5">
                    一才證非的班列方邊女、燈生作傳星色是，文的臺說一金立時方特初文打容不國開業利富向電，機場不一回不失格開操示他學。。
                  </div>
                  <b-button @click="toTest()" class="btn_enter">
                    立馬測驗
                  </b-button>
              </b-step-item>
              <b-step-item
              icon="folder-heart-outline"
              label="檢測結果" :clickable="isStepsClickable"
              class="p-4">
                  <h1 class="is-size-4 has-text-weight-semibold">
                    檢測結果
                  </h1>
                  <div class="box_about_content_h py-2 px-5">
                    失萬民試官寫感關輕紀臺照。受另話幾一用以管命金，熱們山父學皮又次爭城家年陸朋人考劇保這師著現小禮代……做如傳大一院止己施飯。
                  </div>
                  <b-button @click="toPersonalPage()" class="btn_enter">
                    查看結果
                  </b-button>
              </b-step-item>

              <template
                  v-if="customNavigation"
                  slot="navigation"
                  slot-scope="{previous, next}"
                  >
                  <b-button
                      outlined
                      type="is-danger"
                      icon-pack="fas"
                      icon-left="backward"
                      :disabled="previous.disabled"
                      @click.prevent="previous.action">
                      Previous
                  </b-button>
                  <b-button
                      outlined
                      type="is-success"
                      icon-pack="fas"
                      icon-right="forward"
                      :disabled="next.disabled"
                      @click.prevent="next.action">
                      Next
                  </b-button>
              </template>
          </b-steps>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // setting-step
      activeStep: 0,
      isStepsClickable: true,
      customNavigation: false,
      isProfileSuccess: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
      mobileMode: 'minimalist',
      // abouts-data
      abouts: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    toReg() {
      if (this.user.id.length === 0) {
        this.$router.push('/registered')
      } else {
        this.$buefy.dialog.alert({
          title: 'Awww!',
          message: '你已經登入囉！',
          type: 'is-danger',
          hasIcon: true,
          icon: 'account-heart-outline'
        })
      }
    },
    toPersonalPage() {
      if (this.user.id.length > 0) {
        this.$router.push('/personal')
      } else {
        this.$buefy.dialog.alert({
          title: 'Opps!',
          message: '尚未登入！',
          type: 'is-danger',
          hasIcon: true,
          icon: 'heart-broken'
        })
      }
    },
    toTest() {
      this.$router.push('/test')
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/abouts/')
      .then(res => {
        if (res.data.success) {
          // .map 把陣列的內容重新組合，再加上 edit & model
          this.abouts = res.data.result.map(about => {
            about.edit = false
            about.model01 = about.title
            about.model02 = about.content
            return about
          })
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
    // this.axios
    //   .get(process.env.VUE_APP_API + '/users/' + this.user.id)
    //   .then(res => {
    //     if (res.data.success) {
    //       this.users = res.data.result
    //     } else {
    //       this.$swal({
    //         icon: 'error',
    //         title: '發生錯誤',
    //         text: res.data.message
    //       })
    //     }
    //   })
    //   .catch(err => {
    //     console.log(err)
    //     // this.$buefy.dialog.alert({
    //     //   title: 'Error!',
    //     //   message: err.response.data.message,
    //     //   type: 'is-danger',
    //     //   hasIcon: true,
    //     //   icon: 'heart-broken'
    //     // })
    //   })
  }
}
</script>
