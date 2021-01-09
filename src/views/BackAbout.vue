<template>
  <div class="back_content">
    <div id="backAbout" class="p-5">
      <nav class="breadcrumb has-bullet-separator">
        <ul>
          <li><a href="#/">首頁</a></li>
          <li><a href="#/backStage">前台內容管理</a></li>
          <li class="is-active"><a href="#">使用說明</a></li>
        </ul>
      </nav>
      <b-table :data="abouts" striped hoverable :mobile-cards="hasMobileCards">
        <b-table-column
          field="step"
          label="No."
          centered
          width="100"
          v-slot="props"
        >
          <h1>{{ props.index + 1 }}</h1>
        </b-table-column>

        <b-table-column field="title" label="標題" width="200" v-slot="props">
          <b-input v-model="props.row.model01" v-if="props.row.edit"></b-input>
          <h1 v-else>{{ props.row.title }}</h1>
        </b-table-column>
        <b-table-column field="content" label="內容" width="800" v-slot="props">
          <b-input v-model="props.row.model02" v-if="props.row.edit"></b-input>
          <div v-else>{{ props.row.content }}</div>
        </b-table-column>
        <b-table-column field="edit" label="編輯" width="150" v-slot="props">
          <div>
            <button
              class="btn_enter btn_back_size mr-2"
              v-if="!props.row.edit"
              @click="edit(props)"
            >
              <b-icon icon="pencil-outline"></b-icon>
            </button>
            <button
              class="btn_cancel btn_back_size"
              v-if="!props.row.edit"
              @click="del(props, props.index)"
            >
              <b-icon icon="trash-can-outline"></b-icon>
            </button>
          </div>
          <div>
            <button
              class="btn_enter btn_back_size mr-2"
              v-if="props.row.edit"
              @click="save(props)"
            >
              <b-icon icon="content-save"></b-icon>
            </button>
            <button
              class="btn_cancel btn_back_size"
              v-if="props.row.edit"
              @click="cancel(props)"
            >
              <b-icon icon="close-outline"></b-icon>
            </button>
          </div>
        </b-table-column>
      </b-table>
      <hr />
      <form @submit.prevent="onSubmit" @reset="onReset">
        <div class="columns">
          <div
            class="column back_pre_box is-flex is-justify-content-center is-flex-direction-column m-1"
          >
            <div class="is-flex is-flex-direction-column">
              <div class="is-size-4 has-text-centered">預覽</div>
              <section class="mt-5 has-text-centered">
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
                  <b-step-item
                    v-for="(about, index) of abouts"
                    :key="index"
                    :step="index + 1"
                    :label="about.title"
                    :clickable="isStepsClickable"
                    class="p-4"
                  >
                    <h1 class="is-size-4 has-text-weight-semibold">
                      {{ about.title }}
                    </h1>
                    <div class="backAbout_pre_box_h py-2 px-5">
                      {{ about.content }}
                    </div>
                  </b-step-item>

                  <template
                    id="back_step"
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
          <div class="column back_add_box m-1">
            <div
              class="w-100 is-flex is-justify-content-center is-align-items-center is-flex-direction-column"
            >
              <div class="is-size-4 has-text-centered">新增</div>
              <b-field id="back_add_title" label="標題" class="w-75">
                <b-input
                  v-model="title"
                  type="text"
                  required
                  class=""
                  validation-message="請輸入標題。"
                  placeholder="Please enter title . . ."
                >
                </b-input>
              </b-field>
              <b-field id="back_add_content" label="內容" class="w-75">
                <b-input
                  type="textarea"
                  v-model="content"
                  minlength="1"
                  maxlength="200"
                  required
                  validation-message="請輸入內容。"
                  placeholder="Please enter content . . ."
                >
                </b-input>
              </b-field>
              <div class="buttons">
                <button type="submit" class="button btn_enter mr-2">
                  送出
                </button>
                <button type="reset" class="button btn_cancel">重置</button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // about_table
      hasMobileCards: true,
      title: '',
      content: '',
      abouts: [],
      // setting-step
      activeStep: 0,
      isStepsClickable: true,
      customNavigation: false,
      isProfileSuccess: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
      mobileMode: 'minimalist'
    }
  },
  methods: {
    // 提交表單，post 到後台資料庫
    onSubmit() {
      this.axios
        .post(process.env.VUE_APP_API + '/abouts/', this.$data)
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
            this.content = ''
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
      this.content = ''
    },
    // 編輯狀態 ----------------------------------------------------------
    // 取消
    cancel(props) {
      props.row.edit = false
      props.row.model01 = props.row.title
      props.row.model02 = props.row.content
    },
    // 保存
    save(props) {
      this.axios
        .patch(process.env.VUE_APP_API + '/abouts/' + props.row._id, {
          title: props.row.model01,
          content: props.row.model02
        })
        .then(res => {
          if (res.data.success) {
            props.row.edit = false
            props.row.title = props.row.model01
            props.row.content = props.row.model02
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '保存成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.abouts[props.index].title = props.row.model01
            this.abouts[props.index].content = props.row.model02
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
    edit(props) {
      props.row.edit = true
      props.row.title = props.row.model01
      props.row.content = props.row.model02
    },
    del(props) {
      this.axios
        .delete(process.env.VUE_APP_API + '/abouts/' + props.row._id)
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
            this.abouts.splice(props.index, 1)
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
  }
}
</script>
