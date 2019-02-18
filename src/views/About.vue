<template>
  <Center>
    <h2>{{pkg.name}}</h2>
    <p v-if="pkg.description">{{pkg.description}}</p>
    <p>Version: {{pkg.version}}</p>
    <p v-if="pkg.bugs">
      <a :href="pkg.bugs.url" target="_blank">
        Report a bug
      </a>
    </p>
  </Center>
</template>

<script>
import pkg from '@/../package.json';

export default {
  data() {
    return {
      pkg,
    };
  },
};
</script>
