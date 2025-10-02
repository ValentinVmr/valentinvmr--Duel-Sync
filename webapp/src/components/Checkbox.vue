<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps<{
  modelValue: boolean,
  id: string
}>();

const isChecked = ref(props.modelValue);

const emits = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>();

const toggleCheckbox = () => {
  isChecked.value = !isChecked.value;
  emits('update:modelValue', isChecked.value);
};
</script>

<template>
  <label :for="id" class="switch">
    <input type="checkbox" :id="id" :checked="isChecked" @change="toggleCheckbox">
    <span class="slider"></span>
  </label>
</template>

<style>
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 28px;
}

/* Checkbox réelle invisible */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* Slider (le toggle) */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #3A3A3A; /* gris foncé fond inactif */
  border-radius: 34px;
  transition: 0.3s;
}

/* Le rond à l'intérieur */
.slider::before {
  position: absolute;
  content: "";
  height: 22px;
  width: 22px;
  left: 3px;
  top: 3px;
  background-color: #F3F3F3; /* blanc clair */
  border-radius: 50%;
  transition: 0.3s;
}

/* Quand checked */
input:checked + .slider {
  background-color: var(--color-secondary-500); /* couleur active, ton orange chaud */
}

input:checked + .slider::before {
  transform: translateX(22px); /* déplace le rond */
}
</style>
