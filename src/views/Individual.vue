<script setup lang="ts">
import { useRoute } from "vue-router";
import { useChallengeStore } from "../stores/challenge";
import { useAuthStore } from "../stores/auth";

const useChallenge = useChallengeStore();
const useAuth = useAuthStore();

const route = useRoute();
</script>

<template>
  <div>
    <button @click="useChallenge.startVM(encodeURIComponent(route.params.id))">
      Start
    </button>
  </div>
</template>
