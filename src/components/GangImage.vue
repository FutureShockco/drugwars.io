<template>
    <div class="avatar" :style="{
          'width': `${size}px`,
          'height': `${size}px`,
        }">
        <span class="avatar-img" :style="{
            'background-image': `url(https://steemitimages.com/${size}x${size}/${image}`,
            'width': `${size}px`,
            'height': `${size}px`,
           }" />
        <span class="avatar-border" />
    </div>
</template>

<script>
export default {
  props: ['image', 'size'],
};
</script>

<style scoped lang="less">
@import '../vars.less';
.avatar {
  position: relative;
  overflow: visible;
  .avatar-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: 50% 50%;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.4);
        background: rgb(15, 15, 15);
  }
  .level {
    display: inline-block;
    position: absolute;
    top: 60 !important;
    left: -40px;
  }
  .rank {
    display: inline-block;
    position: absolute;
    top: 0;
    left: -40px;
  }
  .avatar-border {
    display: inline-block;
    position: absolute;
    top: -5%;
    left: -12%;
    bottom: -18%;
    right: -10%;
    background-image: url('/img/avatar-border.png');
    background-size: contain;
    background-repeat: no-repeat;
  }
}
</style>
