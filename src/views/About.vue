<template>
  <div id="about" class="bg_about one_page_min_h p-5">
    <nav class="breadcrumb has-bullet-separator">
      <ul>
        <li><a href="#/">首頁</a></li>
        <li class="is-active"><a href="#">使用說明</a></li>
      </ul>
    </nav>
    <div class="title is-3 has-text-centered">使用說明</div>
    <div id="a_content" class="is-flex is-align-items-center is-flex-direction-column is-justify-content-center">
        <section class="box_about mt-5 has-text-centered h-100">
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
              :label="about.title" :clickable="isStepsClickable"
              class="p-4">
                  <h1 class="is-size-4 has-text-weight-semibold">
                    {{ about.title }}
                  </h1>
                  <div class="box_about_content_h py-2 px-5">
                    {{ about.content }}
                  </div>
              </b-step-item>

              <template
                  v-if="customNavigation"
                  slot="navigation"
                  slot-scope="{previous, next}"
                  >
                  <b-button
                      outlined
                      type="is-danger"
                      icon-pack="fas"
                      icon-left="backward"
                      :disabled="previous.disabled"
                      @click.prevent="previous.action">
                      Previous
                  </b-button>
                  <b-button
                      outlined
                      type="is-success"
                      icon-pack="fas"
                      icon-right="forward"
                      :disabled="next.disabled"
                      @click.prevent="next.action">
                      Next
                  </b-button>
              </template>
          </b-steps>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // setting-step
      activeStep: 0,
      isStepsClickable: true,
      customNavigation: false,
      isProfileSuccess: false,
      prevIcon: 'chevron-left',
      nextIcon: 'chevron-right',
      labelPosition: 'bottom',
      mobileMode: 'minimalist',
      // abouts-data
      abouts: []
    }
  },
  mounted () {
    this.axios.get(process.env.VUE_APP_API + '/abouts/')
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
