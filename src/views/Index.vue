<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";

const useAuth = useAuthStore();
const tt = "hi";
</script>

<template>
  <q-page>
    <div>
      <q-btn color="positive" @click="useAuth.setLoggedIn(false)"
        >log-out</q-btn
      >
      <br /><span style="color: #ffffff">{{ useAuth.persistent.token }}</span>
    </div>
  </q-page>
</template>
