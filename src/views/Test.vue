<template>
  <div id="test_page" class="one_page_min_h bg_color p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li><a href="#/testList">心理測驗</a></li>
        <li class="is-active"><a href="#">開始測驗</a></li>
      </ul>
    </nav>
    <div
      id="test_question"
      class="is-flex is-align-items-center is-flex-direction-column"
    >
      <div class="title is-3 pb-4">{{ tests.title }}</div>
      <form
        class="w-100 is-flex is-align-items-center is-flex-direction-column"
        @submit.prevent="onSubmit"
      >
        <div class="box_test p-6">
          <div
            class="columns w-100"
            v-for="(quesiton, index) in questions"
            :key="index"
          >
            <div class="column is-6">
              <div class="is-flex">
                <div class="is-size-18 is-1 mr-3">
                  {{ index + 1 }}
                </div>
                <div class="is-size-18 is-11">
                  {{ questions[index].question }}
                </div>
              </div>
            </div>
            <div class="column is-6 is-size-18">
              <b-radio
                v-for="(option, index2) in questions[index].options"
                :key="option._id"
                v-model.number="modelQuestion[index]"
                :native-value="questions[index].options[index2].optionScore"
                :name="'q' + index"
              >
                <!-- {{ questions[index].options[index2].optionScore }} -->
                {{ questions[index].options[index2].option }}
              </b-radio>
            </div>
          </div>
        </div>

        <button class="btn_enter btn_test_size mt-5" type="submit">送出</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      testId: this.$route.params.id,
      tests: [],
      questions: [],
      modelQuestion: [],
      // table
      hasMobileCards: true,
      // result_data
      scores: 0,
      result: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    onSubmit() {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.modelQuestion[i] == null) {
          const j = i + 1
          this.$buefy.dialog.alert({
            title: 'Opps!',
            message: '第' + j + '題尚未完成～',
            type: 'is-danger',
            hasIcon: true,
            icon: 'alert-circle-outline'
          })
        } else if (this.tests.scoringMethod === '加總計分') {
          this.scores += this.modelQuestion[i]
        } else {
          this.result = this.modelQuestion.reduce(function(allOptions, option) {
            if (option in allOptions) {
              allOptions[option]++
            } else {
              allOptions[option] = 1
            }
            return allOptions
          }, {})
        }
      }
      // console.log(this.result)
      // console.log(this.scores)

      this.axios
        .patch(process.env.VUE_APP_API + '/users/result/' + this.user.id, {
          testData_id: this.$route.params.id,
          date: Date.now(),
          scores: this.scores,
          result: this.result
        })
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '去看結果吧～',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.scores = ''
            this.result = []
            // 導到個人專區
            if (this.$route.path !== '/personal') {
              this.$router.push('/personal')
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
            icon: 'heart-circle'
          })
        })
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/tests/' + this.testId)
      .then(res => {
        if (res.data.success) {
          this.tests = res.data.result
          this.questions = res.data.result.questions
          for (let i = 0; i < this.questions.length; i++) {
            this.modelQuestion.push(null)
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
