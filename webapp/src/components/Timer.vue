<script setup lang="ts">

import PlayIcon from "@/components/icons/PlayIcon.vue";
import ResetIcon from "@/components/icons/ResetIcon.vue";
import PauseIcon from "@/components/icons/PauseIcon.vue";
import TimerIcon from "@/components/icons/TimerIcon.vue";

const props = defineProps<{
  modelValue: boolean,
  time: number
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'reset-timer'): void
}>();

const remainingSeconds = () => {
  return props.time % 60;
};

const remainingMinutes = () => {
  return Math.floor(props.time / 60);
};

const resetTimer = () => {
  emits('reset-timer');
};
</script>

<template>
  <div class="timer">
    <div class="timer-infos">
      <div class="remaining-time">
        <TimerIcon class="timer-icon"/>
        <span class="minutes">{{ remainingMinutes() }}</span>
        <span class="separator">:</span>
        <span class="seconds">{{ remainingSeconds().toString().padStart(2, '0') }}</span>
      </div>
    </div>
    <div class="timer-controls">
      <button class="ds-button" @click="$emit('update:modelValue', !modelValue)" title="Start or stop timer">
        <PlayIcon v-if="!modelValue"/>
        <PauseIcon v-else/>
      </button>
      <button class="ds-button" @click="resetTimer" title="Start or stop timer">
        <ResetIcon />
      </button>
    </div>
  </div>
</template>

<style scoped>
.minutes, .seconds {
  width: 2rem;
  text-align: center;
}

.timer {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  font-size: 1.2rem;
  color: var(--text-primary);

  background: var(--color-primary-800);
  border: 2px solid var(--color-primary-600);


  padding: 1rem;
  border-radius: 1rem;

  .timer-controls {
    display: flex;
    gap: 0.5rem;

    button {
      border-radius: 100%;
      width: 2rem;
      height: 2rem;
      padding: 0;
      display: flex;
      justify-content: center;
      align-items: center;

      fill: white;
    }
  }

  .remaining-time {
    display: flex;
    align-items: center;
    gap: 0.1rem;
    font-size: 1.5rem;

    .timer-icon {
      width: 2rem;
      height: 2rem;
      fill: var(--text-primary);
      margin-right: 0.3rem;
    }
  }
}
</style>
