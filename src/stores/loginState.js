import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '../routes'
import { isLogged, isAdmin } from '../services/userService'



export const useLogin = defineStore("loginState", () => {

  const loginState = ref(false)
  const adminState = ref(false)

  function setLoginState(paramValue) {
    loginState.value = paramValue
  }

  function setAdminState(paramValue) {
    adminState.value = paramValue
  }

  //Global Middelware
  router.beforeEach(async (to, from) => {
    const logged = await isLogged()
    const admin = await isAdmin()
    console.log({ logged, admin })
    setLoginState(logged)
    setAdminState(admin)
  })

  return {
    loginState,
    adminState
  }
})
