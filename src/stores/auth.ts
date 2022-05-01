import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => {
    return {
      counter: 0,
    };
  },

  actions: {
    increment() {
      this.counter++;
    },
  },
});
