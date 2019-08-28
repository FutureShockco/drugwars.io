<template>
    <div class="revolver mt-6">
        <section class="revolver_part"></section>
        <section class="revolver_part"></section>
        <section class="revolver_part"></section>
        <section class="revolver_part"></section>
        <section class="revolver_part"></section>
        <section class="revolver_part"></section>
    </div>
</template>

<style scoped lang="less">
@import '../vars';
.bg-black {
  background: rgb(0, 0, 0);
}

.revolver {
  height: 80px;
  width: 80px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  position: relative;
  background: #fbbd08;
  transform: rotate(30deg);
  animation: rotate 6.5s cubic-bezier(0.74, 0.61, 0, 1.33) infinite;
  margin-left: auto;
  margin-right: auto;
  pointer-events: none;
}

.revolver_part {
  height: 40px;
  width: 30px;
  border-radius: 5px;
  transform-origin: bottom center;
  position: absolute;
  display: flex;
  justify-content: center;
}

.revolver_part:after,
.revolver_part:before {
  content: ' ';
  display: block;
  background: #0c0c0c;
  height: 26px;
  width: 26px;
  border-radius: 13px;
  margin-top: -18px;
}

.revolver_part:before {
  position: absolute;
  height: 12px;
  width: 12px;
  margin-top: 11px;
  right: -5px;
  background: #0c0c0c;
  border: 2px solid #0c0c0c;
}

section:nth-of-type(0) {
  transform: rotatez(calc(60deg * 0));
}

section:nth-of-type(1) {
  transform: rotatez(calc(60deg * 1));
}

section:nth-of-type(2) {
  transform: rotatez(calc(60deg * 2));
}

section:nth-of-type(3) {
  transform: rotatez(calc(60deg * 3));
}

section:nth-of-type(4) {
  transform: rotatez(calc(60deg * 4));
}

section:nth-of-type(5) {
  transform: rotatez(calc(60deg * 5));
}

@keyframes rotate {
  0% {
    transform: rotate(30deg);
  }
  16% {
    transform: rotate(90deg);
  }
  32% {
    transform: rotate(150deg);
  }
  48% {
    transform: rotate(210deg);
  }
  64% {
    transform: rotate(270deg);
  }
  82% {
    transform: rotate(330deg);
  }
  100% {
    transform: rotate(390deg);
  }
}

.l-text {
  position: absolute;
  bottom: 5%;
  font-family: Montserrat, sans-serif;
  color: white;
  font-size: 17px;
}
</style>
