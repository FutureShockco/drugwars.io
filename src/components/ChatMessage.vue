<template>
    <div>
        <router-link v-if="transformed" :to="'/actions?type=attack&nickname='+dynamicTo">{{dynamicTo}}</router-link>
        <div>{{dynamicContent}}</div>
    </div>
</template>
<script>
// export default {
// template: `<component v-bind:is="transformed" /></component>`,
//   props: ['message'],
//   data() {
//     return {};
//   },

// }
export default {
  props: ['message'],

  data() {
    return {
      dynamicContent: this.message,
      dynamicTo: null,
    };
  },
  computed: {
    transformed() {
      const regex = /@(\w*)\b/ms;

      const subst = `$1`;
      let text = this.message;

      text = text.replace(regex, subst).replace(' ', '');
      this.dynamicTo = text.replace(/ */ms, '');

      if (this.dynamicTo.split(' ').length > 1) {
        this.dynamicTo = this.dynamicTo.split(' ')[0];
      }
      return true;
    },
  },
};
</script>
