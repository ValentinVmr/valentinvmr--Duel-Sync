<script setup lang="ts">
import {ref} from 'vue';

const input = ref('');

const emit = defineEmits(['update-life-points']);

const handleButtonClick = (value: string) => {
  input.value += value;
};

const clearInput = () => {
  input.value = '';
};

const updateLifePoints = (player: number, operation: string) => {
  const amount = parseInt(input.value);
  if (isNaN(amount)) return;

  emit('update-life-points', { player, operation, amount });
  clearInput();
};
</script>

<template>
  <div class="calculator">
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
      </div>
      <div class="calculator-actions">
        <button @click="updateLifePoints(1, 'add')">+ J1</button>
        <button @click="updateLifePoints(1, 'sub')">- J1</button>
        <button @click="updateLifePoints(2, 'add')">+ J2</button>
        <button @click="updateLifePoints(2, 'sub')">- J2</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calculator {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.calculator-input {
  width: 100%;
  height: 60px;
  text-align: right;
  margin-bottom: 10px;
  font-size: 24px;
  user-select: none; /* Make text non-selectable */
  border: 2px solid #add8e6; /* pastel blue */
  border-radius: 8px;
  padding: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

.calculator-buttons button {
  width: 60px;
  height: 60px;
  font-size: 24px;
  background-color: #f0e68c; /* pastel yellow */
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  user-select: none; /* Make text non-selectable */
}

.calculator-buttons button:hover {
  background-color: #ffd700; /* gold */
}

.calculator-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.calculator-actions button {
  width: 60px;
  height: 60px;
  font-size: 18px;
  background-color: #add8e6; /* pastel blue */
  border: none;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  user-select: none; /* Make text non-selectable */
}

.calculator-actions button:hover {
  background-color: #87ceeb; /* sky blue */
}
</style>
