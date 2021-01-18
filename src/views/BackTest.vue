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
        <b-tabs expanded class="h-100" v-model="activeTab">
          <template v-for="test in tests" class="h-100">
            <b-tab-item :key="test._id" class="h-100">
              <template #header>
                <span>
                  {{ test.title }}
                </span>
              </template>
              <div class="has-text-left position_relative mb-3">
                <b-button
                  class="btn_test_delete"
                  @click="testDelete(test)"
                  icon-right="trash-can-outline"
                  size="is-medium"
                  v-if="!test.edit"
                ></b-button>
                <b-button
                  class="btn_backTest_edit"
                  icon-right="cog-outline"
                  size="is-medium"
                  v-if="!test.edit"
                  @click="testEdit(test)"
                >
                </b-button>
                <div class="columns mb-0">
                  <div class="column is-3">
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
                      <b>分數說明：</b>
                      <b-input
                        type="textarea"
                        v-model="test.modelDescription"
                        v-if="test.edit"
                      ></b-input>
                      <div v-else>{{ test.description }}</div>
                    </div>
                  </div>
                </div>
                <div class="has-text-centered">
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
                  :data="testQuestions"
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
                    width="400"
                    v-slot="props"
                  >
                    <b-input
                      v-model="props.row.modelQuestion"
                      v-if="props.row.edit"
                    ></b-input>
                    <h1 v-else>{{ props.row.question }}</h1>
                  </b-table-column>
                  <b-table-column
                    field="option"
                    label="選項"
                    width="400"
                    v-slot="props"
                  >
                    <b-input
                      v-model="props.row.model02"
                      v-if="props.row.edit"
                    ></b-input>
                    <div v-else>
                      <ol class="list_style">
                        <li
                          v-for="(option, index) in props.row.options"
                          :key="index"
                        >
                          {{ option.option }} ❮ {{ option.optionScore }} ❯
                        </li>
                      </ol>
                    </div>
                  </b-table-column>
                  <!-- <b-table-column
                    field="edit"
                    label="編輯"
                    width="150"
                    v-slot="props"
                  >
                    <div>
                      <b-tooltip label="編輯題目" type="is-dark">
                        <button
                          class="btn_cancel btn_back_size mr-2"
                          v-if="!props.row.edit"
                          @click="questionEdit(props)"
                        >
                          <b-icon icon="pencil-outline"></b-icon>
                        </button>
                      </b-tooltip>

                      <b-tooltip label="新增選項" type="is-dark">
                        <button
                          class="btn_cancel btn_back_size mr-2"
                          v-if="!props.row.edit"
                          @click="456"
                        >
                          <b-icon icon="expand-all"></b-icon>
                        </button>
                      </b-tooltip>

                      <b-tooltip label="刪除題目" type="is-dark">
                        <button
                          class="btn_trash btn_back_size"
                          v-if="!props.row.edit"
                          @click="del(props, props.index)"
                        >
                          <b-icon icon="trash-can-outline"></b-icon>
                        </button>
                      </b-tooltip>
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
                        @click="questionCancel(props)"
                      >
                        <b-icon icon="close-outline"></b-icon>
                      </button>
                    </div>
                  </b-table-column> -->
                </b-table>
              </div>
            </b-tab-item>
          </template>
        </b-tabs>
      </section>
      <!-- add_modal -->
      <b-button
        type="btn_member_add is-flex is-justify-content-center is-align-items-center"
        @click="addModalActive = true"
      >
        <b-icon
          class="animate__animated animate__pulse animate__infinite animate__slow"
          icon="text-box-plus-outline"
        >
        </b-icon>
      </b-button>

      <b-modal :active.sync="addModalActive">
        <form
          @submit.prevent="onSubmit"
          @reset="onReset"
          class="is-flex is-justify-content-center is-align-items-center"
        >
          <div class="modal-card add_modal_size">
            <header class="modal-card-head">
              <p class="modal-card-title">Create Test</p>
              <button
                type="button"
                class="delete"
                @click="addModalActive = false"
              />
            </header>
            <section class="modal-card-body px-6 py-5">
              <b-field label="測驗名稱：">
                <b-input
                  type="text"
                  icon="script-text-outline"
                  v-model="title"
                  placeholder="Please enter test title . . ."
                  required
                >
                </b-input>
              </b-field>

              <b-field label="類別：">
                <b-select
                  required
                  v-model="type"
                  placeholder="Select a test type"
                >
                  <option value="智力測驗">智力測驗</option>
                  <option value="成就⁄能力測驗">成就⁄能力測驗</option>
                  <option value="性向測驗">性向測驗</option>
                  <option value="人格測驗">人格測驗</option>
                  <option value="職業測驗">職業測驗</option>
                  <option value="其他">其他</option>
                </b-select>
              </b-field>

              <b-field label="計分方式：">
                <b-radio
                  v-model="scoringMethod"
                  name="addTestScoringMethod"
                  native-value="加總計分"
                >
                  加總計分
                </b-radio>
                <b-radio
                  v-model="scoringMethod"
                  name="addTestScoringMethod"
                  native-value="取最多選項"
                >
                  取最多選項者
                </b-radio>
              </b-field>

              <b-field label="文獻⁄來源：">
                <b-input
                  type="textarea"
                  v-model="reference"
                  placeholder="Please enter test reference . . ."
                  required
                >
                </b-input>
              </b-field>

              <b-field label="分數說明：">
                <b-input
                  type="textarea"
                  v-model="description"
                  placeholder="Please enter test description . . ."
                  required
                >
                </b-input>
              </b-field>

              <b-field label="題目：">
                <b-input
                  type="text"
                  icon="format-list-text"
                  v-model="question"
                  placeholder="Please enter test question . . ."
                  required
                >
                </b-input>
              </b-field>

              <b-field label="選項：">
                <b-input
                  type="text"
                  icon="text"
                  v-model="option"
                  placeholder="Please enter test option . . ."
                  required
                >
                </b-input>
              </b-field>
              <b-numberinput v-model="optionScore"></b-numberinput>
            </section>
            <footer
              class="modal-card-foot is-justify-content-center is-align-items-center"
            >
              <button type="submit" class="button btn_enter">建立</button>
              <button type="reset" class="button btn_cancel">重置</button>
            </footer>
          </div>
        </form>
      </b-modal>

      <b-button
        type="btn_test_patch is-flex is-justify-content-center is-align-items-center"
        @click="patchModalActive = true"
      >
        <b-icon
          class="animate__animated animate__pulse animate__infinite animate__slow"
          icon="playlist-edit"
        >
        </b-icon>
      </b-button>

      <b-modal :active.sync="patchModalActive">
        <div class="is-flex is-justify-content-center is-align-items-center">
          <div class="modal-card add_modal_size">
            <header class="modal-card-head">
              <p class="modal-card-title">問題與選項</p>
              <button
                type="button"
                class="delete"
                @click="patchModalActive = false"
              />
            </header>
            <section class="modal-card-body px-6 py-5">
              <ol class="list_style">
                <li
                  class="p-2"
                  v-for="(question, index) in testQuestions"
                  :key="index"
                >
                  {{ question.question }}

                  <b-button
                    class="btn_question_edit"
                    v-if="123"
                    icon-right="pencil-outline"
                    @click="questionEdit()"
                  ></b-button>
                  <b-button
                    class="btn_question_delete"
                    icon-right="delete"
                    v-if="123"
                    @click="questionEdit()"
                  ></b-button>
                </li>
              </ol>
            </section>
            <footer
              class="modal-card-foot is-justify-content-center is-align-items-center"
            >
              <button class="button btn_enter">保存</button>
              <button class="button btn_cancel">取消</button>
            </footer>
          </div>
        </div>
      </b-modal>
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
      // modal
      addModalActive: false,
      patchModalActive: false,
      // data
      // testId: '5ff9be8feaeb15ce7278b408',
      testId: '',
      title: '',
      type: '',
      scoringMethod: '加總計分',
      reference: '',
      description: '',
      question: '',
      questions: '',
      option: '',
      optionScore: 0,
      tests: [],
      // tabs
      activeTab: 0
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
    testQuestions() {
      return this.tests[this.activeTab].questions
    }
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
            this.scoringMethod = ''
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
      this.scoringMethod = ''
      this.reference = ''
      this.description = ''
      this.question = ''
      this.option = ''
      this.optionScore = 0
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
    },
    testDelete(test) {
      this.axios
        .delete(process.env.VUE_APP_API + '/tests/' + test._id)
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '刪除成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            // props.splice(props.index, 1)
            this.tests.splice(this.activeTab, 1)
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
          console.log(err)
          this.$buefy.dialog.alert({
            title: 'Error!',
            message: err.response.data.message,
            type: 'is-danger',
            hasIcon: true,
            icon: 'heart-circle'
          })
        })
    },
    // 問題編輯
    questionEdit(props) {
      props.row.edit = true
      props.row.questions = props.row.modelQuestion
    },
    // 問題取消
    questionCancel(props) {
      props.row.edit = false
      props.row.modelQuestion = props.row.questions
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

    // this.axios
    //   .get(process.env.VUE_APP_API + '/tests/' + this.testId)
    //   .then(res => {
    //     if (res.data.success) {
    //       // this.testQuestions = res.data.result.questions
    //       // .map 把陣列的內容重新組合，再加上 edit & model
    //       this.testQuestions = res.data.result.questions.map(tq => {
    //         tq.edit = false
    //         tq.modelQuestion = tq.question
    //         // test.modelOptions = test.questions.options
    //         return tq
    //       })
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
