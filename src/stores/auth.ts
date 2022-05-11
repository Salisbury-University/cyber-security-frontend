import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import http from "../http";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      nonpersistence: {
        username: "",
        password: "",
        showLogin: false,
        loginAnimation: false,
      },
      persistence: useStorage("auth", {
        token: "",
        header: {
          Authorization: "",
        },
        loggedIn: false,
      }) as any,
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
     * Login
     */
    login(): void {
      this.setLoginAnimation(true);

      // Disables submit button
      const doc = document.getElementById("login-submit");
      doc!.setAttribute("disabled", "true");

      // Gets the failed message dom
      const docFailed = document.getElementById("login-fail");

      // Makes axios call
      http()
        .post("/api/v1/auth/login", {
          username: this.nonpersistence.username,
          password: this.nonpersistence.password,
          Headers: {
            Authorization: "Bearer " + this.persistence.token,
          },
        })
        .then((res) => {
          doc!.removeAttribute("disabled");
          this.setLoginAnimation(false);
          this.setLoggedIn(true);

          console.log(this.getLoginAnimation);
          docFailed!.style.opacity = "0";
          console.log(res.data);
          this.setShowLogin(false);
        })
        .catch((err) => {
          console.log(this.nonpersistence.username);
          console.log(this.nonpersistence.password);
          setTimeout(() => {
            doc!.removeAttribute("disabled");
            this.setLoginAnimation(false);
          }, 2000);

          docFailed!.style.opacity = "1";
        });

      // Make it so that it can be submitted only once every second
    },

    /**
     * Sets the token
     *
     * @param {string} token response token from login
     */
    setToken(token: string): void {
      this.persistence.token = token;
    },

    /**
     * Sets the authorization header with token information
     */
    setAuthorizationHeader(): void {
      this.persistence.header.Authorization = "Bearer ".concat(
        this.persistence.token
      );
    },

    /**
     * Sets showLogin state
     *
     * @param {boolean} bool boolean to determine if login should be shown
     */
    setShowLogin(bool: boolean): void {
      this.nonpersistence.showLogin = bool;
    },

    /**
     * Modal event listener to exit on esc
     */
    modalEventListener(): void {
      document.onkeydown = (e) => {
        // Exit with esc screen on login modal
        if (this.nonpersistence.showLogin) {
          if (e.key === "Escape") {
            this.setShowLogin(false);
          }
        }
      };
    },

    /**
     * Sets login attempt spinning animation
     *
     * @param {boolean} bool boolean to determine page running animation
     */
    setLoginAnimation(bool: boolean): void {
      this.nonpersistence.loginAnimation = bool;
    },

    /**
     * Set loggin bool for login modal
     *
     * @param {boolean} bool boolean to determine user is logged in
     */
    setLoggedIn(bool: boolean): void {
      this.persistence.loggedIn = bool;
    },
  },
});
