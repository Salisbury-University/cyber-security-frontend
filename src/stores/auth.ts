import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      persistence: useStorage("auth", {
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

    /**
     * Sets the authorization header with token information
     */
    setAuthorizationHeader(): void {
      this.persistence.header.Authorization = "Bearer ".concat(
        this.persistence.token
      );
    },
  },
});
