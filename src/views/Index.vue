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
    current token:
    <h3>{{ useAuth.persistence.token }}</h3>
    <br />
    <q-btn
      color="negative"
      @click="useAuth.persistence.loggedIn = !useAuth.persistence.loggedIn"
      >Change logged in state</q-btn
    >
    <br />
    Current logged in state:
    <h3>{{ useAuth.persistence.loggedIn }}</h3>
  </q-page>
</template>
