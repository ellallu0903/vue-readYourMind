<template>
  <div id="home" class="one_page_h">
    <div class="home_title">
      <h1 class="title is-size-3-touch is-size-1-desktop has-text-centered">
        READ YOUR MIND.
        <!-- Read your mind. -->
        <!-- Never underestimate your power to change yourself！ -->
      </h1>
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
