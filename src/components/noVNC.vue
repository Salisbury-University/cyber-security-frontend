<script setup lang="ts">
import RFB from "@novnc/novnc/core/rfb";
import http from "../http";
import { IframeHTMLAttributes, onMounted, ref } from "vue";
import { useConfirmDialog } from "@vueuse/core";

const props = defineProps({
  ["node"]: {
    type: String,
  },
  ["vmid"]: {
    type: String,
  },
});

console.log("novnc");

// Force element to exist
const novnc: any = ref(null);
// const iframeSrc = ref("");
// const novnc2: any = ref(null);
// http()
//   .post("/api/v1/exercise/novnc", {
//     node: "node",
//     vmid: "107",
//   })
//   .then((res) => {
//     const data = res.data;
//     console.log(novnc2);
//     const url =
//       "https://ip:8006/?console=kvm&novnc=1&vmid=107&node=node&resize=off&vncticket=" +
//       data.ticket +
//       "cmd=";
//     // novnc2.src = url;
//     const id = document.getElementById("novnc2") as IframeHTMLAttributes | null;
//     id!.src = url;
//   });
// Using ref for element getting
onMounted(() => {
  http()
    .post("/api/v1/exercise/novnc", {
      node: "node",
      vmid: "107",
    })
    .then((res) => {
      const data = res.data;
      document.cookie =
        "PVEAuthCookie=" + data.access.ticket + ";path='/'; domain=" + data.url;
      // iframeSrc.value = "https://192.168.0.87:8006/?console=kvm&novnc=1&vmid=107&vmname=Android&node=node&resize=off&cmd="
      // console.log(iframeSrc.value);
      // console.log(data)
      let rfb = new RFB(
        novnc.value,
        "wss://".concat(
          data.url,
          "/api2/json/nodes/",
          data.node,
          "/qemu/",
          data.vmid,
          "/vncwebsocket?port=",
          data.port,
          "&vncticket=",
          data.ticket
        )
      );
      // rfb.addEventListener("credentialsrequired", (e)=>{
      //   console.log('hello')
      // })
      // rfb.addEventListener("connect", (e) => console.log(e));
      // rfb.addEventListener("disconnect", (e) => console.log(e));
    });
});
</script>

<template>
  <div
    id="novncHere"
    ref="novnc"
    style="width: 200px; height: 200px; border-style: solid"
  ></div>
  <!-- <iframe id="novnc2" ref="novnc2" :src="iframeSrc"></iframe> -->
</template>

<style></style>
