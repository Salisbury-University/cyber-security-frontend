import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import http from "../http";
import { useQuasar } from "quasar";

const $q = useQuasar();

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
      loginRef: null,
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

    getDarkmode(state): boolean {
      return state.persistence.darkmode;
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
    setToken(token: string): void {
      this.persistence.token = token;
      this.persistence.header.Authorization = "Bearer " + token;
      // this.persistence.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjYXJhdXNhMSIsImlhdCI6MTY0ODQ4MTAyOX0.ec_l4NSOiQjh6Zr-NV55IBJAZzOyhf4uPz7CSrC6kxw";
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
     * Logs the user in from the username and password
     */
    login(): void {
      // this.setToken("as");
      // this.persistence.loginStatus = true;
      // this.loginModal = false;
      http()
        .post("/api/v1/auth/login", {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          this.setToken(res.data.token);
          this.persistence.loginStatus = true;
          this.loginModal = false;
        })
        .catch((e) => {
          document.getElementById("login-fail")!.style.visibility = "visible";
        });
      return;
    },

    // Logout the user
    logout(): void {
      this.persistence.token = "";
      this.persistence.header.Authorization = "";
      this.setLoginStatus(false);
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

    /**
     * Gets the darkmode from the database and set it to darkmode
     */
    getPreference(): void {
      http()
        .get("/api/v1/preference", {
          headers: {
            Authorization: this.persistence.header.Authorization,
          },
        })
        .then((res) => {
          console.log(res);
          const data = res.data.preference;
          this.persistence.darkmode = data;
        });
    },

    /**
     * Sets the darkmode to the backend
     */
    setPreference(): void {
      http()
        .post("/api/v1/preference", {
          headers: {
            Authorization: this.persistence.header.Authorization,
          },
          darkmode: this.persistence.darkmode,
        })
        .then((res) => {
          console.log(res);
          console.log("updated");
        });
    },
  },
});
