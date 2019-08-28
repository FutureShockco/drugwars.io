<template>
    <Splash/>
</template>

<script>
export default {
  created() {
    localStorage.setItem('drugwars_referrer', this.$route.params.username);
    window.location = '/';
  },
};
</script>
