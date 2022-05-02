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
        :width="200"
        :breakpoint="400"
        class="menu-bg"
      >
        <q-list padding>
          <q-item class="q-item" active clickable v-ripple>
            <q-item-section avatar>
              <q-icon class="menu-icon" name="home" />
            </q-item-section>

            <q-item-section class="menu-text"> Home </q-item-section>
          </q-item>

          <q-item class="q-item" active clickable v-ripple>
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

      <q-page-container>
        <q-page padding>
          <Card />
          <Card />
        </q-page>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="sass">
@import 'src/quasar-variables.sass'

.menu-bg
  background-color: $primary

.menu-text
  color: $accent

.menu-icon
  color: $accent

.q-item:hover
  background-color: $dark
</style>
