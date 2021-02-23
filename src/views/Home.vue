<template>
  <div id="home" class="one_page_h">
    <div class="home_title">
      <img width="480" src="../assets/svg/logo_animated.svg" alt="" />
      <br>
      <div class="is-flex is-justify-content-center mt-3">
        <b-button type="is-started" @click="toAbout()" >Get started!</b-button>
      </div>
    </div>

    <vue-particles
      color="#dedede"
      :particleOpacity="0.5"
      :particlesNumber="150"
      shapeType="circle"
      :particleSize="8"
      linesColor="#dedede"
      :linesWidth="0"
      :lineLinked="false"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="1.5"
      :hoverEffect="false"
      hoverMode="grab"
      :clickEffect="false"
      clickMode="push"
    >
    </vue-particles>
  </div>
</template>

<script>
import 'particles.js'
export default {
  name: 'Home',
  methods: {
    toAbout() {
      this.$router.push('/about')
    },
  }
}
</script>
