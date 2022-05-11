<script setup lang="ts">
import { useAuthStore } from "../stores/auth";

const useAuth = useAuthStore();
</script>

<template>
  <q-page>
    <div>
      <q-btn
        color="positive"
        @click="
          () => {
            useAuth.persistence.token = '';
            useAuth.setAuthorizationHeader();
            useAuth.setLoggedIn(false);
          }
        "
        >log-out</q-btn
      >
    </div>
    <p style="color: white">current token:</p>
    <h3 style="color: white">{{ useAuth.persistence.token }}</h3>
    <br />
    <q-btn
      color="negative"
      @click="
        () => {
          useAuth.persistence.loggedIn = !useAuth.persistence.loggedIn;
        }
      "
      >Change logged in state</q-btn
    >
    <br />
    <p style="color: white">Current logged in state:</p>
    <h3 style="color: white">{{ useAuth.persistence.loggedIn }}</h3>
  </q-page>
</template>
