import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      persistence: useStorage("challenge", {
        token: "",
        header: {
          Authorization: "",
        },
      }),
    };
  },

  actions: {
    /**
     * Sets the token information
     */
    setToken(): void {
      this.persistence.token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjYXJhdXNhMSIsImlhdCI6MTY0ODQ4MTAyOX0.ec_l4NSOiQjh6Zr-NV55IBJAZzOyhf4uPz7CSrC6kxw";
    },
  },
});
