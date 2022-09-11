<script setup lang="ts">
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import Card from "../components/Card.vue";

const drawer = ref(false);
const miniState = ref(true);
const showLogin = ref(false);

/**
 * Shows and hides login modal
 */
function toggleLogin() {
  showLogin.value = !showLogin.value;
}
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
        :width="200"
        :breakpoint="400"
        class="menu-bg"
      >
        <q-list padding>
          <q-item
            class="q-item"
            active
            clickable
            v-ripple
            @click="$router.replace('/')"
          >
            <q-item-section avatar>
              <q-icon class="menu-icon" name="home" />
            </q-item-section>

            <q-item-section class="menu-text"> Home </q-item-section>
          </q-item>

          <q-item
            class="q-item"
            active
            clickable
            v-ripple
            @click="$router.replace('/challenges')"
          >
            <q-item-section avatar>
              <q-icon class="menu-icon" name="rocket_launch"></q-icon>
            </q-item-section>

            <q-item-section class="menu-text"> Challenges </q-item-section>
          </q-item>

          <q-item class="q-item" active clickable v-ripple>
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
            @click="showLogin = !showLogin"
          >
            <q-item-section avatar>
              <q-icon class="menu-icon" name="person"></q-icon>
            </q-item-section>
            <q-item-section class="menu-text"> Account </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <Modal :loginModal="showLogin" @event="toggleLogin()" />
      <router-view />
    </q-layout>
  </div>
</template>

<style>
.menu-bg {
  background-color: #2e9cca;
}

.menu-text {
  color: #fefefe;
}

.menu-icon {
  color: #fefefe;
}

.q-item:hover {
  background-color: #25274d;
}
</style>
