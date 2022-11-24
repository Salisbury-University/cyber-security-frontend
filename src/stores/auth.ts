import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import http from "../http";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      persistence: useStorage("auth", {
        token: "",
        header: {
          Authorization: "",
        },
        loginStatus: false,
        darkmode: false,
      }),
      username: "",
      password: "",
      loginModal: false,
    };
  },

  getters: {
    /**
     * Gets the showLogin value from state
     *
     * @return {boolean} showLogin state
     */
    getLoginStatus(state): boolean {
      return state.persistence.loginStatus;
    },

    /**
     * Gets the token value from state
     *
     * @return {string} token state
     */
    getToken(state): string {
      return state.persistence.token;
    },

    getModalState(state): boolean {
      return state.loginModal;
    },

    getUsername(state): string {
      return state.username;
    },

    getPassword(state): string {
      return state.password;
    },

    // /**
    //  * Gets loginAnimation value from state
    //  *
    //  * @param {any} state all state information
    //  * @return {boolean} loginAnimation state
    //  */
    // getLoginAnimation(state): boolean {
    //   return state.nonpersistence.loginAnimation;
    // },

    // /**
    //  * Gets loggedIn value from store
    //  *
    //  * @param {any} state all state information
    //  * @return {boolean} Token logged in
    //  */
    // getLoggedIn(state): boolean {
    //   return state.persistence.loginState;
    // },
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

    login(): void {
      this.persistence.loginStatus
        ? (this.persistence.loginStatus = false)
        : (this.persistence.loginStatus = true);
      this.loginModal = false;
      this.username = "";
      this.password = "";
    },

    setLoginStatus(loginState: boolean): void {
      this.persistence.loginStatus = loginState;
    },

    setModalState(modalState: boolean): void {
      this.loginModal = modalState;
    },

    setUsername(username: string): void {
      this.username = username;
    },

    setPassword(password: string): void {
      this.password = password;
    },

    showModal(): void {
      if (!this.getLoginStatus) {
        this.setModalState(true);
      } else {
        this.setLoginStatus(false);
      }
    },
  },
});
