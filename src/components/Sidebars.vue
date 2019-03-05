<template>
  <div class="sidebar-container">
    <div class="sidebars brush-black">
      <SidebarLeft/>
      <SidebarRight/>
    </div>
  </div>
</template>

<style scoped lang="less">
@import '../vars';

.sidebar-container {
  position: fixed;
  top: 0;
  bottom: 0;
  width: @main-width;
}

.sidebars {
  z-index: 9;
  left: 0;
  position: relative;
  display: block;
  height: 100%;
  background: linear-gradient(#000000a3, #050505d1), url(/img/fake-brick.png);

  .sidebar {
    width: @sidebar-width;
    top: @header-height;
    bottom: 0;
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    transition: left 0.3s;

    @media @bp-small {
      top: @topnav-height;
    }

    &.sidebar-right {
      right: -@sidebar-width;

      @media @bp-small {
        right: 0;
      }
    }
  }
}
</style>
