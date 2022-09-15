import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import http from "../http";

export const useChallengeStore = defineStore("challenge", {
  state: () => {
    return {
      name: [],
      timeLimit: [],
      difficulty: [],
      description: [],
      image: [],
      persistence: useStorage("challenge", {
        token: "",
        header: {
          Authorization: "",
        },
      }),
    };
  },

  getters: {
    /**
     * Gets the challenge name from state
     *
     * @param {any} state all state information
     * @return {string} name state
     */
    getChallengeName(state: any): string {
      return state.name;
    },

    /**
     * Gets the time limit from state
     *
     * @param {any} state all state information
     * @returns {string} timeLimit state
     */
    getTimeLimit(state: any): string {
      return state.timeLimit;
    },

    /**
     * Gets the challenge difficulty from state
     *
     * @param {any} state all state information
     * @returns {number} difficulty state
     */
    getDifficulty(state: any): number {
      return state.difficulty;
    },

    /**
     * Gets the challenge description from state
     *
     * @param {any} state all state information
     * @returns {string} description state
     */
    getDescription(state: any): string {
      return state.description;
    },

    /**
     * Gets image for challenge from state
     *
     * @param {any} state all state information
     * @returns {string} image state
     */
    getImage(state: any): string {
      return state.image;
    },
  },

  actions: {
    /**
     * Set challenge name
     *
     * @param {string} name name of challenge
     */
    setChallengeName(name: string): void {
      this.name = name;
    },

    /**
     * Set time limit to complete challenge
     *
     * @param {string} limit time limit for challenge
     */
    setTimeLimit(limit: string): void {
      this.timeLimit = limit;
    },

    /**
     * Set challenge difficulty
     *
     * @param {number} level difficulty for challenge
     */
    setDifficulty(level: number): void {
      this.difficulty = level;
    },

    /**
     * Set challenge description
     *
     * @param {string} descr description of challenge
     */
    setDescription(descr: string): void {
      this.description = descr;
    },

    /**
     * Set challenge image
     *
     * @param {string} imgUrl url to challenge image
     */
    setImage(imgUrl: string): void {
      this.image = imgUrl;
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
     * Sets the token information
     */
    setToken(): void {
      this.persistence.token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJjYXJhdXNhMSIsImlhdCI6MTY0ODQ4MTAyOX0.ec_l4NSOiQjh6Zr-NV55IBJAZzOyhf4uPz7CSrC6kxw";
    },

    resetState(): void {
      this.name = [];
      this.timeLimit = [];
      this.difficulty = [];
      this.description = [];
      this.image = [];
    },

    /**
     * Grabs info for challenge
     */
    setChallenge(): void {
      this.setToken();
      this.setAuthorizationHeader();

      // axios call
      http()
        .get("/api/v1/exercises", {
          headers: {
            Authorization: this.persistence.header.Authorization,
          },
        })
        .then((res) => {
          const info = res.data.exercises;

          // array of axios calls to get individual exercise
          for (let i = 0; i < info.length; i++) {
            http()
              .get("/api/v1/exercise/".concat(info[i]))
              .then((response) => {
                const metadata = response.data.metadata;
                // push individual exercise info to name arr, timeLmit arr, etc.
                this.name.push(metadata.title);
                this.timeLimit.push(metadata.timeLimit);
                this.description.push(metadata.description);
                this.image.push(metadata.image);
                this.difficulty.push(metadata.difficulty);
              });
          }
        });
    },
  },
});
