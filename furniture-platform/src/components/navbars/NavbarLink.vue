<template>
  <RouterLink
    :to="to"
    class="navbar-link flex items-center gap-2 px-3 py-2 rounded-md text-white transition-all duration-200 hover:bg-[#a87b5b] hover:scale-105 hover:shadow-md"
  >
   <component
  :is="IconComponent"
  v-if="IconComponent"
  :size="22"
  class="shrink-0 relative top-[1px]"
/>
    <span><slot /></span>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import * as icons from 'lucide-vue-next'

interface Props {
  to: string
  icon?: keyof typeof icons // optionnel
}

const props = defineProps<Props>()

// On vérifie que l'icône existe avant d'y accéder
const IconComponent = computed(() => {
  return props.icon ? (icons[props.icon] as any) : null
})
</script>

<style scoped>
.navbar-link {
  color: #ffffff;
}

.navbar-link.router-link-active {
  background-color: #b68a6c;
  font-weight: 800;
}
</style>
