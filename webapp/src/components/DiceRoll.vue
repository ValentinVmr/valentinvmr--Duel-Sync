<script setup lang="ts">
// @ts-expect-error : Could not find a declaration file for module '@3d-dice/dice-box-threejs'.
import DiceBox from "@3d-dice/dice-box-threejs";
import {onMounted, ref} from "vue";
let Box: DiceBox;

const showDiceBox = ref(false);

onMounted(() => {
  Box = new DiceBox("#dice-container", {
    theme_customColorset: {
      background: "#CA608C",
      foreground: "#ffffff",
      texture: "marble",
      material: "plastic"
    },
    light_intensity: 1,
    gravity_multiplier: 600,
    baseScale: 100,
    strength: 2,
  });

  Box.initialize()
    .then(() => {
      const DiceContainer = document.getElementById("dice-container");
      window.addEventListener("resize", () => Box.setDimensions({ x: DiceContainer!.clientWidth, y: DiceContainer!.clientHeight }));
    })
    .catch((e: Error) => console.error(e));
});

const hideDiceBox = () => {
  if (showDiceBox.value) {
    showDiceBox.value = false;
  }
}

window.addEventListener('roll-dice', ($event) => {
  showDiceBox.value = true;
  Box.roll(`1d6@${($event as CustomEvent).detail.dieResult}`);
})
</script>


<template>
  <div class="dice-box-info" :class="{ show: showDiceBox }">
    Click anywhere to close
  </div>
  <div id="dice-container" @click="hideDiceBox" :class="{ show: showDiceBox }" >
  </div>
</template>

<style>
.dice-box-info {
  position: fixed;
  opacity: 0;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  width: auto;
  padding: 5px 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 14px;
  border-radius: 5px;
  z-index: 1000;
  pointer-events: none;
  transition: opacity 250ms ease-in-out;

  &.show {
    opacity: 1;
    pointer-events: all;
    transition: opacity 250ms ease-in-out;
  }
}

#dice-container {
  position: fixed;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
  transition: opacity 250ms ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);

  &.show {
    opacity: 1;
    pointer-events: all;
    transition: opacity 250ms ease-in-out;
  }
}
</style>
