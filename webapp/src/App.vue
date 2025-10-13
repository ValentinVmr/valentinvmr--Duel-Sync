<script setup lang="ts">
import {RouterView} from 'vue-router'

import './assets/palette.css';
import HeartIcon from "@/components/icons/HeartIcon.vue";
</script>

<template>
  <RouterView/>
  <footer id="footer">
    Made with
    <HeartIcon class="icon"/>
    by <a href="https://x.com/elfamosoeduardo">Eduardo</a>
  </footer>
</template>

<style scoped>
#footer {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 1rem;
  font-size: 0.875rem;
  color: var(--text-primary);
  margin-top: 2rem;

  .icon {
    margin: 0 0.25rem;
  }

  a {
    text-decoration: none;
    color: var(--text-secondary);
    padding: 3px;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
