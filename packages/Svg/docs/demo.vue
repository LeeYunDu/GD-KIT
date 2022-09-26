<template>
  <div class="container">
    1
    <div class="line-wrap">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        xml:space="preserve"
        class="circle-load-rect-svg"
        width="600"
        height="210"
        viewbox="0 0 600 400"
      >
        <polyline points="5 5, 575 5, 575 200, 5 200" fill="none" class="g-rect-path" />
        <polyline points="5 5, 575 5, 575 200, 5 200" fill="none" class="g-rect-fill" />
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
.container{
    width: 100%;
}
.line-wrap{
    width:300px;
    margin:0 auto;
}
.circle-load-rect-svg{
    margin: 10px;
    font-size: 10px;
}

.g-rect-path{
    fill: none;
    stroke-width:10;
    stroke:#d3dce6;
    stroke-linejoin:round;
    stroke-linecap:round;
}

.g-rect-fill{
    fill: none;
    stroke-width:10;
    stroke:#ff7700;
    stroke-linejoin:round;
    stroke-linecap:round;
    stroke-dasharray: 0, 1370;
    stroke-dashoffset: 0;
    animation: lineMove 2s ease-out infinite;
}

@keyframes lineMove {
    0%{
        stroke-dasharray: 0, 1350;
    }
    100%{
        stroke-dasharray: 1350, 1350;
    }
}
</style>
