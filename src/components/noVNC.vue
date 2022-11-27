<script setup lang="ts">
import RFB from "@novnc/novnc/core/rfb";
import http from "../http";
import { onMounted, ref } from "vue";

const props = defineProps({
  ["node"]: {
    type: String,
  },
  ["vmid"]: {
    type: String,
  },
});

console.log("novnc");

// Ask to open up the
http()
  .post("/api/v1/exercise/novnc", {
    node: "node",
    vmid: "107",
  })
  .then((res) => {
    console.log(res);
  });

// Force element to exist
const novnc: any = ref(null);

// Using ref for element getting
// onMounted(()=>{
//     let rfb = new RFB(novnc.value, "wss://localhost:3000/api/v1/exercise/novnc")
//     rfb.addEventListener('connect', (e) => console.log(e))
//     rfb.addEventListener('disconnect', (e) => console.log(e))
// })
</script>

<template>
  <div id="novncHere" ref="novnc"></div>
</template>

<style></style>
