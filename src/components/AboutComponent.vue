<template>
  <div>
    <h1>{{ message }}</h1>
    <div>
      <a href="/">to Home</a>
    </div>
  <div>
    Token:{{ token }}
    
    <button @click="RevokeToken">撤銷Token</button>
  </div>
  </div>
</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import axios from 'axios';
const message = ref('活動頁面')
const token = ref('')

onMounted(async() => {
  console.log('mounted')
    // 使用 URLSearchParams 解析查詢參數
    const params = new URLSearchParams(window.location.search);
    token.value = params.get('token');
})

function RevokeToken() {

  const params = new URLSearchParams();
  params.append('client_id', '1657154789');
  params.append('client_secret', '3ebcdaaca584f8fa4c9a98e21da89506');
  params.append('access_token', token.value);

  axios.post('https://api.line.me/oauth2/v2.1/revoke', params)
  .then(function (response) {
    console.log(response);
    alert('成功')
  })
  .catch(function (error) {
    alert('失敗')
    console.log(error);
  });
}
// export default {
//   data() {
//     return {
//       message: 'This is the About page component1',
//     };
//   },
// };
</script>

<style scoped>
h1 {
  color: green;
}
</style>
