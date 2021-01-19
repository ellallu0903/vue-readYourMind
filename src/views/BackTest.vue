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
                        type="textarea"
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
                  <b-table-column
                    field="number"
                    label="No."
                    centered
                    width="50"
                    v-slot="props"
                  >
                    <h1>{{ props.index + 1 }}</h1>
                  </b-table-column>

                  <b-table-column
                    field="question"
                    label="題目"
                    width="400"
                    v-slot="props"
                  >
                    <h1>{{ props.row.question }}</h1>
                  </b-table-column>
                  <b-table-column
                    field="option"
                    label="選項"
                    width="400"
                    v-slot="props"
                  >
                    <div>
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

      <!-- patch_modal -->
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
          <div class="modal-card w-100">
            <header class="modal-card-head">
              <p class="modal-card-title">題目 & 選項</p>
              <button
                type="button"
                class="delete"
                @click="patchModalActive = false"
              />
            </header>
            <section class="modal-card-body px-6 py-5">
              <div class="columns is-justify-content-space-around">
                <div class="column is-4">
                  <div class="columns is-flex-direction-column">
                    <div class="column box_question_add p-5 mb-2">
                      <form
                        @submit.prevent="quesitonSubmit"
                        @reset="quesitonReset"
                      >
                        <div class="has-text-centered is-size-4 mb-3">
                          新增題目
                          <b-icon icon="text-box-plus"></b-icon>
                        </div>
                        <b-field label="題目：" class="mb-4">
                          <b-input
                            type="text"
                            icon="format-list-text"
                            v-model="aQuestion"
                            placeholder="Please enter test question . . ."
                            required
                          >
                          </b-input>
                        </b-field>
                        <b-field label="選項：" class="mb-3">
                          <b-input
                            type="text"
                            icon="text"
                            v-model="aOption"
                            placeholder="Please enter test option . . ."
                            required
                          >
                          </b-input>
                        </b-field>
                        <b-numberinput v-model="aOptionScore"></b-numberinput>
                        <div class="has-text-centered mt-5">
                          <button
                            type="submit"
                            class="button btn_enter mr-2"
                            style="width:50px"
                          >
                            送出
                          </button>
                          <button
                            type="reset"
                            class="button btn_cancel"
                            style="width:50px"
                          >
                            重置
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="column box_option_add p-5">
                      <form @submit.prevent="optionSubmit" @reset="optionReset">
                        <div class="has-text-centered is-size-4 mb-3">
                          新增選項
                          <b-icon icon="plus-box-multiple"></b-icon>
                        </div>
                        <b-field label="題目：" class="mb-4">
                          <b-select
                            placeholder="Select a character"
                            v-model="selectedOptions"
                            required
                            expanded
                          >
                            <option
                              v-for="(question, index) in testQuestions"
                              :key="index"
                              :value="question._id"
                            >
                              {{ index + 1 }}. {{ question.question }}
                            </option>
                          </b-select>
                        </b-field>
                        <b-field label="選項：" class="mb-3">
                          <b-input
                            type="text"
                            icon="text"
                            v-model="aaOption"
                            placeholder="Please enter test option . . ."
                            required
                          >
                          </b-input>
                        </b-field>
                        <b-numberinput v-model="aaOptionScore"></b-numberinput>
                        <div class="has-text-centered mt-5">
                          <button
                            type="submit"
                            class="button btn_enter mr-2"
                            style="width:50px"
                          >
                            送出
                          </button>
                          <button
                            type="reset"
                            class="button btn_cancel"
                            style="width:50px"
                          >
                            重置
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <!-- <div class="column is-1"></div> -->
                <div
                  class="column is-7 box_test_edit px-6 py-5 position_relative"
                >
                  <div class="has-text-centered is-size-4 mb-3">
                    編輯
                    <b-icon icon="file-edit-outline"></b-icon>
                  </div>
                  <ol class="list_style_num">
                    <li
                      class="p-2"
                      v-for="(question, index) in testQuestions"
                      :key="index"
                    >
                      <span v-if="question.edit">
                        <input
                          v-model="question.modelQ"
                          type="text"
                          class="w-80"
                        />
                      </span>
                      <span v-else>{{ question.question }}</span>
                      <!-- 編輯問題 -->
                      <b-button
                        class="btn_question_edit"
                        v-if="!question.edit"
                        icon-right="pencil-outline"
                        @click="questionEdit(question)"
                      ></b-button>
                      <!-- 刪除問題 -->
                      <b-button
                        class="btn_question_delete mr-5"
                        icon-right="delete"
                        v-if="!question.edit"
                        @click="questionDelete(question)"
                      ></b-button>
                      <!-- 保存 -->
                      <b-button
                        class="btn_question_edit"
                        v-if="question.edit"
                        icon-right="content-save"
                        @click="questionPatch(question)"
                      ></b-button>
                      <!-- 取消 -->
                      <b-button
                        class="btn_question_delete"
                        v-if="question.edit"
                        icon-right="close-outline"
                        @click="questionCancel(question)"
                      ></b-button>
                      <br />
                      <div
                        v-for="(option, index) in question.options"
                        :key="index"
                      >
                        ▪{{ option.option }} ❮ {{ option.optionScore }} ❯
                        <b-button
                          class="btn_question_delete"
                          icon-right="delete-outline"
                          v-if="123"
                          @click="optionDelete(option)"
                        ></b-button>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </section>
            <!-- <footer
              class="modal-card-foot is-justify-content-center is-align-items-center"
            >
              <button class="button btn_enter">保存</button>
              <button
                @click="patchModalActive = false"
                class="button btn_cancel"
              >
                取消
              </button>
            </footer> -->
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
      perPage: 7,
      // modal
      addModalActive: false,
      patchModalActive: false,
      // data
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
      activeTab: 0,
      // edit -----------
      isEdit: false,
      modelQuestion: '',
      qq: [],
      // 新增問題
      aQuestion: '',
      aOption: '',
      aOptionScore: 0,
      // 新增選項
      selectedOptions: '',
      aaOption: '',
      aaOptionScore: 0
    }
  },
  computed: {
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
    // 刪除
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
    // 新增問題 & 選項
    quesitonSubmit() {
      this.axios
        .patch(
          process.env.VUE_APP_API +
            '/tests/questions/' +
            this.tests[this.activeTab]._id,
          {
            questions: {
              question: this.aQuestion,
              options: {
                option: this.aOption,
                optionScore: this.aOptionScore
              }
            }
          }
        )
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '新增成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.question = ''
            this.option = ''
            this.optionScore = ''
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
    quesitonReset() {
      this.aQuestion = ''
      this.aOption = ''
      this.aOptionScore = ''
    },
    // 刪除問題
    questionDelete(question) {
      this.axios
        .delete(process.env.VUE_APP_API + '/tests/questions/' + question._id)
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '刪除成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.users.splice(question.index, 1)
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
    questionEdit(question) {
      console.log(question)
      for (const i in this.tests) {
        for (const j in this.tests[i].questions) {
          console.log(this.tests[i].questions[j]._id)
          if (this.tests[i].questions[j]._id === question._id) {
            this.tests[i].questions[j].edit = true
            break
          }
        }
      }
      question.edit = true
      question.question = question.modelQ
    },
    // 問題取消
    questionCancel(question) {
      question.edit = false
      question.modelQ = question.question
    },
    // 編輯問題
    questionPatch(question) {
      this.axios
        .patch(
          process.env.VUE_APP_API + '/tests/questionsEdit/' + question._id,
          {
            question: question.modelQ
          }
        )
        .then(res => {
          if (res.data.success) {
            question.edit = false
            question.question = question.modelQ
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '保存成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
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
    // 刪除選項
    optionDelete(option) {
      this.axios
        .delete(
          process.env.VUE_APP_API + '/tests/questions/options/' + option._id
        )
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '刪除成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.users.splice(option.index, 1)
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
    // 新增選項
    optionSubmit() {
      this.axios
        .patch(
          process.env.VUE_APP_API +
            '/tests/questions/options/' +
            this.selectedOptions,
          {
            option: this.aaOption,
            optionScore: this.aaOptionScore
          }
        )
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '新增成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.question = ''
            this.option = ''
            this.optionScore = ''
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
    optionReset() {
      this.aaOption = ''
      this.aaOptionScore = ''
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

            for (const question of test.questions) {
              question.edit = false
              question.modelQ = question.question
            }
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
