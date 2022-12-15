import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import http from "../http";
import { useQuasar } from "quasar";
import { getCurrentInstance } from "vue";
import { useChallengeStore } from "./challenge";

const $q = useQuasar();
const instance = getCurrentInstance();

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
      helpModal: false,
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

    /**
     * Gets the authorization header including bearer
     *
     * @returns  {string} authorization header
     */
    getAuthHeader(state): string {
      return state.persistence.header.Authorization;
    },

    /**
     * Gets the modal state
     *
     * @returns {boolean} returns true of false to show up the login modal
     */
    getModalState(state): boolean {
      return state.loginModal;
    },

    /**
     * Gets the username for login modal
     *
     * @returns {string} Returns the username that is stored
     */
    getUsername(state): string {
      return state.username;
    },

    /**
     * Gets the password for login modal
     *
     * @returns {string} Returns the password that is stored
     */
    getPassword(state): string {
      return state.password;
    },

    /**
     * Gets the current darkmode setting
     *
     * @returns {boolean} Returns current darkmode setting
     */
    getDarkmode(state): boolean {
      return state.persistence.darkmode;
    },
  },

  actions: {
    /**
     * Sets the token variable from the store
     *
     * @param {String} token  -   String that holds jwt token
     */
    setToken(token: string): void {
      this.persistence.token = token;
      this.persistence.header.Authorization = "Bearer " + token;
    },

    /**
     * Sets the authorization header with token information
     */
    setAuthorizationHeader(empty: boolean = false): void {
      empty
        ? (this.persistence.header.Authorization = "")
        : (this.persistence.header.Authorization = "Bearer ".concat(
            this.persistence.token
          ));
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
          // console.log(res);
          this.setToken(res.data.token);
          this.setAuthorizationHeader(false);
          this.setLoginStatus(true);
          this.setModalState(false);
          this.setUsername("");
          this.setPassword("");
          // Force update
          instance?.proxy?.$forceUpdate();
        })
        .catch((e) => {
          document.getElementById("login-fail")!.style.visibility = "visible";
        });
    },

    // Logout the user
    logout(): void {
      this.setToken("");
      this.setAuthorizationHeader(true);
      this.setLoginStatus(false);
      // Reset status and refresh
      for(let i = 0; i < useChallengeStore().persistence.status.length; i++){
        useChallengeStore().persistence.status[i] = "incomplete";
      }
      instance?.proxy?.$forceUpdate();
      http()
        .post("api/v1/auth/logout")
        .then((res) => {
          // console.log(res);
          this.setToken("");
          this.setLoginStatus(false);
          this.setAuthorizationHeader(true);

            // Reset status
          for(let i = 0; i < useChallengeStore().persistence.status.length; i++){
            useChallengeStore().persistence.status[i] = "incomplete";
          }
          instance?.proxy?.$forceUpdate();
        });
    },

    /**
     * Sets the login state
     *
     * @param {boolean} loginState - login state
     */
    setLoginStatus(loginState: boolean): void {
      this.persistence.loginStatus = loginState;
    },

    /**
     * Sets login modal state
     *
     * @param {boolean} modalState  - modal state
     */
    setModalState(modalState: boolean): void {
      this.loginModal = modalState;
    },

    /**
     * Sets username for login modal
     *
     * @param {String} username  - username input
     */
    setUsername(username: string): void {
      this.username = username;
    },

    /**
     * Sets password for login modal
     *
     * @param {String} password - password input
     */
    setPassword(password: string): void {
      this.password = password;
    },

    /**
     * Function to toggle login modal
     * (Used in both prefence page and Main.vue as emitter function)
     */
    showModal(): void {
      if (!this.getLoginStatus) {
        this.setModalState(true);
      } else {
        this.setModalState(false);
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
          // console.log(res);
          const data = res.data.preference;
          this.persistence.darkmode = data.darkmode;
        });
    },

    /**
     * Sets the darkmode to the backend
     */
    setPreference(): void {
      http()
        .post(
          "/api/v1/preference",
          {
            preference: {
              darkmode: this.persistence.darkmode,
            },
          },
          {
            headers: {
              Authorization: this.persistence.header.Authorization,
            },
          }
        )
        .then((res) => {
          console.log(res);
          console.log("updated");
        });
    },
  },
});
