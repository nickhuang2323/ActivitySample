<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: 'This is the About page component',
    };
  },
};
</script>

<style scoped>
h1 {
  color: green;
}
</style>
