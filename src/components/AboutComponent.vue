<template>
  <div>
    <h1>{{ message }}</h1>
    <div>
      <a href="/">to Home</a>
    </div>
  </div>
</template>

<script >
export default {
  data() {
    return {
      message: 'This is the About page component1',
    };
  },
};
</script>

<style scoped>
h1 {
  color: green;
}
</style>
