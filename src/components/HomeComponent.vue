<template>
  <body>
    <div>
    <h1>{{ message }}</h1>
  <div>
    <button @click="isToLogin">isToLogin</button>
  </div>
  <div>
    <button @click="reLogin">reLogin</button>
  </div>
  <div>
    <button @click="logout">logout</button>
  </div>

  <div>
    <button @click="logoutReload">logout後重整</button>
  </div>
  <div>
    <button @click="getProfile">get porfile</button>
  </div>
  <div><input type="text" v-model="link"></div>
  <div><button @click="locationHrefToPage">前往活動頁面</button></div>
  <!-- <div><button @click="locationHrefToPage">location.href</button></div> -->


  <input type="text" v-model="link2">
  <button id="hiddenButton" style="display: none;" @click="locationHrefToAbout">Hidden Button</button>

  <div v-if="profile">
    LINE Profile
    <textarea>{{ profile }}</textarea>
  </div>
  <div v-if="errorMsg">
    <textarea>{{ errorMsg }}</textarea> 
  </div>
  isInClient = {{ isInClient }}<br>
  <div v-if="aboutShowBtn">
    <button @click="locationHrefToAbout">前往活動頁面</button>
  </div>
  </div>
  </body>

</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue'
  import liff from '@line/liff';
  const message = ref('登入頁')

  const aboutShowBtn = ref(false)
  const profile = ref(null)
  const link = ref(`${location.href}About`)
  const errorMsg = ref(null)
  const isInClient = ref(false)
  const link2 = ref('https://activitysample-673157003478.asia-east1.run.app/About')

  //setup
  onMounted(async() => {
    console.log('onMounted')

    // 呼叫初始化函數
    var liffSuccess = await initializeLiff();

    if(liffSuccess)
    {
      try {

        // location.replace('https://activitysample-673157003478.asia-east1.run.app/About');
        // this.$refs.hiddenButton.click();
        location.href = `About?token=${liff.getAccessToken()}`

        nextTick(() => {
            console.log("页面加载完啦~")
             location.href = `About?token=${liff.getAccessToken()}`
          setTimeout(() => { aboutShowBtn.value = true  }, 3000)
        })

        // location.href = '/About'
        // location.href = 'https://activitysample-673157003478.asia-east1.run.app/About'
      } catch (error) {
        errorMsg.value = error
      }



      // window.onload= () => {
      //     alert('onload success')
      //     this.$refs.hiddenButton.click();
      // }

      // location.href = location.href;
      // window.location.replace('About');
      // if(liff.isInClient()){
      //   window.location.href = 'About' 
      // }
      // else{
      //   if(confirm('是否前往活動頁面?')){
      //   window.location.href = 'About' 
      //   }
      // }
    }
     
      // //有問題
      //setTimeout(() => {  window.location.href = 'About' }, 1000)
      // window.location = 'About'
  })

async function initializeLiff() {
  try {
    console.log('init')
    if (!(await init())) return false;

    isInClient.value = liff.isInClient();

    console.log('checkLogin')
    if (!(await isLogin())) return false;
    console.log('getProfile')
    await getProfile()
    console.log(profile.value)
    if (!profile.value)
      return false

    return true

  } catch (error) {
    //index.es.js:1 Uncaught (in promise) Error: The permission is not in LIFF app scope.
    //HomeComponent.vue:45 getFriendship fail: Error: The permission is not in LIFF app scope.
    errorMsg.value = error
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

async function isLogin(){
  if (!liff.isLoggedIn()) {
    console.log('login')
    reLogin({ redirectUri: location.href });
    return false
  }

  return true
}

async function isToLogin(){
    liff.login({ redirectUri: location.href });
}

function reLogin(){
  try {
    liff.logout();
    console.log('logout success')
    liff.login({ redirectUri: location.href });
    console.log('login success')
  } catch (error) {
    console.log(error)
    errorMsg.value = error
    alert('login error')
    console.error(`Login failed:`, error); 
  }
}

async function logout(){
  profile.value = null;
  errorMsg.value = null;
  liff.logout()
}


async function logoutReload(){
  profile.value = null;
  errorMsg.value = null;
  liff.logout()
  location.href =  location.href
}

async function getProfile(){
  try {
    profile.value = await liff.getProfile()
  } catch (error) {
    console.log(error)
    errorMsg.value = error
    profile.value = null
    console.error(`getProfile failed1:`, error);
  }
}

async function locationHrefToPage(){
  location.href = `About?token=${liff.getAccessToken()}`
}

function locationHrefToAbout(){
  location.href = 'About'
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
