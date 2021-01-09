<template>
  <div id="question" class="bg_knowledge one_page_min_h p-5" >
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li class="is-active"><a href="#">小知識</a></li>
      </ul>
    </nav>
    <div id="k_content" class="is-flex is-align-items-center is-flex-direction-column">
    <div class="title is-3">小知識</div>
      <section class="box_knowledge">
        <b-collapse
            class="card"
            animation="slide"
            v-for="(knowledge, index) of knowledges"
            :key="index"
            :open="isOpen == index"
            @open="isOpen = index">
            <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button">
                <p class="card-header-title p-5">
                    {{ knowledge.title }}
                </p>
                <a class="card-header-icon">
                    <b-icon
                        :icon="props.open ? 'menu-down' : 'menu-up'">
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
</template>

<script>
export default {
  data () {
    return {
      isOpen: -1,
      knowledges: []
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/knowledges/')
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
