<script lang="ts" setup>
import {ref} from "vue";

const showTossCoin = ref(false);

const toss = (result: string) => {
  showTossCoin.value = true;
  disableScroll();
  const coin = document.getElementById("coin");

  if (!coin) return;

  coin.style.animation = "none";

  setTimeout(() => {
    coin.style.animation = `flip-${result} 3s forwards`;
  }, 10);
}

const hideTossCoin = ($event: MouseEvent, isScrollEnabled = true) => {
  if (showTossCoin.value) {
    showTossCoin.value = false;
    if(isScrollEnabled) enableScroll();
  }
}

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
}

const enableScroll = () => {
  document.body.style.overflow = 'auto';
}

window.addEventListener('toss-coin', ($event) => {
  toss(($event as CustomEvent).detail.tossResult);
})

window.addEventListener('roll-dice', () => {
  if (showTossCoin.value) {
    hideTossCoin(new MouseEvent('click'), false);
  }
});
</script>

<template>
  <div class="coin-toss-info" :class="{ show: showTossCoin }">
    Click anywhere to close
  </div>
  <div class="coin-toss-container" @click="hideTossCoin" :class="{ show: showTossCoin }" >
    <div id="coin" >
      <div class="heads">
        <img src="/img/cent-head.webp" alt="Image for coin's head"/>
      </div>
      <div class="tails">
        <img src="/img/cent-tail.webp" alt="Image for coin's tail"/>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.coin-toss-info {
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

.coin-toss-container {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 250ms ease-in-out;
  background-color: rgba(0, 0, 0, 0.5);

  &.show {
    opacity: 1;
    pointer-events: all;
    transition: opacity 250ms ease-in-out;
    justify-content: center;
    align-items: center;
  }
}

#coin {
  height: 200px;
  width: 200px;
  position: relative;
  margin: auto;
  transform-style: preserve-3d;
}

#coin img {
  width: 200px;
}

.tails {
  transform: rotateX(180deg);
}

.heads,
.tails {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
</style>
