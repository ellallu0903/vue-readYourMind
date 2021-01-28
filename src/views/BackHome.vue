<template>
  <div id="backHome" class="p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li><a href="#/backStage/home">後台管理</a></li>
        <li class="is-active"><a href="#">後台數據</a></li>
      </ul>
    </nav>
    <div id="backData" class="columns is-flex-direction-column">
      <div class="column">
        <b-notification :closable="false" class="backData">
          <div class="is-flex is-justify-content-center is-align-items-center">
            <b-icon icon="account" size="is-large" class="mr-1"></b-icon
            >會員數量：
          </div>
          <div class="p-3 has-text-centered is-size-2 color_primaryColor01">
            {{ members.length }}
          </div>
        </b-notification>
      </div>

      <div class="column">
        <b-notification :closable="false" class="backData">
          <div class="is-flex is-justify-content-center is-align-items-center">
            <b-icon icon="notebook" size="is-large" class="mr-1"></b-icon
            >測驗數量：
          </div>
          <div class="p-3 has-text-centered is-size-2 color_primaryColor01">
            {{ tests.length }}
          </div>
        </b-notification>
      </div>
      <div class="column">
        <b-notification :closable="false" class="backData">
          <div class="is-flex is-justify-content-center is-align-items-center">
            <b-icon icon="lightbulb" size="is-large" class="mr-1"></b-icon
            >小知識數量：
          </div>
          <div class="p-3 has-text-centered is-size-2 color_primaryColor01">
            {{ knowledges.length }}
          </div>
        </b-notification>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      members: [],
      tests: [],
      knowledges: [],
      openTest: false,
      openKnowledge: false
    }
  },
  mounted() {
    this.axios
      .get(process.env.VUE_APP_API + '/knowledges/')
      .then(res => {
        if (res.data.success) {
          this.knowledges = res.data.result
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

    this.axios
      .get(process.env.VUE_APP_API + '/users/')
      .then(res => {
        if (res.data.success) {
          this.members = res.data.result
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

    this.axios
      .get(process.env.VUE_APP_API + '/tests/')
      .then(res => {
        if (res.data.success) {
          this.tests = res.data.result
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
