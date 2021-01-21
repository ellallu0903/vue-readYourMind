<template>
  <div id="about" class="bg_color one_page_min_h p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li class="is-active"><a href="#">關於讀心</a></li>
      </ul>
    </nav>

    <div class="title is-3 has-text-centered">關於讀心</div>
    <div class="is-flex is-flex-direction-column is-align-items-center pb-4">
      <div class="content box_about has-text-centered">
        <img src="../assets/ryd_eng.svg" alt="Read your mind" />
        <div class="is-size-5 color_primaryColor01 mt-2 mb-4">
          藉由測驗來解讀自己的內心
        </div>
        以個人檔案的概念將測驗結果整合，可供使用者追蹤自身改變的幅度，
        <br />
        比對每次測驗的結果，記錄下自己成長的軌跡。
      </div>
    </div>
    <br />
    <div
      id="a_content"
      class="is-flex is-align-items-center is-flex-direction-column is-justify-content-center"
    >
      <section class="box_about mt-5 has-text-centered h-100 mb-6">
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
            label="註冊帳號"
            :clickable="isStepsClickable"
            class="p-4"
          >
            <h1 class="is-size-4 has-text-weight-semibold">
              註冊帳號
            </h1>
            <div class="box_about_content_h py-2 px-5">
              輸入您的電子郵件、密碼、暱稱，以及選擇代表頭像後，就可以成功擁有
              <b class="color_primaryColor01">讀心</b> 的帳號。
              <br />
              有了
              <b class="color_primaryColor01">讀心</b>
              的帳號，您可以使用本平台的心理測驗，並隨時檢視自己的測驗結果。
            </div>
            <b-button @click="toReg()" class="btn_enter">
              前去註冊
            </b-button>
            <br />
            <div class="mt-2" @click="toLogIn()">
              <a><small>已有帳號？登入吧！</small></a>
            </div>
          </b-step-item>
          <b-step-item
            icon="heart-settings-outline"
            label="開始測驗"
            :clickable="isStepsClickable"
            class="p-4"
          >
            <h1 class="is-size-4 has-text-weight-semibold">
              開始測驗
            </h1>
            <div class="box_about_content_h py-2 px-5">
              點選導覽列中的心理測驗或下方按鈕，檢視本平台目前所有的心理測驗。
              <br />
              選擇您有興趣的測驗後，將會傳送到測驗頁面，即可立即開始作答。
            </div>
            <b-button @click="toTest()" class="btn_enter">
              選擇測驗
            </b-button>
          </b-step-item>
          <b-step-item
            icon="folder-heart-outline"
            label="檢測結果"
            :clickable="isStepsClickable"
            class="p-4"
          >
            <h1 class="is-size-4 has-text-weight-semibold">
              檢測結果
            </h1>
            <div class="box_about_content_h py-2 px-5">
              完成測驗後，檢測結果會顯示在個人資料中。
              <br />
              選擇心理測驗的名稱，查看剛剛作答完畢的測驗結果或是先前的測驗紀錄。
            </div>
            <b-button @click="toPersonalPage()" class="btn_enter">
              查看結果
            </b-button>
          </b-step-item>

          <template
            v-if="customNavigation"
            slot="navigation"
            slot-scope="{ previous, next }"
          >
            <b-button
              outlined
              type="is-danger"
              icon-pack="fas"
              icon-left="backward"
              :disabled="previous.disabled"
              @click.prevent="previous.action"
            >
              Previous
            </b-button>
            <b-button
              outlined
              type="is-success"
              icon-pack="fas"
              icon-right="forward"
              :disabled="next.disabled"
              @click.prevent="next.action"
            >
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
  data() {
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
      this.$router.push('/testList')
    },
    toLogIn() {
      if (this.user.id.length === 0) {
        this.$router.push('/login')
      } else {
        this.$buefy.dialog.alert({
          title: 'Awww!',
          message: '你已經登入囉！',
          type: 'is-danger',
          hasIcon: true,
          icon: 'account-heart-outline'
        })
      }
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/abouts/')
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
