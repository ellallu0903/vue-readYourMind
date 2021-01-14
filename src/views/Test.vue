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
      <div class="title is-3 pb-4">ABCD測驗名稱EFGH</div>
      <form
        action=""
        class="w-100 is-flex is-align-items-center is-flex-direction-column"
      >
        <!-- <b-table
          :data="questions"
          striped
          :mobile-cards="hasMobileCards"
          class="w-100"
        >
          <b-table-column
            field="number"
            label="No."
            width="50"
            centered
            numeric
            v-slot="props"
          >
            {{ props.index + 1 }}
          </b-table-column>

          <b-table-column
            width="600"
            field="question"
            label="題目"
            v-slot="props"
          >
            {{ props.row.question }}
          </b-table-column>

          <b-table-column field="option" label="選項" v-slot="props">
            {{ props.row.last_name }}
          </b-table-column>
        </b-table> -->
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
              <b-radio v-model="modelQuestion" name="1" native-value="0">
                完全沒有
              </b-radio>
              <b-radio v-model="modelQuestion" name="1" native-value="1">
                輕微
              </b-radio>
              <b-radio v-model="modelQuestion" name="1" native-value="2">
                中等程度
              </b-radio>
              <b-radio v-model="modelQuestion" name="1" native-value="3">
                厲害
              </b-radio>
              <b-radio v-model="modelQuestion" name="1" native-value="4">
                非常厲害
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
      testId: '5ff9be8feaeb15ce7278b408',
      tests: [],
      questions: [],
      modelQuestion: '',
      testData: [
        {
          question: '覺得容易苦惱或動怒',
          options: [
            {
              option: '完全沒有'
            },
            {
              option: '輕微'
            },
            {
              option: '中等程度'
            },
            {
              option: '厲害'
            },
            {
              option: '非常厲害'
            }
          ]
        },
        {
          question: '感覺緊張不安',
          options: [
            {
              option: '完全沒有'
            },
            {
              option: '輕微'
            },
            {
              option: '中等程度'
            },
            {
              option: '厲害'
            },
            {
              option: '非常厲害'
            }
          ]
        }
      ],
      // table
      hasMobileCards: true
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/tests/' + this.testId)
      .then(res => {
        if (res.data.success) {
          this.tests = res.data.result
          this.questions = res.data.result.questions
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
