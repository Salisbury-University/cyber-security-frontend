import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import http from "../http";

export const useChallengeStore = defineStore("challenge", {
  state: () => {
    return {
      persistence: useStorage("challenge", {
        name: [],
        timeLimit: [],
        difficulty: [],
        description: [],
        image: [],
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
      return state.persistence.name;
    },

    /**
     * Gets the time limit from state
     *
     * @param {any} state all state information
     * @returns {string} timeLimit state
     */
    getTimeLimit(state: any): string {
      return state.persistence.timeLimit;
    },

    /**
     * Gets the challenge difficulty from state
     *
     * @param {any} state all state information
     * @returns {number} difficulty state
     */
    getDifficulty(state: any): number {
      return state.persistence.difficulty;
    },

    /**
     * Gets the challenge description from state
     *
     * @param {any} state all state information
     * @returns {string} description state
     */
    getDescription(state: any): string {
      return state.persistence.description;
    },

    /**
     * Gets image for challenge from state
     *
     * @param {any} state all state information
     * @returns {string} image state
     */
    getImage(state: any): string {
      return state.persistence.image;
    },
  },

  actions: {
    /**
     * Set challenge name
     *
     * @param {string} name name of challenge
     */
    setChallengeName(name: string): void {
      this.persistence.name = name;
    },

    /**
     * Set time limit to complete challenge
     *
     * @param {string} limit time limit for challenge
     */
    setTimeLimit(limit: string): void {
      this.persistence.timeLimit = limit;
    },

    /**
     * Set challenge difficulty
     *
     * @param {number} level difficulty for challenge
     */
    setDifficulty(level: number): void {
      this.persistence.difficulty = level;
    },

    /**
     * Set challenge description
     *
     * @param {string} descr description of challenge
     */
    setDescription(descr: string): void {
      this.persistence.description = descr;
    },

    /**
     * Set challenge image
     *
     * @param {string} imgUrl url to challenge image
     */
    setImage(imgUrl: string): void {
      this.persistence.image = imgUrl;
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

    /**
     * Grabs info for preview of challenge
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
          for (
            let i = this.persistence.name.length;
            i < res.data.exercises.length;
            i++
          ) {
            http()
              .get("/api/v1/exercises/".concat(info[i]))
              .then((response) => {
                const metadata = response.data.metadata;

                // push individual exercise info to name arr, timeLmit arr, etc.
                this.persistence.name.push(metadata.name);
                this.persistence.timeLimit.push(metadata.timeLimit);
                this.persistence.description.push(metadata.description);
                this.persistence.image.push(metadata.image);
                this.persistence.difficulty.push(metadata.difficulty);
              });
          }
        });
    },
  },
});
