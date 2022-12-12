<script setup lang="ts">
import { event } from "quasar";
import { watch } from "vue";

const props = defineProps({
  ["messageTitle"]: {
    type: String,
  },
  ["messageModal"]: {
    type: Boolean,
  },
  ["message"]: {
    type: String,
  },
});

let modal = props.messageModal;
watch(()=> props.messageModal, ()=>{
  modal = props.messageModal;
})
const emit = defineEmits(["event"]);
const hello = () => {
  console.log("hello");
};
</script>

<template>
  <q-dialog
    v-model="modal"
    transition-show="scale"
    transition-hide="scale"
    persistent
  >
    <q-card class="help-message">
      <q-card-section style="height: 50px; font-size: 1.5rem">
        {{ messageTitle }}
      </q-card-section>
      <q-separator style="margin: 10px 0 10px 0"></q-separator>
      {{ message }}
    </q-card>
    <!-- For anywhere click -->
    <div
      class="exit-div"
      @click="
        () => {
          emit('event');
          hello();
        }
      "
    ></div>
  </q-dialog>
</template>

<style>
.help-message {
  width: 300px;
  height: 200px;
  background-image: linear-gradient(
    to bottom right,
    var(--menu-bg),
    var(--menu-bg-secondary)
  );
  color: var(--q-accent);
  text-align: center;
  border-radius: 10px !important;
}

.exit-div {
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 99999;
  overflow: hidden;
}

.q-dialog__inner--minimized > div {
  max-width: 100vw;
  max-height: 100vh;
}
</style>
