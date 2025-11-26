<template>
  <Transition name="modal-fade">
    <div
      v-if="modelValue"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >

      <!-- CARD = relative pour placer le X dedans -->
      <Transition name="modal-scale">
        <div class="relative bg-white rounded-xl shadow-xl w-full max-w-2xl p-8">

          <!-- Slot -->
          <slot></slot>
        </div>
      </Transition>

    </div>
  </Transition>
</template>

<script setup lang="ts">
import { X } from "lucide-vue-next";

defineProps<{ modelValue: boolean }>();
defineEmits(["update:modelValue"]);
</script>

<style scoped>
/* Fade background */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Scale animation pour la card */
.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: all 0.25s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
