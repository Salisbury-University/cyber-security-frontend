<script setup lang="ts">
import { ref } from "vue";
import { useChallengeStore } from "../stores/challenge";

const slide = ref("style");
const useChallenge = useChallengeStore();

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

//useChallenge.setChallenge();
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
      <q-carousel-slide name="style">
        <q-icon name="" size="56px" />
        <!-- section for challenge name  -->
        <div class="challenge-name">How to parse Markdown</div>

        <!-- section for challenge image  -->
        <div>
          <img
            class="img"
            src="/src/assets/markdown.png"
            width="300"
            height="180"
          />
        </div>

        <!-- section for challenge details  -->
        <div class="challenge-info">
          <p>
            Difficulty: <span style="color: #4c9a2a; font-weight: bold">2</span>
          </p>
          <p>Time Limit: 4 hrs</p>
          <p>
            Description: Insert challenge <br />
            description here
          </p>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="tv" class="column no-wrap flex-center">
        <q-icon name="" size="56px" />
        <!-- section for challenge name  -->
        <div class="challenge-name">How to parse Markdown</div>

        <!-- section for challenge image  -->
        <div>
          <img
            class="img"
            src="/src/assets/markdown.png"
            width="300"
            height="180"
          />
        </div>

        <!-- section for challenge details  -->
        <div class="challenge-info">
          <p>
            Difficulty: <span style="color: #4c9a2a; font-weight: bold">2</span>
          </p>
          <p>Time Limit: 4 hrs</p>
          <p>
            Description: Insert challenge <br />
            description here
          </p>
        </div>
        <!-- <div class="q-mt-md text-center">
          {{ lorem }}
        </div> -->
      </q-carousel-slide>
      <q-carousel-slide name="layers" class="column no-wrap flex-center">
        <q-icon name="" size="56px" />
        <!-- section for challenge name  -->
        <div class="challenge-name">How to parse Markdown</div>

        <!-- section for challenge image  -->
        <div>
          <img
            class="img"
            src="/src/assets/markdown.png"
            width="300"
            height="180"
          />
        </div>

        <!-- section for challenge details  -->
        <div class="challenge-info">
          <p>
            Difficulty: <span style="color: #4c9a2a; font-weight: bold">2</span>
          </p>
          <p>Time Limit: 4 hrs</p>
          <p>
            Description: Insert challenge <br />
            description here
          </p>
        </div>
        <!-- <div class="q-mt-md text-center">
          {{ lorem }}
        </div> -->
      </q-carousel-slide>
      <q-carousel-slide name="map" class="column no-wrap flex-center">
        <q-icon name="" size="56px" />
        <!-- section for challenge name  -->
        <div class="challenge-name">How to parse Markdown</div>

        <!-- section for challenge image  -->
        <div>
          <img
            class="img"
            src="/src/assets/markdown.png"
            width="300"
            height="180"
          />
        </div>

        <!-- section for challenge details  -->
        <div class="challenge-info">
          <p>
            Difficulty: <span style="color: #4c9a2a; font-weight: bold">2</span>
          </p>
          <p>Time Limit: 4 hrs</p>
          <p>
            Description: Insert challenge <br />
            description here
          </p>
        </div>
        <!-- <div class="q-mt-md text-center">
          {{ lorem }}
        </div> -->
      </q-carousel-slide>
    </q-carousel>

    <q-card bordered class="card"> </q-card>
  </div>
</template>

<style lang="sass">
.card
  width: 564px
  height: 350px
  margin-left: 60px
  background-color: $secondary
  color: white
  border-radius: 23px
  box-shadow: 0px 1px 2px black

.challenge-name
  font-weight: bold
  font-size: 22px
  position: relative
  bottom: 50px
  right: 108px
  font-family: Verdana, sans-serif

.img
  position: relative
  bottom: 20px
  right: 80px
  border-radius: 3%

.challenge-info
  position: absolute
  bottom: 145px
  left: 364px
  font-size: 12px
</style>
