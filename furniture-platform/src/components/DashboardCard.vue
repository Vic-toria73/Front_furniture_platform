<template>
  <RouterLink
    :to="to"
    class="flex flex-col items-center justify-center gap-3 p-6 rounded-xl border shadow-sm 
           bg-white transition hover:shadow-md hover:-translate-y-1"
    :class="highlight ? 'border-green-500 bg-green-50' : 'border-gray-200'"
  >
    <component :is="iconComponent" class="w-8 h-8" />
    <p class="text-lg font-medium">{{ title }}</p>
  </RouterLink>
</template>

<script setup>
import { computed } from "vue";
import * as icons from "lucide-vue-next";

const props = defineProps({
  title: String,
  to: String,
  icon: String,
  highlight: Boolean,
});

const iconComponent = computed(() => icons[props.icon]);
</script>

