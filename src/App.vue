<template>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* Lightmode css */
.body--light {
  --q-primary: white;
  --q-secondary: rgb(216, 216, 216);
  --q-accent: black;

  --q-positive: white;
  --q-negative: white;
  --q-info: white;
  --q-warning: white;

  --menu-icon: black;
  --menu-text: black;
  --menu-bg: gray;
  --menu-hover: rgb(74, 73, 73);
}

/* Darkmode css */
.body--dark {
  --q-primary: #25274d;
  --q-secondary: #3b3d70;
  --q-accent: white;

  --q-positive: white;
  --q-negative: white;
  --q-info: white;
  --q-warning: white;

  --q-dark-page: #25274d;

  --menu-icon: #fefefe;
  --menu-text: #fefefe;
  --menu-bg: #2e9cca;
  --menu-hover: #25274d;
  --btn: #464866;
}
</style>
