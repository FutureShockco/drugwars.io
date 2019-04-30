<template>
  <div> 
    <NavBar/>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      error: null,
    };
  },
  methods: mapActions(['login']),
  created() {},
};
</script>
