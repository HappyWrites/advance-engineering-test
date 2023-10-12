<script setup>
import { computed } from 'vue';
import '../src/assets/scss/app.scss'
import { RouterView, useRoute } from "vue-router";

const route = useRoute();
const layout = computed(() => {
  return route.meta.layout;
});
</script>

<template>
  <transition name="fade">
    <component :is="layout">
      <RouterView v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </RouterView>
    </component>
  </transition>
</template>
