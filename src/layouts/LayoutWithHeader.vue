<script setup>
import TheHeader from "../components/TheHeader.vue";
</script>

<template>
  <div class="page">
    <TheHeader />
    <main>
      <slot></slot>
    </main>
  </div>
</template>