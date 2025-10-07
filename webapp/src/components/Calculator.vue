<script setup lang="ts">
import {ref} from 'vue';
import DiceIcon from "@/components/icons/DiceIcon.vue";
import CoinIcon from "@/components/icons/CoinIcon.vue";

const input = ref('');

const emit = defineEmits(['update-life-points', 'roll-dice', 'toss-coin']);

const handleButtonClick = (value: string) => {
  input.value += value;
};

const clearInput = () => {
  input.value = '';
};

const rollDice = () => {
  emit('roll-dice');
};

const tossCoin = () => {
  emit('toss-coin');
};

const updateLifePoints = (player: number, operation: string) => {
  const amount = parseInt(input.value);
  if (isNaN(amount)) return;

  emit('update-life-points', {player, operation, amount});
  clearInput();
};
</script>

<template>
  <div class="calculator">
    <div class="calculator-content">
      <input v-model="input" class="calculator-input"/>
      <div class="calculator-body">
        <div class="calculator-buttons">
          <button @click="handleButtonClick('1')">1</button>
          <button @click="handleButtonClick('2')">2</button>
          <button @click="handleButtonClick('3')">3</button>
          <button @click="handleButtonClick('4')">4</button>
          <button @click="handleButtonClick('5')">5</button>
          <button @click="handleButtonClick('6')">6</button>
          <button @click="handleButtonClick('7')">7</button>
          <button @click="handleButtonClick('8')">8</button>
          <button @click="handleButtonClick('9')">9</button>
          <button @click="handleButtonClick('0')">0</button>
          <button @click="rollDice()"><DiceIcon /></button>
          <button @click="tossCoin()"><CoinIcon /></button>
        </div>
        <div class="calculator-actions">
          <button @click="updateLifePoints(1, 'add')">+ D1</button>
          <button @click="updateLifePoints(1, 'sub')">- D1</button>
          <button @click="updateLifePoints(2, 'add')">+ D2</button>
          <button @click="updateLifePoints(2, 'sub')">- D2</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.calculator {
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.calculator-content {
  background: var(--color-primary-800);
  padding: 1rem;
  border-radius: 10px;
  border: 2px solid var(--color-primary-500);
}

.calculator-input {
  width: 100%;
  height: 60px;
  text-align: right;
  margin-bottom: 10px;
  font-size: 24px;
  user-select: none; /* Make text non-selectable */
  border: 2px solid var(--color-primary-300); /* pastel blue */
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: var(--color-primary-800);
  color: var(--text-primary);
}

.calculator-body {
  display: flex;
}

.calculator-buttons {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-right: 10px;
}

.calculator-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.calculator-actions button {
  width: 60px;
  height: 60px;
  font-size: 1.25rem;
  background-color: var(--color-secondary-300);
  color: var(--text-on-primary);
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  user-select: none;
}

.calculator-actions button:hover {
  background-color: var(--color-secondary-500);
  cursor: pointer;
}
.calculator-buttons button {
  width: 60px;
  height: 60px;
  font-size: 1.5rem;
  background-color: var(--color-primary-300);
  color: var(--text-on-primary);
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  user-select: none;
}

.calculator-buttons button:hover {
  background-color: var(--color-primary-600);
  cursor: pointer;
}
</style>
