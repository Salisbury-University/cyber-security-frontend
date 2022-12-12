import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useAuthStore } from "./auth";
import http from "../http";

export const useChallengeStore = defineStore("challenge", {
  state: () => {
    return {
      persistence: useStorage("challenge", {
        name: [],
        timeLimit: [],
        difficulty: [],
        description: [],
        briefDescription: [],
        image: [],
        categories: [],
        header: {
          Authorization: "",
        },
        status: [],
        challengeListSize: 0,
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

    /**
     * Gets the size of the challenge list
     * @param {any} state
     * @returns {number} challenge list size
     */
    getListSize(state: any): number {
      return state.persistence.challengeListSize;
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
     * Set the challenge list size
     * @param newListSize list size
     */
    setListSize(newListSize: number): void {
      this.persistence.challengeListSize = newListSize;
    },

    /**
     * Set completion status for challenge
     * @param completionStatus status
     */
    setStatus(completionStatus: string): void {
      this.persistence.status = completionStatus;
    },

    /**
     * Grabs info for challenge
     */
    setChallenge(): void {
      // axios call
      http()
        .get("/api/v1/exercises", {})
        .then((res) => {
          const info = res.data.exercises;

          this.persistence.challengeListSize = info.length;

          // array of axios calls to get individual exercise
          for (let i = 0; i < info.length; i++) {
            http()
              .get("/api/v1/exercise/".concat(info[i]))
              .then((response) => {
                const status = response.data.status;
                const metadata = response.data.metadata;

                // store individual exercise info in name arr, timeLmit arr, etc.
                this.persistence.name[i] = metadata.title;
                this.persistence.timeLimit[i] = metadata.timelimit;
                this.persistence.description[i] = metadata.description;
                this.persistence.briefDescription[i] =
                  metadata.description.split(".")[0];
                this.persistence.image[i] = metadata.image;
                this.persistence.difficulty[i] = metadata.difficulty;
                this.persistence.categories[i] = metadata.categories;
                this.persistence.status[i] = status.status;
              });
          }
        });
    },

    getChallenge(title: string) {
      http()
        .get("/api/v1/exercise/".concat(title))
        .then((response) => {
          const status = response.data.status;
          const metadata = response.data.metadata;

          // store individual exercise info in name arr, timeLmit arr, etc.
          this.persistence.name[0] = metadata.title;
          this.persistence.timeLimit[0] = metadata.timelimit;
          this.persistence.description[0] = metadata.description;
          this.persistence.briefDescription[0] =
            metadata.description.split(".")[0];
          this.persistence.image[0] = metadata.image;
          this.persistence.difficulty[0] = metadata.difficulty;
          this.persistence.categories[0] = metadata.categories;
          this.persistence.status[0] = status.status;
        });
    },
  },
});
