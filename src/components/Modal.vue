<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuthStore } from "../stores/auth";

const useAuth = useAuthStore();

const props = defineProps({
  ["loginModal"]: {
    type: Boolean,
  },
});

const exit = () => {
  useAuth.setModalState(false);
  useAuth.setUsername("");
  useAuth.setPassword("");
};
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="loginModal"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card
        class="login-bg"
        style="width: 400px; height: 500px; overflow: hidden"
      >
        <q-card-section>
          <q-btn
            class="close-icon"
            size="lg"
            icon="close"
            flat
            round
            dense
            @click="exit()"
          />
        </q-card-section>
        <q-card-section>
          <div class="login-txt">Log In</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit="useAuth.login()">
            <q-input
              id="login-username"
              rounded
              standout="bg-focusedInput"
              v-model="useAuth.username"
              label="Username"
              class="input"
              autofocus
              required
            >
            </q-input>
            <q-input
              rounded
              type="password"
              standout="bg-focusedInput"
              v-model="useAuth.password"
              label="Password"
              class="input"
              required
            >
            </q-input>
            <div align="center">
              <q-btn
                id="login-submit"
                type="submit"
                size="20px"
                padding="xs lg"
                rounded
                class="btn-bg"
                ><span>sign-in</span>
              </q-btn>
            </div>
          </q-form>
        </q-card-section>

        <q-card-section>
          <div id="login-fail" class="login-fail">
            Username or password incorrect
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<style>
.login-bg {
  background-color: #2e9cca;
}

.login-txt {
  color: black;
  text-align: center;
  font-size: 45px;
}

.btn-bg {
  background-color: #aaabb8;
  padding: 25px 30px 50px 30px;
}

.input {
  margin: 2px 25px 50px 25px;
  background-color: #fefefe;
  border-radius: 28px;
}

.bg-focusedInput {
  background-color: #25274d;
}

.login-fail {
  visibility: hidden;
}
</style>
