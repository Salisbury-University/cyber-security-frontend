<script lang="ts">
import { ref } from "vue";

export default {
  /**
   * Sets state of drawer and nav bar view
   * @returns drawer closed and nav bar minimized
   */
  setup() {
    return {
      drawer: ref(false),
      miniState: ref(true),
    };
  },
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
        :width="200"
        :breakpoint="500"
      >
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section> Home </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon style="color: #25274d" name="rocket_launch"></q-icon>
            </q-item-section>

            <q-item-section style="color: #25274d"> Challenges </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="feed"></q-icon>
            </q-item-section>

            <q-item-section> Wiki </q-item-section>
          </q-item>
        </q-list>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<style lang="sass"></style>
