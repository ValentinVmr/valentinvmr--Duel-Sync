<script setup lang="ts">

import type Configuration from "@/types/configuration.model.ts";
import {ref, watch} from "vue";
import CrossIcon from "@/components/icons/CrossIcon.vue";
import Checkbox from "@/components/Checkbox.vue";

const props = defineProps<{
  modelValue: Configuration,
  darkMode: boolean,
  enableSound: boolean,
  showOptions: boolean
}>();

const getTimerMinutesAndSeconds = (timerInSeconds: number) => {
  const minutes = Math.floor(timerInSeconds / 60);
  const seconds = timerInSeconds % 60;

  return {minutes, seconds};
}

const darkMode = ref(props.darkMode);
const enableSound = ref(props.enableSound);
const configuration = ref<Configuration>(Object.assign({}, props.modelValue));
const minutesInput = ref(getTimerMinutesAndSeconds(configuration.value.initialTimer).minutes);
const secondsInput = ref(getTimerMinutesAndSeconds(configuration.value.initialTimer).seconds);
const emits = defineEmits<{
  (e: 'update:modelValue', value: Configuration): void,
  (e: 'reset-duel'): void,
  (e: 'update:darkMode', value: boolean): void,
  (e: 'update:enableSound', value: boolean): void,
  (e: 'update:showOptions', value: boolean): void
}>();

const updateConfiguration = () => {
  emits('update:modelValue', configuration.value)
};

const setStartingLifePoints = (points: number) => {
  configuration.value.startingLifePoints = points;
}

const changeInitialTimer = () => {

  let minutes = minutesInput.value;
  let seconds = secondsInput.value;

  if (isNaN(minutes) || minutes < 0) {
    minutes = 0;
    minutesInput.value = 0;
  }

  if (isNaN(seconds) || seconds < 0) {
    seconds = 0;
    secondsInput.value = 0;
  } else if (seconds > 59) {
    seconds = 59;
    secondsInput.value = 59;
  }

  configuration.value.initialTimer = (minutes * 60) + seconds;
}

const resetDuel = () => {
  emits('reset-duel');
  closeOptions();
}

const hasConfigurationChanged = () => {
  return JSON.stringify(configuration.value) !== JSON.stringify(props.modelValue);
}

const saveConfiguration = () => {
  updateConfiguration();
  closeOptions();
}

const closeOptions = () => {
  emits('update:showOptions', false);
}

watch(darkMode, (newValue) => {
  emits('update:darkMode', newValue);
});

watch(enableSound, (newValue) => {
  emits('update:enableSound', newValue);
});

watch(minutesInput, () => {
  changeInitialTimer();
});

watch(secondsInput, () => {
  changeInitialTimer();
});
</script>

<template>
  <div class="configuration" :class="{ toggled: showOptions }">
    <button class="close-button" @click="closeOptions">
      <CrossIcon/>
    </button>
    <h2>Options</h2>
    <div class="configuration__options">
      <div class="dark-theme">
        <label for="dark-theme">Dark mode</label>
        <Checkbox id="dark-theme" v-model="darkMode"/>
      </div>
      <div class="sound-effects">
        <label for="sound-effects">Sound effects</label>
        <Checkbox id="sound-effects" v-model="enableSound"/>
      </div>
      <hr>
      <div class="starting-life-points">
        <h3>Starting life points</h3>
        <input class="ds-input" type="number" v-model.number="configuration.startingLifePoints"/>
        <div class="default-life-points">
          <button class="ds-button" @click="setStartingLifePoints(8000)">8000</button>
          <button class="ds-button" @click="setStartingLifePoints(12000)">12000</button>
          <button class="ds-button" @click="setStartingLifePoints(16000)">16000</button>
        </div>
      </div>
      <hr>
      <div class="duel-timer">
        <h3>Timer</h3>
        <div class="minutes">
          <label for="minutes">Minutes</label>
          <input class="ds-input" type="number" id="minutes" v-model.number="minutesInput" />
        </div>
        <div class="seconds">
          <label for="seconds">Seconds</label>
          <input class="ds-input" type="number" id="seconds" v-model.number="secondsInput" />
        </div>
      </div>
      <hr>
      <div class="footer">
        <button class="ds-button" id="reset-duel" @click="resetDuel()">Reset duel</button>
        <button class="ds-button" id="save-configuration" v-if="hasConfigurationChanged()" @click="saveConfiguration()">
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.configuration.toggled {
  transform: translateX(0);
  transition: transform 200ms ease-in-out;
}

#reset-duel, #save-configuration {
  width: 100%;
}

.close-button {
  background: none;
  border: none;
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  color: var(--text-on-primary);
  width: 40px;
  height: 40px;
}

.configuration {
  transform: translateX(350px);
  transition: transform 200ms ease-in-out;
  position: fixed;
  top: 0;
  right: 0;
  background-color: var(--color-primary-800);
  padding: 1rem;
  width: 275px;
  height: 100%;
  box-shadow: -10px 4px 20px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow-y: auto;

  color: var(--text-on-primary);

  h2, h3 {
    margin-top: 0;
  }

  .configuration__options {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    hr {
      width: 100%;
      border: none;
      height: 2px;
      background-color: var(--color-primary-400);
      opacity: 0.25;
    }

    div.dark-theme, div.sound-effects {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    div.starting-life-points {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      div.default-life-points {
        display: flex;
        gap: 0.5rem;
        flex-wrap: nowrap;

        button {
          flex: 1;
          font-size: 0.75rem;
        }
      }
    }

    .footer {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;
    }
  }

}
</style>
