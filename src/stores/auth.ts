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

  getters: {
    /**
     * Gets the showLogin value from state
     *
     * @param {any} state all state information
     * @return {boolean} showLogin state
     */
    getShowLogin(state): boolean {
      return state.nonpersistence.showLogin;
    },

    /**
     * Gets the token value from state
     *
     * @param {any} state all state information
     * @return {string} token state
     */
    getToken(state): string {
      return state.persistence.token;
    },

    /**
     * Gets loginAnimation value from state
     *
     * @param {any} state all state information
     * @return {boolean} loginAnimation state
     */
    getLoginAnimation(state): boolean {
      return state.nonpersistence.loginAnimation;
    },

    /**
     * Gets loggedIn value from store
     *
     * @param {any} state all state information
     * @return {boolean} Token logged in
     */
    getLoggedIn(state): boolean {
      return state.persistence.loggedIn;
    },
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
