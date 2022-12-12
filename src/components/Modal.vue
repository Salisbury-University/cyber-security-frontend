<script setup lang="ts">
import { ref, watch } from "vue";
import { useAuthStore } from "../stores/auth";
import LoginHelp from "./LoginHelp.vue";

const useAuth = useAuthStore();

const props = defineProps({
  ["loginModal"]: {
    type: Boolean,
  },
});

const emit = defineEmits(["event"]);

const exit = () => {
  useAuth.setUsername("");
  useAuth.setPassword("");
};

const passwordForgot = ref(false);

const changeHelpToggle = () => {
  passwordForgot.value = !passwordForgot.value;
};
</script>

<template>
  <div class="q-pa-md q-gutter-sm">
    <q-dialog
      v-model="useAuth.loginModal"
      persistent
      transition-show="scale"
      transition-hide="scale"
      class="login-dialog"
    >
      <q-card class="login-bg">
        <q-card-section>
          <q-btn
            class="close-icon"
            size="lg"
            icon="close"
            flat
            round
            dense
            @click="
              () => {
                exit();
                emit('event');
              }
            "
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
          <div class="forgot-password">
            <div @click="useAuth.helpModal = !useAuth.helpModal">
              Forgot password?
              <q-icon name="help"> </q-icon>
            </div>
          </div>
        </q-card-section>

        <q-card-section>
          <div id="login-fail" class="login-fail">
            Username or password incorrect
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
  <LoginHelp
    message-title="Help"
    message="Please contact your system administrator for furthur help"
    @event="changeHelpToggle()"
  ></LoginHelp>
</template>

<style>
.login-bg {
  background-image: linear-gradient(
    to bottom right,
    var(--menu-bg),
    var(--menu-bg-secondary)
  );
  border-radius: 40px !important;
  width: 400px;
  height: 500px;
  overflow: hidden;
}

.login-txt {
  color: var(--q-accent);
  text-align: center;
  font-size: 45px;
}

.btn-bg {
  width: 90%;
  background-color: var(--q-secondary);
  padding: 25px 30px 50px 30px;
}

.input {
  width: 90%;
  margin: 0 auto 20px auto;
  background-color: var(--input-bg);
  border-radius: 28px;
  color: var(--q-accent);
}

.bg-focusedInput {
  background-color: var(--q-primary) !important;
  color: var(--q-accent);
}

.login-fail {
  visibility: hidden;
  width: 100%;
  text-align: center;
  color: var(--q-negative);
}

.login-dialog {
  backdrop-filter: blur(5px);
}

.forgot-password {
  width: 100%;
  margin-top: 5px;
  text-align: center;
  cursor: pointer;
  position: relative;
}

.password-help {
  position: relative;
  float: right;
  background: red;
  width: 50%;
}
</style>
