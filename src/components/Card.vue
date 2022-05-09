<script setup lang="ts">
import { ref } from "vue";

const slide = ref("style");
const lorem = "Lorem ipsum Itaque voluptatem totam, libero ab nemo.";

const cardProp = defineProps({
  // name of challenge
  challengeName: {
    type: String,
  },

  // time limit
  timeLimit: {
    type: Number,
  },

  // difficulty rating
  difficulty: {
    type: Number,
  },

  // short description of challenge
  description: {
    type: String,
  },

  // challenge image
  img: {
    type: Image,
  },
});
</script>

<template>
  <div class="q-pa-md row items-start q-gutter-md">
    <q-carousel
      v-model="slide"
      transition-prev="scale"
      transition-next="scale"
      swipeable
      animated
      control-color="white"
      navigation
      padding
      arrows
      bordered
      class="card"
    >
      <q-carousel-slide name="style" class="column no-wrap flex-center">
        <q-icon name="style" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="live_tv" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <q-icon name="layers" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-icon name="terrain" size="56px" />
        <div class="q-mt-md text-center">
          {{ lorem }}
        </div>
      </q-carousel-slide>
    </q-carousel>

    <q-card bordered class="card"> </q-card>
  </div>
</template>

<style lang="sass">
.card
  width: 500px
  height: 300px
  margin-left: 70px
  background-color: $secondary
  color: white
  border-radius: 23px
  box-shadow: 0px 1px 2px black
</style>
