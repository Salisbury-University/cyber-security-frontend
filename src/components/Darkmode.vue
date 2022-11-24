<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { useQuasar } from "quasar";

const useAuth = useAuthStore();

const $q = useQuasar();

$q.dark.set(useAuth.persistence.darkmode);

const setDarkMode = () => {
  $q.dark.set(useAuth.persistence.darkmode);
};
</script>

<template>
  <q-toggle
    name="dark_mode_toggle"
    size="md"
    label="Dark Mode"
    color="accent"
    v-model="useAuth.persistence.darkmode"
    @click="setDarkMode()"
  />
</template>
