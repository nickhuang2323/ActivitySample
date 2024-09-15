<template>
  <div>
    <h1>{{ message }}</h1>
  <div>
    <button @click="Login">reLogin</button>
  </div>
  <div>
    <button @click="logout">logout</button>
  </div>
  <div>
    <button @click="getProfile">get porfile</button>
  </div>
  <div><input type="text" v-model="link"></div>
  <div><button @click="locationHrefToPage">location.href</button></div>
  <!-- <div><button @click="locationHrefToPage">location.href</button></div> -->

  <div v-if="profile">
    LINE Profile
    <textarea>{{ profile }}</textarea>
  </div>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import liff from '@line/liff';
  const message = ref('This is the Home page component1234')

  const profile = ref(null)
  const link = ref(`${location.href}About`)
  //setup
  onMounted(async() => {
    console.log('onMounted')

   // 呼叫初始化函數
   await initializeLiff();
  
  })

async function initializeLiff() {
  try {
    console.log('init')
    if (!(await init())) return false;
    console.log('checkLogin')
    if (!(await checkLogin())) return false;

    profile.value = await getProfile()
    console.log(profile.value)
    if (!profile)
      return false

    return true

  } catch (error) {
    //index.es.js:1 Uncaught (in promise) Error: The permission is not in LIFF app scope.
    //HomeComponent.vue:45 getFriendship fail: Error: The permission is not in LIFF app scope.
    console.error('initializeLiff fail:', error);
  }
}

async function getFriendship(){
  return await liff.getFriendship()
}

async function init(){
  try {
    await liff.init({ liffId: '1657154789-X1RpBNq3' })
    await liff.ready
    return true
  } catch (error) {
    console.error('init fail:', error);
    return false
  }
}

async function checkLogin(){
  if (!liff.isLoggedIn()) {
    liff.login({ redirectUri: location.href });
    return false
  }

  return true
}

async function Login(){
  liff.logout();
  console.log('logout success')
  liff.login({ redirectUri: location.href });
  console.log('login success')
}

async function logout(){
  liff.logout()
}

async function getProfile(){
  try {
    return await liff.getProfile()

  } catch (error) {
    throw new Error(`Check login failed: ${error.message}`);
  }
}

async function locationHrefToPage(){
  console.log(link.value)
  location.href = link.value
}

// async function getToken(){
//   try {
//     const token =  await liff.getAccessToken();
//     console.log("token:", token)
//   } catch (error) {
//     console.error('getToken fail:', error); 
//   }
// }
</script>

<style scoped>
    h1 {
      color: blue;
    }

    div {
      display: block;
    }

    input {
      width: 300px;
    }

    textarea {
      width: 300px;
      height: 400px;
    }
</style>
