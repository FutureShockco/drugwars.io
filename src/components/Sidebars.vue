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
  width: @main-width;
  top: 0;
  bottom: 0;
  pointer-events: none;
}

.sidebars {
  pointer-events: none;
  z-index: 9;
  left: 0;
  position: relative;
  display: block;
  height: 100%;
  background: rgba(0, 0, 0, 0.89);
  -webkit-box-shadow: inset 2px 0px 6px #0a0a0a, inset 3px 3px 7px #000000d6,
    inset 3px 3px 8px #0a0a0a, 0 0 8px #000, 0 0 8px #000;
  box-shadow: inset 2px 3px 6px #0a0a0a, inset 3px 3px 7px #000000d6, inset 3px 3px 8px #0a0a0a,
    0 0 8px #000, 0 0 8px #000;
  .sidebar {
    pointer-events: initial;
    width: @sidebar-width;
    top: @header-height;
    bottom: 0;
    position: absolute;
    overflow-x: hidden;
    overflow-y: auto;
    transition: left 0.3s;
    background: linear-gradient(#0000007a, #050505a4), url(/img/fake-brick.png);
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
