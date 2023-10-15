<script setup>
import { 
  defineProps, 
  defineEmits, 
  onMounted, 
  onBeforeUnmount 
} from 'vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  }
})

const emit = defineEmits({
  confirm: null,
  close: null
})

function close() {
  emit("close");
}

function confirm() {
  emit("confirm");
}

function handleKeydown(e) {
  if (props.isOpen && e.key === "Escape") {
    close();
  }
}

onMounted(() => document.addEventListener("keydown", handleKeydown))
onBeforeUnmount(() => document.removeEventListener("keydown", handleKeydown))
</script>

<template>
  <transition name="fade">
    <div class="backdrop" @click="close" v-if="isOpen">
      <div class="popup" @click.stop>
        <slot name="header"></slot>
        <div class="container-buttons">
          <slot name="actions" :close="close" :confirm="confirm"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>