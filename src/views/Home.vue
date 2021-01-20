<template>
  <div id="home" class="one_page_h">
    <div class="home_title">
      <img src="../assets/logo_animated.svg" alt="" />
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
  name: 'Home'
}
</script>
