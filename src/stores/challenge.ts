import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useAuthStore } from "./auth";
import http from "../http";

export const useChallengeStore = defineStore("challenge", {
  state: () => {
    return {
      name: [],
      timeLimit: [],
      difficulty: [],
      description: [],
      image: [],
      categories: [],
      persistence: useStorage("challenge", {
        header: {
          Authorization: "",
        },
      }),
      status: [],
      challengeListSize: 0,
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

    /**
     * Gets the size of the challenge list
     * @param {any} state
     * @returns {number} challenge list size
     */
    getListSize(state: any): number {
      return state.challengeListSize;
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
     * Set the challenge list size
     * @param newListSize list size
     */
    setListSize(newListSize: number): void {
      this.challengeListSize = newListSize;
    },

    /**
     * Grabs info for challenge
     */
    setChallenge(): void {
      useAuthStore().setToken();
      useAuthStore().setAuthorizationHeader();

      // axios call
      http()
        .get("/api/v1/exercises", {
          headers: {
            Authorization: useAuthStore().persistence.header.Authorization,
          },
        })
        .then((res) => {
          const info = res.data.exercises;

          this.challengeListSize = info.length;

          // array of axios calls to get individual exercise
          for (let i = 0; i < info.length; i++) {
            let categoryCount = 0;
            http()
              .get("/api/v1/exercise/".concat(info[i]))
              .then((response) => {
                const status = response.data.status;
                const metadata = response.data.metadata;

                // store individual exercise info in name arr, timeLmit arr, etc.
                this.name[i] = metadata.title;
                this.timeLimit[i] = metadata.timeLimit;
                this.description[i] = metadata.description;
                this.image[i] = metadata.image;
                this.difficulty[i] = metadata.difficulty;
                this.categories[i] = metadata.categories;
                this.status[i] = status.status;
              });
          }
        });
    },
  },
});
