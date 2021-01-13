<template>
  <div class="back_content">
    <div id="backKnowledge" class="p-5">
      <nav class="breadcrumb has-bullet-separator">
        <ul>
          <li><a href="#/">首頁</a></li>
          <li><a href="#/backStage">前台內容管理</a></li>
          <li class="is-active"><a href="#">小知識</a></li>
        </ul>
      </nav>
      <b-table
        :data="knowledges"
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
          width="100"
          v-slot="props"
        >
          <h1>{{ props.index + 1 }}</h1>
        </b-table-column>

        <b-table-column field="title" label="標題" width="300" v-slot="props">
          <b-input v-model="props.row.model01" v-if="props.row.edit"></b-input>
          <h1 v-else>{{ props.row.title }}</h1>
        </b-table-column>
        <b-table-column field="content" label="內容" width="800" v-slot="props">
          <b-input v-model="props.row.model02" v-if="props.row.edit"></b-input>
          <div v-else>{{ props.row.content }}</div>
        </b-table-column>
        <b-table-column field="edit" label="編輯" width="200" v-slot="props">
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
      <!-- knowledge_add_modal -->
      <b-button
        type="btn_Knowledge_add is-flex is-justify-content-center is-align-items-center"
        @click="addModalActive = true"
      >
        <b-icon
          class="animate__animated animate__pulse animate__infinite animate__slow"
          icon="comment-plus"
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
              <p class="modal-card-title">新增</p>
              <button
                type="button"
                class="delete"
                @click="addModalActive = false"
              />
            </header>
            <section class="modal-card-body px-6 py-5">
              <b-field label="標題：">
                <b-input
                  type="text"
                  v-model="title"
                  placeholder="Please enter title . . ."
                  required
                  validation-message="請輸入標題。"
                >
                </b-input>
              </b-field>

              <b-field label="內容：" class="mb-0">
                <b-input
                  type="textarea"
                  v-model="content"
                  placeholder="Please enter content . . ."
                  required
                  minlength="1"
                  maxlength="200"
                  validation-message="請輸入內容。"
                >
                </b-input>
              </b-field>
            </section>
            <footer
              class="modal-card-foot is-justify-content-center is-align-items-center"
            >
              <button type="submit" class="button btn_enter">新增</button>
              <button type="reset" class="button btn_cancel">重置</button>
            </footer>
          </div>
        </form>
      </b-modal>

      <!-- knowledge_preview -->
      <b-button
        type="btn_Knowledge_pre is-flex is-justify-content-center is-align-items-center"
        @click="preModalActive = true"
      >
        <b-icon
          class="animate__animated animate__pulse animate__infinite animate__slow"
          icon="comment-eye-outline"
        >
        </b-icon>
      </b-button>
      <b-modal :active.sync="preModalActive">
        <div class="is-flex is-justify-content-center is-align-items-center">
          <div class="modal-card add_modal_size ">
            <header class="modal-card-head">
              <p class="modal-card-title">預覽</p>
              <button
                type="button"
                class="delete"
                @click="preModalActive = false"
              />
            </header>
            <section class="modal-card-body px-6 py-5">
              <b-collapse
                class="card"
                animation="slide"
                v-for="(knowledge, index) of knowledges"
                :key="index"
                :open="isOpen == index"
                @open="isOpen = index"
              >
                <div
                  slot="trigger"
                  slot-scope="props"
                  class="card-header"
                  role="button"
                >
                  <p class="card-header-title">
                    {{ knowledge.title }}
                  </p>
                  <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                  </a>
                </div>
                <div class="card-content">
                  <div class="content">
                    {{ knowledge.content }}
                  </div>
                </div>
              </b-collapse>
            </section>
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
      // knowledge_table
      hasMobileCards: true,
      title: '',
      content: '',
      knowledges: [],
      // collapse
      isOpen: -1,
      // add_modal & pre_modal
      addModalActive: false,
      preModalActive: false,
      // page
      isPaginated: true,
      isPaginationSimple: false,
      isPaginationRounded: false,
      paginationPosition: 'bottom',
      currentPage: 1,
      perPage: 10
    }
  },
  methods: {
    // 提交表單，post 到後台資料庫
    onSubmit() {
      this.axios
        .post(process.env.VUE_APP_API + '/knowledges/', this.$data)
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '新增成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            // this.knowledges.push(res.data.result)
            this.title = ''
            this.content = ''
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
        .patch(process.env.VUE_APP_API + '/knowledges/' + props.row._id, {
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
        .delete(process.env.VUE_APP_API + '/knowledges/' + props.row._id)
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
            this.knowledges.splice(props.index, 1)
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
      .get(process.env.VUE_APP_API + '/knowledges/')
      .then(res => {
        if (res.data.success) {
          // .map 把陣列的內容重新組合，再加上 edit & model
          this.knowledges = res.data.result.map(knowledge => {
            knowledge.edit = false
            knowledge.model01 = knowledge.title
            knowledge.model02 = knowledge.content
            return knowledge
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
