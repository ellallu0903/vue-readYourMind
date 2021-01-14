<template>
  <div id="question" class="bg_color one_page_min_h p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li class="is-active"><a href="#">小知識</a></li>
      </ul>
    </nav>
    <div
      id="k_content"
      class="is-flex is-align-items-center is-flex-direction-column"
    >
      <div class="title is-3">小知識</div>
      <div class="is-flex is-flex-direction-column is-align-items-center pb-4">
        <div class="box_knowledge">
          念位是仍理，料四方前。眼作那活業眾施自減天我何手眼獨成這不預哥研細，智主社成引院天高事此衣其房；不輕古留開算為。是答童吸出可吃形及！中月便加得即步發益、個那樓會立白不產線文
        </div>
      </div>
      <section class="box_knowledge">
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
            <p class="card-header-title p-5">
              {{ knowledge.title }}
            </p>
            <a class="card-header-icon">
              <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"> </b-icon>
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
  data() {
    return {
      isOpen: -1,
      knowledges: []
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
  }
}
</script>
