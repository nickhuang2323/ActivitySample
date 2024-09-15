<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: 'This is the Home page component123',
      };
    },
  };
</script>

<style scoped>
    h1 {
      color: blue;
    }
</style>
