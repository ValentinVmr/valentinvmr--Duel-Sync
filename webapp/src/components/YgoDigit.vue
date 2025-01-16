<script setup lang="ts">
import {onMounted, ref, useTemplateRef, watch} from "vue";

const props = defineProps({
  digit: {
    type: Number,
    default: 0
  },
  iterations: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 4000
  },
  fontSize: {
    type: Number,
    default: 3
  },
  direction: {
    type: String,
    default: 'up'
  },
  triggerKey: {
    type: String,
    default: ''
  }
});

const iterations = ref(props.iterations);

const iterationsCounter = ref(0);

const oldDigit = ref(props.digit);
const newDigit = ref(props.digit);
const isAnimating = ref(false);

const container = useTemplateRef<HTMLElement>('container');

const numbers = ref([oldDigit.value]);

watch(() => props.digit, (newValue, oldValue) => {
  oldDigit.value = oldValue;
  newDigit.value = newValue;
  triggerAnimation();
});

watch(() => props.fontSize, (newValue) => {
  setFontSize(newValue);
});

watch(() => props.iterations, (newValue) => {
  iterations.value = newValue;
}, { immediate: true });

watch( () => props.triggerKey, () => {
  if (!isAnimating.value) {
    triggerAnimation();
  }
});

onMounted(() => {
  setFontSize(props.fontSize);
  setPosition(0);
});

const triggerAnimation = () => {
  isAnimating.value = true;
  iterationsCounter.value = 0;
  setAnimationCurve('linear');
  buildNumbers();
  scroll();
}

const buildNumbers = () => {
  const numberOfScrolledDigits = totalNumberOfScrolledDigits();

  numbers.value =  Array.from({length: numberOfScrolledDigits + 1}, (_, i) => {
    if (props.direction === 'up') {
      return (i + oldDigit.value) % 10;
    } else {
      const x = i % 10;
      const r = oldDigit.value - x;

      return r < 0 ? 10 + r : r;
    }
  });
}

const scroll = () => {
  setAnimationCurve('ease-out');
  setAnimationSpeed(props.duration);
  setPosition(totalNumberOfScrolledDigits());

  setTimeout(() => {
    setPosition(0);
    numbers.value = [newDigit.value];
    setAnimationSpeed(0);
    isAnimating.value = false;
    oldDigit.value = newDigit.value;
  }, props.duration);
}

const totalNumberOfScrolledDigits = () => {
  if (oldDigit.value === newDigit.value) {
    return 10;
  }

  const gap = gapBetweenNumbers(oldDigit.value, newDigit.value);
  return (10 * (iterations.value) + gap);
}

const gapBetweenNumbers = (previous: number, next: number) => {
  if ((props.direction === 'down' && previous < next) || (props.direction === 'up' && previous > next)) {
    return 10 - Math.abs(previous - next);
  } else {
    return Math.abs(previous - next);
  }
};


const setPosition = (position: number) => {
  if (!container.value) return;

  container.value.style.setProperty('--position', `${position}`);
}
const setAnimationSpeed = (animationSpeed: (string | number)) => {
  if (!container.value) return;

  container.value.style.setProperty('--animation-speed', `${animationSpeed}`);
}

const setFontSize = (fontSize: number) => {
  if (!container.value) return;
  container.value.style.setProperty('--font-size', `${fontSize}rem`);
}

const setAnimationCurve = (animationCurve: string) => {
  if (!container.value) return;
  container.value.style.setProperty('--animation-curve', animationCurve);
}

</script>

<template>
  <div class="number-container" ref="container">
    <div class="number-container__translate" ref="translate-container">
      <div v-for="number in numbers" :key="number" class="number">
        {{ number }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.number-container {
  --position: 0;
  --animation-curve: linear;

  font-size: var(--font-size);
  height: var(--font-size);
  line-height: var(--font-size);
  overflow: hidden;

  &__translate {
    transition: transform var(--animation-curve) calc(var(--animation-speed) * 1ms);
    transform: translateY(calc(var(--font-size) * var(--position) * -1));
  }
}
</style>
