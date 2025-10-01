<script setup lang="ts">
const props = defineProps<{
  time: number
}>();

const remainingSeconds = () => {
  return props.time % 60;
};

const remainingMinutes = () => {
  return Math.floor(props.time / 60);
};
</script>

<template>
  <div class="timer">
    <span class="minutes">{{ remainingMinutes() }}</span>:<span
    class="seconds">{{ remainingSeconds().toString().padStart(2, '0') }}</span>
  </div>
</template>
