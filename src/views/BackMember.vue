<template>
  <div class="back_content">
    <div id="backMember" class="p-5">
      <nav class="breadcrumb has-bullet-separator">
        <ul>
          <li><a href="#/">首頁</a></li>
          <li><a href="#/backStage">後台管理</a></li>
          <li class="is-active"><a href="#">會員管理</a></li>
        </ul>
      </nav>
      <b-table
        :data="users"
        :paginated="isPaginated"
        :per-page="perPage"
        :current-page.sync="currentPage"
        :pagination-simple="isPaginationSimple"
        :pagination-position="paginationPosition"
        :pagination-rounded="isPaginationRounded"
        striped
        hoverable
        :mobile-cards="hasMobileCards"
        :default-sort-direction="defaultSortDirection"
        :sort-icon="sortIcon"
        :sort-icon-size="sortIconSize"
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

        <b-table-column
          sortable
          searchable
          field="email"
          label="信箱"
          width="250"
          v-slot="props"
        >
          <b-input v-model="props.row.model01" v-if="props.row.edit"></b-input>
          <h1 v-else>{{ props.row.email }}</h1>
        </b-table-column>
        <b-table-column
          sortable
          searchable
          field="name"
          label="暱稱"
          width="200"
          v-slot="props"
        >
          <b-input v-model="props.row.model02" v-if="props.row.edit"></b-input>
          <div v-else>{{ props.row.name }}</div>
        </b-table-column>
        <b-table-column
          sortable
          searchable
          field="avator"
          label="頭像"
          width="150"
          v-slot="props"
        >
          <b-radio
            v-model="props.row.model03"
            v-if="props.row.edit"
            name="avator"
            native-value="bear"
          >
            Bear
          </b-radio>
          <b-radio
            v-model="props.row.model03"
            v-if="props.row.edit"
            name="avator"
            native-value="fox"
          >
            Fox
          </b-radio>
          <b-radio
            v-model="props.row.model03"
            v-if="props.row.edit"
            name="avator"
            native-value="deer"
          >
            Deer
          </b-radio>
          <b-radio
            v-model="props.row.model03"
            v-if="props.row.edit"
            name="avator"
            native-value="owl"
          >
            Owl
          </b-radio>
          <div v-else>{{ props.row.avator }}</div>
        </b-table-column>
        <b-table-column
          sortable
          searchable
          field="authority"
          label="權限"
          width="150"
          v-slot="props"
        >
          <b-radio
            v-model="props.row.model04"
            v-if="props.row.edit"
            name="authority"
            native-value="管理者"
          >
            管理者
          </b-radio>
          <b-radio
            v-model="props.row.model04"
            v-if="props.row.edit"
            name="authority"
            native-value="使用者"
          >
            使用者
          </b-radio>
          <div v-else>{{ props.row.authority }}</div>
        </b-table-column>
        <b-table-column field="edit" label="編輯" width="150" v-slot="props">
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

      <!-- add_modal -->
      <b-button
        type="btn_member_add is-flex is-justify-content-center is-align-items-center"
        @click="addModalActive = true"
      >
        <b-icon
          class="animate__animated animate__pulse animate__infinite animate__slow"
          icon="account-plus-outline"
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
              <p class="modal-card-title">Creat Account</p>
              <button
                type="button"
                class="delete"
                @click="addModalActive = false"
              />
            </header>
            <section class="modal-card-body px-6 py-5">
              <b-field label="信箱：">
                <b-input
                  type="email"
                  icon="account"
                  v-model="email"
                  placeholder="Please enter valid email address . . ."
                  required
                >
                </b-input>
              </b-field>

              <b-field label="密碼：" class="mb-0">
                <b-input
                  type="password"
                  icon="lock"
                  v-model="password"
                  password-reveal
                  placeholder="Password length must be between 6 and 30 characters . . ."
                  required
                  minlength="6"
                  maxlength="30"
                >
                </b-input>
              </b-field>

              <b-field label="暱稱：" class="mb-0">
                <b-input
                  type="text"
                  icon="face-shimmer"
                  v-model="name"
                  placeholder="Password length must be between 2 and 10 characters . . ."
                  required
                  minlength="2"
                  maxlength="10"
                >
                </b-input>
              </b-field>

              <b-field label="頭像：">
                <b-radio v-model="avator" name="avator" native-value="bear">
                  Bear
                </b-radio>
                <b-radio v-model="avator" name="avator" native-value="fox">
                  Fox
                </b-radio>
                <b-radio v-model="avator" name="avator" native-value="deer">
                  Deer
                </b-radio>
                <b-radio v-model="avator" name="avator" native-value="owl">
                  Owl
                </b-radio>
              </b-field>

              <b-field label="權限：">
                <b-radio
                  v-model="authority"
                  name="authority"
                  native-value="管理者"
                >
                  管理者
                </b-radio>
                <b-radio
                  v-model="authority"
                  name="authority"
                  native-value="使用者"
                >
                  使用者
                </b-radio>
              </b-field>
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // member_table
      hasMobileCards: true,
      email: '',
      password: '',
      name: '',
      avator: 'bear',
      authority: '使用者',
      users: [],
      // table_sorting
      defaultSortDirection: 'asc',
      sortIcon: 'arrow-up',
      sortIconSize: 'is-small',
      // add_modal
      addModalActive: false,
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
        .post(process.env.VUE_APP_API + '/users/', this.$data)
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '新增成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.email = ''
            this.password = ''
            this.name = ''
            this.avator = 'bear'
            this.authority = '使用者'
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
      this.email = ''
      this.password = ''
      this.name = ''
      this.avator = 'bear'
      this.authority = '使用者'
    },
    // 編輯狀態 ----------------------------------------------------------
    // 取消
    cancel(props) {
      props.row.edit = false
      props.row.model01 = props.row.email
      props.row.model02 = props.row.name
      props.row.model03 = props.row.avator
      props.row.model04 = props.row.authority
    },
    // 保存
    save(props) {
      this.axios
        .patch(process.env.VUE_APP_API + '/users/' + props.row._id, {
          email: props.row.model01,
          name: props.row.model02,
          avator: props.row.model03,
          authority: props.row.model04
        })
        .then(res => {
          if (res.data.success) {
            props.row.edit = false
            props.row.email = props.row.model01
            props.row.name = props.row.model02
            props.row.avator = props.row.model03
            props.row.authority = props.row.model04
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '保存成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.users[props.index].email = props.row.model01
            this.users[props.index].name = props.row.model02
            this.users[props.index].avator = props.row.model03
            this.users[props.index].authority = props.row.model04
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
      props.row.email = props.row.model01
      props.row.name = props.row.model02
      props.row.avator = props.row.model03
      props.row.authority = props.row.model04
    },
    del(props) {
      this.axios
        .delete(process.env.VUE_APP_API + '/users/' + props.row._id)
        .then(res => {
          if (res.data.success) {
            this.$buefy.dialog.alert({
              title: 'Success!',
              message: '刪除成功！',
              type: 'is-danger',
              hasIcon: true,
              icon: 'heart-circle'
            })
            this.users.splice(props.index, 1)
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
      .get(process.env.VUE_APP_API + '/users/')
      .then(res => {
        if (res.data.success) {
          // .map 把陣列的內容重新組合，再加上 edit & model
          this.users = res.data.result.map(user => {
            user.edit = false
            user.model01 = user.email
            user.model02 = user.name
            user.model03 = user.avator
            user.model04 = user.authority
            return user
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
