<script setup lang="ts">
import {ref, watch} from "vue";
import YgoDigit from "@/components/YgoDigit.vue";

const props = defineProps({
  lifePoints: {
    type: Number,
    default: 8000
  },
  fontSize: {
    type: Number,
    default: 2
  },
  isSoundEnabled: {
    type: Boolean
  },
  duelistName: {
    type: String,
  },
  playerId: {
    type: Number,
    default: 1
  }
});

const lifePoints = ref(props.lifePoints);
const digits = ref([8, 0, 0, 0]);
const digitKeys = ref(['digit1', 'digit2', 'digit3', 'digit4']);
const direction = ref('up');

watch(() => props.lifePoints, (newValue, oldValue) => {
  lifePoints.value = newValue;

  if (newValue > oldValue) {
    direction.value = 'up';
  } else {
    direction.value = 'down';
  }

  if (!oldValue) {
    return;
  }

  if (props.isSoundEnabled) {
    playSound();
    setTimeout(() => updateDigits(), 600);
  } else {
    updateDigits();
  }
});

const updateDigits = () => {
  const digitsArray = lifePoints.value.toString().split('').map(Number);
  const missingDigits = 4 - digitsArray.length;
  digits.value = Array.from({length: missingDigits}, () => 0).concat(digitsArray);
  digitKeys.value = Array.from({length: digitsArray.length}, () => generateRandomKey());
}

const playSound = () => {
  const audio = new Audio('/ygo-sfx.mp3');
  audio.play();
}

const generateRandomKey = () => {
  return Math.random().toString(36).substring(7);
}

const nameIsDifferentThanDefault = () => {
  return props.duelistName && props.duelistName.trim() !== '' && props.duelistName.trim().toLowerCase() !== `duelist ${props.playerId}`;
}
</script>

<template>
  <div class="lifepoints">
    <header v-if="nameIsDifferentThanDefault()">
      Duelist {{ playerId }}
    </header>
    <div class="duelistName">
      {{ duelistName }}
    </div>
    <hr>
    <div class="digits">
      <template :key="i" v-for="(digit, i) in digits">
        <YgoDigit :triggerKey="digitKeys[i]" :fontSize="props.fontSize" :direction="direction" :digit="digit"
                  :iterations="i" :duration="750 + (i * 100)"/>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.lifepoints {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 2.5rem;
  color: var(--text-primary);

  background: var(--color-primary-800);
  border: 2px solid var(--color-primary-600);
  border-radius: 1rem;

  header {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: lighter;
    opacity: 0.5;
    margin-bottom: 0.25rem;
  }

  hr {
    width: 50%;
    border: 1px solid var(--color-primary-600);
    opacity: 0.25;
    margin-bottom: 1rem;
  }

  .duelistName {
    display: flex;

    font-size: 1.5rem;
    text-transform: uppercase;
    font-weight: lighter;
  }
}

.digits {
  display: flex;
  justify-content: center;
}
</style>
