<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { ref } from "vue";
import Darkmode from "../components/Darkmode.vue";

const useAuth = useAuthStore();
</script>

<template>
  <div id="preferencePageWrapper">
    <!-- Title of the page -->
    <div class="row left headerTitle">
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

      <div v-else class="row">
        <div class="col statsWrapper">
          <span>Stats</span>

          <q-separator></q-separator>

          <div class="row">
            <QCard class="stats">
              <QCardSection> Placeholder </QCardSection>
              <q-separator></q-separator>
              <QCardSection> </QCardSection>
            </QCard>
          </div>
        </div>

        <q-separator vertical></q-separator>

        <div class="col preferenceWrapper">
          <span>Settings</span>

          <q-separator></q-separator>

          <div class="row">
            <QCard class="col preference">
              <div>
                <span class="text-weight-bold">General</span>
                <q-separator></q-separator>
                <Darkmode></Darkmode>
                <q-separator></q-separator>
                <q-btn @click="useAuth.setPreference()" class="applyBtn"
                  >Apply</q-btn
                >
              </div>
            </QCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Makes it so it starts from end point of the drawer */
#preferencePageWrapper {
  margin-left: 56px;
  color: var(--q-accent);
}
.headerTitle {
  margin: 20px;
  padding: 20px;
}
.headerTitle span {
  font-size: xx-large;
  font-weight: bolder;
}
.preferenceWrapper,
.statsWrapper {
  padding: 20px;
}
.statsWrapper {
  min-width: 65% !important;
}

.preferenceWrapper span,
.statsWrapper span {
  font-size: larger;
  font-weight: bold;
}
.preference,
.stats {
  box-shadow: 3px 3px rgba(0, 0, 0, 0.5);
  border-style: solid;
  border-color: var(--q-secondary);
  border-radius: 10px;
  padding: 20px;
  background-color: var(--q-secondary);
  width: 100%;
  height: 100%;
  margin-top: 20px;
}
.applyBtn {
  background-color: var(--btn);
  margin-top: 5px;
}
</style>
