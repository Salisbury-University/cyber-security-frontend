import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import http from "../http";

export const useChallengeStore = defineStore("challenge", {
  state: () => {
    return {
      persistence: useStorage("challenge", {
        name: "",
        timeLimit: "",
        difficulty: "",
        description: "",
        image: "",
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
     * Gets picture for challenge from state
     *
     * @param {any} state all state information
     * @returns {string} image state
     */
    getImage(state: any): string {
      return state.persistence.image;
    },
  },

  actions: {},
});
