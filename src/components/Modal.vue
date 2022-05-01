<script setup lang="ts">
import { ref } from "vue";

const username = ref("");
const password = ref("");

const props = defineProps({
  ["loginModal"]: {
    type: Boolean,
  },
});
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="loginModal"
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
            standout="bg-focusedInput"
            v-model="username"
            label="Username"
            class="input"
            required
          ></q-input>
          <q-input
            rounded
            standout="bg-focusedInput"
            v-model="password"
            label="Password"
            class="input"
            required
          ></q-input>
        </q-card-section>

        <q-card-actions align="center">
          <q-btn
            size="20px"
            padding="xs lg"
            rounded
            label="Sign in"
            class="btn-bg"
            @click="$emit('event')"
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

.bg-focusedInput
  background: $dark !important
</style>
