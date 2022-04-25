<script setup lang="ts">
import { ref } from "vue";

const persistent = ref(false);
const text = ref("");
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Click me" color="secondary" @click="persistent = true" />

    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="login-bg" style="width: 400px; height: 500px">
        <q-card-section>
          <div class="login-txt">Log In</div>
        </q-card-section>

        <q-card-section>
          <q-input
            rounded
            standout
            v-model="text"
            label="Username"
            class="input"
          ></q-input>
          <q-input
            rounded
            standout
            v-model="text"
            label="Password"
            class="input"
          ></q-input>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            size="20px"
            padding="xs lg"
            rounded
            label="Sign in"
            v-close-popup
            class="btn-bg"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<style lang="sass">
@import 'src/quasar-variables.sass'

.login-bg
  background-color: $primary

.login-txt
  color: $accent
  text-align: center
  font-size: 45px

.btn-bg
  background-color: $info
  padding: 25px 30px 50px 30px

.input
  margin: 2px 25px 50px 25px
  background-color: $accent
  border-radius: 28px
</style>
