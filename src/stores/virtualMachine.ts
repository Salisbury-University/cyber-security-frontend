import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { useAuthStore } from "./auth";
import http from "../http";

const useAuth = useAuthStore();

export const useVitualMachine = defineStore("vm", {
  state: () => {
    return {
      node: "",
      vmid: "",
    };
  },

  getters: {},

  actions: {
    /**
     * Gets current user's vm information
     */
    getUserVMInfo() {
      // Do nothing if user is not logged in
      if (useAuth.persistence.token == "") {
        return;
      }

      // Get user information from the backend
    },
  },
});
