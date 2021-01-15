<template>
  <div id='home' class='one_page_h'>
    <div class='home_title'>
      <h1 class='title is-size-3-touch is-size-1-desktop has-text-centered'>
        READ YOUR MIND.
        <!-- Read your mind. -->
        <!-- Never underestimate your power to change yourself！ -->
      </h1>
    </div>
    <div id='particles-js' class="particles"></div>
  </div>
</template>

<script>
import 'particles.js'

export default {
  name: 'Home',
  mounted() {
    this.initParticles()
  },
  methods: {
    initParticles() {
      window.particlesJS('particles-js', '')
    }
  }
}
</script>
