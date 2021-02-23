<template>
  <div id="personal" class="bg_personal one_page_min_h p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li class="is-active"><a href="#">個人資料</a></li>
      </ul>
    </nav>
    <div class="columns p-5 is-justify-content-space-around">
      <div
        id="per_content"
        class="column is-2 is-flex is-justify-content-center h-100 mb-4"
      >
        <div
          class="columns position_relative box_per_profile is-flex-direction-column p-4"
        >
          <button
            class="btn_persinal_edit ml-2"
            v-if="isEdit"
            @click="edit(users)"
          >
            <b-icon icon="cog"></b-icon>
          </button>

          <div
            class="column w-100 is-flex is-justify-content-center is-align-items-center"
          >
            <div
              class="columns is-flex-direction-column is-align-items-center is-mobile"
            >
              <div class="column image is-150x150">
                <div class="box_avator">
                  <img
                    v-if="users.avator === 'bear'"
                    class="is-rounded"
                    src="../assets/images/avator/bear.png"
                    alt="Your avator."
                  />
                  <img
                    v-else-if="users.avator === 'fox'"
                    class="is-rounded"
                    src="../assets/images/avator/fox.png"
                    alt="Your avator."
                  />
                  <img
                    v-else-if="users.avator === 'deer'"
                    class="is-rounded"
                    src="../assets/images/avator/deer.png"
                    alt="Your avator."
                  />
                  <img
                    v-else
                    class="is-rounded"
                    src="../assets/images/avator/owl.png"
                    alt="Your avator."
                  />
                </div>
              </div>
              <div v-if="!isEdit" class="column block columns is-mobile">
                <b-radio
                  v-model="model02"
                  name="avator"
                  native-value="bear"
                  class="column is-flex is-justify-content-center is-align-items-center is-flex-direction-column mx-0 px-0"
                >
                  <figure class="image is-48x48 mt-2">
                    <img
                      class="is-rounded"
                      src="../assets/images/avator/bear.png"
                    />
                  </figure>
                </b-radio>
                <b-radio
                  v-model="model02"
                  name="avator"
                  native-value="fox"
                  class="column is-flex is-justify-content-center is-align-items-center is-flex-direction-column  mx-0 px-0"
                >
                  <figure class="image is-48x48 mt-2">
                    <img
                      class="is-rounded"
                      src="../assets/images/avator/fox.png"
                    />
                  </figure>
                </b-radio>
                <b-radio
                  v-model="model02"
                  name="avator"
                  native-value="deer"
                  class="column is-flex is-justify-content-center is-align-items-center is-flex-direction-column  mx-0 px-0"
                >
                  <figure class="image is-48x48 mt-2">
                    <img
                      class="is-rounded"
                      src="../assets/images/avator/deer.png"
                    />
                  </figure>
                </b-radio>
                <b-radio
                  v-model="model02"
                  name="avator"
                  native-value="owl"
                  class="column is-flex is-justify-content-center is-align-items-center is-flex-direction-column  mx-0 px-0"
                >
                  <figure class="image is-48x48 mt-2">
                    <img
                      class="is-rounded"
                      src="../assets/images/avator/owl.png"
                    />
                  </figure>
                </b-radio>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="columns is-flex-direction-column">
              <div class="column">
                <div class="mb-2">
                  <b>暱稱</b>
                </div>
                <b-input
                  v-model="model01"
                  v-if="!isEdit"
                  :state="nameState"
                ></b-input>
                <div v-else class="is-size-5">{{ users.name }}</div>
              </div>
              <div class="column">
                <div class="mb-2"><b>信箱</b></div>
                <div class="is-size-5">{{ users.email }}</div>
              </div>
              <div class="column">
                <div class="mb-2"><b>加入日期</b></div>
                <div class="is-size-5">{{ registeredDate }}</div>
              </div>
              <div class="column is-align-self-center has-text-centered">
                <b-button
                  class="btn_enter mr-2"
                  v-if="!isEdit"
                  @click="save(users)"
                >
                  保存
                </b-button>
                <b-button
                  class="btn_cancel"
                  v-if="!isEdit"
                  @click="cancel(users)"
                >
                  取消
                </b-button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="column is-1"></div> -->
      <div id="per_result" class="column is-8 box_per_result h-100">
        <!-- tabs -->
        <b-tabs v-model="activeTab" expanded class="h-100" :animated="false">
          <b-notification class="color_primaryColor01 notification_style">
            <img
              width="45"
              src="../assets/svg/mushroom.svg"
              alt="Check it out!"
              class="mr-2"
            />
            <span class="mx-3">點選上方測驗名稱，查看結果吧～</span>
          </b-notification>
          <template v-for="(test, index) in tests" class="h-100">
            <b-tab-item :key="index" class="h-100">
              <template #header>
                <span :id="'tab' + index">
                  {{ test.title }}
                </span>
              </template>
              <div
                class="h-100 columns is-justify-content-center is-align-items-flex-start"
              >
                <div
                  class="column is-5 p-5 is-flex is-justify-content-flex-start is-align-items-flex-start"
                >
                  <div class="columns is-flex-direction-column">
                    <div class="column">
                      <div class="mb-2"><b>測驗名稱</b></div>
                      <div class="is-size-5 ">
                        {{ test.title }}
                      </div>
                    </div>
                    <div class="column">
                      <div class="mb-2"><b>測驗類別</b></div>
                      <div class="is-size-5 ">{{ test.type }}</div>
                    </div>
                    <div class="column">
                      <div class="mb-2"><b>測驗次數</b></div>
                      <div class="is-size-5 ">{{ resultData.length }}</div>
                    </div>
                    <div class="column">
                      <div class="mb-2"><b>結果說明</b></div>
                      <b-collapse
                        :open="false"
                        position="is-bottom"
                        aria-id="contentIdForA11y1"
                      >
                        <template #trigger="props">
                          <a aria-controls="contentIdForA11y1">
                            <b-icon
                              :icon="!props.open ? 'menu-down' : 'menu-up'"
                            ></b-icon>
                            {{ !props.open ? 'Open' : 'Close' }}
                          </a>
                        </template>
                        <div class="is-size-5 ">{{ test.description }}</div>
                      </b-collapse>
                    </div>
                  </div>
                </div>
                <div
                  id="chart"
                  class="column is-7 is-three-quarters p-5 is-flex is-justify-content-center is-align-content-center"
                >
                  <div
                    class="container is-flex is-justify-content-center is-align-items-flex-start"
                  >
                    <div
                      v-if="resultData.length === 0"
                      class="is-size-4 color_primaryColor01"
                    >
                      <div class="columns is-flex-direction-column">
                        <div class="column mb-3">
                          <b-button
                            tag="router-link"
                            type="btn_goToTest"
                            :to="'test/' + test._id"
                            >開始你的第一個 {{ test.title }} 測驗吧！</b-button
                          >
                        </div>
                        <div class="column has-text-centered">
                          <img
                            src="../assets/svg/startTest.svg"
                            alt="Start your first test."
                            width="200"
                          />
                        </div>
                      </div>
                    </div>
                    <div
                      v-else-if="test.scoringMethod == '加總計分'"
                      style="width:100%"
                    >
                      <highcharts :options="chartLine"></highcharts>
                    </div>
                    <div v-else style="width:100%">
                      <highcharts :options="chartRadar"></highcharts>
                    </div>
                  </div>
                </div>
              </div>
            </b-tab-item>
          </template>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script src="http://cdn.hcharts.cn/highcharts/highcharts-more.js"></script>
<script>
export default {
  data() {
    return {
      // 使用者資料編輯
      users: [],
      name: '',
      avator: '',
      registeredDate: '',
      model01: '',
      model02: '',
      isEdit: true,
      // 測驗結果
      results: [],
      resultGroup: [],
      // result_tabs
      activeTab: 0,
      // 測驗資料
      tests: []
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    },
    nameState() {
      if (this.model01.length === 0) {
        return null
      } else if (this.model01.length >= 2 && this.model01.length <= 10) {
        return true
      } else {
        return false
      }
    },
    resultData() {
      return this.results.filter(result => {
        return result.testData_id._id === this.tests[this.activeTab]._id
      })
    },
    chartLine() {
      let r = this.resultData
      const data = r.map(rd => {
        const rdObject = { name: '', y: null }
        rdObject.name = rd.date.substr(0, 10)
        rdObject.y = rd.scores
        return rdObject
      })

      const chart = {
        title: {
          text: '測驗結果 ❤'
        },
        yAxis: {
          title: {
            text: null
          }
        },
        xAxis: {
          type: 'category'
        },
        style: {
          color: '#f17c67'
        },
        series: [
          {
            name: '分數',
            type: 'line',
            data,
            color: '#f17c67',
            showInLegend: false
          }
        ],
        plotOptions: {
          line: {
            dataLabels: {
              enabled: true
            }
          }
        },
        credits: {
          enabled: false // 禁用版权信息
        }
      }
      return chart
    },
    chartRadar() {
      const r = this.resultData
      const series = r.map(rd => {
        const data = []
        for (let i = 1; i <= 4; i++) {
          if (rd.result.length > 0 && rd.result[0][i]) {
            data.push(rd.result[0][i])
          } else {
            data.push(0)
          }
        }
        const rdObject = {
          name: rd.date.substr(0, 10),
          data,
          pointPlacement: 'on'
        }

        return rdObject
      })

      const chart = {
        chart: {
          polar: true,
          type: 'line'
        },
        title: {
          text: '測驗結果 ❤'
        },
        pane: {
          size: '80%'
        },
        xAxis: {
          categories: ['A', 'B', 'C', 'D'],
          tickmarkPlacement: 'on',
          lineWidth: 0
        },
        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0
        },
        tooltip: {
          shared: true,
          pointFormat:
            '<span style="color:{series.color}">{series.name}: <b>{point.y:,.0f}</b><br/>'
        },
        legend: {
          align: 'right',
          verticalAlign: 'top',
          y: 70,
          layout: 'vertical'
        },
        colors: [
          '#f17c67',
          '#60584b',
          '#D18A40',
          '#f4c7a5',
          '#8a8174',
          '#f4c7a5',
          '#D15740',
          '#AE3620',
          '#B1366C',
          '#931B50'
        ],
        series
      }
      return chart
    }
  },
  methods: {
    // 編輯狀態 ----------------------------------------------------------
    // 取消
    cancel(users) {
      this.isEdit = true
      this.model01 = users.name
      this.model02 = users.avator
    },
    // 保存
    save(users) {
      if (this.nameState) {
        this.axios
          .patch(process.env.VUE_APP_API + '/users/' + this.user.id, {
            name: this.model01,
            avator: this.model02
          })
          .then(res => {
            if (res.data.success) {
              this.isEdit = true
              users.name = this.model01
              users.avator = this.model02
              this.$store.state.user.avator = this.model02
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
      } else {
        this.$buefy.dialog.alert({
          title: 'Error!',
          message: '暱稱必須介於 2 至 10 字元。',
          type: 'is-danger',
          hasIcon: true,
          icon: 'heart-broken'
        })
      }
    },
    // 編輯
    edit(users) {
      this.isEdit = false
      users.name = this.model01
      users.avator = this.model02
    }
  },
  async mounted() {
    try {
      // 使用者資料
      let res = await this.axios.get(
        process.env.VUE_APP_API + '/users/' + this.user.id
      )
      if (res.data.success) {
        this.users = res.data.result
        this.model01 = res.data.result.name
        this.model02 = res.data.result.avator
        this.registeredDate = this.users.regDate.substr(0, 10)
      } else {
        this.$swal({
          icon: 'error',
          title: '發生錯誤',
          text: res.data.message
        })
      }
      // 使用者測驗結果
      res = await this.axios.get(
        process.env.VUE_APP_API + '/users/result/' + this.user.id
      )
      if (res.data.success) {
        this.results = res.data.result.pesonalTestResults
      } else {
        this.$swal({
          icon: 'error',
          title: '發生錯誤',
          text: res.data.message
        })
      }

      // 所有測驗
      res = await this.axios.get(process.env.VUE_APP_API + '/tests/')
      if (res.data.success) {
        this.tests = res.data.result
        if (this.$route.query.test) {
          const idx = this.tests.findIndex(
            test => test._id === this.$route.query.test
          )
          if (idx > -1) {
            setTimeout(() => {
              document.querySelector(`#tab` + idx).parentElement.click()
            }, 10)
          }
        }
      } else {
        this.$swal({
          icon: 'error',
          title: '發生錯誤',
          text: res.data.message
        })
      }
    } catch (err) {
      console.log(err)
      this.$buefy.dialog.alert({
        title: 'Error!',
        message: err.response.data.message,
        type: 'is-danger',
        hasIcon: true,
        icon: 'heart-broken'
      })
    }
    // for (let i = 0; i < this.resultData.length; i++) {

    // }

    // this.chartData.rows.push({
    //   // date: this.resultDate[i].date,
    //   // scores: this.resultDate[i].scores
    //   date: '2020-02-0' + 1,
    //   scores: 5
    // })
  }
}
</script>
