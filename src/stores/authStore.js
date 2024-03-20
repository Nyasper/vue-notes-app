import { defineStore } from 'pinia'
import { ref } from 'vue'


//Global Middelware

export const useAuthStore = defineStore("auth", () => {

  const authState = ref(null)

  function setAuthState(paramValue) {
    authState.value = paramValue;
  }

  return {
    authState,
    setAuthState
  }
})
