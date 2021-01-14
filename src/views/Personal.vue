<template>
  <div id="personal" class="bg_personal one_page_min_h p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li class="is-active"><a href="#">個人資料</a></li>
      </ul>
    </nav>
    <div class="columns p-5 is-justify-content-center">
      <div
        id="per_content"
        class="column is-2 is-flex is-justify-content-center h-100"
      >
        <div
          class="columns position_relative box_per_profile is-flex-direction-column p-6"
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
      <div class="column is-1"></div>
      <div id="per_result" class="column is-8 box_per_result h-100">
        <!-- tabs -->
        <b-tabs v-model="activeTab" expanded class="h-100">
          <template v-for="tab in tabs" class="h-100">
            <b-tab-item :key="tab._id" class="h-100">
              <template #header>
                <span>
                  {{ tab.label }} <b-tag rounded> {{ tab.count }} </b-tag>
                </span>
              </template>
              <div
                class="h-100 columns is-justify-content-center is-align-items-center"
              >
                <div
                  class="column p-5 is-flex is-justify-content-center is-align-items-center"
                >
                  <div class="columns is-flex-direction-column">
                    <div class="column">
                      <div class="mb-2"><b>測驗類別</b></div>
                      <div class="is-size-5 ">
                        {{ tab.content }}
                      </div>
                    </div>
                    <div class="column">
                      <div class="mb-2"><b>測驗名稱</b></div>
                      <div class="is-size-5 ">ABCDEFGHJKL</div>
                    </div>
                    <div class="column">
                      <div class="mb-2"><b>測驗次數</b></div>
                      <div class="is-size-5 ">(此測驗資料數 = 測驗數)</div>
                    </div>
                  </div>
                </div>
                <div
                  id="chart"
                  class="column is-three-quarters p-5 is-flex is-justify-content-center is-align-content-center"
                >
                  作臺性當公一新在之後大強親是童與上我遠話積的一！事不活因還動所傳國更的是座個：兒然是著資易格個這對就區明道後；麼一完注氣好少館續話？營字一人仍童大得我入和先不內、容司造起集遊獎味，例問坐見場進能領與三主政眾是只外人除英生和生大一發可容而三一是？陸用人。面實千人裡市害的於使成任。作臺性當公一新在之後大強親是童與上我遠話積的一！事不活因還動所傳國更的是座個：兒然是著資易格個這對就區明道後；麼一完注氣好少館續話？營字一人仍童大得我入和先不內、容司造起集遊獎味，例問坐見場進能領與三主政眾是只外人除英生和生大一發可容而三一是？陸用人。面實千人裡市害的於使成任。作臺性當公一新在之後大強親是童與上我遠話積的一！事不活因還動所傳國更的是座個：兒然是著資易格個這對就區明道後；麼一完注氣好少館續話？營字一人仍童大得我入和先不內、容司造起集遊獎味，例問坐見場進能領與三主政眾是只外人除英生和生大一發可容而三一是？陸用人。面實千人裡市害的於使成任。作臺性當公一新在之後大強親是童與上我遠話積的一！事不活因還動所傳國更的是座個：兒然是著資易格個這對就區明道後；麼一完注氣好少館續話？營字一人仍童大得我入和先不內、容司造起集遊獎味，例問坐見場進能領與三主政眾是只外人除英生和生大一發可容而三一是？陸用人。面實千人裡市害的於使成任。作臺性當公一新在之後大強親是童與上我遠話積的一！事不活因還動所傳國更的是座個：兒然是著資易格個這對就區明道後；麼一完注氣好少館續話？營字一人仍童大得我入和先不內、容司造起集遊獎味，例問坐見場進能領與三主政眾是只外人除英生和生大一發可容而三一是？陸用人。面實千人裡市害的於使成任。作臺性當公一新在之後大強親是童與上我遠話積的一！事不活因還動所傳國更的是座個：兒然是著資易格個這對就區明道後；麼一完注氣好少館續話？營字一人仍童大得我入和先不內、容司造起集遊獎味，例問坐見場進能領與三主政眾是只外人除英生和生大一發可容而三一是？陸用人。面實千人裡市害的於使成任。作臺性當公一新在之後大強親是童與上我遠話積的一！事不活因還動所傳國更的是座個：兒然是著資易格個這對就區明道後；麼一完注氣好少館續話？營字一人仍童大得我入和先不內、容司造起集遊獎味，例問坐見場進能領與三主政眾是只外人除英生和生大一發可容而三一是？陸用人。面實千人裡市害的於使成任。
                </div>
              </div>
            </b-tab-item>
          </template>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      name: '',
      avator: '',
      registeredDate: '',
      model01: '',
      model02: '',
      isEdit: true,
      // result_tabs
      activeTab: 0,
      tabs: [
        {
          _id: '1',
          label: '123',
          content: '123',
          count: 3
        },
        {
          _id: '2',
          label: '456',
          content: '456789',
          count: 0
        },
        {
          _id: '3',
          label: 'qwer',
          content: 'qwer',
          count: 10
        }
      ]
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
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/users/' + this.user.id)
      .then(res => {
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
