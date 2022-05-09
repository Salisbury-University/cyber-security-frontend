<script setup lang="ts">
import { useAuthStore } from "../stores/auth";

const useAuth = useAuthStore();
</script>

<template>
  <q-page>
    <div>
      <q-btn color="positive" @click="useAuth.setLoggedIn(false)"
        >log-out</q-btn
      >
    </div>
  </q-page>
</template>
