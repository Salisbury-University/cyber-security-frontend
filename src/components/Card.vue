<script setup lang="ts">
import { ref } from "vue";
import { useChallengeStore } from "../stores/challenge";

const slide = ref("style");
const useChallenge = useChallengeStore();

useChallenge.setChallenge();
</script>

<template>
  <div class="">
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
      <q-carousel-slide name="card1">
        <q-icon name="" size="56px" />
        <!-- section for challenge name  -->
        <div class="challenge-name">{{ useChallenge.persistence.name[0] }}</div>

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
            Difficulty:
            <span style="color: #ffff00">
              {{ useChallenge.persistence.difficulty[0] }}
            </span>
          </p>
          <p>
            Time Limit:
            <span style="font-weight: normal">
              {{ useChallenge.persistence.timeLimit[0] }}
            </span>
          </p>
          <p>
            Description:
            <span style="font-weight: normal">
              {{ useChallenge.persistence.description[0] }}
            </span>
          </p>
        </div>
      </q-carousel-slide>

      <q-carousel-slide name="card2">
        <q-icon name="" size="56px" />
        <!-- section for challenge name  -->
        <div class="challenge-name">{{ useChallenge.persistence.name[1] }}</div>

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
            Difficulty:
            <span style="color: #ffff00">
              {{ useChallenge.persistence.difficulty[1] }}
            </span>
          </p>
          <p>
            Time Limit:
            <span style="font-weight: normal"
              >{{ useChallenge.persistence.timeLimit[1] }}
            </span>
          </p>
          <p>
            Description:
            <span style="font-weight: normal">{{
              useChallenge.persistence.description[1]
            }}</span>
          </p>
        </div>
      </q-carousel-slide>
    </q-carousel>
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
  font-size: 11px
  font-weight: bold
</style>
