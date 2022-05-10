<script setup lang="ts">
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import { useAuthStore } from "../stores/auth";

const useAuth = useAuthStore();

const drawer = ref(false);
const miniState = ref(true);

const bio = ref("Default bio\n CyberSecurity Team");
</script>

<template>
  <div>
    <q-layout view="lHh Lpr lff">
      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="400"
        :breakpoint="400"
        class="menu-bg"
      >
        <q-list padding>
          <q-item style="height: 40vh; overflow: hidden">
            <div style="flex-direction: column; justify-content: center">
              <q-item-section
                avatar
                class=""
                style="justify-content: center; vertical-align: top"
              >
                <q-icon
                  v-if="!useAuth.persistence.loggedIn"
                  class="menu-icon"
                  name="account_circle"
                />
                <q-icon class="menu-icon" v-if="useAuth.persistence.loggedIn">
                  <img src="../assets/logo.png" />
                </q-icon>
              </q-item-section>
            </div>
            <q-item-section class="menu-text">
              <div style="flex-direction: column; justify-content: center">
                <div style="flex-direction: row">
                  <q-icon
                    v-if="!useAuth.persistence.loggedIn"
                    class="menu-icon"
                    size="20vh"
                    name="account_circle"
                  />
                  <q-icon
                    class="menu-icon"
                    size="20vh"
                    v-if="useAuth.persistence.loggedIn"
                  >
                    <img
                      v-if="useAuth.persistence.loggedIn"
                      class="avatar-size"
                      src="../assets/logo.png"
                    />
                  </q-icon>
                </div>
                <div style="flex-direction: row">
                  <pre>{{ bio }}</pre>
                </div>
              </div>
            </q-item-section>
          </q-item>

          <q-item class="q-item" active clickable v-ripple to="/">
            <q-item-section avatar>
              <q-icon class="menu-icon" name="home" />
            </q-item-section>

            <q-item-section class="menu-text"> Home </q-item-section>
          </q-item>

          <q-item class="q-item" active clickable v-ripple to="/challenges">
            <q-item-section avatar>
              <q-icon class="menu-icon" name="rocket_launch"></q-icon>
            </q-item-section>

            <q-item-section class="menu-text"> Challenges </q-item-section>
          </q-item>

          <q-item class="q-item" active clickable v-ripple to="/wiki">
            <q-item-section avatar>
              <q-icon class="menu-icon" name="feed"></q-icon>
            </q-item-section>
            <q-item-section class="menu-text"> Wiki </q-item-section>
          </q-item>

          <q-item
            class="q-item"
            active
            clickable
            v-ripple
            @click="
              () => {
                if (!useAuth.getLoggedIn) {
                  useAuth.setShowLogin(true);
                }
              }
            "
          >
            <q-item-section avatar>
              <q-icon class="menu-icon" name="person"></q-icon>
            </q-item-section>
            <q-item-section class="menu-text"> Account </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <Modal :loginModal="useAuth.getShowLogin" />

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="sass">
.menu-bg
  background-color: $primary

.menu-text
  color: $accent

.menu-icon
  color: $accent

.q-item:hover
  background-color: $dark

.avatar-size
  height: 20vh
  width: 20vh
</style>
