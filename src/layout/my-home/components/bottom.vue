<template>
  <div class="bottom">
    <p></p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.bottom {
  // position: absolute;
  // left: 0;
  // bottom: 0;
  // margin: 0;
  // padding: 0;
  height: 60px;
  width: 100%;
  line-height: 60px;
  z-index: 3;
  animation: mymove 1s linear infinite alternate;
  -webkit-animation: mymove 1s linear infinite alternate; /*Safari and Chrome*/
  p {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background: url('../../../assets/img/bottom-bg.png') no-repeat;
    background-size: cover;
  }
}
@keyframes mymove {
  from {
    margin-bottom: 0px;
  }
  to {
    margin-bottom: 3px;
  }
}

@-webkit-keyframes mymove /*Safari and Chrome*/ {
  from {
    margin-bottom: 0px;
  }
  to {
    margin-bottom: 3px;
  }
}
</style>
