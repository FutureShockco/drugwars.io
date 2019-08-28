<template>
    <div class="header">
        <slot>
            <span class="ml-4">{{ title }}</span>
        </slot>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: ['title'],
  methods: mapActions(['toggleSidebarVisibility']),
};
</script>

<style lang="less" scoped>
@import '../vars';
.header {
  font-family: @heading-font;
  background-image: linear-gradient(to bottom, #1f1f1f, #000000 74%) !important;
  box-shadow: 0px 5px 5px black;
  color: @white-darker;
  font-size: 20px;
  z-index: 100;
  top: 60px;
  width: 100%;
  height: @header-height;
  line-height: @header-height;
  display: flex;
  align-items: center;
  transition: width 0.3s;
  position: sticky;
}

@media screen and (min-width: 200px) and (max-width: 1119px) {
  .header {
    top: 59px !important;
    font-size: 16px;
  }
}
</style>
