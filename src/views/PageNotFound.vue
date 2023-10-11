<script setup>
import router from '../router/router.js';

function goBack() {
  router.go(-1)
}

</script>

<template>
  <div class="system-page">
    <h1 class="title">Упс, такой страницы не существует!</h1>
    <button class="button" @click="goBack">Назад</button>
  </div>  
</template>