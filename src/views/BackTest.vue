<template>
  <div class="back_content">
    <div id="backTest" class="p-5">
      <nav class="breadcrumb has-bullet-separator">
        <ul>
          <li><a href="#/">首頁</a></li>
          <li><a href="#/backStage">前台內容管理</a></li>
          <li class="is-active"><a href="#">心理測驗</a></li>
        </ul>
      </nav>
      <section id="test_basic" class="w-100 p-4">
        <b-tabs expanded class="h-100">
          <template v-for="test in tests" class="h-100">
            <b-tab-item :key="test._id" class="h-100">
              <template #header>
                <span>
                  {{ test.title }}
                </span>
              </template>
              <div class="has-text-left position_relative mb-3">
                <button
                  class="btn_backTest_edit ml-2"
                  v-if="!test.edit"
                  @click="testEdit(test)"
                >
                  <b-icon icon="heart-cog"></b-icon>
                </button>
                <div class="columns">
                  <div class="column is-4">
                    <div class="mb-2">
                      <b>測驗名稱：</b>
                      <b-input
                        v-model="test.modelTitle"
                        v-if="test.edit"
                      ></b-input>
                      <div v-else>{{ test.title }}</div>
                    </div>
                    <div class="mb-2">
                      <b>類別：</b>

                      <b-select
                        v-if="test.edit"
                        v-model="test.modelType"
                        placeholder="Select a test type"
                      >
                        <option value="智力測驗">智力測驗</option>
                        <option value="成就⁄能力測驗">成就⁄能力測驗</option>
                        <option value="性向測驗">性向測驗</option>
                        <option value="人格測驗">人格測驗</option>
                        <option value="職業測驗">職業測驗</option>
                        <option value="其他">其他</option>
                      </b-select>
                      <!-- <div v-if="test.edit" class="block mt-2">
                        <b-radio
                          v-model="test.modelType"
                          name="testType"
                          native-value="智力測驗"
                        >
                          智力測驗
                        </b-radio>
                        <b-radio
                          v-model="test.modelType"
                          name="testType"
                          native-value="成就⁄能力測驗"
                        >
                          成就⁄能力測驗
                        </b-radio>
                        <b-radio
                          v-model="test.modelType"
                          name="testType"
                          native-value="性向測驗"
                        >
                          性向測驗
                        </b-radio>
                        <b-radio
                          v-model="test.modelType"
                          name="testType"
                          native-value="人格測驗"
                        >
                          人格測驗
                        </b-radio>
                        <b-radio
                          v-model="test.modelType"
                          name="testType"
                          native-value="職業測驗"
                        >
                          職業測驗
                        </b-radio>
                        <b-radio
                          v-model="test.modelType"
                          name="testType"
                          native-value="其他"
                        >
                          其他
                        </b-radio>
                      </div> -->
                      <div v-else>{{ test.type }}</div>
                    </div>
                    <div>
                      <b>計分方式：</b>
                      <div v-if="test.edit" class="block mt-2">
                        <b-radio
                          v-model="test.modelScoringMethod"
                          name="testScoringMethod"
                          native-value="加總計分"
                        >
                          加總計分
                        </b-radio>
                        <b-radio
                          v-model="test.modelScoringMethod"
                          name="testScoringMethod"
                          native-value="取最多選項"
                        >
                          取最多選項者
                        </b-radio>
                      </div>
                      <div v-else>{{ test.scoringMethod }}</div>
                    </div>
                  </div>
                  <div class="column is-8">
                    <div class="mb-2">
                      <b>文獻⁄來源：</b>
                      <b-input
                        v-model="test.modelReference"
                        v-if="test.edit"
                      ></b-input>
                      <div v-else>{{ test.reference }}</div>
                    </div>
                    <div>
                      <b>說明：</b>
                      <b-input
                        type="textarea"
                        v-model="test.modelDescription"
                        v-if="test.edit"
                      ></b-input>
                      <div v-else>{{ test.description }}</div>
                    </div>
                  </div>
                </div>
                <div class="has-text-right">
                  <b-button
                    class="btn_enter mr-2"
                    v-if="test.edit"
                    @click="testSave(test)"
                  >
                    保存
                  </b-button>
                  <b-button
                    class="btn_cancel"
                    v-if="test.edit"
                    @click="testCancel(test)"
                  >
                    取消
                  </b-button>
                </div>
              </div>
              <div id="test_question">
                <b-table
                  :data="tests"
                  :paginated="isPaginated"
                  :per-page="perPage"
                  :current-page.sync="currentPage"
                  :pagination-simple="isPaginationSimple"
                  :pagination-position="paginationPosition"
                  :pagination-rounded="isPaginationRounded"
                  striped
                  hoverable
                  :mobile-cards="hasMobileCards"
                >
                  <!-- <b-table-column
                    field="number"
                    label="No."
                    centered
                    width="100"
                    v-slot="props"
                  >
                    <h1>{{ props.index + 1 }}</h1>
                  </b-table-column> -->

                  <b-table-column
                    field="question"
                    label="題目"
                    width="500"
                    v-slot="props"
                  >
                    <b-input
                      v-model="props.row.model01"
                      v-if="props.row.edit"
                    ></b-input>
                    <h1 v-else>{{ props.row.questions }}</h1>
                  </b-table-column>
                  <b-table-column
                    field="option"
                    label="選項"
                    width="300"
                    v-slot="props"
                  >
                    <b-input
                      v-model="props.row.model02"
                      v-if="props.row.edit"
                    ></b-input>
                    <div v-else>
                      {{ props.row.questions.options }}
                    </div>
                  </b-table-column>
                  <b-table-column
                    field="edit"
                    label="編輯"
                    width="200"
                    v-slot="props"
                  >
                    <div>
                      <button
                        class="btn_cancel btn_back_size mr-2"
                        v-if="!props.row.edit"
                        @click="edit(props)"
                      >
                        <b-icon icon="pencil-outline"></b-icon>
                      </button>
                      <button
                        class="btn_trash btn_back_size"
                        v-if="!props.row.edit"
                        @click="del(props, props.index)"
                      >
                        <b-icon icon="trash-can-outline"></b-icon>
                      </button>
                    </div>
                    <div>
                      <button
                        class="btn_cancel btn_back_size mr-2"
                        v-if="props.row.edit"
                        @click="save(props)"
                      >
                        <b-icon icon="content-save"></b-icon>
                      </button>
                      <button
                        class="btn_trash btn_back_size"
                        v-if="props.row.edit"
                        @click="cancel(props)"
                      >
                        <b-icon icon="close-outline"></b-icon>
                      </button>
                    </div>
                  </b-table-column>
                </b-table>
              </div>
            </b-tab-item>
          </template>
        </b-tabs>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // table & page
      hasMobileCards: true,
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      currentPage: 1,
      perPage: 5,
      // add_modal
      addModalActive: false,
      // data
      title: '',
      type: '',
      ScoringMethod: '',
      reference: '',
      description: '',
      questions: '',
      options: '',
      tests: [],
      tabs: [
        {
          title: '123',
          content: '456'
        },
        {
          title: '1231111',
          content: '456'
        },
        {
          title: '1233333',
          content: '456'
        }
      ]
    }
  },
  computed: {
    // 文字驗證
    // textState() {
    //   if (this.model01.length === 0) {
    //     return null
    //   } else if (this.model01.length >= 2 && this.model01.length <= 10) {
    //     return true
    //   } else {
    //     return false
    //   }
    // }
  },
  methods: {
    // 提交表單，post 到後台資料庫
    onSubmit() {
      this.axios
        .post(process.env.VUE_APP_API + '/tests/', this.$data)
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '新增成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.title = ''
            this.type = ''
            this.ScoringMethod = ''
            this.reference = ''
            this.description = ''
            this.question = ''
            this.option = ''
            this.addModalActive = false
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
    },
    onReset() {
      this.title = ''
      this.type = ''
      this.ScoringMethod = ''
      this.reference = ''
      this.description = ''
      this.questions = ''
      this.options = ''
    },
    // 編輯狀態 -------------------------------
    // 取消
    testCancel(test) {
      test.edit = false
      test.modelTitle = test.title
      test.modelDescription = test.description
      test.modelReference = test.reference
      test.modelType = test.type
      test.modelScoringMethod = test.scoringMethod
    },
    // 保存
    testSave(test) {
      this.axios
        .patch(process.env.VUE_APP_API + '/tests/' + test._id, {
          title: test.modelTitle,
          description: test.modelDescription,
          reference: test.modelReference,
          type: test.modelType,
          scoringMethod: test.modelScoringMethod
        })
        .then(res => {
          if (res.data.success) {
            test.edit = false
            test.title = test.modelTitle
            test.description = test.modelDescription
            test.reference = test.modelReference
            test.type = test.modelType
            test.scoringMethod = test.modelScoringMethod
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '保存成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            // this.users[props.index].email = props.row.model01
            // this.users[props.index].name = props.row.model02
            // this.users[props.index].avator = props.row.model03
            // this.users[props.index].authority = props.row.model04
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
            icon: 'heart-broken'
          })
        })
    },
    // 編輯
    testEdit(test) {
      test.edit = true
      test.title = test.modelTitle
      test.description = test.modelDescription
      test.reference = test.modelReference
      test.type = test.modelType
      test.scoringMethod = test.modelScoringMethod
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/tests/')
      .then(res => {
        if (res.data.success) {
          // .map 把陣列的內容重新組合，再加上 edit & model
          this.tests = res.data.result.map(test => {
            test.edit = false
            test.modelTitle = test.title
            test.modelDescription = test.description
            test.modelReference = test.reference
            test.modelType = test.type
            test.modelScoringMethod = test.scoringMethod
            test.modelQuestions = test.questions
            // test.modelOptions = test.questions.options
            return test
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
  }
}
</script>
