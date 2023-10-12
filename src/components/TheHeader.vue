<script setup>
import { useAuthStore } from '../store/useAuthStore.js';
import { computed } from 'vue';
const authStore = useAuthStore()

const user = computed(() => authStore.user)

function logout() {
  return authStore.logout()
}

</script>

<template>
  <header class="header">
    <nav class="nav">
      <router-link :to="{ name: 'orders-all' }" class="link">Все заказы</router-link>
      <router-link :to="{ name: 'orders-create' }" class="link">Добавить заказ</router-link>
    </nav>
    <div class="info">
      <span class="user">{{ user }}</span>
      <button class="logout" @click="logout">Выйти</button>
    </div>
  </header>
</template>