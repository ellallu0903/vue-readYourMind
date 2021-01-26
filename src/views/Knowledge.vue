<template>
  <div id="knowledge" class="bg_color one_page_min_h p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li class="is-active"><a href="#">小知識</a></li>
      </ul>
    </nav>
    <div
      id="k_content"
      class="is-flex is-align-items-center is-flex-direction-column mb-6"
    >
      <div class="title is-3">小知識</div>
      <section class="box_knowledge">
        <div class="has-text-centered pb-4">
          <blockquote>
            向外看的人是在夢中；向內看的人是清醒的人。
          </blockquote>
          <cite>
            卡爾·榮格，著名瑞士心理學家
          </cite>
        </div>
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
          this.$buefy.dialog.alert({
            title: 'Error!',
            message: res.data.message,
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
  }
}
</script>
