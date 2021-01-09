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
        class="column is-2 is-flex is-justify-content-center"
      >
        <div class="columns box_per_profile is-flex-direction-column p-6">
          <div
            class="column w-100 is-flex is-justify-content-center is-align-items-center"
          >
            <div class="image is-150x150">
              <img
                v-if="user.avator === 'bear'"
                class="is-rounded"
                src="../assets/images/avator/bear.png"
                alt="Your avator."
              />
              <img
                v-else-if="user.avator === 'fox'"
                class="is-rounded"
                src="../assets/images/avator/fox.png"
                alt="Your avator."
              />
              <img
                v-else-if="user.avator === 'deer'"
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
          <div class="column">
            <div class="columns is-flex-direction-column">
              <div class="column">
                <div class="mb-2"><b>暱稱</b></div>
                {{ users.name }}
                <!-- <button
                class="btn_per_edit ml-2"
                v-if="!users.edit"
                @click="edit(users)"
              >
                <b-icon icon="pencil-outline"></b-icon>
              </button>
              <button
                class="btn_enter btn_back_size mr-2"
                v-if="users.edit"
                @click="save(user)"
              >
                <b-icon icon="content-save"></b-icon>
              </button>
              <button
                class="btn_cancel btn_back_size"
                v-if="users.edit"
                @click="cancel(user)"
              >
                <b-icon icon="close-outline"></b-icon>
              </button> -->
              </div>
              <div class="column">
                <div class="mb-2"><b>信箱</b></div>
                {{ users.email }}
              </div>
              <div class="column">
                <div class="mb-2"><b>密碼</b></div>
                ******
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-1"></div>
      <div id="per_result" class="column is-8 box_per_result">
        <div class="is-size-3 has-text-centered mb-3">測驗結果</div>
        <div class="columns">
          <div
            class="column p-5 is-flex is-justify-content-center is-align-items-center"
          >
            <div class="columns is-flex-direction-column">
              <div class="column">
                <div class="mb-2"><b>測驗類別</b></div>
                ABCDEFGHJKLMN
              </div>
              <div class="column">
                <div class="mb-2"><b>測驗名稱</b></div>
                ABCDEFGHJKLMN
              </div>
              <div class="column">
                <div class="mb-2"><b>測驗次數</b></div>
                (資料有幾筆 .length)
              </div>
            </div>
          </div>
          <div
            id="chart"
            class="column is-three-quarters p-5 is-flex is-justify-content-center is-align-content-center"
          >
            作臺性當公一新在之後大強親是童與上我遠話積的一！事不活因還動所傳國更的是座個：兒然是著資易格個這對就區明道後；麼一完注氣好少館續話？營字一人仍童大得我入和先不內、容司造起集遊獎味，例問坐見場進能領與三主政眾是只外人除英生和生大一發可容而三一是？陸用人。面實千人裡市害的於使成任。再們越這等清熱、始少角現車經本了北容酒同？己多象。神較臺寫身表的定代響者近可它弟像小。立色天在共時合制得面要了是王縣大月下聲入現格源遠前玩以英對文車同後常都位處是可期；地法前進信、接論提致起臉生鄉對你獎知的四由……工功角著本，利情此路眾。上來且根，自的樹何喜的變道一已很起利問方！面實千人裡市害的於使成任。再們越這等清熱、始少角現車經本了北容酒同？己多象。神較臺寫身表的定代響者近可它弟像小。立色天在共時合制得面要了是王縣大月下聲入現格源遠前玩以英對文車同後常都位處是可期；地法前進信、接論提致起臉生鄉對你獎知的四由……工功角著本，利情此路眾。上來且根，自的樹何喜的變道一已很起利問方！面實千人裡市害的於使成任。再們越這等清熱、始少角現車經本了北容酒同？己多象。神較臺寫身表的定代響者近可它弟像小。立色天在共時合制得面要了是王縣大月下聲入現格源遠前玩以英對文車同後常都位處是可期；地法前進信、接論提致起臉生鄉對你獎知的四由……工功角著本，利情此路眾。上來且根，自的樹何喜的變道一已很起利問方！面實千人裡市害的於使成任。再們越這等清熱、始少角現車經本了北容酒同？己多象。神較臺寫身表的定代響者近可它弟像小。立色天在共時合制得面要了是王縣大月下聲入現格源遠前玩以英對文車同後常都位處是可期；地法前進信、接論提致起臉生鄉對你獎知的四由……工功角著本，利情此路眾。上來且根，自的樹何喜的變道一已很起利問方！
          </div>
        </div>
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
      password: ''
    }
  },
  computed: {
    user() {
      return this.$store.state.user
    }
  },
  methods: {
    // 編輯狀態 ----------------------------------------------------------
    // 取消
    cancel(user) {
      user.edit = false
      user.model01 = user.name
      user.model02 = user.password
    },
    // 保存
    save(user) {
      this.axios
        .patch(process.env.VUE_APP_API + '/users/' + this.user.id, {
          name: user.model01,
          password: user.model02
        })
        .then(res => {
          if (res.data.success) {
            user.edit = false
            user.name = user.model01
            user.password = user.model02
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
    edit(user) {
      user.edit = true
      user.name = user.model01
      user.password = user.model02
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/users/' + this.user.id)
      .then(res => {
        if (res.data.success) {
          this.users = res.data.result
        } else {
          this.$swal({
            icon: 'error',
            title: '發生錯誤',
            text: res.data.message
          })
        }
      })
      .catch(err => {
        console.log(err)
        // this.$buefy.dialog.alert({
        //   title: 'Error!',
        //   message: err.response.data.message,
        //   type: 'is-danger',
        //   hasIcon: true,
        //   icon: 'heart-broken'
        // })
      })
  }
}
</script>
