<script setup lang="ts">
import { ref } from "vue";
import Modal from "../components/Modal.vue";
import Card from "../components/Card.vue";
import { useAuthStore } from "../stores/auth";
import { setCssVar } from "quasar";
import Darkmode from "../components/Darkmode.vue";

const useAuth = useAuthStore();

const drawer = ref(false);
const miniState = ref(true);

const bio = ref("Default bio\n CyberSecurity Team");

const toggleModal = () => {
  useAuth.getModalState
    ? useAuth.setModalState(false)
    : useAuth.setModalState(true);
};
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
        :mini-width="56"
        :width="250"
        :breakpoint="500"
        class="menu-bg"
      >
        <q-list>
          <!-- User avatar -->
          <q-item style="height: 30vh">
            <!-- Empty place holder -->
            <q-item-section avatar> </q-item-section>
            <q-item-section class="menu-icon">
              <q-avatar circle style="width: 100%; height: 100%">
                <q-img
                  v-if="useAuth.getLoginStatus"
                  src="https://cdn.quasar.dev/logo-v2/svg/logo.svg"
                />
                <q-img
                  v-else
                  src="https://freesvg.org/img/abstract-user-flat-4.png"
                ></q-img>
              </q-avatar>
            </q-item-section>
          </q-item>

          <!-- Login and logout buttons -->
          <q-item
            class="q-item-active"
            active
            clickable
            v-ripple
            @click="useAuth.showModal()"
            style=""
          >
            <q-item-section avatar>
              <q-icon
                v-if="useAuth.getLoginStatus"
                class="menu-icon"
                name="logout"
              ></q-icon>
              <q-icon v-else class="menu-icon" name="login"></q-icon>
            </q-item-section>
            <q-item-section v-if="useAuth.getLoginStatus" class="menu-text">
              Logout
            </q-item-section>
            <q-item-section v-else class="menu-text"> Login </q-item-section>
          </q-item>

          <!-- Menu seperator -->
          <q-separator inset />

          <!-- Landing page -->
          <q-item
            class="q-item-active"
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

          <!-- Challenges page -->
          <q-item
            class="q-item-active"
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

          <q-item class="q-item-active" active clickable v-ripple to="/wiki">
            <q-item-section avatar>
              <q-icon class="menu-icon" name="feed"></q-icon>
            </q-item-section>
            <q-item-section class="menu-text"> Wiki </q-item-section>
          </q-item>

          <!-- User preference / accounts -->
          <q-item
            class="q-item-active"
            active
            clickable
            to="/preference"
            v-ripple
          >
            <q-item-section avatar>
              <q-icon class="menu-icon" name="person"></q-icon>
            </q-item-section>
            <q-item-section class="menu-text"> Account </q-item-section>
          </q-item>

          <!-- Menu seperator -->
          <q-separator inset />

          <!-- Dark mode toggle -->
          <q-item style="height: 10px" @click="">
            <q-item-section avatar>
              <q-icon
                v-if="!useAuth.persistence.darkmode"
                class="menu-icon"
                name="light_mode"
              ></q-icon>
              <q-icon v-else class="menu-icon" name="dark_mode"></q-icon>
            </q-item-section>
            <q-item-section>
              <Darkmode></Darkmode>
            </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>
      <router-view />
    </q-layout>
    <Modal :loginModal="useAuth.getModalState" @event="toggleModal()" />
  </div>
</template>

<style>
.q-toggle__label {
  color: var(--q-accent);
}
.menu-bg {
  background-color: var(--menu-bg);
  /* background-color: #2e9cca; */
}

.menu-text {
  color: #fefefe;
}

.menu-icon {
  color: #fefefe;
}

.q-item-active:hover {
  background-color: var(--menu-hover);
  /* background-color: #25274d; */
}

.q-item__section {
  color: var(--q-accent);
}

.q-icon {
  color: var(--q-accent);
}
</style>
