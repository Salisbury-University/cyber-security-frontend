<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";
import Darkmode from "../components/Darkmode.vue";

const useAuth = useAuthStore();
</script>

<template>
  <div id="preferenceWrapper">
    <!-- Title of the page -->
    <div class="col headerTitle">
      <span>Preference</span>
    </div>

    <!-- Main page -->
    <div class="col-5">
      <!-- Not logged in-->
      <div v-if="!useAuth.getLoginStatus">
        <p>
          You have not logged in. Please login from the side or press the login
          button.
        </p>
        <q-btn @click="useAuth.showModal()"> Login </q-btn>
      </div>

      <div v-else>
        <div>
          <span>General</span>
          <div>
            <Darkmode></Darkmode>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Makes it so it starts from end point of the drawer */
#preferenceWrapper {
  margin-left: 56px;
  color: var(--q-accent);
}
.headerTitle {
  border-style: solid;
  border-width: 2px;
  margin: 10px;
  padding: 10px;
}
.headerTitle span {
  font-size: xx-large;
}
</style>
